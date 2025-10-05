import { SandpackFiles } from "@codesandbox/sandpack-react";

// src/utils/types.ts
export interface Template {
  id: string;
  title: string;
  description: string;
}

export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileItem[];
}

export interface FolderStructureResponse {
  success: boolean;
  data: FileItem[];
  error?: string;
}


export interface TemplateFiles {
  files: SandpackFiles;
  dependencies?: { [key: string]: string };
}

export type ViewMode = "empty" | 'templates' | 'live_session';
export type ActiveTab = 'preview' | 'code' | 'history';

export interface MainSectionProps {
  templates: Template[];
  onSessionAction: (
    details: {
      title: string;
      description: string;
      category: string;
      tags: string[];
      theme: string;
      template: string;
    },
    files?: File[],
  ) => Promise<void>;
  isProcessing: boolean;
  sessions: string[];
  onResetSession: () => void;
  promptCount: number;
  maxPrompts: number;
   isAuthenticated: boolean; // New prop to indicate authentication status

}

// Add new props for EditorDetailsModal
export interface EditorDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (details: {
    title: string;
    description: string;
    category: string;
    tags: string[];
    theme: string;
    template:string
  }) => Promise<void>;
  initialData?: {
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
  };
  isProcessing: boolean;
  sessionId: string | null;
  promptCount: number;
  maxPrompts: number;
  isAuthenticated: boolean; // New prop to indicate authentication status
  isPaid:boolean
}