import { useEffect, useState } from 'react';
import { Company, Security } from '../types/types.ts';

export const useCompanyData = (ticker: string) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [security, setSecurity] = useState<Security | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [companiesResponse, securitiesResponse] = await Promise.all([
          fetch('../../public/companies-lookup.json'),
          fetch('../../public/securities.json'),
        ]);

        if (!companiesResponse.ok || !securitiesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [companiesData, securitiesData]: [Company[], Security[]] =
          await Promise.all([
            companiesResponse.json(),
            securitiesResponse.json(),
          ]);

        const selectedCompany =
          companiesData.find((c) => c.ticker === ticker) || null;
        const selectedSecurity =
          securitiesData.find((s) => s.ticker === ticker) || null;

        setCompany(selectedCompany);
        setSecurity(selectedSecurity);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  return { company, security, isLoading, error };
};
