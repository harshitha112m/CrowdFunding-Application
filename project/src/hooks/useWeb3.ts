import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWalletConnection } from './useWalletConnection';
import { CROWDFUNDING_ABI, CROWDFUNDING_ADDRESS } from '../contracts/CrowdfundingContract';

export function useWeb3() {
  const {
    isConnecting,
    signer,
    account,
    error: walletError,
    connectWallet
  } = useWalletConnection();

  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState<string>(walletError);

  useEffect(() => {
    if (signer && ethers.isAddress(CROWDFUNDING_ADDRESS)) {
      const crowdfundingContract = new ethers.Contract(
        CROWDFUNDING_ADDRESS,
        CROWDFUNDING_ABI,
        signer
      );
      setContract(crowdfundingContract);
      setError('');
    } else {
      setContract(null);
    }
  }, [signer]);

  useEffect(() => {
    setError(walletError);
  }, [walletError]);

  useEffect(() => {
    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return {
    account,
    contract,
    loading: isConnecting,
    error,
    connectWallet
  };
}