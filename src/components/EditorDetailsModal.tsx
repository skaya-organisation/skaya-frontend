import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_OPTIONS, THEME_OPTIONS } from "../utils/constants";
import { EditorDetailsModalProps } from "../utils/types";
import { useClerk } from "@clerk/clerk-react";
import StorageIcon from "@mui/icons-material/Storage";
import CloseIcon from "@mui/icons-material/Close";
import PendingIcon from "@mui/icons-material/Pending";
import SaveIcon from "@mui/icons-material/Save";
import HelpIcon from "@mui/icons-material/Help";
import { Tooltip } from "@mui/material";

const LOCAL_STORAGE_KEY = "editor_unsaved_data";
export const TEMPLATE_OPTIONS = ["react", "nextjs",];

export default function EditorDetailsModal({
  open,
  initialData = {},
  onSave,
  onClose,
  isProcessing,
  sessionId,
  promptCount,
  maxPrompts,
  isAuthenticated,
  isPaid,
}: EditorDetailsModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [themeOption, setThemeOption] = useState(THEME_OPTIONS[0]);
  const [customTheme, setCustomTheme] = useState("");
  const [errors, setErrors] = useState({ title: false, description: false });
  const { openSignIn } = useClerk();
  const [template, setTemplate] = useState(TEMPLATE_OPTIONS[0]);

  useEffect(() => {
    if (!open) return;
    if (sessionId) {
      // update mode, template won't matter
      return;
    }
    setTemplate(TEMPLATE_OPTIONS[0]);
  }, [open, sessionId]);

  // ✅ Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTitle(parsed.title || "");
      setDescription(parsed.description || "");
      setCategory(parsed.category || CATEGORY_OPTIONS[0]);
      setTags(parsed.tags || []);
      setThemeOption(parsed.themeOption || THEME_OPTIONS[0]);
      setCustomTheme(parsed.customTheme || "");
    } else {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setCategory(initialData.category || CATEGORY_OPTIONS[0]);
      setTags(initialData.tags ? [...initialData.tags] : []);
      setThemeOption(THEME_OPTIONS[0]);
      setCustomTheme("");
    }
    setErrors({ title: false, description: false });
  }, [open]);

  const addTag = useCallback(() => {
    const val = tagInput.trim();
    if (!val || tags.includes(val)) {
      setTagInput("");
      return;
    }
    setTags((t) => [...t, val]);
    setTagInput("");
  }, [tagInput, tags]);

  const removeTag = (tag: string) => {
    setTags((t) => t.filter((x) => x !== tag));
  };

  const handleSave = async () => {
    if (isProcessing) return;

    if (hasReachedLimit && !isPaid) {
      window.location.href = "/pricing";
      return;
    }
    const isTitleEmpty = !title.trim();
    const isDescriptionEmpty = !description.trim();
    setErrors({ title: isTitleEmpty, description: isDescriptionEmpty });

    if (isTitleEmpty || isDescriptionEmpty) return;

    const finalTheme =
      themeOption === "Custom"
        ? customTheme.trim() || "Default Custom Theme"
        : themeOption;

    try {
      await onSave({
        title: title.trim(),
        description: description.trim(),
        category,
        tags,
        theme: finalTheme,
        template,
      });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      onClose();
    } catch (error) {
      // keep in storage if fail
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleSave, onClose]);

  const hasReachedLimit = promptCount >= maxPrompts;

  const handleActionClick = async () => {
    if (!isAuthenticated) {
      const dataToSave = {
        title: title.trim(),
        description: description.trim(),
        category,
        tags,
        themeOption,
        customTheme,
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));

      await openSignIn({ redirectUrl: window.location.href });
      if (isAuthenticated) await handleSave();
    } else {
      await handleSave();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 "
            onClick={onClose}

          >
            <div
              className="w-full max-w-[720px] rounded-2xl p-[1px] bg-white dark:bg-gray-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="rounded-2xl p-6 shadow-2xl"
                style={{
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                     
                    >
                      <StorageIcon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {sessionId
                        ? `Update: ${sessionId}`
                        : "Create New Website"}
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                    {/* Title */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-2">
                        Website Title{" "}
                        {errors.title && (
                          <span style={{ }}>
                            *
                          </span>
                        )}
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Your website name"
                        className="w-full rounded-xl px-4 py-3 outline-none border transition"
                      />
                    </div>

                    {/* Category */}
                    {!sessionId && (
                      <div className="flex flex-col">
                        <label className="text-sm font-medium mb-2">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full rounded-xl px-4 py-3 outline-none"
                     
                        >
                          {CATEGORY_OPTIONS.map((c) => (
                            <option
                              key={c}
                              value={c}
                          
                            >
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Description{" "}
                      {errors.description && (
                        <span 
                        >*</span>
                      )}
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your website"
                      rows={3}
                      className="w-full rounded-xl px-2 py-2 outline-none border resize-none transition"
                 
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Add Tags
                    </label>
                    <div className="flex flex-row sm:flex-row gap-2 w-full">
                      <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        placeholder="Add tag and press Enter (Optional)"
                        className="flex-1 rounded-xl px-4 py-3 outline-none border"
                    
                      />
                      <button
                        onClick={addTag}
                        className="px-6 py-3 rounded-xl font-medium transition w-1/3  max-w-[120px] bg-blue-600 text-white"
                        style={{
                        }}
                      >
                        Add
                      </button>
                    </div>

                    {tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <motion.div
                            key={tag}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                            style={{
                            }}
                          >
                            <span
                              className="text-sm"
                            >
                              {tag}
                            </span>
                            <button
                              className="p-0.5 rounded-full"
                              onClick={() => removeTag(tag)}
                            >
                              <CloseIcon className="w-3 h-3" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                  {!sessionId && (
                    <div className="flex flex-col">
                      <label className="text-sm font-medium mb-2">
                        Template
                      </label>
                      <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 outline-none"
                        style={{
                        }}
                      >
                        {TEMPLATE_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2 mt-4"
                >
                  {/* Progress (only show if you want free usage visible) */}
                  {!isPaid && (
                    <div className="flex-grow relative group">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <span
                            className="text-sm font-medium"
                          >
                            Free Prompts Included
                          </span>
                          <Tooltip
                            title={`Each website can use up to ${maxPrompts} free prompts. You have used ${promptCount} so far.`}
                          >
                              <HelpIcon
                                className="w-4 h-4 cursor-help"
                              />
                          </Tooltip>
                        </div>
                        <span
                          className="text-sm font-medium"
                        >
                          {promptCount} / {maxPrompts} Used
                        </span>
                      </div>
                      <div
                        className="w-full rounded-full border h-2.5"
                      >
                        <div
                          className="h-2.5 rounded-full transition-all duration-500 bg-blue-600"
                          style={{
                            width: `${(promptCount / maxPrompts) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action */}
                  <motion.button
                    disabled={isProcessing}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleActionClick}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed w-full md:w-auto bg-blue-600 text-white"
                   
                  >
                    {isProcessing ? (
                      <>
                        <PendingIcon className="w-4 h-4 animate-spin" />
                        {sessionId
                          ? "Updating Website..."
                          : "Creating Website..."}
                      </>
                    ) : hasReachedLimit && !isPaid ? (
                      <>
                        <SaveIcon className="w-4 h-4" />
                        Upgrade Plan
                      </>
                    ) : (
                      <>
                        <SaveIcon className="w-4 h-4" />
                        {sessionId ? "Update Website" : "Create Website"}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
