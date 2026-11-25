import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  LayoutDashboard, FolderGit2, Cpu, Briefcase, GraduationCap, 
  Award, User, Mail, Settings, LogOut, ExternalLink, 
  Menu, X, Sun, Moon, Bell, Shield, ChevronRight 
} from 'lucide-react';
import api from '../../api/client';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
  { name: 'Skills', path: '/admin/skills', icon: Cpu },
  { name: 'Experience', path: '/admin/experience', icon: Briefcase },
  { name: 'Education', path: '/admin/education', icon: GraduationCap },
  { name: 'Certifications', path: '/admin/certifications', icon: Award },
  { name: 'Profile CMS', path: '/admin/profile', icon: User },
  { name: 'Messages Inbox', path: '/admin/messages', icon: Mail, badge: true },
  { name: 'Website Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await api.get('/messages?status=unread');
        if (res.data.success) {
          setUnreadCount(res.data.unreadCount || 0);
        }
      } catch (err) {
        console.error('Failed to fetch unread messages count:', err.message);
      }
    };
    fetchUnread();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getPageTitle = () => {
    const found = navItems.find(i => i.path === location.pathname);
    return found ? found.name : 'Admin Dashboard';
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex font-sans antialiased">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-dark-950 border-r border-white/10 z-50 flex flex-col justify-between transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Logo & Brand Header */}
          <div className="h-16 sm:h-20 px-6 flex items-center justify-between border-b border-white/10">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-accent to-brand-cyan flex items-center justify-center font-mono font-bold text-white shadow-glow-sm">
                A
              </div>
              <div>
                <span className="font-mono text-base font-bold tracking-tight text-white block">
                  ARIK ADMIN
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-400 block -mt-1 font-mono">
                  Control CMS
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-glow-sm font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono font-bold">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Current Admin Profile & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center text-xs border border-brand-500/30">
                {admin?.name ? admin.name.charAt(0) : 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate max-w-[110px]">
                  {admin?.name || 'Arik Maitra'}
                </p>
                <p className="text-[10px] text-slate-400 truncate max-w-[110px]">
                  {admin?.email || 'admin@arikmaitra.dev'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 sm:h-20 bg-dark-950/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                {getPageTitle()}
              </h2>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                Arik Maitra Portfolio Management
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* View Live Website Button */}
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-dark-900 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden sm:inline">View Public Website</span>
            </Link>

            {/* Notification Badge Shortcut to Messages */}
            <Link
              to="/admin/messages"
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="View Messages"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </Link>

            {/* Quick Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
