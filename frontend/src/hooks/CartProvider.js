import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext();

export default function CartProvider({ children }) {

  const [products, setProducts] = useState([])

  // QUANTIDADE DE ITEMS ADICIONADO NO CARRINHO
  const countOfCart = () => {
    const totalItem = products.reduce((total, product) => total + product.qtdInCart, 0);
    return totalItem;
  }

  // SOMANDO O VALOR TOTAL DE TODOS OS PRODUTOS ADICIONADO NO CARRINHO
  const totalPriceCart = () => {
    const total = products.reduce((total, product) => total + product.price * product.qtdInCart, 0);
    return total.toFixed(2).split('.').join(',');
  }

  const addProductsCart = (newProduct) => {

    // verifica se o produto já está adicionado no carrinho
    const productExists = products.find(product => product.id === newProduct.id);

    if (!!productExists) {

      // quando está no carrinho apenas incrementa a quantidade do produto
      productExists.qtdInCart++;
      const productsFiltered = products.filter(product => product.id !== newProduct.id);
      return setProducts([...productsFiltered, productExists]);
    }

    // não está no carrinho, então adiciona ele com quantidade no carrinho como: 1
    const newProductToAdd = newProduct;
    newProductToAdd.qtdInCart = 1;
    return setProducts([...products, newProductToAdd])
  }

  // busca o produto no array
  // se a quantidade dele no carrinho for 1, remove do carrinho
  // se for a quantidade 2 ou mais, diminui a quantidade
  const reduceQtdProduct = (idProduct) => {
    const indexProduct = products.findIndex(product => product.id === idProduct);

    if (products[indexProduct].qtdInCart === 1) {
      const productsFiltered = products.filter(product => product.id !== idProduct);
      return setProducts(productsFiltered);
    }

    const productsToChange = products.map((product, index) => {
      if (index === indexProduct) product.qtdInCart--;
      return product;
    });

    setProducts(productsToChange);
  }

  const incrementQtdProduct = (incrementProduct) => {
    const productExists = products.find(product => product.id === incrementProduct.id);
    productExists.qtdInCart++;
    return setProducts([...products])
  }

  const removeProductsCart = (removeProduct) => {
    const productsFiltered = products.filter(product => product.id !== removeProduct.id);
    return setProducts([...productsFiltered]);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        countOfCart,
        addProductsCart,
        removeProductsCart,
        totalPriceCart,
        reduceQtdProduct,
        incrementQtdProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
