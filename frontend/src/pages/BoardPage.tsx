import React, { useState } from 'react';
import ThreadList from '../features/board/ThreadList';
import ChatPanel from '../features/board/ChatPanel';
import PersonaManagerModal from '../features/board/PersonaManagerModal';
import threadsData from '../mocks/boardThreads.json';
import postsData from '../mocks/boardPosts.json';
import type { Thread, Post, Persona } from '../types/board';

/** モック用ペルソナデータ */
const mockPersonas: Persona[] = [
  { id: 1, name: '勇者アレン', initial: 'ア', isCharacter: true },
  { id: 2, name: '名無しの衛兵', initial: '衛', isCharacter: false },
];

export default function BoardPage() {
  const threads = threadsData as Thread[];
  const posts = postsData as Post[];

  const [activeThreadId, setActiveThreadId] = useState<number | null>(
    threads.length > 0 ? threads[0].id : null
  );
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null;
  const activePosts = posts.filter((p) => p.thread_id === activeThreadId);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 flex flex-col h-[calc(100vh-2rem)]">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-text-primary tracking-tight">掲示板エディタ</h2>
      </div>

      <div className="flex gap-8 flex-1 min-h-0">
        <ThreadList
          threads={threads}
          activeThreadId={activeThreadId}
          onSelectThread={setActiveThreadId}
        />
        <ChatPanel
          thread={activeThread}
          posts={activePosts}
          onOpenPersonaModal={() => setIsPersonaModalOpen(true)}
        />
      </div>

      <PersonaManagerModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        personas={mockPersonas}
      />
    </div>
  );
}
