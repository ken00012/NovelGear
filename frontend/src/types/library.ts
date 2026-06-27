/**
 * 設定資料ライブラリドメインの型定義
 * ジョブ、スキル、装備品、用語、ステータス属性、プロフィール属性
 */

// ---------------------------------------------------------------------------
// 共通型
// ---------------------------------------------------------------------------

/** ステータス補正値（スキル・装備品で共有） */
export interface Modifier {
  attribute: string;
  attribute_name: string;
  type: 'flat' | 'percent';
  value: number;
}

/** ステータスのキーと値のマップ（ジョブ用） */
export type StatMap = Record<string, number>;

// ---------------------------------------------------------------------------
// ジョブ
// ---------------------------------------------------------------------------

export interface Job {
  id: number;
  name: string;
  description: string;
  base_stats: StatMap;
  stat_growth: StatMap;
}

// ---------------------------------------------------------------------------
// スキル
// ---------------------------------------------------------------------------

export interface Skill {
  id: number;
  name: string;
  description: string;
  modifiers: Modifier[];
}

// ---------------------------------------------------------------------------
// 装備品
// ---------------------------------------------------------------------------

export type EquipmentRarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

export interface Equipment {
  id: number;
  name: string;
  description: string;
  rarity: EquipmentRarity;
  modifiers: Modifier[];
}

// ---------------------------------------------------------------------------
// 用語集
// ---------------------------------------------------------------------------

export interface GlossaryTerm {
  id: number;
  term: string;
  description: string;
}

// ---------------------------------------------------------------------------
// ステータス属性
// ---------------------------------------------------------------------------

export interface StatusAttribute {
  id: number;
  key: string;
  name: string;
  description: string;
  order_index: number;
}

// ---------------------------------------------------------------------------
// プロフィール属性
// ---------------------------------------------------------------------------

/** プロフィール属性に紐づくタグ選択肢 */
export interface ProfileTag {
  id: number;
  attribute_id: number;
  name: string;
  color: string;
}

export interface ProfileAttribute {
  id: number;
  key: string;
  name: string;
  type: 'text' | 'tag';
  order_index: number;
  tags: ProfileTag[];
}
