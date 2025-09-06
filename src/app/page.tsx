// app/page.tsx
import PostManager from "@/components/PostManager";
import { fetchAllMarkdown } from "@/lib/github";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default async function Home() {
  const files = await fetchAllMarkdown();

  const markdownFiles = files.filter(
    (file): file is { name: string; content: string } => file !== null
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Markdown Section */}
      <div className="w-full lg:w-3/4">
        <div className="prose max-w-none">
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 text-center lg:text-left">
            GitHub Markdown Content
          </h1>

          {/* Responsive grid */}
          <div className="min-w-full max-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {markdownFiles.map((file) => (
              <div
                key={file.name}
                className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-900 hover:shadow-lg transition"
              >
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 break-words">
                  {file.name}
                </h2>
                <div className="overflow-x-auto">
                  <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                    {file.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Post Manager Section */}
      <div className="w-full lg:w-1/4">
        <div className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-900">
          <PostManager />
        </div>
      </div>
    </div>
  );
}
