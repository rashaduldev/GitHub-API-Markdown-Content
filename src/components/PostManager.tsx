"use client";
import { useContext } from "react";
import PostForm from "./PostForm";
import DraftList from "./DraftList";
import { DraftContext } from "@/context/DraftContext";
import { Button } from "./ui/button";

export default function PostManager() {
  const context = useContext(DraftContext);
  if (!context) throw new Error("PostManager must be used within DraftProvider");
  const { drafts, clearDrafts } = context;

  const publishAll = async () => {
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drafts }),
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        alert("All drafts published!");
        clearDrafts();
      } else {
        alert(`Failed: ${data.message || "Unknown error"}`);
        console.error("Publish error:", data);
      }
    } catch (err) {
      alert("Something went wrong. Check console for details.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Post Manager
      </h1>
      <PostForm />
      <DraftList />
      {drafts.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={publishAll}
          >
            Publish All ({drafts.length})
          </Button>
        </div>
      )}
    </div>
  );
}
