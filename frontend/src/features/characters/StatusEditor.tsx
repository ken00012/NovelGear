import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import FormField from '../../components/FormField';
import statusAttributes from '../../mocks/statusAttributes.json';
import jobs from '../../mocks/jobs.json';
import skillsData from '../../mocks/skills.json';
import equipmentsData from '../../mocks/equipments.json';

interface StatusEditorProps {
  character: any;
}

export default function StatusEditor({ character }: StatusEditorProps) {
  // ステータス属性のモック計算値（実際の計算ロジックはフェーズ2以降）
  const baseStats = character.status_data?.talent_bonus || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      {/* 左側: 編集フォーム群 (2カラム分を使用) */}
      <div className="lg:col-span-2 flex flex-col gap-8">
        
        {/* 1. タイムライン（イベント）選択 */}
        <div className="bg-bg-secondary p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2 mb-4">対象タイムライン</h3>
          <div className="max-w-md">
            <FormField label="イベント指定">
              <select className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer">
                <option value="global">初期設定 (グローバル)</option>
              </select>
            </FormField>
          </div>
        </div>

        {/* 2. 基本ステータス設定 */}
        <div className="bg-bg-secondary p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2 mb-4">基本設定</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="メインジョブ">
              <select 
                defaultValue={character.status_data?.job_id || ""}
                className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer"
              >
                <option value="">未選択</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.name}</option>
                ))}
              </select>
            </FormField>
            
            <FormField label="レベル">
              <input 
                type="number" 
                min="1"
                defaultValue={character.status_data?.level || 1}
                className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </FormField>
          </div>
        </div>

        {/* 3. 才能ボーナス (statusAttributes.jsonを展開) */}
        <div className="bg-bg-secondary p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-lg font-bold text-text-primary border-b border-border pb-2 mb-4">才能ボーナス</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {statusAttributes.map(attr => (
              <FormField key={attr.id} label={attr.name}>
                <input 
                  type="number" 
                  defaultValue={baseStats[attr.key] || 0}
                  className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </FormField>
            ))}
          </div>
        </div>

        {/* 4. スキル */}
        <div className="bg-bg-secondary p-6 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center border-b border-border pb-2 mb-4">
            <h3 className="text-lg font-bold text-text-primary">スキル</h3>
            <button className="text-sm bg-accent hover:bg-accent-hover text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm">
              <Plus size={16} /> スキルを追加
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {/* skills.json のモックデータを展開（2件程度） */}
            {skillsData.slice(0, 2).map((skill: any) => (
              <div key={skill.id} className="flex items-start justify-between bg-bg-primary border border-border p-3 rounded-lg">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-primary">{skill.name}</span>
                  </div>
                  <div className="text-xs text-text-secondary">{skill.description}</div>
                  
                  {/* Modifierの表示エリア */}
                  {skill.modifiers && skill.modifiers.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {skill.modifiers.map((mod: any, idx: number) => (
                        <span key={idx} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                          {mod.attribute_name} {mod.value > 0 ? '+' : ''}{mod.value}{mod.type === 'percent' ? '%' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button className="text-danger hover:bg-danger/10 p-2 rounded transition-colors mt-1"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* 5. 装備品 */}
        <div className="bg-bg-secondary p-6 rounded-xl border border-border shadow-sm">
          <div className="flex justify-between items-center border-b border-border pb-2 mb-4">
            <h3 className="text-lg font-bold text-text-primary">装備品</h3>
            <button className="text-sm bg-accent hover:bg-accent-hover text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm">
              <Plus size={16} /> 装備を変更
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {/* equipments.json のモックデータを展開（2件程度） */}
            {equipmentsData.slice(0, 2).map((equipment: any) => (
              <div key={equipment.id} className="flex items-start justify-between bg-bg-primary border border-border p-3 rounded-lg">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-primary">{equipment.name}</span>
                    <span className="text-xs border border-accent text-accent px-1.5 py-0.5 rounded">{equipment.rarity}</span>
                  </div>
                  <div className="text-xs text-text-secondary">{equipment.description}</div>
                  
                  {/* Modifierの表示エリア */}
                  {equipment.modifiers && equipment.modifiers.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {equipment.modifiers.map((mod: any, idx: number) => (
                        <span key={idx} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                          {mod.attribute_name} {mod.value > 0 ? '+' : ''}{mod.value}{mod.type === 'percent' ? '%' : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button className="text-danger hover:bg-danger/10 p-2 rounded transition-colors mt-1"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 右側: 最終ステータスプレビュー (1カラム分を使用、スクロール追従) */}
      <div className="lg:col-span-1 sticky top-6">
        <div className="bg-bg-primary p-6 rounded-xl border-2 border-accent/20 shadow-md">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
            <h3 className="text-lg font-bold text-text-primary">最終ステータス</h3>
            <button className="text-xs bg-bg-secondary hover:bg-border text-text-secondary px-2 py-1 rounded transition-colors font-medium">コピー</button>
          </div>
          <div className="flex flex-col gap-3">
            {statusAttributes.map(attr => {
              // モック用: 適当なベース値に才能ボーナスを加算した体裁にする
              const mockValue = (baseStats[attr.key] || 0) + (attr.key === 'hp' ? 150 : attr.key === 'mp' ? 50 : 10);
              return (
                <div key={attr.id} className="flex justify-between items-center text-sm border-b border-border/30 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-text-secondary font-medium">{attr.name}</span>
                  <span className="text-text-primary font-bold text-base">{mockValue}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
