import React from 'react';
import profileAttributes from '../../mocks/profileAttributes.json';
import FormField from '../../components/FormField';
import CustomAttributes from './CustomAttributes';

interface ProfileEditorProps {
  character: any; // モックデータの型
}

export default function ProfileEditor({ character }: ProfileEditorProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* 左カラム：基本情報 */}
      <div className="bg-bg-secondary border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-text-primary mb-6">基本情報</h2>
        <form className="flex flex-col gap-5">
          <FormField label="キャラクター名" required>
            <input 
              type="text" 
              defaultValue={character.name} 
              className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </FormField>

          {profileAttributes.map(attr => {
            const value = character.profile_data[attr.key] || '';
            return (
              <FormField key={attr.id} label={attr.name}>
                {attr.type === 'text' ? (
                  <input 
                    type="text" 
                    defaultValue={value} 
                    className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                ) : attr.type === 'tag' ? (
                  <select 
                    defaultValue={value}
                    className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  >
                    <option value="">未選択</option>
                    {attr.tags?.map((t: any) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                ) : null}
              </FormField>
            );
          })}
        </form>
      </div>

      {/* 右カラム：カスタム属性 */}
      <div className="w-full">
        <CustomAttributes customAttributes={character.custom_attributes || []} />
      </div>
    </div>
  );
}
