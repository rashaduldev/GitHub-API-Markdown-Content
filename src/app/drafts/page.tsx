"use client";
import { useDraft } from "@/context/DraftContext";
import { useState } from "react";
import { publishDraft } from "@/lib/github";
import { useSpring, animated } from "react-spring";

export default function Drafts() {
  const { drafts, addDraft, updateDraft, deleteDraft, clearDrafts } = useDraft();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  const handleAdd = () => {
    if (!title || !body) return;
    addDraft({ title, body });
    setTitle(""); setBody("");
  };

  const handlePublishAll = async () => {
    for (const draft of drafts) await publishDraft(draft);
    alert("Published all drafts!");
    clearDrafts();
  };

  return (
    <animated.div style={fade} className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create Draft</h1>
      <input className="border p-2 w-full mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea className="border p-2 w-full mb-2" placeholder="Body" value={body} onChange={e => setBody(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2 mr-2" onClick={handleAdd}>Add Draft</button>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handlePublishAll}>Publish All</button>

      <h2 className="text-lg font-semibold mt-6">Drafts</h2>
      <ul>
        {drafts.map((d, i) => (
          <li key={i} className="border p-2 my-2">
            <h3 className="font-bold">{d.title}</h3>
            <p>{d.body}</p>
            <button className="text-red-500 mr-2" onClick={() => deleteDraft(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </animated.div>
  );
}
