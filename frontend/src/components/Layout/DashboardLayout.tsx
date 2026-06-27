import { Outlet, Link, useLocation } from 'react-router-dom';
import { Book, Users, BarChart3, LayoutDashboard, MessageSquare } from 'lucide-react';

/** サイドバーのナビゲーション項目定義 */
const NAV_ITEMS = [
  { to: '/characters', icon: Users, label: 'キャラクター管理' },
  { to: '/status', icon: BarChart3, label: 'ステータスダッシュボード' },
  { to: '/library', icon: Book, label: '設定資料ライブラリ' },
  { to: '/board', icon: MessageSquare, label: '掲示板エディタ' },
  { to: '/plot', icon: LayoutDashboard, label: 'プロットボード' },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-bg-secondary text-text-primary">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-primary border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-accent tracking-tight">Novel Gear</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
