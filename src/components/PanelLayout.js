import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, UserCircle, Settings, LogOut, UserPlus, Menu, X } from 'lucide-react';

const navItems = (isAdmin) => [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customers', label: 'Customers', icon: Users },
  ...(isAdmin ? [{ to: '/employees', label: 'Employees', icon: UserPlus }] : []),
  { to: '/settings', label: 'Settings', icon: Settings },
];

const PanelLayout = () => {
  const { user, logout } = useAuth();
  const items = navItems(user?.role === 'admin');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200/80 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo & User Section */}
            <div className="p-6 border-b border-slate-200/80 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">CRM Pro</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-lg text-white/80 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-white/70 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {items.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-200/80">
              <button
                onClick={logout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
              >
                <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-600" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <span className="text-lg font-bold text-slate-900">CRM Pro</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PanelLayout;

