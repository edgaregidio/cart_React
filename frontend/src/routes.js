import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={() => <Redirect to='/products' />} />
        <Route path="/products" exact component={Home} />
        <Route path="/carrinho" exact component={Cart} />
        <Route path="/product/:id" exact component={Product} />
      </Switch>
    </BrowserRouter>
  )
}