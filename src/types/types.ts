import { ComponentType } from 'react';

export interface IRoute {
  key: string;
  title: string;
  path: string;
  component: ComponentType;
}

export interface Company {
  id: string;
  ticker: string;
  name: string;
  lei: string | null;
  ceo: string;
  business_address: string;
  sector: string;
  industry_category: string;
  industry_group: string;
  employees: number;
  short_description: string;
  company_url: string;
}

export interface Security {
  company_id: string;
  ticker: string;
  exchange_ticker: string;
  composite_ticker: string;
  currency: string;
}
