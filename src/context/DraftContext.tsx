"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Draft = { title: string; body: string };
type DraftContextType = {
  drafts: Draft[];
  addDraft: (d: Draft) => void;
  updateDraft: (i: number, d: Draft) => void;
  deleteDraft: (i: number) => void;
  clearDrafts: () => void;
};

const DraftContext = createContext<DraftContextType | undefined>(undefined);

export const DraftProvider = ({ children }: { children: ReactNode }) => {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("drafts");
    if (saved) setDrafts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("drafts", JSON.stringify(drafts));
  }, [drafts]);

  const addDraft = (d: Draft) => setDrafts([...drafts, d]);
  const updateDraft = (i: number, d: Draft) => setDrafts(drafts.map((draft, idx) => idx === i ? d : draft));
  const deleteDraft = (i: number) => setDrafts(drafts.filter((_, idx) => idx !== i));
  const clearDrafts = () => setDrafts([]);

  return (
    <DraftContext.Provider value={{ drafts, addDraft, updateDraft, deleteDraft, clearDrafts }}>
      {children}
    </DraftContext.Provider>
  );
};

export const useDraft = () => {
  const ctx = useContext(DraftContext);
  if (!ctx) throw new Error("useDraft must be used inside DraftProvider");
  return ctx;
};
