import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    productStorage: [],
    qty: 1,
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
    const { productStorage, qty } = this.state;
    return (
      <div>
        { productStorage.length === 0
        && <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <ul>
          {productStorage.map(({ thumbnail, price, title }, index) => (
            <div
              key={ index }
              data-testid="product"
              className="cart-product-details"
            >
              <img src={ thumbnail } alt="cart-product" />
              <span
                data-testid="shopping-cart-product-name"
              >
                {`Product: ${title} | Price: $${price} |`}
              </span>
              <span
                data-testid="shopping-cart-product-quantity"
              >
                {`| Qty: ${qty}`}
              </span>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
