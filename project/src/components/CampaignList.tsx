import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CampaignCard } from './CampaignCard';

export function CampaignList() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Example campaign data
  const campaigns = [
    {
      title: "Clean Ocean Initiative",
      description: "Help us clean the oceans and protect marine life through innovative technology and community action.",
      goal: "5",
      raised: "3.2",
      deadline: "7 days left",
      backers: 156,
      image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "environment"
    },
    {
      title: "Renewable Energy Project",
      description: "Support the development of sustainable energy solutions for remote communities.",
      goal: "10",
      raised: "7.5",
      deadline: "15 days left",
      backers: 230,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "technology"
    },
    {
      title: "Community Art Center",
      description: "Building a space for artists to create and showcase their work to the community.",
      goal: "3",
      raised: "1.8",
      deadline: "21 days left",
      backers: 89,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
      category: "art"
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = filter === 'all' || campaign.category === filter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 h-5 w-5" />
          <select
            className="rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="environment">Environment</option>
            <option value="art">Art</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign, index) => (
          <CampaignCard key={index} {...campaign} />
        ))}
      </div>
    </div>
  );
}