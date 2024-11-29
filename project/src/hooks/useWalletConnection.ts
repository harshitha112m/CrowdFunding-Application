import { useState, useCallback } from 'react';
import { ethers } from 'ethers';

interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, handler: (...args: any[]) => void) => void;
  removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
  isMetaMask?: boolean;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export function useWalletConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const resetState = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setAccount('');
    setError('');
  }, []);

  const checkProvider = useCallback((): ethers.BrowserProvider => {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask to use this application');
    }
    if (!window.ethereum.isMetaMask) {
      throw new Error('Please use MetaMask as your wallet provider');
    }
    return new ethers.BrowserProvider(window.ethereum);
  }, []);

  const connectWallet = useCallback(async () => {
    if (isConnecting) return;

    try {
      setIsConnecting(true);
      setError('');

      const browserProvider = checkProvider();
      setProvider(browserProvider);

      const accounts = await browserProvider.send('eth_requestAccounts', []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const newSigner = await browserProvider.getSigner();
      
      setAccount(accounts[0]);
      setSigner(newSigner);
    } catch (err: any) {
      resetState();
      
      if (err.code === 4001) {
        setError('Connection rejected. Please approve MetaMask to continue.');
      } else if (err.code === -32002) {
        setError('MetaMask is already processing a connection request.');
      } else if (err.code === -32603) {
        setError('MetaMask is locked. Please unlock your wallet.');
      } else {
        setError(err.message || 'Failed to connect wallet');
      }
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting, checkProvider, resetState]);

  const disconnect = useCallback(() => {
    resetState();
  }, [resetState]);

  return {
    isConnecting,
    provider,
    signer,
    account,
    error,
    connectWallet,
    disconnect
  };
}