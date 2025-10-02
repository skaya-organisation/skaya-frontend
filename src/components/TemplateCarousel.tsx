import React from "react";
import { motion } from "framer-motion";
import { Template, ViewMode } from "../utils/types";
import Card from "./Cards/HomeTemplatesCard";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import TemplateSkeletonCard from "./ui/TemplateSkeletonCard";

interface TemplateCarouselProps {
  templates: Template[];
  sessions: string[];
  viewMode: ViewMode;
  currentIndex: number | null;
  currentSessionId: string | null;
  onSelectTemplate: (index: number) => void;
  onSelectSession: (sessionId: string) => void;
  onResetSession: () => void;
  isLoading?: boolean;
  setIsDetailsModalOpen: (isOpen: boolean) => void;
}

const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  isLoading,
  templates,
  sessions,
  viewMode,
  currentIndex,
  currentSessionId,
  onSelectTemplate,
  onSelectSession,
  onResetSession,
  setIsDetailsModalOpen,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full px-4 mt-12"
    >
      {/* ✅ Sessions */}
      <h3 className="text-lg sm:text-xl font-bold mb-4">Your Website</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {/* ➕ Create New Website */}
        <Card
          title="Create New Website"
          description="Start from scratch and bring your ideas to life"
          icon={<AddToQueueIcon className="w-8 h-8 text-indigo-500" />}
          variant="dashed"
          onClick={() => {
            onResetSession();
            setIsDetailsModalOpen(true);
          }}
        />

        {/* 🟢 Existing Sessions */}
        {sessions.map((id) => (
          <Card
            key={id}
            title={id}
            showLiveBadge
            isActive={id === currentSessionId}
            onClick={() => {
              onSelectSession(id)
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ))}
      </div>

      {/* ✅ Templates */}
      <h3 className="text-lg sm:text-xl font-bold mb-4">Choose a Template</h3>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <TemplateSkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
          {templates.map((t, i) => (
            <Card
              key={t.id}
              title={t.title}
              description={t.description}
              isActive={viewMode === "templates" && currentIndex === i + 1}
              onClick={() => {
                onSelectTemplate(i + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TemplateCarousel;
