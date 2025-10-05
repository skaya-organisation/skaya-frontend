// src/hooks/useGithubSessionFiles.ts
import { useState, useEffect, useCallback } from "react";

export function useGithubSessionFiles(
  orgName: string,
  repo: string,
  branch: string,
  token?: string
) {
  const [files, setFiles] = useState<Record<string, string>>({});
  const [isFetching, setIsFetching] = useState(false);
  const [commits, setCommits] = useState<any[]>([]);
  const [isFetchingCommits, setIsFetchingCommits] = useState(false);
  const [branchFolderDetected, setBranchFolderDetected] = useState(false);

  const headers = token ? { Authorization: `token ${token}` } : undefined;

  /** Fetch commits list */
  const fetchCommits = useCallback(async () => {
    setIsFetchingCommits(true);
    try {
      const url = `https://api.github.com/repos/${orgName}/${repo}/commits?sha=${branch}`;
      const resp = await fetch(url, { headers });
      if (!resp.ok) throw new Error("Failed to fetch commits");
      const data = await resp.json();
      setCommits(data || []);
    } catch (err) {
      console.error("fetchCommits:", err);
      setCommits([]);
    } finally {
      setIsFetchingCommits(false);
    }
  }, [orgName, repo, branch, token]);

  /** Recursive GitHub fetch */
  const fetchFilesRecursively = useCallback(
    async (ref: string, path = ""): Promise<Record<string, string>> => {
      const url = `https://api.github.com/repos/${orgName}/${repo}/contents/${path}?ref=${ref}`;
      const resp = await fetch(url, { headers });
      if (!resp.ok) throw new Error(`Failed to fetch contents at ${path}`);
      const data: any[] = await resp.json();
      const result: Record<string, string> = {};

      await Promise.all(
        data.map(async (file) => {
          if (file.type === "file") {
            const fileResp = await fetch(
              `https://api.github.com/repos/${orgName}/${repo}/contents/${file.path}?ref=${ref}`,
              { headers }
            );
            const fileData = await fileResp.json();
            if (fileData.content) {
              const decoded = atob(fileData.content.replace(/\n/g, ""));
              result[file.path] = decoded;
            }
          } else if (file.type === "dir") {
            const nested = await fetchFilesRecursively(ref, file.path);
            Object.assign(result, nested);
          }
        })
      );

      return result;
    },
    [orgName, repo, token]
  );

  /**
   * Fetch files for either branch or commit.
   * If branch files are under a subfolder = branch name,
   * commit fetches should also look inside that subfolder.
   */
  const fetchFiles = useCallback(
    async (commitSha?: string) => {
      setIsFetching(true);
      try {
        const targetRef = commitSha || branch;
        const allFiles = await fetchFilesRecursively(targetRef);

        const branchPrefix = `${branch}/`;
        const keys = Object.keys(allFiles);
        const hasBranchFolder = keys.some((k) => k.startsWith(branchPrefix));

        // Save the structure info
        if (!commitSha) setBranchFolderDetected(hasBranchFolder);

        // If fetching by branch
        if (!commitSha) {
          if (hasBranchFolder) {
            const filtered: Record<string, string> = {};
            keys.forEach((k) => {
              if (k.startsWith(branchPrefix)) {
                filtered[k.slice(branchPrefix.length)] = allFiles[k];
              }
            });
            setFiles(filtered);
            return;
          }
          setFiles(allFiles);
        } else {
          // If fetching by commit
          if (branchFolderDetected) {
            const filtered: Record<string, string> = {};
            keys.forEach((k) => {
              if (k.startsWith(branchPrefix)) {
                filtered[k.slice(branchPrefix.length)] = allFiles[k];
              }
            });
            setFiles(filtered);
          } else {
            setFiles(allFiles);
          }
        }
      } catch (err) {
        console.error("fetchFiles:", err);
        setFiles({});
      } finally {
        setIsFetching(false);
      }
    },
    [branch, fetchFilesRecursively, branchFolderDetected]
  );

  useEffect(() => {
    fetchFiles(); // branch load
    fetchCommits();
  }, [fetchFiles, fetchCommits]);

  return {
    files,
    isFetching,
    refetch: fetchFiles,
    commits,
    isFetchingCommits,
    fetchFilesForCommit: fetchFiles,
  };
}
