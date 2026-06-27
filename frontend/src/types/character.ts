/**
 * キャラクタードメインの型定義
 */

/** カスタム属性（キャラクター固有のキー・バリューペア） */
export interface CustomAttribute {
  key: string;
  value: string;
}

/** キャラクターに紐づくジョブの参照情報 */
export interface CharacterJobRef {
  id: number;
  name: string;
}

/** キャラクターに紐づくスキルの参照情報 */
export interface CharacterSkillRef {
  id: number;
  name: string;
}

/** キャラクターに紐づく装備品の参照情報 */
export interface CharacterEquipmentRef {
  id: number;
  name: string;
}

/** キャラクターの才能ボーナス（キー: ステータス属性key, 値: ボーナス値） */
export type TalentBonuses = Record<string, number>;

/** プロフィールデータ（キー: プロフィール属性key, 値: テキストまたはタグID） */
export type ProfileData = Record<string, string | number>;

/** キャラクター */
export interface Character {
  id: number;
  name: string;
  profile_data: ProfileData;
  visibility_settings: Record<string, unknown>;
  is_status_enabled: boolean;
  job_id: number | null;
  job: CharacterJobRef | null;
  level: number;
  talent_bonuses: TalentBonuses;
  skills: CharacterSkillRef[];
  equipments: CharacterEquipmentRef[];
  custom_attributes: CustomAttribute[];
  created_at: string;
  updated_at: string;
}
