/**
 * プロットボードドメインの型定義とテンプレート定数
 */

// ---------------------------------------------------------------------------
// プロットカード
// ---------------------------------------------------------------------------

/** カードに付与されるタグ */
export interface CardTag {
  text: string;
  type: 'character' | 'flag';
}

/** プロットカード */
export interface PlotCard {
  id: string;
  columnName: string;
  title: string;
  description: string;
  tags: CardTag[];
}

// ---------------------------------------------------------------------------
// テンプレート定義（PlotPage.tsx から移動）
// ---------------------------------------------------------------------------

/** テンプレートのキー型 */
export type PlotTemplateKey = 'blank' | 'kishotenketsu' | 'threeAct' | 'herosJourney' | 'saveTheCat';

/** テンプレートのメタデータ（作成モーダル用） */
export interface PlotTemplateInfo {
  key: PlotTemplateKey;
  name: string;
  description: string;
  columns: string[];
}

/** テンプレートごとのカラム名一覧 */
export const PLOT_TEMPLATES: Record<PlotTemplateKey, string[]> = {
  blank: [],
  kishotenketsu: [
    '起 (Introduction)',
    '承 (Development)',
    '転 (Twist)',
    '結 (Conclusion)',
  ],
  threeAct: [
    '第1幕: 設定 (Setup)',
    '第2幕: 対立 (Confrontation)',
    '第3幕: 解決 (Resolution)',
  ],
  herosJourney: [
    '1. 日常の世界 (Ordinary World)',
    '2. 冒険へのいざない (Call to Adventure)',
    '3. 冒険の拒絶 (Refusal of the Call)',
    '4. 賢者との出会い (Meeting the Mentor)',
    '5. 第一関門突破 (Crossing the Threshold)',
    '6. 試練、仲間、敵 (Tests, Allies, Enemies)',
    '7. 最も危険な場所への接近 (Approach to the Inmost Cave)',
    '8. 最大の試練 (Ordeal)',
    '9. 報酬 (Reward)',
    '10. 帰路 (The Road Back)',
    '11. 復活 (Resurrection)',
    '12. 宝を持っての帰還 (Return with the Elixir)',
  ],
  saveTheCat: [
    '1. オープニング・イメージ (Opening Image)',
    '2. テーマの提示 (Theme Stated)',
    '3. セットアップ (Set-Up)',
    '4. 触媒 (Catalyst)',
    '5. 討論 (Debate)',
    '6. 第2幕への突入 (Break into Two)',
    '7. Bストーリー (B Story)',
    '8. お楽しみ (Fun and Games)',
    '9. ミッドポイント (Midpoint)',
    '10. 迫り来る悪い奴ら (Bad Guys Close In)',
    '11. すべてを失って (All is Lost)',
    '12. 心の暗い夜 (Dark Night of the Soul)',
    '13. 第3幕への突入 (Break into Three)',
    '14. フィナーレ (Finale)',
    '15. ファイナル・イメージ (Final Image)',
  ],
};

/** テンプレート情報一覧（作成モーダルのグリッド表示用） */
export const PLOT_TEMPLATE_INFO: PlotTemplateInfo[] = [
  {
    key: 'blank',
    name: '空白のボード (デフォルト)',
    description: 'カラムが存在しない、完全に自由な状態からスタートします。自分だけの構成を作りたい場合に。',
    columns: PLOT_TEMPLATES.blank,
  },
  {
    key: 'kishotenketsu',
    name: '起承転結',
    description: '導入から結末までの4段階。日本の伝統的な物語構成であり、短いエピソードに最適です。',
    columns: PLOT_TEMPLATES.kishotenketsu,
  },
  {
    key: 'threeAct',
    name: '三幕構成',
    description: '設定・対立・解決の3幕。映画脚本などで最も標準的で安定した王道の構成です。',
    columns: PLOT_TEMPLATES.threeAct,
  },
  {
    key: 'herosJourney',
    name: 'ヒーローズ・ジャーニー',
    description: '神話の法則に基づく12のステージ。主人公の成長を描く冒険ファンタジーに最適です。',
    columns: PLOT_TEMPLATES.herosJourney,
  },
  {
    key: 'saveTheCat',
    name: 'ハリウッド方式 (Save the Cat)',
    description: '15の細かいビートで構成される、読者を決して飽きさせないエンターテインメント特化の構成です。',
    columns: PLOT_TEMPLATES.saveTheCat,
  },
];

/** セレクトボックスの選択肢（PlotPage用） */
export const PLOT_BOARD_OPTIONS: { value: PlotTemplateKey; label: string }[] = [
  { value: 'kishotenketsu', label: '全体プロット (起承転結)' },
  { value: 'threeAct', label: '第1章プロット (三幕構成)' },
  { value: 'herosJourney', label: '第2章プロット (ヒーローズ・ジャーニー)' },
  { value: 'saveTheCat', label: '長編構成 (ハリウッド方式)' },
  { value: 'blank', label: '自由帳 (空白のボード)' },
];
