import React, { useState } from 'react';
import JobTab from '../features/library/JobTab';
import SkillTab from '../features/library/SkillTab';
import EquipmentTab from '../features/library/EquipmentTab';
import GlossaryTab from '../features/library/GlossaryTab';
import StatusAttributeTab from '../features/library/StatusAttributeTab';
import ProfileAttributeTab from '../features/library/ProfileAttributeTab';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('jobs');

  const tabs = [
    { id: 'jobs', label: 'ジョブ管理' },
    { id: 'skills', label: 'スキル管理' },
    { id: 'equipments', label: '装備品管理' },
    { id: 'glossary', label: '用語集管理' },
    { id: 'status_attributes', label: 'ステータス属性' },
    { id: 'profile_attributes', label: 'プロフィール属性' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 flex flex-col h-[calc(100vh-2rem)]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-text-primary tracking-tight">設定資料ライブラリ</h2>
      </div>

      {/* タブナビゲーション */}
      <div className="flex gap-2 border-b border-border mb-6 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`px-5 py-2.5 border-b-2 font-bold whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'border-accent text-accent' 
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* メインコンテンツエリア (2カラム: 左一覧、右編集) */}
      {activeTab === 'jobs' && <JobTab />}
      {activeTab === 'skills' && <SkillTab />}
      {activeTab === 'equipments' && <EquipmentTab />}
      {activeTab === 'glossary' && <GlossaryTab />}
      {activeTab === 'status_attributes' && <StatusAttributeTab />}
      {activeTab === 'profile_attributes' && <ProfileAttributeTab />}
    </div>
  );
}
