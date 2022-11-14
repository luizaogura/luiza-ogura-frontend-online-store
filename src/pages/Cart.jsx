import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    productStorage: [],
    qty: [1, 1, 1, 1],
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

  substractQty = (index) => {
    const { qty } = this.state;
    const newQty = [...qty];
    newQty[index] -= 1;
    this.setState({
      qty: newQty,
    });
  };

  addQty = (index) => {
    const { qty } = this.state;
    const newQty = [...qty];
    newQty[index] += 1;
    this.setState({
      qty: newQty,
    });
  };

  removeProduct = ({ target }) => {
    const { productStorage } = this.state;
    const { id } = target;
    const unwanted = productStorage.filter((item) => item.title !== id);
    this.setState({
      productStorage: unwanted,
    }, localStorage.setItem('id', JSON.stringify(unwanted)));
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
                {`${title} || $${price} ||`}
              </span>
              <button
                type="button"
                onClick={ () => this.substractQty(index) }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <span
                data-testid="shopping-cart-product-quantity"
              >
                {`${qty[index]}`}
              </span>
              <button
                type="button"
                onClick={ () => this.addQty(index) }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                type="button"
                onClick={ this.removeProduct }
                id={ title }
                data-testid="remove-product"
              >
                Remover
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
