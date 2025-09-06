"use client"

import { DraftContext } from "@/context/DraftContext";
import { useContext, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function PostForm() {
  const context = useContext(DraftContext);
  if (!context) throw new Error("PostForm must be used within DraftProvider");
  const { addDraft } = context;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    addDraft(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg rounded-xl border border-gray-200"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create New Draft</h2>
      
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="mb-3"
      />
      
      <Textarea
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
        rows={6}
        required
        className="mb-3"
      />
      
      <Button type="submit">Add Draft</Button>
    </form>
  );
}
