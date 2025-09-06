import axios from "axios";

const token = process.env.GITHUB_TOKEN!;
const username = process.env.GITHUB_USERNAME!;
const repo = process.env.GITHUB_REPO!;
const folderPath = "src/content";

interface GitHubFile {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url: string | null;
}

export const fetchAllMarkdown = async () => {
  try {
    // 1. List all files in the folder
    const listRes = await axios.get<GitHubFile[]>(
      `https://api.github.com/repos/${username}/${repo}/contents/${folderPath}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${token}`,
        },
      }
    );

    const files = listRes.data;
    const markdownFiles = files.filter(
      (file) => file.type === "file" && file.name.endsWith(".md")
    );

    // 2. Fetch the content of each markdown file
    const markdownContents = await Promise.all(
      markdownFiles.map(async (file) => {
        if (!file.download_url) return null; // safety check
        const fileRes = await axios.get<string>(file.download_url);
        return {
          name: file.name,
          content: fileRes.data,
        };
      })
    );

    return markdownContents.filter(Boolean); // remove nulls
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("GitHub fetch error:", error.response?.status, error.response?.data);
      throw new Error(`Failed to fetch markdown files: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Failed to fetch markdown files: unknown error");
    }
  }
};
