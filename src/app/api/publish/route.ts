import { NextRequest, NextResponse } from "next/server";

interface Draft {
  title: string;
  body: string;
}

export async function POST(req: NextRequest) {
    console.log(req);
    
  try {
    const { drafts }: { drafts: Draft[] } = await req.json();

    if (!drafts || drafts.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No drafts to publish",
      });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_USERNAME;
    const repo = process.env.GITHUB_REPO;
    const branch = process.env.GITHUB_BRANCH || "main";

    if (!githubToken || !owner || !repo) {
      return NextResponse.json({
        success: false,
        message: "GitHub environment variables not properly set",
      });
    }

    for (const draft of drafts) {
      const safeTitle = draft.title.replace(/[^a-z0-9]/gi, "-").toLowerCase();
      const fileName = `${Date.now()}-${safeTitle}.md`;
      const filePath = `src/content/${fileName}`;

      const content = `---
title: "${draft.title}"
date: "${new Date().toISOString()}"
---

${draft.body}
`;

      const base64Content = Buffer.from(content).toString("base64");

      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `chore: publish draft "${draft.title}"`,
            content: base64Content,
            branch,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        console.error("GitHub API error:", err);
        return NextResponse.json({
          success: false,
          message: err.message || "GitHub API failed",
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ success: false, message: err.message });
    }
    return NextResponse.json({ success: false, message: "Unexpected error" });
  }
}
