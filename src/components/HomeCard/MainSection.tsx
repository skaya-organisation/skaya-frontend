import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { MainSectionProps, ViewMode } from "../../utils/types";
import { useTemplateFiles } from "../../hooks/useTemplateFiles";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import PendingIcon from "@mui/icons-material/Pending";
// Components
import EditorDetailsModal from "../EditorDetailsModal";
import InteractiveCard from "../InteractiveCard";
import TemplateCarousel from "../TemplateCarousel";
import { SignIn, SignInButton, useAuth } from "@clerk/clerk-react";
import CustomAuth from "../Auth";
import { useGithubSessionFiles } from "../../hooks/useGithubSessionFiles";

export default function MainSection({
  templates,
  onSessionAction,
  isProcessing,
  sessions,
  onResetSession,
  promptCount,
  maxPrompts,
  isAuthenticated,
  currentSessionId,
  currentSessionTitle,
  onSelectSession,
  isPaid,
  gh_token,
  selectedCommitId,
  setSelectedCommitId
}: MainSectionProps & {
  currentSessionId: string | null;
  currentSessionTitle: string | null;
  onSelectSession: (sessionId: string) => void;
  isPaid: boolean;
  gh_token: string;
  selectedCommitId?: string | null;
setSelectedCommitId: (commitId: string | null) => void;

}) {
  const { userId } = useAuth();
  const [currentIndex, setCurrentIndex] = useState<null | number>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("empty");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHome, setIshome] = useState(true);

  const { templateFiles, isLoadingTemplates } = useTemplateFiles(templates);
  
  // ✅ FIX 1: Use state to force refetch trigger
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  
const {
  files: rawFiles,
  isFetching: isFetchingSessionFiles,
  refetch: refetchSessionFiles,
  commits,
  isFetchingCommits,
  fetchFilesForCommit,
} = useGithubSessionFiles(
  "skaya-organisation",
  userId || "",
  currentSessionId || "main",
  gh_token
);
    useEffect(() => {
  (window as any).commits = commits;
  (window as any).isFetchingCommits = isFetchingCommits;
  (window as any).fetchFilesForCommit = fetchFilesForCommit;
}, [commits, isFetchingCommits, fetchFilesForCommit]);

  const livePreviewFiles = useMemo(() => {
    if (!rawFiles || Object.keys(rawFiles).length === 0) return {};
    
    const transformedFiles: Record<string, { code: string; active?: boolean }> = {};
    
    Object.entries(rawFiles).forEach(([path, content]) => {
      transformedFiles[path] = {
        code: typeof content === 'string' ? content : '',
        active: path === '/src/App.tsx' || path === '/App.tsx'
      };
    });
    
    return transformedFiles;
  }, [rawFiles]);
    
  const totalItems = templates.length + 1;

  // ✅ FIX 2: Refetch when currentSessionId changes
  useEffect(() => {
    if (currentSessionId && userId) {
      console.log('🔄 Refetching session files for:', currentSessionId);
      refetchSessionFiles();
    }
  }, [currentSessionId, userId, refetchSessionFiles]);

  // ✅ FIX 3: Also refetch on manual trigger (for updates)
  useEffect(() => {
    if (refetchTrigger > 0 && currentSessionId) {
      console.log('🔄 Manual refetch trigger:', refetchTrigger);
      refetchSessionFiles();
    }
  }, [refetchTrigger, currentSessionId, refetchSessionFiles]);

  useEffect(() => {
    if (currentSessionId) {
      setViewMode("live_session");
    } else {
      setViewMode("empty");
      setCurrentIndex(null);
    }
  }, [currentSessionId]);

  useEffect(() => {
    document.body.style.overflow = isDetailsModalOpen ? "hidden" : "";
  }, [isDetailsModalOpen]);

  useEffect(() => {
    const handleFullScreenChange = () =>
      setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  const toggleFullScreen = async () => {
    setIsFullScreen(true);
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen().catch(console.error);
    } else {
      await document.exitFullscreen().catch(console.error);
    }
  };

  const goPrev = () => {
    const safeIndex = currentIndex ?? 0;
    const newIndex = (safeIndex - 1 + totalItems) % totalItems;
    if (newIndex === 0 && currentSessionId) {
      setViewMode("live_session");
    } else {
      setViewMode("templates");
      setCurrentIndex(newIndex);
    }
  };

  const goNext = () => {
    const safeIndex = currentIndex ?? 0;
    const newIndex = (safeIndex + 1) % totalItems;
    if (currentIndex === 0 && currentSessionId) {
      setViewMode("templates");
      setCurrentIndex(1);
    } else {
      setCurrentIndex(newIndex);
    }
  };

  // ✅ FIX 4: Add delay and trigger manual refetch
  const handleSaveDetails = async (data: any) => {
    await onSessionAction(data);
    
    // Wait a bit for backend to process, then trigger refetch
    setTimeout(() => {
      setRefetchTrigger(prev => prev + 1);
    }, 1000); // Adjust delay as needed
  };

  const handleResetAndRemoveMode = async () => {
    await onResetSession();
    setViewMode("empty");
    setCurrentIndex(null);
    setIshome(true);
  };

  return (
    <LayoutGroup>
      <div className="rounded-3xl h-full absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <div className="h-full absolute -inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#217eea_0%,#3521ea_25%,#f421ea_50%,#ea2121_75%,#217eea_100%)] animate-spin-slow" />
      </div>
      <div className="rounded-3xl relative font-sans text-gray-900 dark:text-white selection:text-white flex flex-col items-center justify-center mt-4">
        <main className="rounded-3xl relative z-10 w-full mx-auto flex flex-col justify-center">
          <div
            style={{
              minHeight: isFullScreen ? "auto" : "clamp(550px, 80vh, 900px)",
            }}
          >
            <InteractiveCard
              isHome={isHome}
              onOpenDetailsModal={() => setIsDetailsModalOpen(true)}
              isProcessing={isProcessing}
              sessionId={currentSessionId}
              sessionTitle={currentSessionTitle}
              currentIndex={currentIndex}
              templates={templates}
              goPrev={goPrev}
              goNext={goNext}
              templateFiles={templateFiles}
              isLoadingTemplates={isLoadingTemplates}
              livePreviewFiles={livePreviewFiles}
              isFetchingSessionFiles={isFetchingSessionFiles}
              viewMode={viewMode}
              onResetSession={handleResetAndRemoveMode}
              isFullScreen={isFullScreen}
              toggleFullScreen={toggleFullScreen}
              selectedCommitId={selectedCommitId}
  onSelectCommit={(sha) => setSelectedCommitId(sha)}
            />
          </div>

          <AnimatePresence>
            {!isFullScreen && (
              <TemplateCarousel
                templates={templates}
                sessions={sessions}
                viewMode={viewMode}
                currentIndex={currentIndex}
                currentSessionId={currentSessionId}
                onSelectTemplate={(index) => {
                  setViewMode("templates");
                  setIshome(false);
                  setCurrentIndex(index);
                }}
                onSelectSession={(sessionId) => {
                  setIshome(false);
                  onSelectSession(sessionId);
                  setViewMode("live_session");
                  setCurrentIndex(null);
                }}
                onResetSession={handleResetAndRemoveMode}
                setIsDetailsModalOpen={setIsDetailsModalOpen}
              />
            )}
          </AnimatePresence>
          <CustomAuth />
        </main>

        <AnimatePresence>
          {currentSessionId && currentIndex === null && (
            <motion.button
              layoutId="create-website-button"
              onClick={() => setIsDetailsModalOpen(true)}
              disabled={isProcessing}
              className="fixed z-50 bottom-6 right-6 sm:bottom-8 sm:right-8 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-5 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/40 disabled:opacity-60 disabled:cursor-not-allowed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {isProcessing ? (
                <PendingIcon className="w-5 h-5 animate-spin" />
              ) : (
                <LineAxisIcon className="w-5 h-5" />
              )}
              <span>
                {currentSessionId ? "Update website" : "Create your website"}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        <EditorDetailsModal
          open={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onSave={handleSaveDetails}
          initialData={{
            title: currentSessionId || currentSessionTitle || "",
          }}
          isProcessing={isProcessing}
          sessionId={currentSessionId}
          promptCount={promptCount}
          maxPrompts={maxPrompts}
          isAuthenticated={isAuthenticated}
          isPaid={isPaid}
        />
      </div>
    </LayoutGroup>
  );
}