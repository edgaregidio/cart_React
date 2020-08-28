import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import api from '../../services/api'

import Header from '../../Components/Header'
import './styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title1: {
    marginRight: 10,
  }
}));

export default function Home() {
  const classes = useStyles();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => {
        setProducts(data);
      });
  }, []);

  return (
    <div>

      <Header />

      <main>
        <h1>Escolha o seu celular</h1>
        <div className="main-grid">

          {
            products.map((product, index) => {
              return (
                <div className="card-cel" key={index}>

                  <Link
                    to={`/product/${product.id}`}
                    style={{
                      textDecoration: 'none',
                      color: '#FFF'
                    }}
                  >
                    <img src={product.picture} alt='smartphone' />
                  </Link>
                  <div className="description">
                    <Link
                      to={`/product/${product.id}`}
                      style={{
                        textDecoration: 'none',
                        color: '#FFF'
                      }}
                    >
                      <h2>{product.title}</h2>
                      <p>{product.brand}</p>
                      <h3>R$ {product.price.toFixed(2).split('.').join(',')}</h3>
                      <h4>Quantidade: {product.quantity} </h4>
                    </Link>

                    <div className="button-add">
                      <Button color="inherit">
                        <Typography variant="h6" className={classes.title1}>
                          Adicionar produto
                        </Typography>
                        <AddCircleIcon />
                      </Button>
                    </div>

                  </div>
                </div>
              )
            })
          }
        </div>
      </main>
    </div>

  );
}