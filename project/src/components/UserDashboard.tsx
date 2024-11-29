import React from 'react';
import { Wallet, TrendingUp, History } from 'lucide-react';

export function UserDashboard() {
  // Example user data
  const userCampaigns = [
    {
      title: "Clean Ocean Initiative",
      raised: "3.2",
      goal: "5",
      status: "active"
    }
  ];

  const contributions = [
    {
      campaign: "Renewable Energy Project",
      amount: "0.5",
      date: "2024-02-15"
    },
    {
      campaign: "Community Art Center",
      amount: "0.3",
      date: "2024-02-10"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Total Raised</h3>
          </div>
          <p className="text-2xl font-bold">3.2 ETH</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">Active Campaigns</h3>
          </div>
          <p className="text-2xl font-bold">1</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <History className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold">Total Contributions</h3>
          </div>
          <p className="text-2xl font-bold">2</p>
        </div>
      </div>

      {/* Your Campaigns */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Campaigns</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userCampaigns.map((campaign, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{campaign.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{campaign.raised} / {campaign.goal} ETH</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Your Contributions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Contributions</h2>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contributions.map((contribution, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{contribution.campaign}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contribution.amount} ETH</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contribution.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}