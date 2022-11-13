import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    productStorage: [],
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const arrayStorage = JSON.parse(localStorage.getItem('id')) || [];
    this.setState({
      productStorage: arrayStorage,
    });
  };

  render() {
    const { productStorage } = this.state;
    return (
      <div>
        { productStorage.length === 0
        && <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <ul>
          {productStorage.map(({ id, thumbnail, price, title }) => (
            <div
              key={ id }
              data-testid="product"
              className="cart-product-details"
            >
              <img src={ thumbnail } alt="cart-product" />
              <span
                data-testid="shopping-cart-product-name"
              >
                {`Product: ${title} | Price: $${price}`}
              </span>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
