import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, UserCircle, Settings, LogOut, UserPlus } from 'lucide-react';
import Header from './Header';

const navItems = (isAdmin) => [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customers', label: 'Customers', icon: Users },
  ...(isAdmin ? [{ to: '/employees', label: 'Employees', icon: UserPlus }] : []),
  { to: '/settings', label: 'Settings', icon: Settings },
];

const PanelLayout = () => {
  const { user, logout } = useAuth();
  const items = navItems(user?.role === 'admin');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-4">
                <UserCircle className="w-10 h-10 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-base font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {items.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </NavLink>
                ))}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </aside>
          <section className="lg:col-span-9">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PanelLayout;

