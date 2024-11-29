import React from 'react';
import { Clock, Target, Users } from 'lucide-react';

interface CampaignCardProps {
  title: string;
  description: string;
  goal: string;
  raised: string;
  deadline: string;
  backers: number;
  image: string;
  onContribute: () => void;
}

export function CampaignCard({
  title,
  description,
  goal,
  raised,
  deadline,
  backers,
  image,
  onContribute
}: CampaignCardProps) {
  const progress = (parseFloat(raised) / parseFloat(goal)) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{raised} / {goal} ETH</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{deadline}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{backers} backers</span>
            </div>
          </div>
          
          <button
            onClick={onContribute}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back this project
          </button>
        </div>
      </div>
    </div>
  );
}