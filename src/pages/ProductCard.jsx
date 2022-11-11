import React, { Component } from 'react';

export default class ProductCard extends Component {
  render() {
    const { id, thumbnail, title, price } = this.props;
    return (
      <div>
        <p data-testid="product-detail-name">{ title }</p>
        <p data-testid="product-detail-image">{ thumbnail }</p>
        <p data-testid="product-detail-price">{ price }</p>
        <p>{ id }</p>
        <button
          type="submit"
          data-testid="shopping-cart-button"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {}.isRequired;
