// src/components/InteractiveCard.tsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Template,
  TemplateFiles,
  SandpackFiles,
  ActiveTab,
  ViewMode,
} from "../utils/types";
import CodeSandboxEditor from "./CodeSandBox";
import TabButton from "./ui/TabButton";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import PendingIcon from "@mui/icons-material/Pending";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CodeIcon from "@mui/icons-material/Code";
import { useNavigate } from "rspress/runtime";
// Props Interface
interface InteractiveCardProps {
  isHome: boolean;
  onOpenDetailsModal: () => void;
  isProcessing: boolean;
  sessionId: string | null;
  currentIndex: number | null;
  templates: Template[];
  goPrev: () => void;
  goNext: () => void;
  templateFiles: { [key: string]: TemplateFiles } | null;
  isLoadingTemplates: boolean;
  livePreviewFiles: SandpackFiles | null;
  isFetchingSessionFiles: boolean;
  sessionTitle: string | null;
  viewMode: ViewMode;
  onResetSession: () => void;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  isHome,
  onOpenDetailsModal,
  isProcessing,
  currentIndex,
  templates,
  goPrev,
  goNext,
  templateFiles,
  isLoadingTemplates,
  livePreviewFiles,
  isFetchingSessionFiles,
  sessionTitle,
  viewMode,
  onResetSession,
  isFullScreen,
  toggleFullScreen,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("preview");
  const navigate = useNavigate();
  useEffect(() => {
    if (isFullScreen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isFullScreen]);

  const template =
    currentIndex !== null ? templates[currentIndex - 1] : undefined;
  const currentTemplateFiles = template
    ? templateFiles?.[template.id]
    : undefined;

  // Helper to format files for StackBlitz SDK
  const formattedFiles = useMemo(() => {
    if (!livePreviewFiles) return null;
    return Object.fromEntries(
      Object.entries(livePreviewFiles).map(([path, data]) => [
        path.replace(/^\//, ""),
        data.code,
      ])
    );
  }, [livePreviewFiles]);

  // Format template files
  const formattedTemplateFiles = useMemo(() => {
    if (!currentTemplateFiles?.files) return null;
    return Object.fromEntries(
      Object.entries(currentTemplateFiles.files).map(([path, data]) => [
        path.replace(/^\//, ""),
        data.code,
      ])
    );
  }, [currentTemplateFiles]);

  const renderContent = () => {
    if (viewMode === "live_session") {
      if (isFetchingSessionFiles || !livePreviewFiles) {
        return <LoadingView message="Loading Your Live Session..." />;
      }
      return (
        <CodeSandboxEditor
          files={formattedFiles || {}}
          title={sessionTitle || "Live Session"}
          description="A live editing session."
          view={activeTab === "code" ? "editor" : "preview"}
          height={isFullScreen ? "85vh" : "75vh"}
        />
      );
    }

    if (!isHome && currentTemplateFiles)
      return (
        <CodeSandboxEditor
          files={formattedTemplateFiles || {}}
          dependencies={currentTemplateFiles.dependencies}
          title={template?.title || "Template"}
          description={template?.description || ""}
          view={activeTab === "code" ? "editor" : "preview"}
          height={isFullScreen ? "85vh" : "75vh"}
        />
      );

    if (!isHome && isLoadingTemplates) {
      return <LoadingView message="Loading Template Preview..." />;
    }
    return (
      <HomeView
        onOpenDetailsModal={onOpenDetailsModal}
        isProcessing={isProcessing}
        navigate={navigate}
      />
    );
  };

  const cardContent = (
    <div className=" rounded-3xl overflow-hidden group">
    
      <EditorHeader
        title={
          viewMode === "live_session"
            ? sessionTitle || "Live Session"
            : template?.title || ""
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleFullScreen={toggleFullScreen}
        isFullScreen={isFullScreen}
        showReset={viewMode === "live_session"}
        onResetSession={onResetSession}
        isHome={isHome}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode === "live_session" ? "live-session" : currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full ${isFullScreen ? "h-[100vh]" : "h-[75vh]"}`} // Adjust height to account for header
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      {viewMode === "templates" && (
        <>
          <NavButton direction="left" onClick={goPrev} />
          <NavButton direction="right" onClick={goNext} />
        </>
      )}
    </div>
  );

  return (
    <motion.div
      layout
      className={
        isFullScreen
          ? "fixed pt-[10vh] inset-0 z-[99999] bg-black/50 backdrop-blur-md"
          : "relative w-full h-full"
      }
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {cardContent}
    </motion.div>
  );
};

// --- Sub-Components for Cleaner Rendering ---

const LoadingView = ({ message }: { message: string }) => (
  <div className="w-full h-full flex flex-col items-center justify-center text-center gap-3 text-gray-700 dark:text-gray-300">
    <PendingIcon className="animate-spin w-8 h-8 text-indigo-500 dark:text-indigo-400" />
    <span className="text-lg">{message}</span>
  </div>
);

const HomeView = ({ onOpenDetailsModal, isProcessing, navigate }: any) => (
  <div className="w-full h-full flex items-center justify-center text-center">
    <div className="z-10 flex flex-col items-center gap-12 md:gap-16">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl flex items-center gap-2 justify-center md:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
      >
        <LineAxisIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
        Build with Skaya
      </motion.h2>
      <img src="/logo.png" alt="Skaya Logo" className="w-32 h-32 md:w-40 md:h-40" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center"
      >
        <p
          className="text-base md:text-lg  max-w-xl mx-auto leading-relaxed px-6"
          style={{}}
        >
          At Skaya, we're building the future of real-time AI communication.
          Browse our templates or start a new website from scratch.
        </p>
        <div className="flex flex-col md:flex-row gap-12 mt-6">
          {/* Primary Button - Create Website */}
          <motion.button
            layoutId="create-website-button"
            onClick={onOpenDetailsModal}
            disabled={isProcessing}
            className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 
              hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 px-6 
              rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 
              shadow-lg shadow-indigo-600/40 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
          >
            🚀 Create Your Website
          </motion.button>

          {/* Secondary Button - Read Docs */}
          <motion.button
            layoutId="read-docs-button"
            onClick={() => navigate("/guide/getting-started")}
            disabled={isProcessing}
            className="flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 
              hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-3 px-6 
              rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 
              shadow-lg shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
          >
            📘 Read The Docs
          </motion.button>
        </div>
      </motion.div>
    </div>
  </div>
);

const EditorHeader = ({
  title,
  activeTab,
  setActiveTab,
  toggleFullScreen,
  isFullScreen,
  showReset,
  onResetSession,
  isHome,
}: any) => (
  <header className="flex-shrink-0 flex items-center justify-between border-b border-gray-200 dark:border-white/10 px-4 py-1 h-[48px]">
    <h3
      className=" font-semibold items-center py-auto text-2xl truncate pr-4 "
      style={{}}
    >
      {title}
    </h3>
    {!isHome && (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 p-1  rounded-lg">
          <TabButton
            label="Preview"
            icon={<VisibilityIcon />}
            isActive={activeTab === "preview"}
            onClick={() => setActiveTab("preview")}
          />
          <TabButton
            label="Code"
            icon={<CodeIcon />}
            isActive={activeTab === "code"}
            onClick={() => setActiveTab("code")}
          />
          <TabButton
            label=""
            icon={isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            isActive={activeTab === ""}
            onClick={toggleFullScreen}
          />
          {showReset && (
            <TabButton
              label=""
              icon={<DeleteOutlineIcon />}
              isActive={activeTab === ""}
              onClick={onResetSession}
            />
          )}
        </div>
      </div>
    )}
  </header>
);

const NavButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-30 p-2 bg-neutral-300/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-full text-gray-800 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition-all ${
      direction === "left" ? "left-2 sm:left-4" : "right-2 sm:right-4"
    }`}
    aria-label={direction === "left" ? "Previous" : "Next"}
  >
    {direction === "left" ? (
      <ChevronLeftIcon className="w-6 h-6" />
    ) : (
      <ChevronRightIcon className="w-6 h-6" />
    )}
  </button>
);

export default InteractiveCard;
