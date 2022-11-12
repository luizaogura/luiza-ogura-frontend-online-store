import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    success: false,
    productStorage: [],
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const arrayStorage = JSON.parse(localStorage.getItem('id')) || [];
    this.setState({
      productStorage: arrayStorage,
      success: true,
    });
  };

  render() {
    const { success, productStorage } = this.state;
    return (
      <div>
        <p
          data-testid="shopping-cart-empty-message"
          hidden={ success }
        >
          Seu carrinho está vazio
        </p>

        <ul>
          {productStorage.map(({ id, thumbnail, price, title }) => (
            <li key={ id } data-testid="product">
              <img src={ thumbnail } alt="cart-product" />
              <span
                data-testid="shopping-cart-product-name"
              >
                {`Product: ${title} | Price: $${price}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
