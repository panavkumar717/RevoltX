import { NextRequest, NextResponse } from 'next/server';
import { 
  classifyBatteryDeterministic, 
  buildGeminiPrompt, 
  BatteryInputFeatures, 
  AIPredictionResult 
} from '../../../../lib/ai/rxEngine';

export async function POST(req: NextRequest) {
  try {
    const body: BatteryInputFeatures = await req.json();

    if (!body || body.currentSOH === undefined || body.rul === undefined) {
      return NextResponse.json(
        { error: 'Missing required battery parameters: currentSOH and rul are required.' },
        { status: 400 }
      );
    }

    // 1. Run deterministic electrochemical classifier
    const baseline = classifyBatteryDeterministic(body);

    // 2. Check for Gemini API key
    const geminiApiKey = process.env.GEMINI_API_KEY || req.headers.get('x-gemini-api-key');

    if (!geminiApiKey) {
      // Return high-fidelity deterministic classification result
      return NextResponse.json({
        success: true,
        source: 'deterministic_engine',
        data: baseline
      });
    }

    // 3. Query Gemini for deep LLM electrochemical diagnostics
    try {
      const prompt = buildGeminiPrompt(body, baseline);
      
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: 'application/json'
            }
          }),
          signal: AbortSignal.timeout(8000)
        }
      );

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText) {
          const parsed = JSON.parse(rawText.replace(/```json|```/g, '').trim());

          const enrichedResult: AIPredictionResult = {
            ...baseline,
            decision: parsed.decision || baseline.decision,
            confidence: parsed.confidence || baseline.confidence,
            electrochemicalDiagnosis: parsed.electrochemicalDiagnosis || baseline.electrochemicalDiagnosis,
            recommendedApplication: parsed.recommendedApplication || baseline.recommendedApplication,
            degradationMechanisms: parsed.degradationMechanisms || baseline.degradationMechanisms,
            complianceNotes: parsed.complianceNotes || baseline.complianceNotes,
            estimatedMarketValue: parsed.estimatedMarketValue || baseline.estimatedMarketValue,
            modelSignature: 'Gemini-2.5-Flash + ReVoltX-EIS-Hybrid-v4'
          };

          return NextResponse.json({
            success: true,
            source: 'gemini_flash',
            data: enrichedResult
          });
        }
      }
    } catch (err) {
      console.warn('Gemini API call timed out or failed, falling back to deterministic model:', err);
    }

    // Graceful fallback to baseline
    return NextResponse.json({
      success: true,
      source: 'deterministic_engine_fallback',
      data: baseline
    });

  } catch (error: any) {
    console.error('Error running AI prediction engine:', error);
    return NextResponse.json(
      { error: 'Failed to process AI battery prediction', details: error?.message },
      { status: 500 }
    );
  }
}
