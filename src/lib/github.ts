import axios from "axios";

const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME;
const repo = process.env.GITHUB_REPO;

export const fetchMarkdown = async () => {
//   const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}?ref=main`;
  const url = `https://github.com/${username}/${repo}/blob/main/src/content/hello.md`;

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
