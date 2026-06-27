import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import charactersData from '../../mocks/characters.json';
import profileAttributes from '../../mocks/profileAttributes.json';
import type { Character } from '../../types/character';
import type { ProfileAttribute } from '../../types/library';

export default function CharacterList() {
  const characters = charactersData as Character[];
  const attrs = profileAttributes as ProfileAttribute[];

  const attrMap = attrs.reduce((acc, attr) => {
    acc[attr.key] = attr;
    return acc;
  }, {} as Record<string, ProfileAttribute>);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8">
      {/* ヘッダーエリア */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-text-primary tracking-tight">Characters</h2>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          <Plus size={18} /> Add New Character
        </button>
      </div>

      {/* グリッドエリア */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {characters.map(character => (
          <Link 
            to={`/characters/${character.id}`}
            key={character.id} 
            className="block max-w-sm w-full bg-bg-primary rounded-xl border border-border p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex flex-col gap-4">
              {/* カードヘッダー（名前とアクション） */}
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  {/* アバターのプレースホルダー */}
                  <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary font-bold text-lg">
                    {character.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">{character.name}</h3>
                  </div>
                </div>
                <div className="flex gap-2 text-text-secondary">
                  <div className="p-1 hover:text-accent transition-colors"><Edit2 size={16} /></div>
                  <div className="p-1 hover:text-danger transition-colors"><Trash2 size={16} /></div>
                </div>
              </div>

              {/* プロフィール項目リスト（タグバッジ風） */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(character.profile_data || {}).map(([key, value]) => {
                  const attrDef = attrMap[key];
                  const resolvedAttributeName = attrDef ? attrDef.name : key;
                  
                  let attributeValue = String(value);
                  if (attrDef && attrDef.type === 'tag' && attrDef.tags) {
                    const tag = attrDef.tags.find((t) => t.id === Number(value));
                    if (tag) attributeValue = tag.name;
                  }

                  return (
                    <span key={key} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-bg-secondary text-text-primary border border-border">
                      <span className="text-text-secondary mr-1">{resolvedAttributeName}:</span> {attributeValue}
                    </span>
                  );
                })}
              </div>

              {/* プロフィール項目（長文、説明など） */}
              <div className="text-sm text-text-primary line-clamp-3 mt-1">
                {/* 説明文などに該当する属性値を表示 */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
