import { Sparkles, Github, Menu, Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';

export default function Header({ isDark, toggleTheme, openAuthModal }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-claude-bg/80 dark:bg-claude-darkBg/80 backdrop-blur-md border-b border-claude-border dark:border-claude-darkBorder transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-claude-accent p-1.5 rounded-lg shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-serif font-bold text-claude-text dark:text-claude-darkText tracking-tight">TokenOptimizer</h1>
            </div>
          </div>

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

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-claude-muted dark:text-claude-darkMuted hover:bg-white dark:hover:bg-claude-darkSecondary rounded-lg transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2">
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

            <button className="md:hidden p-2 text-claude-muted dark:text-claude-darkMuted hover:bg-white dark:hover:bg-claude-darkSecondary rounded-lg transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
