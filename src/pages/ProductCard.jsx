import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class ProductCard extends Component {
  state = {
    productArray: [],
    productStorage: [],
  };

  // função localStorage
  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const productSelected = await getProductById(id);
    this.setState({
      productArray: productSelected,
    });
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const arrayStorage = JSON.parse(localStorage.getItem('id')) || [];
    this.setState({
      productStorage: arrayStorage,
    });
  };

  setLocalStorage = async () => {
    const { productArray, productStorage } = this.state;
    const { history } = this.props;
    if (productStorage.length === 0) {
      this.setState({
        productStorage: productArray,
      });
      localStorage.setItem('id', JSON.stringify(productStorage));
    }
    this.setState({
      productStorage: productStorage.push(productArray),
    });
    localStorage.setItem('id', JSON.stringify(productStorage));
    history.push('/cart');
  };

  render() {
    const { productArray } = this.state;
    return (
      <div>
        <h1>Detalhes do produto:</h1>
        <div>
          <p data-testid="product-detail-name">{productArray.title}</p>
          <img
            data-testid="product-detail-image"
            src={ productArray.thumbnail }
            alt={ productArray.title }
          />
          <p data-testid="product-detail-price">{productArray.price}</p>
          <p>{productArray.id}</p>
          <button
            type="submit"
            onClick={ this.setLocalStorage }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
          <Link data-testid="shopping-cart-button" to="/cart">
            Carrinho de compras
          </Link>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {}.isRequired;
