import React, { useState } from 'react';
import { MessageSquare, Users, Send } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

export function CommunityPanel() {
  const [message, setMessage] = useState('');
  const discussions = useStore((state) => state.discussions);
  const addDiscussion = useStore((state) => state.addDiscussion);
  
  const activeUsers = [
    { name: "Alex", status: "online" },
    { name: "Sarah", status: "online" },
    { name: "Mike", status: "away" },
    { name: "Emma", status: "online" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // For demo purposes, we're adding to the first campaign
    // In production, this should be the selected campaign
    const campaignId = Object.keys(discussions)[0] || 'default';
    addDiscussion(campaignId, message, 'Current User');
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-500" />
          Active Users
        </h3>
        <div className="space-y-3">
          {activeUsers.map((user, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-gray-500" />
          Community Discussion
        </h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {Object.values(discussions).flat().map((discussion) => (
            <div key={discussion.id} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-sm">{discussion.author}</span>
                <span className="text-xs text-gray-500">
                  {format(discussion.timestamp, 'MMM d, h:mm a')}
                </span>
              </div>
              <p className="text-sm text-gray-600">{discussion.text}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Join the discussion..."
            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}