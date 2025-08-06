'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/utils/supabase/client';
import type { SupabaseUser, PricingPlan } from '@/types';

interface UserAndPricingData {
  supabaseUser: SupabaseUser | null;
  pricingPlan: PricingPlan | null;
  loading: boolean;
  error: string | null;
}

export const useUserAndPricing = (): UserAndPricingData => {
  const { user } = useUser();
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [pricingPlan, setPricingPlan] = useState<PricingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndPricing = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      } 

      try {
        setLoading(true);
        setError(null);
        
        const supabase = createClient();

        // Fetch user data from Supabase
        const { data: supabaseUserData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (userError) {
          console.error('Error fetching user:', userError);
          setError('Failed to fetch user data');
          setLoading(false);
          return;
        }

        setSupabaseUser(supabaseUserData);

        // If user has a plan_id, fetch pricing plan
        if (supabaseUserData?.plan_id) {
          const { data: pricingPlanData, error: planError } = await supabase
            .from("pricing_plans")
            .select("*")
            .eq("id", supabaseUserData.plan_id)
            .single();

          if (planError) {
            console.error('Error fetching pricing plan:', planError);
            setError('Failed to fetch pricing plan');
          } else {
            setPricingPlan(pricingPlanData);
          }
        }
      } catch (err) {
        console.error('Error in useUserAndPricing:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPricing();
  }, [user?.id]);

  return {
    supabaseUser,
    pricingPlan,
    loading,
    error
  };
}; 