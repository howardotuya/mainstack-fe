import { useEffect, useState } from "react";
import { fetchUserProfile, type UserProfile } from "@/services";

export type UseFetchUserProfileResult = {
  data: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
};

export const useFetchUserProfile = (): UseFetchUserProfileResult => {
  const [data, setData] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUserProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        if (isMounted) {
          setData(profile);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to load user profile")
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadUserProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchUserProfile;
