import { useState, FC, useCallback } from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import { CompanyInfo } from '../components/CompanyInfo.tsx';
import { useCompanies } from '../hooks/useCompanies.ts';
import { Dropdown } from '../components/DropDown.tsx';

const Dashboard: FC = () => {
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const { companies, isLoading, error } = useCompanies();

  const handleTickerChange = useCallback((ticker: string) => {
    setSelectedTicker(ticker);
  }, []);

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 h-screen">
      <Dropdown
        options={companies}
        value={selectedTicker}
        onChange={handleTickerChange}
      />
      <div className="mt-4 h-5/6">
        <Mosaic<string>
          renderTile={(id, path) => (
            <MosaicWindow<string> path={path} title={`Company Info ${id}`}>
              <CompanyInfo ticker={selectedTicker} />
            </MosaicWindow>
          )}
          initialValue={{
            direction: 'row',
            first: '1',
            second: {
              direction: 'column',
              first: '2',
              second: '3',
            },
          }}
        />
      </div>
    </div>
  );
};
export default Dashboard;
