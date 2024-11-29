import create from 'zustand';
import { ethers } from 'ethers';

interface StoreState {
  discussions: {
    [campaignId: string]: {
      id: string;
      text: string;
      author: string;
      timestamp: number;
    }[];
  };
  addDiscussion: (campaignId: string, text: string, author: string) => void;
  campaigns: {
    [id: string]: {
      id: string;
      title: string;
      description: string;
      goal: string;
      raised: string;
      deadline: string;
      backers: number;
      image: string;
      creator: string;
      txHash?: string;
      ipfsHash?: string;
    };
  };
  addCampaign: (campaign: any) => void;
  updateCampaign: (id: string, data: Partial<any>) => void;
}

export const useStore = create<StoreState>((set) => ({
  discussions: {},
  campaigns: {},
  
  addDiscussion: (campaignId, text, author) => 
    set((state) => ({
      discussions: {
        ...state.discussions,
        [campaignId]: [
          ...(state.discussions[campaignId] || []),
          {
            id: ethers.hexlify(ethers.randomBytes(16)),
            text,
            author,
            timestamp: Date.now(),
          },
        ],
      },
    })),

  addCampaign: (campaign) =>
    set((state) => ({
      campaigns: {
        ...state.campaigns,
        [campaign.id]: campaign,
      },
    })),

  updateCampaign: (id, data) =>
    set((state) => ({
      campaigns: {
        ...state.campaigns,
        [id]: {
          ...state.campaigns[id],
          ...data,
        },
      },
    })),
}));