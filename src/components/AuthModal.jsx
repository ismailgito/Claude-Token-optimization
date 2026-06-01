import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X, Mail, Lock, Sparkles, Loader2, Github, KeyRound } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, view, setView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  if (!isOpen) return null;

  const handleOAuth = async (provider) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (loading || resendTimer > 0) return;
    setLoading(true);
    setError(null);
    try {
      console.log('Attempting OTP sign in for:', email);
      const { data, error: sbError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: window.location.origin,
        }
      });
      
      if (sbError) {
        console.error('Supabase Auth Error:', sbError);
        throw sbError;
      }

      console.log('OTP sent successfully:', data);
      setView('verify');
      setResendTimer(60);
    } catch (err) {
      console.error('Caught Error in handleSignUp:', err);
      // Handle the case where the error object might be empty or missing message
      const errorMessage = err.message || err.error_description || (typeof err === 'object' ? JSON.stringify(err) : 'Unknown error occurred');
      
      if (errorMessage.includes('rate_limit') || errorMessage.includes('error sending')) {
        setError('Supabase Email Limit: Even with SMTP, there may be a rate limit in Supabase settings. Please check your Auth > Rate Limits in Supabase dashboard.');
      } else {
        setError(`Error: ${errorMessage === '{}' ? 'Authentication service failed. Check your Supabase/Resend configuration.' : errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'magiclink', // Standard type for OTP/Magiclink
      });

      if (error) throw error;
      
      onClose();
    } catch (err) {
      if (err.message?.includes('rate_limit')) {
        setError('Too many verification attempts. Please wait a moment.');
      } else if (err.message?.includes('Token has expired') || err.message?.includes('otp_expired')) {
        setError('Code expired. Please request a new one.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      onClose();
    } catch (err) {
      if (err.message?.includes('rate_limit')) {
        setError('Too many requests. Please wait a moment before trying again.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-claude-darkCard w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-claude-border dark:border-claude-darkBorder">
        {/* Header */}
        <div className="relative p-6 text-center border-b border-claude-border dark:border-claude-darkBorder">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-claude-muted hover:text-claude-text dark:text-claude-darkMuted dark:hover:text-claude-darkText rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center justify-center w-12 h-12 bg-claude-accent/10 rounded-xl mb-4">
            <Sparkles className="w-6 h-6 text-claude-accent" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-claude-text dark:text-claude-darkText">
            {view === 'login' && 'Welcome Back'}
            {view === 'signup' && 'Create Account'}
            {view === 'verify' && 'Check your email'}
          </h2>
          <p className="text-claude-muted dark:text-claude-darkMuted text-sm mt-1">
            {view === 'login' && 'Log in to continue using TokenOptimizer'}
            {view === 'signup' && 'Sign up for unlimited file conversions'}
            {view === 'verify' && `Enter the code sent to ${email}`}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-claude-muted dark:text-claude-darkMuted uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-claude-muted" />
                  <input
                    type="email" required placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-claude-bg dark:bg-claude-darkBg border border-claude-border dark:border-claude-darkBorder rounded-xl focus:ring-2 focus:ring-claude-accent/20 focus:border-claude-accent outline-none transition-all dark:text-claude-darkText"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-claude-muted dark:text-claude-darkMuted uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-claude-muted" />
                  <input
                    type="password" required placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-claude-bg dark:bg-claude-darkBg border border-claude-border dark:border-claude-darkBorder rounded-xl focus:ring-2 focus:ring-claude-accent/20 focus:border-claude-accent outline-none transition-all dark:text-claude-darkText"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-claude-accent text-white font-semibold rounded-xl hover:bg-claude-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-claude-accent/20 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
              </button>
            </form>
          )}

          {view === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-claude-muted dark:text-claude-darkMuted uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-claude-muted" />
                  <input
                    type="email" required placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-claude-bg dark:bg-claude-darkBg border border-claude-border dark:border-claude-darkBorder rounded-xl focus:ring-2 focus:ring-claude-accent/20 focus:border-claude-accent outline-none transition-all dark:text-claude-darkText"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-claude-muted dark:text-claude-darkMuted uppercase tracking-wider ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-claude-muted" />
                  <input
                    type="password" required placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-claude-bg dark:bg-claude-darkBg border border-claude-border dark:border-claude-darkBorder rounded-xl focus:ring-2 focus:ring-claude-accent/20 focus:border-claude-accent outline-none transition-all dark:text-claude-darkText"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit" disabled={loading || resendTimer > 0}
                className="w-full py-3 bg-claude-accent text-white font-semibold rounded-xl hover:bg-claude-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-claude-accent/20 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                 resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Send OTP'}
              </button>
            </form>
          )}

          {view === 'verify' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-claude-muted dark:text-claude-darkMuted uppercase tracking-wider ml-1">Verification Code</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-claude-muted" />
                  <input
                    type="text" required placeholder="123456"
                    className="w-full pl-10 pr-4 py-2.5 bg-claude-bg dark:bg-claude-darkBg border border-claude-border dark:border-claude-darkBorder rounded-xl focus:ring-2 focus:ring-claude-accent/20 focus:border-claude-accent outline-none transition-all dark:text-claude-darkText text-center tracking-[0.5em] font-bold"
                    value={otpCode} onChange={(e) => setOtpCode(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full py-3 bg-claude-accent text-white font-semibold rounded-xl hover:bg-claude-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-claude-accent/20 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Sign Up'}
              </button>
              <button 
                type="button" onClick={() => setView('signup')}
                className="w-full text-xs text-claude-muted hover:text-claude-accent transition-colors"
              >
                Try a different email
              </button>
            </form>
          )}

          {(view === 'login' || view === 'signup') && (
            <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-claude-border dark:border-claude-darkBorder"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-white dark:bg-claude-darkCard text-claude-muted dark:text-claude-darkMuted font-medium">Or continue with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleOAuth('google')}
                  className="flex items-center justify-center gap-2 py-2.5 border border-claude-border dark:border-claude-darkBorder rounded-xl hover:bg-claude-bg dark:hover:bg-claude-darkBg transition-colors dark:text-claude-darkText text-sm font-medium"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Google
                </button>
                <button 
                  onClick={() => handleOAuth('github')}
                  className="flex items-center justify-center gap-2 py-2.5 border border-claude-border dark:border-claude-darkBorder rounded-xl hover:bg-claude-bg dark:hover:bg-claude-darkBg transition-colors dark:text-claude-darkText text-sm font-medium"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-claude-bg/50 dark:bg-claude-darkBg/50 border-t border-claude-border dark:border-claude-darkBorder text-center">
          <p className="text-sm text-claude-muted dark:text-claude-darkMuted">
            {view === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setView(view === 'login' ? 'signup' : 'login')}
              className="ml-1 font-semibold text-claude-accent hover:underline"
            >
              {view === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
