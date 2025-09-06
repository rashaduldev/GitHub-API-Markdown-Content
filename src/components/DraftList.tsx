"use client";
import { DraftContext } from "@/context/DraftContext";
import { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

export default function DraftList() {
  const context = useContext(DraftContext);
  if (!context) throw new Error("DraftList must be used within DraftProvider");

  const { drafts, deleteDraft, updateDraft } = context;

  // local editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  if (drafts.length === 0) {
    return (
      <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 mt-6 text-center text-gray-500">
        No drafts yet. Start by creating one above!
      </div>
    );
  }

  const startEditing = (id: string, title: string, body: string) => {
    setEditingId(id);
    setEditTitle(title);
    setEditBody(body);
  };

  const handleUpdate = (id: string) => {
    updateDraft(id, { title: editTitle, body: editBody });
    setEditingId(null);
    setEditTitle("");
    setEditBody("");
  };

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Drafts</h2>
      <div className="gap-5">
        {drafts.map((d) => (
          <div
            key={d.id}
            className="border p-3 rounded-2xl"
          >
            {editingId === d.id ? (
              <div>
                <input
                  className="border p-2 w-full mb-2"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="border p-2 w-full mb-2"
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate(d.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{d.title}</h3>
                  <p className="text-gray-700 mt-2 whitespace-pre-wrap">{d.body}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(d.id, d.title, d.body)}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-2xl cursor-pointer"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => deleteDraft(d.id)}
                    className="text-red-600 hover:text-red-800 font-semibold text-2xl cursor-pointer"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
