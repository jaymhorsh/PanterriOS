import { CircleCheckBig } from 'lucide-react';

export function KycDetail() {
  return (
    <div className="border p-2 rounded-md space-y-2">
      <div className="flex justify-between">
        <div>KYC Verification Status</div>
        <span className="text-xs text-green-600 bg-green-50 px-2 border border-green-500 py-0.5 h-fit uppercase">
          approved
        </span>
      </div>
      <div className=" flex flex-col space-y-3">
        <div className="flex justify-between bg-gray-50 border rounded-md p-2">
          <div>
            <p>Identity Verification</p>
            <small>NIN</small>
          </div>
          <span className="text-xs text-green-600 bg-green-50 px-2 border border-green-500 py-0.5 h-fit capitalize flex justify-between items-center gap-1">
            <CircleCheckBig className="w-3 h-3" />
            <span> Verified</span>
          </span>
        </div>
        <div className="flex justify-between bg-gray-50 border rounded-md p-2">
          <div>
            <p>BVN Verification</p>
            <small>BVN</small>
          </div>
          <span className="text-xs text-green-600 bg-green-50 px-2 border border-green-500 py-0.5 h-fit capitalize flex justify-between items-center gap-1">
            <CircleCheckBig className="w-3 h-3" />
            <span> Verified</span>
          </span>
        </div>
      </div>
    </div>
  );
}
