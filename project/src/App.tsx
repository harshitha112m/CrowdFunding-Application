import React, { useState } from 'react';
import { Wallet, Plus, Users as UsersIcon } from 'lucide-react';
import { useWeb3 } from './hooks/useWeb3';
import { CampaignList } from './components/CampaignList';
import { CreateCampaign } from './components/CreateCampaign';
import { CommunityPanel } from './components/CommunityPanel';
import { UserDashboard } from './components/UserDashboard';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { account, contract, loading, error, connectWallet } = useWeb3();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeUsers] = useState(156);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to connect wallet');
    }
  };

  const renderWalletButton = () => {
    if (!account) {
      return (
        <button
          onClick={handleConnect}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wallet className="h-4 w-4 mr-2" />
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      );
    }

    return (
      <div className="flex items-center px-4 py-2 rounded-md bg-gray-100">
        <Wallet className="h-4 w-4 mr-2 text-gray-500" />
        <span className="text-sm text-gray-600">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">DeCrowd</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center px-4 py-2 rounded-md bg-gray-100">
                <UsersIcon className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">{activeUsers} online</span>
              </div>
              {account && (
                <>
                  <button
                    onClick={() => setShowDashboard(true)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </button>
                </>
              )}
              {renderWalletButton()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && !loading && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex gap-8">
          <div className="flex-grow">
            <CampaignList />
          </div>
          <div className="w-80 flex-shrink-0">
            <CommunityPanel />
          </div>
        </div>
      </main>

      {showCreateModal && (
        <CreateCampaign
          onClose={() => setShowCreateModal(false)}
          onSubmit={async (campaign) => {
            try {
              // Handle campaign creation
              setShowCreateModal(false);
              toast.success('Campaign created successfully!');
            } catch (err) {
              toast.error('Failed to create campaign');
            }
          }}
        />
      )}

      {showDashboard && (
        <UserDashboard onClose={() => setShowDashboard(false)} />
      )}
    </div>
  );
}

export default App;