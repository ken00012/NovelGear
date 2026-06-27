/**
 * 掲示板エディタドメインの型定義
 */

/** スレッド */
export interface Thread {
  id: number;
  chapter_number: string;
  title: string;
  owner_id_str: string;
  thread_template: string;
  post_template: string;
  start_index: number;
  created_at: string;
  post_count: number;
}

/** 書き込み（投稿） */
export interface Post {
  id: number;
  thread_id: number;
  number: number;
  name: string;
  user_id_str: string;
  content: string;
  order_index: number;
}

/** 掲示板の民（ペルソナ） */
export interface Persona {
  id: number;
  name: string;
  initial: string;
  isCharacter: boolean;
}
