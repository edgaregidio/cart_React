import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import api from '../../services/api'
import { useCart } from '../../hooks/CartProvider'

import Header from '../../Components/Header'

import './styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title1: {
    marginRight: 15,
  }
}));

export default function Product(props) {
  const classes = useStyles();

  const cart = useCart();

  const [product, setProduct] = useState(null);
  const [countInTheCart, setCountInTheCart] = useState(0);


  useEffect(() => {
    api.get(`/products/${props.match.params.id}`)
      .then(({ data }) => {
        setProduct(data);
      })
  }, [props.match.params.id])

  useEffect(() => {
    const productExistsInTheCart = cart.products.find(product => String(product.id) === props.match.params.id);
    if (!!productExistsInTheCart) {
      setCountInTheCart(productExistsInTheCart.qtdInCart);
    }
  }, [cart.products, props.match.params.id])

  return (
    <div>
      <Header />
      <div className='content'>

        {
          !!product && <div className='product-phone'>
            <img src={product.picture} alt="smartphone" />
            <div className='card-info-product'>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <p>{product.memory}</p>
              <p>{product.brand}</p>
              <p>{product.chipType}</p>
              <h2>R$ {product.price.toFixed(2).split('.').join(',')}</h2>
              <div className='bottom-card'>
                <h3>Quantidade: {product.quantity - countInTheCart}</h3>
                <div className="button-add">
                  <Button color="inherit" onClick={() => {
                    if ((product.quantity - countInTheCart) === 0) return;
                    cart.addProductsCart(product)
                    //console.log(product)
                    
                  }}>
                    <Typography variant="h6" className={classes.title1}>
                      Adicionar no carrinho
                    </Typography>
                    <AddCircleIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>

        }


      </div>
    </div>
  )
}