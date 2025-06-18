
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'traveler' | 'agency' | 'admin';
  avatar_url?: string;
  phone?: string;
  company_name?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      // First try to get from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileData) {
        setProfile(profileData);
        return;
      }

      // Fallback to travel_agencies table
      const { data: agencyData, error: agencyError } = await supabase
        .from('travel_agencies')
        .select('*')
        .eq('id', userId)
        .single();

      if (agencyData) {
        const mappedProfile: Profile = {
          id: agencyData.id,
          email: agencyData.email,
          first_name: agencyData.contact_person_first_name || '',
          last_name: agencyData.contact_person_last_name || '',
          role: 'agency',
          avatar_url: agencyData.avatar_url,
          phone: agencyData.phone,
          company_name: agencyData.company_name,
          is_verified: agencyData.is_verified || false,
          created_at: agencyData.created_at,
          updated_at: agencyData.updated_at
        };
        setProfile(mappedProfile);
        return;
      }

      // Fallback to travelers table
      const { data: travelerData, error: travelerError } = await supabase
        .from('travelers')
        .select('*')
        .eq('id', userId)
        .single();

      if (travelerData) {
        const mappedProfile: Profile = {
          id: travelerData.id,
          email: travelerData.email,
          first_name: travelerData.first_name || '',
          last_name: travelerData.last_name || '',
          role: 'traveler',
          avatar_url: travelerData.avatar_url,
          phone: travelerData.phone,
          company_name: undefined,
          is_verified: travelerData.is_verified || false,
          created_at: travelerData.created_at,
          updated_at: travelerData.updated_at
        };
        setProfile(mappedProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Sign in failed' };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) throw error;
      return { user: data.user, error: null };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Sign up failed' };
    }
  };

  return {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    fetchProfile
  };
}
