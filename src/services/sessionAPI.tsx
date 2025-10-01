// src/services/sessionAPI.ts
import { backendServer } from '../components/HomeCard/Index';
import { FileItem, FolderStructureResponse, SandpackFiles } from '../utils/types';

export const fetchFileContent = async (
  sessionId: string,
  path: string,
  accessToken:string
): Promise<[string, { code: string }]> => {
  try {
    const response = await fetch(
      `${backendServer}/Skaya/get-file/${sessionId}?path=${encodeURIComponent(path)}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      
      },
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const content = await response.text();
    return [path, { code: content }];
  } catch (err: any) {
    return [path, { code: `// Error loading file: ${err.message}` }];
  }
};

const traverseAndFetch = (
  items: FileItem[],
  sessionId: string,
  prefix = '',
  accessToken:string,
): Promise<[string, { code: string }]>[][] => {
  return items.map((item) => {
    const sandpackPath = `${prefix}/${item.name}`;
    if (item.type === 'directory' && item.children) {
      return traverseAndFetch(item.children, sessionId, sandpackPath,accessToken).flat();
    } else if (item.type === 'file') {
      return [
        fetchFileContent(sessionId, item.path,accessToken).then(([_, content]) => [
          sandpackPath,
          content,
          
        ]),
      ];
    }
    return [];
  });
};

export const fetchAllSessionFiles = async (
  sessionId: string,
  accessToken:string
): Promise<SandpackFiles> => {
  const response = await fetch(
    `${backendServer}/Skaya/folder-structure/${sessionId}`,
   {
        headers: { Authorization: `Bearer ${accessToken}` },
      
      },
  );

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data: FolderStructureResponse = await response.json();
  if (!data.success || !data.data) {
    throw new Error(data.error || 'Failed to fetch folder structure');
  }

  const root = data.data.find((item) => item.type === 'directory');
  const structure = root?.children ? root.children : data.data;

  const filePromises = traverseAndFetch(structure, sessionId,"",accessToken).flat();
  const filesArray = await Promise.all(filePromises);

  return Object.fromEntries(filesArray);
};
