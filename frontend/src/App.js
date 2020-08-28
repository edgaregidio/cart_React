import React from 'react'

import './global.css'

import Routes from './routes'

import CartProvider from './hooks/CartProvider';

export default function App() {
  return (
    <CartProvider>
      <Routes />
    </CartProvider>
  );
}
