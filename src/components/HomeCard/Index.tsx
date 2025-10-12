import { useState, useEffect, useCallback } from 'react';
import MainSection from './MainSection';
import { useAuth } from '@clerk/clerk-react';
import {
  backendServer,
  gh_token,
  GITHUB_REPO,
  MAX_PROMPTS,
} from '../../utils/constants';

interface Template {
  id: string;
  title: string;
  description: string;
}

interface SessionDetails {
  isHosted: boolean;
  hostingDomain: string;
}

export default function HomeCard() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [sessions, setSessions] = useState<Record<string, string | SessionDetails>>({});
  const [promptCount, setPromptCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [currentSessionTitle, setCurrentSessionTitle] = useState<string | null>(null);
  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null);

  // new states for hosted info
  const [isHosted, setIsHosted] = useState<boolean>(false);
  const [hostingDomain, setHostingDomain] = useState<string>('');

  const { isSignedIn, getToken, isLoaded } = useAuth();

  /**
   * 🟢 Select session and update hosted info
   */
  const handleSelectSession = useCallback(
    (sessionId: string) => {
      setCurrentSessionId(sessionId);
      setCurrentSessionTitle(sessionId);

      // fetch details from sessions object
      const details = sessions[sessionId];
      if (typeof details === 'object') {
        setIsHosted(details.isHosted);
        setHostingDomain(details.hostingDomain);
      } else {
        setIsHosted(false);
        setHostingDomain('');
      }
    },
    [sessions]
  );

  /**
   * 🧠 Fetch user info and sessions from backend
   */
  const fetchPromptsRemaining = useCallback(async () => {
    try {
      const accessToken = await getToken();
      const response = await fetch(`${backendServer}/Skaya/user-info`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();

      if (data.success) {
        setSessions(data.user.sessions || {});
        setPromptCount(MAX_PROMPTS - data.user.promptCount);
        setIsPaid(data.user.isPaid);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [getToken]);

  useEffect(() => {
    fetchPromptsRemaining();
  }, [fetchPromptsRemaining]);

  /**
   * 🔧 Create / Update website session
   */
  const handleSessionAction = useCallback(
    async (details: any, files: File[] = []) => {
      setIsProcessing(true);
      try {
        const accessToken = await getToken();
        const formData = new FormData();
        formData.append('details', JSON.stringify(details));
        if (currentSessionId) formData.append('sessionId', currentSessionId);
        if (selectedCommitId) formData.append('commitId', selectedCommitId);
        files.forEach((file) => formData.append('files', file));

        const res = await fetch(`${backendServer}/Skaya/run-command`, {
          method: 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await res.json();
        if (data.success) {
          await fetchPromptsRemaining();
          const newId = data.data.newSessionId;
          setCurrentSessionId(newId);
          setCurrentSessionTitle(newId);

          // update current session info if backend returns hosted info
          if (data.data.isHosted !== undefined) {
            setIsHosted(data.data.isHosted);
            setHostingDomain(data.data.hostingDomain || '');
          }
        } else {
          console.error('Error from backend:', data.error);
        }
      } catch (err) {
        console.error('Command error:', err);
      } finally {
        setIsProcessing(false);
      }
    },
    [getToken, currentSessionId, selectedCommitId, fetchPromptsRemaining]
  );

  const resetSession = useCallback(() => {
    setCurrentSessionId(null);
    setCurrentSessionTitle(null);
    setIsHosted(false);
    setHostingDomain('');
  }, []);

  /**
   * 📦 Fetch available templates from GitHub
   */
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/branches`,
          {
            headers: { Authorization: `token ${gh_token}` },
          }
        );
        const data = await response.json();
        setTemplates(
          data.map((branch: any) => ({
            id: branch.name,
            title: branch.name
              .split(/[-_]/)
              .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' '),
            description: `Template "${branch.name}"`,
          }))
        );
      } catch (err) {
        console.error('Failed to fetch templates', err);
      }
    };
    fetchTemplates();
  }, []);

  /**
   * 🧩 Pass all props to MainSection
   */
  return (
    <MainSection
      templates={templates}
      onSessionAction={handleSessionAction}
      isProcessing={isProcessing}
      sessions={sessions}
      onResetSession={resetSession}
      promptCount={promptCount}
      maxPrompts={MAX_PROMPTS}
      currentSessionId={currentSessionId}
      currentSessionTitle={currentSessionTitle}
      onSelectSession={handleSelectSession}
      isAuthenticated={isSignedIn || false}
      isPaid={isPaid}
      gh_token={gh_token}
      selectedCommitId={selectedCommitId}
      setSelectedCommitId={setSelectedCommitId}
      isHosted={isHosted}
      hostingDomain={hostingDomain}
    />
  );
}
