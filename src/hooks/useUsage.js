import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const USAGE_KEY = 'token_optimizer_usage';
const LIMIT = 5;

export default function useUsage() {
  const [usageCount, setUsageCount] = useState(0);
  const [session, setSession] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get local usage count
    const saved = localStorage.getItem(USAGE_KEY);
    if (saved) {
      setUsageCount(parseInt(saved, 10));
    }

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoaded(true);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoaded(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const incrementUsage = useCallback(() => {
    if (!session) {
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem(USAGE_KEY, newCount.toString());
    }
  }, [usageCount, session]);

  const isLimitReached = isLoaded && !session && usageCount >= LIMIT;

  return {
    usageCount,
    isLimitReached,
    isSignedIn: !!session,
    incrementUsage,
    limit: LIMIT
  };
}
