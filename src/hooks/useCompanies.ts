import { useEffect, useState } from 'react';
import { Company } from '../types/types.ts';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('../../public/companies-lookup.json');
        if (!response.ok) throw new Error('Failed to fetch companies');
        const data: Company[] = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load companies'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, isLoading, error };
};
