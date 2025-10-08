import { useState, useEffect, useCallback } from 'react';
import MainSection from './MainSection';
import { useAuth } from '@clerk/clerk-react';

// --- CONFIGURATION & CONSTANTS ---
const GITHUB_REPO = 'skaya-org/frontend-react-template';

export const backendServer =process.env.REACT_APP_BACKEND_SERVER;
export const gh_token =process.env.REACT_APP_GITHUB_TOKEN

const MAX_PROMPTS = 5;

interface Template {
  id: string;
  title: string;
  description: string;
}

export default function HomeCard() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [sessions, setSessions] = useState<string[]>([]);
  const [promptCount, setPromptCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [currentSessionTitle, setCurrentSessionTitle] = useState<string | null>(null);
  const [selectedCommitId, setSelectedCommitId] = useState<string | null>(null);

  const { isSignedIn, getToken, isLoaded } = useAuth();

  const handleSelectSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
    setCurrentSessionTitle(sessionId);
  }, []);

  const fetchPromptsRemaining = useCallback(async () => {
    try {
      const accessToken = await getToken();
      const response = await fetch(`${backendServer}/Skaya/user-info`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await response.json();
      if (data.success) {
        setSessions(data.user.sessions || []);
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
   * 🔧 Handle Create / Update (Backend handles logic)
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
          setCurrentSessionId(data.data.newSessionId);
          setCurrentSessionTitle(details.title);
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
  }, []);

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
    />
  );
}
