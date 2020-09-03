import React from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Header from '../../Components/Header'
import { useCart } from '../../hooks/CartProvider'

import './styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    marginRight: 15
  }
}));


export default function Cart() {

  const classes = useStyles();
  const cart = useCart();

  const getCountInTheCart = (idProduct) => {
    const productInTheCart = cart.products.find(product => product.id === idProduct);
    return !!productInTheCart ? productInTheCart.qtdInCart : 0;
  }

  return (
    <div>
      <Header />
      <div className='content'>
        <div className='list-products'>
          {
            cart.products.map((product, index) => {
              return (
                <div className='container-product' key={index}>
                  <div className='primary-product'>
                    <h3>produto</h3>
                    <div className='info-product'>
                      <img src={product.picture} alt="smartphone" />
                      <h4>
                        {product.title}
                      </h4>
                    </div>⅜
                  </div>

                  <div className='quant-product'>
                    <h3>qtd.</h3>
                    <div className='card-quant-product'>
                      <div className='card-increment'>
                        <Button color="inherit" onClick={() => {
                          cart.reduceQtdProduct(product.id);
                        }}>
                          <RemoveIcon />
                        </Button>

                        <p>{product.qtdInCart}</p>

                        <Button color="inherit" onClick={() => {
                          if ((product.quantity - getCountInTheCart(product.id)) === 0) return;
                          cart.incrementQtdProduct(product);
                        }}>
                          <AddIcon />
                        </Button>

                      </div>
                      <Button color="inherit" onClick={() => {
                        if ((!!product.id)) {
                          cart.removeProductsCart(product)
                        }
                      }}>
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>

                  <div className='quant-product'>
                    <h3>valor</h3>
                    <div className='card-quant-product'>
                      <h1>R$ {product.price * product.qtdInCart}</h1>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        {
          !cart.products.length &&
          <div className='card-null'>
            <h1>O seu carrinho está vazio!</h1>
          </div>
        }
        <div className='card-total'>
          <h1>Resumo do pedido</h1>
          <h3>Total de itens: {cart.countOfCart()}</h3>
          <div className='total'>
            <h1>Total</h1>
            <h1>R$ {cart.totalPriceCart()}</h1>
          </div>
          <div className={classes.root}>
            <Link
              to='/cadastro'
              style={{
                textDecoration: 'none',
                color: '#FFF'
              }}
            >
              <Button variant="contained" color="primary">
                <Typography variant="h6" className={classes.title}>
                  confirmar Compra
              </Typography>
                <CheckIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}