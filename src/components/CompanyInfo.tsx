import { FC, memo } from 'react';
import { useCompanyData } from '../hooks/useCompanyData.ts';

interface CompanyInfoProps {
  ticker: string;
}

export const CompanyInfo: FC<CompanyInfoProps> = memo(({ ticker }) => {
  const { company, security, isLoading, error } = useCompanyData(ticker);

  if (error) {
    return (
      <div className="p-6 border border-red-300 rounded-lg bg-red-50 animate-fade-in">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white animate-fade-in">
        <p className="text-gray-500">No company information found.</p>
      </div>
    );
  }

  return (
    <div
      key={ticker}
      className="p-6 border border-gray-300 rounded-lg shadow-md bg-white animate-fade-in"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-600">{company.name}</h2>

      <dl className="grid grid-cols-1 gap-3">
        {[
          { label: 'CEO', value: company.ceo },
          { label: 'Sector', value: company.sector },
          {
            label: 'Industry',
            value: `${company.industry_category} / ${company.industry_group}`,
          },
          { label: 'Employees', value: company.employees.toLocaleString() },
          { label: 'Business Address', value: company.business_address },
          {
            label: 'Website',
            value: (
              <a
                href={`https://${company.company_url}`}
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.company_url}
              </a>
            ),
          },
        ].map(({ label, value }) => (
          <div key={label} className="transition-all duration-300">
            <dt className="font-semibold">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4">{company.short_description}</p>

      {security && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Security Information</h3>
          <dl className="grid grid-cols-1 gap-2">
            <div>
              <dt className="font-semibold">Exchange Ticker</dt>
              <dd>{security.exchange_ticker}</dd>
            </div>
            <div>
              <dt className="font-semibold">Composite Ticker</dt>
              <dd>{security.composite_ticker}</dd>
            </div>
            <div>
              <dt className="font-semibold">Currency</dt>
              <dd>{security.currency}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
});

CompanyInfo.displayName = 'CompanyInfo';
