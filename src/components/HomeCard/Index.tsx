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
  const [sessions, setSessions] = useState<string[]>([]); // ✅ sessions as IDs only
  const [promptCount, setPromptCount] = useState(0); // remaining Prompt Count
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [currentSessionTitle, setCurrentSessionTitle] = useState<string | null>(
    null,
  );

  const { isSignedIn, getToken, isLoaded } = useAuth();
  const handleSelectSession = useCallback(
    async (sessionId: string) => {
      setCurrentSessionId(sessionId);
      setCurrentSessionTitle(sessionId);
    },
    [isLoaded, isSignedIn, getToken,currentSessionId],
  );
  const fetchPromptsRemaining = useCallback(async () => {
    try {
      const accessToken = await getToken();
      const response = await fetch(
        `${backendServer}/Skaya/user-info`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      const data = await response.json();
      
      if (data.success) {
        setSessions(data.user.sessions)
        setPromptCount(MAX_PROMPTS-data.user.promptCount);
        setIsPaid(data.user.isPaid)
      }
    } catch (error) {
      console.error('Error fetching remaining prompts:', error);
    }
  }, [isLoaded, isSignedIn, getToken]);

  useEffect(() => {
    fetchPromptsRemaining();
  }, [fetchPromptsRemaining,currentSessionId]);

const handleSessionAction = useCallback(
  async (
    details: { title: any; description: any; category: any; tags: any; theme: any; template: string },
    files: File[] = []
  ) => {
    const accessToken = await getToken();
    const { title, description, category, tags, theme, template } = details;
    setIsProcessing(true);

    const tagsString = tags.join(', ');
    const isUpdate = Boolean(currentSessionId);
    let sessionToUse = currentSessionId;
    let command: string;

    if (isUpdate) {
      const updateDescription = `Update homepage: ${description}, tags: [${tagsString}], theme: ${theme}`;
      command = `skaya update page -p frontend -f Homepage -s -a -d "${updateDescription}"`;
      sessionToUse = currentSessionId!;
    } else {
      const sanitizedTitle = title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
      const randomPart = Math.random().toString(36).substring(2, 8);
      const newSessionId = `${sanitizedTitle}-${randomPart}`;
      sessionToUse = newSessionId;

      // Immediately mark it active
      setCurrentSessionId(newSessionId);
      setCurrentSessionTitle(title);

      const templateFlag = template === "react" ? "skaya-react-ts" : "skaya-nextjs";
      const createDescription = `Create Homepage: ${title}, Category: ${category}, Tags: [${tagsString}], Description: ${description}`;
      command = `skaya init frontend -f ${newSessionId} -c skaya-official -t ${templateFlag} && skaya update page -p frontend -f Homepage -s -a -d "skaya-create-type: ${createDescription}"`;
    }

    try {
      const formData = new FormData();
      formData.append('command', command);
      formData.append('sessionId', sessionToUse);
      files.forEach((file) => formData.append('files', file));

      const response = await fetch(`${backendServer}/Skaya/run-command`, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await response.json();

      if (data.success) {
        await fetchPromptsRemaining();

        // ✅ Make sure session is active after creation
        const newSessionId = data.data.newSessionId || sessionToUse;
        setCurrentSessionId(newSessionId);
        setCurrentSessionTitle(title);

        // Optional: automatically select session in carousel
        handleSelectSession(newSessionId);
      }

      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      throw err;
    }
  },
  [isLoaded, isSignedIn, getToken, currentSessionId, handleSelectSession]
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
          },
        );
        if (!response.ok) throw new Error('Failed to fetch GitHub branches');
        const data = await response.json();
        const formattedTemplates = data.map((branch: any) => ({
          id: branch.name,
          title: branch.name
            .split(/[-_]/)
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          description: `An interactive preview of the "${branch.name}" template.`,
        }));
        setTemplates(formattedTemplates);
      } catch (err) {
        console.error(err);
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
    />
  );
}
