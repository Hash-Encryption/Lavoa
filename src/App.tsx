import React from 'react';
import CustomerAppPage from '../app/(customer)/page';
import { CoffeeProvider } from './context/CoffeeContext';

export default function App() {
  return (
    <CoffeeProvider>
      <CustomerAppPage />
    </CoffeeProvider>
  );
}
