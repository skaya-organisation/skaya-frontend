// src/services/githubAPI.ts
import { gh_token } from '../components/HomeCard/Index';
import { GITHUB_REPO } from '../utils/constants';
import { Template, TemplateFiles } from '../utils/types';

export const fetchAllTemplateFiles = async (templates: Template[]): Promise<{ [key: string]: TemplateFiles }> => {
  const allFilesData = await Promise.all(
    templates.map(async (template) => {
      const treeRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/git/trees/${template.id}?recursive=1`,
        { headers: { Authorization: `token ${gh_token}` } },
      );
      if (!treeRes.ok) throw new Error(`Failed to fetch tree for ${template.id}`);
      
      const treeData = await treeRes.json();
      const fileEntries = treeData.tree.filter((item: { type: string }) => item.type === 'blob');

      const files: TemplateFiles['files'] = {};
      let dependencies: TemplateFiles['dependencies'] = {};

      await Promise.all(
        fileEntries.map(async (file: { path: string; url: string }) => {
          const res = await fetch(`https://raw.githubusercontent.com/${GITHUB_REPO}/${template.id}/${file.path}`);
          if (res.ok) {
            const code = await res.text();
            files[`/${file.path}`] = { code, hidden: false };
            if (file.path === 'package.json') {
              const pkg = JSON.parse(code);
              dependencies = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
            }
          }
        }),
      );
      return { id: template.id, files, dependencies };
    }),
  );

  return allFilesData.reduce((acc: { [key: string]: any }, data) => {
    acc[data.id] = { files: data.files, dependencies: data.dependencies };
    return acc;
  }, {});
};