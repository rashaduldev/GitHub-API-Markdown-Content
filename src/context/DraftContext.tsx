"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

export interface Draft {
  id: string;
  title: string;
  body: string;
}

interface DraftContextType {
  drafts: Draft[];
  addDraft: (title: string, body: string) => void;
  updateDraft: (id: string, updated: { title: string; body: string }) => void; // ✅ updated type
  deleteDraft: (id: string) => void;
  clearDrafts: () => void;
}

export const DraftContext = createContext<DraftContextType | undefined>(
  undefined
);

export const DraftProvider = ({ children }: { children: ReactNode }) => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem("drafts");
    if (stored) setDrafts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const addDraft = (title: string, body: string) => {
    const newDraft: Draft = { id: Date.now().toString(), title, body };
    setDrafts([...drafts, newDraft]);
  };

  const updateDraft = (id: string, updated: { title: string; body: string }) => {
    setDrafts(drafts.map(d => (d.id === id ? { ...d, ...updated } : d)));
  };

  const deleteDraft = (id: string) => {
    setDrafts(drafts.filter(d => d.id !== id));
  };

  const clearDrafts = () => {
    setDrafts([]);
  };

  return (
    <DraftContext.Provider
      value={{ drafts, addDraft, updateDraft, deleteDraft, clearDrafts }}
    >
      {children}
    </DraftContext.Provider>
  );
};
