import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import charactersData from '../../mocks/characters.json';
import ProfileEditor from './ProfileEditor';
import StatusEditor from './StatusEditor';
import type { Character } from '../../types/character';

export default function CharacterDetail() {
  const { id } = useParams();
  const characters = charactersData as Character[];
  const character = characters.find(c => c.id === Number(id));
  const [activeTab, setActiveTab] = useState<'profile' | 'status'>('profile');

  if (!character) {
    return <div className="p-6 text-text-primary">キャラクターが見つかりません</div>;
  }

  return (
    <div className="h-full flex flex-col bg-bg-secondary">
      {/* ヘッダーエリア */}
      <div className="bg-bg-primary border-b border-border pt-4 px-6 flex flex-col gap-4">
        <Link to="/characters" className="text-text-secondary hover:text-text-primary flex items-center gap-1 w-fit transition-colors">
          <ArrowLeft size={16} />
          <span className="text-sm">一覧に戻る</span>
        </Link>
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-bold text-text-primary">{character.name}</h1>
        </div>
        
        {/* タブナビゲーション */}
        <div className="flex gap-6 mt-2">
          <button 
            className={`pb-3 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'profile' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            プロフィール詳細編集
          </button>
          <button 
            className={`pb-3 border-b-2 text-sm font-medium transition-colors ${
              activeTab === 'status' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('status')}
          >
            ステータス編集
          </button>
        </div>
      </div>
      
      {/* コンテンツエリア */}
      <div className="flex-1 overflow-auto bg-bg-primary">
        <div className="w-full max-w-6xl mx-auto p-6 md:p-8">
          {activeTab === 'profile' ? (
            <ProfileEditor character={character} />
          ) : (
            <StatusEditor character={character} />
          )}
        </div>
      </div>
    </div>
  );
}
