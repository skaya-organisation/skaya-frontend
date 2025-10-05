import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Loader2, Globe, Rocket } from 'lucide-react';
import { backendServer } from './HomeCard/Index';
import { useAuth } from '@clerk/clerk-react';

// API Service (inline for this example - you can move to separate file)
interface DomainAvailabilityResponse {
  available: boolean;
  message?: string;
}

interface DeployDomainResponse {
  success: boolean;
  message: string;
  url: string;
}

const hostingAPI = {
  async checkDomainAvailability(domainName: string, accessToken: string): Promise<DomainAvailabilityResponse> {
    const response = await fetch(`${backendServer}/check-domain`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // ✅ important
      },
      body: JSON.stringify({ domainName }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Check domain failed: ${text}`);
    }

    return response.json();
  },

  async deployDomain(domainName: string, branchName: string, accessToken: string): Promise<DeployDomainResponse> {
    const response = await fetch(`${backendServer}/deploy`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json', // ✅ important
      },
      body: JSON.stringify({ domainName, branchName }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Deploy domain failed: ${text}`);
    }

    return response.json();
  },
};

interface HostWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBranch?: string;
}

export const HostWebsiteModal: React.FC<HostWebsiteModalProps> = ({
  isOpen,
  onClose,
  defaultBranch = 'main',
}) => {
  const [domainName, setDomainName] = useState('');
  const [branchName, setBranchName] = useState(defaultBranch);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [domainStatus, setDomainStatus] = useState<{
    available?: boolean;
    message?: string;
  } | null>(null);
  const [deployResult, setDeployResult] = useState<DeployDomainResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkTimeout, setCheckTimeout] = useState<NodeJS.Timeout | null>(null);
  const { isSignedIn, getToken, isLoaded } = useAuth();
  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setDomainName('');
      setBranchName(defaultBranch);
      setDomainStatus(null);
      setDeployResult(null);
      setError(null);
    }
  }, [isOpen, defaultBranch]);

  // Debounced domain check
  useEffect(() => {
    if (checkTimeout) clearTimeout(checkTimeout);

    if (domainName.trim() && domainName.length >= 3) {
      const timeout = setTimeout(() => {
        checkDomainAvailability();
      }, 500);
      setCheckTimeout(timeout);
    } else {
      setDomainStatus(null);
    }

    return () => {
      if (checkTimeout) clearTimeout(checkTimeout);
    };
  }, [domainName]);

  const checkDomainAvailability = async () => {
    setIsCheckingDomain(true);
    setError(null);

    try {
      const accessToken = await getToken();
      if(!accessToken || !isLoaded) throw new Error("User not authenticated");
      const result = await hostingAPI.checkDomainAvailability(domainName,accessToken);
      setDomainStatus(result);
    } catch (err: any) {
      setError(err.message || 'Failed to check domain availability');
      setDomainStatus(null);
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const handleDeploy = async () => {
    if (!domainStatus?.available) {
      setError('Please choose an available domain name');
      return;
    }

    if (!domainName || !branchName) {
      setError('Please fill in all fields');
      return;
    }

    setIsDeploying(true);
    setError(null);

    try {
        const accessToken = await getToken();
      if(!accessToken || !isLoaded) throw new Error("User not authenticated");
    
      const result = await hostingAPI.deployDomain(domainName, branchName,accessToken);
      setDeployResult(result);
    } catch (err: any) {
      setError(err.message || 'Deployment failed');
    } finally {
      setIsDeploying(false);
    }
  };

  if (!isOpen) return null;

  // Success screen
  if (deployResult?.success) {
    return (
      <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🎉 Deployment Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your website has been deployed successfully
            </p>
            <a
              href={deployResult.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg text-center"
            >
              Visit Your Website →
            </a>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Host Your Website</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Domain Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Globe className="w-4 h-4 inline mr-1" />
              Domain Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="my-awesome-site"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
              {isCheckingDomain && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                </div>
              )}
            </div>

            {/* Domain Status */}
            {domainStatus && !isCheckingDomain && (
              <div
                className={`mt-2 flex items-center gap-2 text-sm ${
                  domainStatus.available
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {domainStatus.available ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Domain available!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>{domainStatus.message || 'Domain taken'}</span>
                  </>
                )}
              </div>
            )}

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Use lowercase letters, numbers, and hyphens only
            </p>
          </div>

          {/* Branch Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Branch Name
            </label>
            <input
              type="text"
              value={branchName}
              disabled={true}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="main"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              The GitHub branch to deploy from
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Deploy Info */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3">
            <p className="text-xs text-indigo-700 dark:text-indigo-300">
              💡 Your website will be built and deployed automatically. This may take a few minutes.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDeploy}
              disabled={!domainStatus?.available || isDeploying || isCheckingDomain}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  Deploy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostWebsiteModal;