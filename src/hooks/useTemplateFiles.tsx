// src/hooks/useTemplateFiles.ts
import { useState, useEffect } from 'react';
import { Template, TemplateFiles } from '../utils/types';
import { fetchAllTemplateFiles as fetchFromAPI } from '../services/githubAPI';

export const useTemplateFiles = (templates: Template[]) => {
  const [templateFiles, setTemplateFiles] = useState<{ [key: string]: TemplateFiles } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!templates || templates.length === 0) {
      setIsLoading(false);
      return;
    }

    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        const filesById = await fetchFromAPI(templates);
        setTemplateFiles(filesById);
      } catch (error) {
        console.error('Failed to fetch template files:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [templates]);

  return { templateFiles, isLoadingTemplates: isLoading };
};