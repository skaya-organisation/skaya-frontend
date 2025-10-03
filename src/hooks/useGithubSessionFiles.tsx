import { useState, useEffect, useCallback } from "react";

export function useGithubSessionFiles(
  orgName: string,
  repo: string,
  branch: string,
  token?: string
) {
  const [files, setFiles] = useState<Record<string, string>>({});
  const [isFetching, setIsFetching] = useState(false);

  const fetchFilesRecursively = async (path = ""): Promise<Record<string, string>> => {
    const url = `https://api.github.com/repos/${orgName}/${repo}/contents/${path}?ref=${branch}`;
    const response = await fetch(url, {
      headers: token ? { Authorization: `token ${token}` } : undefined,
    });

    if (!response.ok) throw new Error(`Failed to fetch GitHub contents at ${path}`);

    const data: any[] = await response.json();
    const result: Record<string, string> = {};

    await Promise.all(
      data.map(async (file) => {
        if (file.type === "file") {
          const fileResp = await fetch(`https://api.github.com/repos/${orgName}/${repo}/contents/${file.path}?ref=${branch}`, {
            headers: token ? { Authorization: `token ${token}` } : undefined,
          });
          const fileData = await fileResp.json();
          if (fileData.content) {
            const decoded = atob(fileData.content.replace(/\n/g, ""));
            result[file.path] = decoded;
          }
        } else if (file.type === "dir") {
          const nestedFiles = await fetchFilesRecursively(file.path);
          Object.assign(result, nestedFiles);
        }
      })
    );

    return result;
  };

  const fetchFiles = useCallback(async () => {
    setIsFetching(true);
    try {
      const allFiles = await fetchFilesRecursively();

      // Filter files that start with `branch/` and remove that prefix
      const filtered: Record<string, string> = {};
      Object.keys(allFiles).forEach((key) => {
        if (key.startsWith(`${branch}/`)) {
          filtered[key.slice(branch.length + 1)] = allFiles[key];
        }
      });

      setFiles(filtered);
    } catch (err) {
      console.error(err);
      setFiles({});
    } finally {
      setIsFetching(false);
    }
  }, [orgName, repo, branch, token]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { files, isFetching, refetch: fetchFiles };
}
