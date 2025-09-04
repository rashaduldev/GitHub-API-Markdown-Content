import { fetchMarkdown } from "@/lib/github";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

export default async function Home() {
  const content = await fetchMarkdown("content/hello.md");

  return (
    <div className="prose mx-auto p-4">
      <h1 className="text-2xl font-bold">GitHub Markdown Content</h1>
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
