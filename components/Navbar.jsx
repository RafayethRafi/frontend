'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Menu, LogOut, LogIn, UserPlus, Home, Shield, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const { login, logout, authenticated, user } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    login();
    router.push('/');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-foreground font-bold text-xl hover:text-primary transition duration-300">
            Amar Predictions
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/" icon={<Home size={18} />}>Home</NavLink>
            
            {authenticated && user?.isAdmin && (
              <NavLink href="/admin" icon={<Shield size={18} />}>Admin</NavLink>
            )}
            
            <NavLink href="/cricket" icon={<span className="mr-1">🏏</span>}>Cricket</NavLink>
            <NavLink href="/football" icon={<span className="mr-1">⚽</span>}>Football</NavLink>
            {authenticated && (
              <button
                onClick={handleLogout}
                className="text-foreground hover:text-primary hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center space-x-1"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
            
            {!authenticated && (
              <>
                <NavLink href="/login" icon={<LogIn size={18} />}>Login</NavLink>
                <NavLink href="/register" icon={<UserPlus size={18} />}>Register</NavLink>
              </>
            )}
            <ThemeToggle />
          </div>
          
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="text-foreground hover:text-primary hover:bg-secondary p-2 rounded-md transition duration-300 ml-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" icon={<Home size={18} />}>Home</MobileNavLink>
            
            {authenticated && user?.isAdmin && (
              <MobileNavLink href="/admin" icon={<Shield size={18} />}>Admin</MobileNavLink>
            )}
            
            <MobileNavLink href="/cricket" icon={<span className="mr-1">🏏</span>}>Cricket</MobileNavLink>
            <MobileNavLink href="/football" icon={<span className="mr-1">⚽</span>}>Football</MobileNavLink>
            {authenticated && (
              <button
                onClick={handleLogout}
                className="text-foreground hover:text-primary hover:bg-secondary block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-300"
              >
                <span className="flex items-center">
                  <LogOut size={18} className="mr-2" />
                  Logout
                </span>
              </button>
            )}
            
            {!authenticated && (
              <>
                <MobileNavLink href="/login" icon={<LogIn size={18} />}>Login</MobileNavLink>
                <MobileNavLink href="/register" icon={<UserPlus size={18} />}>Register</MobileNavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children, icon }) => (
  <Link 
    href={href} 
    className="text-foreground hover:text-primary hover:bg-secondary px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center space-x-1"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const MobileNavLink = ({ href, children, icon }) => (
  <Link 
    href={href} 
    className="text-foreground hover:text-primary hover:bg-secondary block px-3 py-2 rounded-md text-base font-medium transition duration-300"
  >
    <span className="flex items-center">
      {icon}
      <span className="ml-2">{children}</span>
    </span>
  </Link>
);

export default Navbar;