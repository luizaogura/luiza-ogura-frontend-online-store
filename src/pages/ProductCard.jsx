import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class ProductCard extends Component {
  state = {
    productArray: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const productSelected = await getProductById(id);
    console.log(productSelected);
    this.setState({
      productArray: productSelected,
    });
  }

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
            data-testid="shopping-cart-button"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
