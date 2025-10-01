// src/hooks/useSessionFiles.ts
import { useState, useEffect, useCallback } from 'react';
import { SandpackFiles } from '../utils/types';
import { fetchAllSessionFiles } from '../services/sessionAPI';
import { useAuth } from '@clerk/clerk-react';

export const useSessionFiles = (sessionId: string | null, ) => {
  const [livePreviewFiles, setLivePreviewFiles] = useState<SandpackFiles | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const { getToken, } = useAuth();

  const fetchFiles = useCallback(async () => {
    if (!sessionId) return;
    setIsFetching(true);
    try {
      const accessToken=await getToken()
      const files = await fetchAllSessionFiles(sessionId,accessToken as string);
      setLivePreviewFiles(files);
    } catch (err) {
      setLivePreviewFiles(null);
    } finally {
      setIsFetching(false);
    }
  }, [sessionId]);

  useEffect(() => {
    if ( sessionId) {
      fetchFiles();
    } else {
      setLivePreviewFiles(null);
    }
  }, [sessionId, fetchFiles]);

  return { livePreviewFiles, isFetchingSessionFiles: isFetching, refetch: fetchFiles };
};