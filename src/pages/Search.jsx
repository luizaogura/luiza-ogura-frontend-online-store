import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';

export default class Search extends Component {
  render() {
    return (
      <div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho de compras
        </Link>
        <Categories />
      </div>
    );
  }
}
