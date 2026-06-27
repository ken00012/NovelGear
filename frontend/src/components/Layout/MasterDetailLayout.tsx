import React, { ReactNode } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import SortableList, { SortableItemType } from '../SortableList';

interface MasterDetailLayoutProps<T extends SortableItemType> {
  /** アイテムの配列 */
  items: T[];
  /** ソート（並び替え）後のコールバック */
  onSort: (items: T[]) => void;
  /** 現在選択中のアイテムID */
  activeId: string | number | null;
  /** アイテム選択時のコールバック */
  onSelectItem: (id: string | number) => void;
  /** 左リストの各アイテムの描画 */
  renderListItem: (item: T) => ReactNode;
  /** 右パネルの詳細フォーム内容 */
  renderDetail: (item: T) => ReactNode;
  /** 新規作成ボタンのラベル */
  createButtonLabel?: string;
  /** 右パネルの見出し */
  detailTitle: string;
  /** 未選択時のメッセージ */
  emptyMessage?: string;
}

/**
 * マスター・ディテールレイアウト（左1/3リスト + 右2/3詳細フォーム）
 * Library系タブの共通構造を抽象化する
 */
export default function MasterDetailLayout<T extends SortableItemType>({
  items,
  onSort,
  activeId,
  onSelectItem,
  renderListItem,
  renderDetail,
  createButtonLabel = '新規作成',
  detailTitle,
  emptyMessage = '左のリストからアイテムを選択してください',
}: MasterDetailLayoutProps<T>) {
  const activeItem = items.find(item => item.id === activeId) ?? null;

  return (
    <div className="flex gap-8 flex-1 min-h-0">
      {/* 左側: アイテム一覧リスト (幅1/3) */}
      <div className="w-1/3 flex flex-col gap-4 border-r border-border pr-6 overflow-y-auto custom-scrollbar">
        <button className="w-full flex items-center justify-center gap-2 bg-bg-secondary hover:bg-border text-text-primary px-4 py-3 rounded-lg font-medium transition-colors border border-border border-dashed">
          <Plus size={18} /> {createButtonLabel}
        </button>
        
        {/* SortableList を使用してアイテムを展開 */}
        <SortableList
          items={items}
          onSort={onSort}
          renderItem={(item) => (
            <div
              onClick={() => onSelectItem(item.id)}
              className={`p-4 rounded-lg shadow-sm cursor-pointer flex flex-col gap-1 transition-all border bg-bg-primary ${
                activeId === item.id
                  ? 'border-accent'
                  : 'border-border hover:border-accent/50'
              }`}
            >
              {renderListItem(item)}
            </div>
          )}
        />
      </div>

      {/* 右側: 編集フォーム (幅2/3) */}
      <div className="w-2/3 overflow-y-auto pb-8">
        {activeItem ? (
          <div className="bg-bg-secondary rounded-xl border border-border p-5 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-xl font-bold text-text-primary">{detailTitle}</h3>
              <button className="text-danger hover:bg-danger/10 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium flex items-center gap-1">
                <Trash2 size={16} /> 削除
              </button>
            </div>
            {/* フォーム入力群 */}
            <div className="flex flex-col gap-3">
              {renderDetail(activeItem)}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary bg-bg-secondary rounded-xl border border-border p-6 shadow-sm">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
}
