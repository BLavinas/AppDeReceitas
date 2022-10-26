import React from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';

export default function Recipes() {
  return (
    <div>
      <Header />
      <title data-testid="page-title" title="Meals">Meals</title>
      <title data-testid="page-title" title="Drinks">Drinks</title>
      <span>Recipes</span>
      <Footer />
    </div>
  );
}
