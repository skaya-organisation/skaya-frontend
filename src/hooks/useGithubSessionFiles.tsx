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
      setCommits([...data]); // new array to trigger React re-render
    } catch (err) {
      console.error("fetchCommits:", err);
      setCommits([]);
    } finally {
      setIsFetchingCommits(false);
    }
  }, [orgName, repo, branch, token]);

  /** Recursive file fetch */
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
              result[file.path] = atob(fileData.content.replace(/\n/g, ""));
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

  /** Fetch files for branch or commit */
  const fetchFiles = useCallback(
    async (commitSha?: string) => {
      setIsFetching(true);
      try {
        const targetRef = commitSha || branch;
        const allFiles = await fetchFilesRecursively(targetRef);

        const branchPrefix = `${branch}/`;
        const keys = Object.keys(allFiles);
        const hasBranchFolder = keys.some((k) => k.startsWith(branchPrefix));

        if (!commitSha) setBranchFolderDetected(hasBranchFolder);

        let finalFiles: Record<string, string> = {};
        if (!commitSha) {
          finalFiles = hasBranchFolder
            ? Object.fromEntries(
                keys
                  .filter((k) => k.startsWith(branchPrefix))
                  .map((k) => [k.slice(branchPrefix.length), allFiles[k]])
              )
            : allFiles;
        } else {
          finalFiles = branchFolderDetected
            ? Object.fromEntries(
                keys
                  .filter((k) => k.startsWith(branchPrefix))
                  .map((k) => [k.slice(branchPrefix.length), allFiles[k]])
              )
            : allFiles;
        }

        setFiles(finalFiles);
      } catch (err) {
        console.error("fetchFiles:", err);
        setFiles({});
      } finally {
        setIsFetching(false);
      }
    },
    [branch, fetchFilesRecursively, branchFolderDetected]
  );

  /** Refetch both files and commits */
  const refetchAll = useCallback(() => {
    fetchFiles();
    fetchCommits();
  }, [fetchFiles, fetchCommits]);

  useEffect(() => {
    refetchAll();
  }, [refetchAll]);

  return {
    files,
    isFetching,
    refetch: fetchFiles,
    commits,
    isFetchingCommits,
    fetchFilesForCommit: fetchFiles, // fetch only files for a commit
    refetchCommits: fetchCommits, // fetch only commits
    refetchAll, // fetch both files and commits
  };
}
