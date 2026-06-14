import { Outlet, Link } from 'react-router-dom';
import { Book, Users, BarChart3, LayoutDashboard, MessageSquare } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-bg-secondary text-text-primary">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-primary border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-accent tracking-tight">Novel Gear</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/characters" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors font-medium">
            <Users size={20} />
            <span>キャラクター管理</span>
          </Link>
          <Link to="/status" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors font-medium">
            <BarChart3 size={20} />
            <span>ステータスダッシュボード</span>
          </Link>
          <Link to="/library" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors font-medium">
            <Book size={20} />
            <span>設定資料ライブラリ</span>
          </Link>
          <Link to="/board" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors font-medium">
            <MessageSquare size={20} />
            <span>掲示板エディタ</span>
          </Link>
          <Link to="/plot" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors font-medium">
            <LayoutDashboard size={20} />
            <span>プロットボード</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
