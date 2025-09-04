import axios, { AxiosError } from "axios";

const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;

export const fetchMarkdown = async (path: string) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=main`;

  try {
    const response = await axios.get<string>(url, {
      headers: {
        Accept: "application/vnd.github.v3.raw",
        Authorization: `token ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("GitHub fetch error:", error.response?.status, error.response?.data);
      throw new Error(`Failed to fetch markdown: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Failed to fetch markdown: unknown error");
    }
  }
};
