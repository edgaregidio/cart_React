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
    // console.log(productExists)

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
  const reduceQtdProduct = () => {

  }

  const removeProductsCart = (idProduct) => {
    const productsFiltered = products.filter(product => product.id !== idProduct);
    return setProducts(productsFiltered);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        countOfCart,
        addProductsCart,
        removeProductsCart,
        totalPriceCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
