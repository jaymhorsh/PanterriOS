"use client";

import { useState } from "react";
import { PageHead } from "@/components/shared/dashboard/pageHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type Props = {
  agentName: string;
};

export default function AgentSettings({ agentName }: Props) {
  const [maintenance, setMaintenance] = useState(false);
  const [autoDiscovery, setAutoDiscovery] = useState(true);

  return (
    <div className="mt-6 space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#111827]">Dashboard Metrics & Monthly Targets</h3>
          <p className="text-sm text-[#64748B] mt-1">Set monthly targets for key performance indicators displayed on the dashboard</p>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-md border border-[#E5E7EB] p-4">
              <p className="text-xs text-[#64748B]">Total Investors</p>
              <Input placeholder="Current Count" className="mt-2" />
              <Input placeholder="Monthly Target" className="mt-2" />
            </div>
            <div className="rounded-md border border-[#E5E7EB] p-4">
              <p className="text-xs text-[#64748B]">Total Invested</p>
              <Input placeholder="Current Amount (₦)" className="mt-2" />
              <Input placeholder="Monthly Target (₦)" className="mt-2" />
            </div>
            <div className="rounded-md border border-[#E5E7EB] p-4">
              <p className="text-xs text-[#64748B]">Active Investments</p>
              <Input placeholder="Current Count" className="mt-2" />
              <Input placeholder="Monthly Target" className="mt-2" />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Targets</Button>
          </div>
        </div>

        <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#111827]">Platform Settings</h3>
          <p className="text-sm text-[#64748B] mt-1">General platform configuration and controls</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-md border border-[#E5E7EB] p-4">
              <div>
                <p className="font-medium text-[#111827]">Maintenance Mode</p>
                <p className="text-sm text-[#64748B]">Temporarily disable access</p>
              </div>
              <Switch checked={maintenance} onCheckedChange={(v) => setMaintenance(Boolean(v))} />
            </div>

            <div className="flex items-center justify-between rounded-md border border-[#E5E7EB] p-4">
              <div>
                <p className="font-medium text-[#111827]">AI Content Discovery</p>
                <p className="text-sm text-[#64748B]">Auto article/event scraping</p>
              </div>
              <Switch checked={autoDiscovery} onCheckedChange={(v) => setAutoDiscovery(Boolean(v))} />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#111827]">Notification Preferences</h3>
          <p className="text-sm text-[#64748B] mt-1">Configure email and system notifications</p>

          <div className="mt-4 space-y-4">
            {[
              'New Investor Registration',
              'Withdrawal Requests',
              'Investment Funding',
              'AI Content Discoveries',
              'Payout Approvals',
            ].map((label) => (
              <div key={label} className="flex items-center justify-between rounded-md border border-[#E5E7EB] p-4">
                <div>
                  <p className="font-medium text-[#111827]">{label}</p>
                  <p className="text-sm text-[#64748B]">Notify when {label.toLowerCase()}</p>
                </div>
                <Switch checked={false} onCheckedChange={() => {}} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button>Save Preferences</Button>
          </div>
        </div>

        <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#111827]">Data Management & Backup</h3>
          <p className="text-sm text-[#64748B] mt-1">Manage platform data and automated backups</p>

          <div className="mt-4 border rounded-md border-[#E5E7EB] p-4">
            <p className="text-sm text-[#64748B]">Last Backup</p>
            <p className="text-sm font-medium mt-2">March 12, 2026 at 3:00 AM WAT — Size: 2.4 GB • Status: Successful</p>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Input placeholder="Backup Frequency" />
            <Button>Create Backup Now</Button>
          </div>
        </div>

        <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
          <h3 className="text-lg font-semibold text-[#111827]">API Configuration</h3>
          <p className="text-sm text-[#64748B] mt-1">Configure external service API keys</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-md border border-[#E5E7EB] p-4">
              <div>
                <p className="text-sm text-[#64748B]">example Secret Key</p>
                <p className="text-xs text-[#9CA3AF]">sample_live_xxxxxxxxxxxxxx</p>
              </div>
              <Button variant="outline">Show</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
