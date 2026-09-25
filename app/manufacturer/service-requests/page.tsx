'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench, Plus, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useReVoltX } from '../../../lib/store/batteryStore';
import { ServiceStatus } from '../../../lib/types';

export default function ManufacturerServiceRequestsPage() {
  const { serviceRequests, createServiceRequest, batteries } = useReVoltX();

  const [showModal, setShowModal] = useState(false);
  const [targetBatteryId, setTargetBatteryId] = useState('RX-2026-892738');
  const [customerName, setCustomerName] = useState('Sarah Jenkins');
  const [phone, setPhone] = useState('+1 (555) 392-8819');
  const [address, setAddress] = useState('742 Evergreen Terrace, Sector 4, Silicon District');
  const [issue, setIssue] = useState('Accelerated thermal degradation detected. Smart Dock diagnostic requested.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createServiceRequest({
      batteryId: targetBatteryId,
      customerName,
      phone,
      address,
      issue
    });
    setShowModal(false);
  };

  const statusStyles: Record<ServiceStatus, string> = {
    'Requested': 'bg-[#FEF6E7] text-[#D89A24] border-[#F8E0B0]',
    'Scheduled': 'bg-[#EBF3FB] text-[#4386C5] border-[#C8DFEF]',
    'Technician Assigned': 'bg-[#DDF5EA] text-[#137A58] border-[#BBEAD7]',
    'Assessment Complete': 'bg-[#F3F8E5] text-[#5D7C13] border-[#DAECAE]',
    'Replacement Recommended': 'bg-[#FDF0EE] text-[#D94B4B] border-[#F8C8C4]',
    'Completed': 'bg-[#F0F5F2] text-[#62756E] border-[#DDE7E2]'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DDE7E2]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#137A58]">
            Operations & Field Logistics
          </span>
          <h1 className="text-2xl font-bold text-[#10201B] mt-1">
            Fleet Service Requests & Smart Dock Dispatches
          </h1>
          <p className="text-xs text-[#62756E]">
            Trigger on-site technician assessments and track inspection progress.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#137A58] text-white text-xs font-bold hover:bg-[#0E5B42] shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Service Request</span>
        </button>
      </div>

      {/* Service Request Cards / Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE7E2] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DDE7E2] text-[11px] uppercase font-bold text-[#62756E]">
                <th className="pb-3 font-semibold">Request ID</th>
                <th className="pb-3 font-semibold">Target Battery ID</th>
                <th className="pb-3 font-semibold">Reported Issue</th>
                <th className="pb-3 font-semibold">Requested Date</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE7E2]">
              {serviceRequests.map(req => (
                <tr key={req.id} className="hover:bg-[#F7FAF8] transition-colors">
                  <td className="py-3.5 font-mono font-bold text-[#10201B]">{req.id}</td>
                  <td className="py-3.5 font-mono font-semibold text-[#137A58]">
                    <Link href={`/manufacturer/batteries/${req.batteryId}`} className="hover:underline">
                      {req.batteryId}
                    </Link>
                  </td>
                  <td className="py-3.5 max-w-xs text-[#10201B]">{req.issue}</td>
                  <td className="py-3.5 font-mono text-[#62756E]">
                    {new Date(req.requestedDate).toLocaleDateString()}
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusStyles[req.status] || 'bg-[#F0F5F2]'}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#DDE7E2] shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#DDE7E2]">
              <h3 className="font-bold text-base text-[#10201B]">
                Request ReVoltX Health Assessment
              </h3>
              <button 
                type="button" 
                onClick={() => setShowModal(false)}
                className="text-xs text-[#62756E] hover:text-[#10201B]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#10201B] mb-1">Target Battery ID</label>
                <select
                  value={targetBatteryId}
                  onChange={e => setTargetBatteryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] font-mono text-[#10201B]"
                >
                  {batteries.map(b => (
                    <option key={b.id} value={b.revoltXId}>
                      {b.revoltXId} ({b.chemistry}, SOH {b.currentSOH}%, {b.vehicleModel || b.ownerName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#10201B] mb-1">Customer / Fleet Contact Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-[#10201B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#10201B] mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-[#10201B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#10201B] mb-1">Deployment Location / Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-[#10201B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#10201B] mb-1">Reported Issue / Notes</label>
                <textarea
                  rows={3}
                  value={issue}
                  onChange={e => setIssue(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#DDE7E2] bg-[#F7FAF8] text-[#10201B]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#DDE7E2] text-[#62756E] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#137A58] text-white font-bold hover:bg-[#0E5B42]"
                >
                  Submit Service Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
