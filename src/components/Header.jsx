import { Sparkles, Github, Menu, Moon, Sun, LogOut, User as UserIcon, X, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

export default function Header({ isDark, toggleTheme, openAuthModal }) {
  const [session, setSession] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-claude-bg/80 dark:bg-claude-darkBg/80 backdrop-blur-md border-b border-claude-border dark:border-claude-darkBorder transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-claude-accent p-1.5 rounded-lg shadow-sm">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-serif font-bold text-claude-text dark:text-claude-darkText tracking-tight">TokenOptimizer</h1>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-claude-muted dark:text-claude-darkMuted hover:text-claude-accent transition-colors"
            >
              How it works
            </a>
            <a
              href="https://github.com/Mirza-Glitch/markitdown-js"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-claude-muted dark:text-claude-darkMuted hover:text-claude-accent transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-claude-muted dark:text-claude-darkMuted hover:bg-white dark:hover:bg-claude-darkSecondary rounded-lg transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {session ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-claude-bg dark:bg-claude-darkBg border border-claude-border dark:border-claude-darkBorder rounded-full">
                  {session.user.user_metadata?.avatar_url ? (
                    <img
                      src={session.user.user_metadata.avatar_url}
                      alt="Profile"
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4 text-claude-muted" />
                  )}
                  <span className="text-xs font-medium text-claude-text dark:text-claude-darkText max-w-[100px] truncate">
                    {session.user.user_metadata?.full_name || session.user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-claude-muted hover:text-red-500 transition-colors"
                  title="Log Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-sm font-medium text-claude-muted dark:text-claude-darkMuted hover:text-claude-accent transition-colors px-3 py-2"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="text-sm font-medium bg-claude-accent text-white px-4 py-2 rounded-lg hover:bg-claude-accent/90 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile actions: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 text-claude-muted dark:text-claude-darkMuted hover:bg-white dark:hover:bg-claude-darkSecondary rounded-lg transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="p-2 text-claude-muted dark:text-claude-darkMuted hover:bg-white dark:hover:bg-claude-darkSecondary rounded-lg transition-all"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Mobile menu dropdown */}
              {mobileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-[min(280px,calc(100vw-2rem))] bg-white dark:bg-claude-darkCard border border-claude-border dark:border-claude-darkBorder rounded-2xl shadow-xl overflow-hidden animate-fade-in origin-top-right z-50">
                  {/* Navigation links */}
                  <div className="p-3">
                    <a
                      href="#how-it-works"
                      onClick={handleNavClick}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-claude-text dark:text-claude-darkText hover:bg-claude-bg dark:hover:bg-claude-darkSecondary rounded-xl transition-colors"
                    >
                      <span>How it works</span>
                      <ChevronRight className="w-4 h-4 text-claude-muted" />
                    </a>
                    <a
                      href="https://github.com/Mirza-Glitch/markitdown-js"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleNavClick}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-claude-text dark:text-claude-darkText hover:bg-claude-bg dark:hover:bg-claude-darkSecondary rounded-xl transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub
                      </span>
                      <ChevronRight className="w-4 h-4 text-claude-muted" />
                    </a>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-claude-border dark:bg-claude-darkBorder mx-4" />

                  {/* Auth section */}
                  <div className="p-3">
                    {session ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 px-4 py-3">
                          {session.user.user_metadata?.avatar_url ? (
                            <img
                              src={session.user.user_metadata.avatar_url}
                              alt="Profile"
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-claude-bg dark:bg-claude-darkSecondary flex items-center justify-center">
                              <UserIcon className="w-4 h-4 text-claude-muted" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-claude-text dark:text-claude-darkText truncate">
                              {session.user.user_metadata?.full_name || session.user.email}
                            </p>
                            {session.user.user_metadata?.full_name && (
                              <p className="text-xs text-claude-muted dark:text-claude-darkMuted truncate">
                                {session.user.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <button
                          onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                          className="w-full px-4 py-2.5 text-sm font-medium text-claude-text dark:text-claude-darkText border border-claude-border dark:border-claude-darkBorder rounded-xl hover:bg-claude-bg dark:hover:bg-claude-darkSecondary transition-colors"
                        >
                          Log In
                        </button>
                        <button
                          onClick={() => { openAuthModal('signup'); setMobileMenuOpen(false); }}
                          className="w-full px-4 py-2.5 text-sm font-medium bg-claude-accent text-white rounded-xl hover:bg-claude-accent/90 transition-colors"
                        >
                          Sign Up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
