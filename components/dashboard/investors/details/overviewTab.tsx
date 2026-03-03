export function AccountInfoAndSummary() {
  const user = {
    accountInfo: {
      name: 'Ahmed Faruq',
      email: 'john.doe@example.com',
      id: '00001',
      accStatus: 'active',
    },
    inestmentSum: {
      activeInves: '8',
      tier: 'platnium',
      total: '₦30.0M',
      joinedAt: 'jan 2023',
    },
  };
  return (
    <div className="grid lg:grid-cols-2 gap-2">
      <div className="p-2 space-y-3 border rounded-md">
        <h2 className="font-boldFull Name">Account Information</h2>
        <div className="flex justify-between border-b py-2">
          <small>Full Name </small>
          <span>{user.accountInfo.name}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <small>Email Address </small>
          <span>{user.accountInfo.email}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <small>Investor ID </small>
          <span>{user.accountInfo.id}</span>
        </div>
        <div className="flex justify-between">
          <small>Account Status </small>
          {user.accountInfo.accStatus === 'active' ? (
            <span className="text-xs text-green-600 bg-green-50 px-2 border border-green-500 py-0.5 h-fit">
              {user.accountInfo.accStatus}
            </span>
          ) : (
            <span className="text-xs text-gray-600 bg-gray-50 px-2 border border-gray-500 py-0.5 h-fit">
              {user.accountInfo.accStatus}
            </span>
          )}
        </div>
      </div>
      <div className="p-2 space-y-3 border rounded-md">
        <h2 className="font-boldFull Name">Investment Summary</h2>
        <div className="flex justify-between border-b py-2">
          <small>Active Investments </small>
          <span>{user.inestmentSum.activeInves}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <small>Tier Level </small>
          <span>{user.inestmentSum.tier}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <small>Total Value </small>
          <span>{user.inestmentSum.total}</span>
        </div>
        <div className="flex justify-between">
          <small>Member Since </small>
          <span className=" capitalize">{user.inestmentSum.joinedAt}</span>
        </div>
      </div>
    </div>
  );
}
