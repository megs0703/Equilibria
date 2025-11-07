import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HomeIcon, 
  UserIcon, 
  ChartBarIcon, 
  BeakerIcon,
  TrendingUpIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Workouts', href: '/workouts', icon: ChartBarIcon },
    { name: 'Nutrition', href: '/nutrition', icon: BeakerIcon },
    { name: 'Progress', href: '/progress', icon: TrendingUpIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-primary-700">
                  Equilibria
                </h1>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 xl:w-5 xl:h-5 mr-1 xl:mr-2" />
                    <span className="hidden xl:inline">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:block text-xs sm:text-sm text-neutral-600 truncate max-w-24 sm:max-w-none">
                {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-neutral-600 hover:text-red-600 transition-colors p-2"
                aria-label="Logout"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8 pb-20 lg:pb-6">
        {children}
      </main>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 z-50">
        <div className="grid grid-cols-5 py-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center py-2 px-1 transition-colors ${
                  isActive
                    ? 'text-primary-700'
                    : 'text-neutral-600'
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-xs mt-1 truncate max-w-full">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Layout;