import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';

import {useCart} from '../../hooks/CartProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: 45,
  },
  title1: {
    marginRight: 10,
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function Header() {
  const classes = useStyles();

  const {totalPriceCart, countOfCart} = useCart();

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Celuláres
          </Typography>
          <Link
            to='/products'
            style={{
              textDecoration: 'none',
              color: '#FFF'
            }}>
            <Typography variant="h6" className={classes.title}>
              Home
            </Typography>
          </Link>

          <Typography variant="h6" className={classes.title1}>
            Total: R$ {totalPriceCart()}
            </Typography>

          <Link
            to='/carrinho'
            style={{
              textDecoration: 'none',
              color: '#FFF'
            }}>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={countOfCart()} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  )
}