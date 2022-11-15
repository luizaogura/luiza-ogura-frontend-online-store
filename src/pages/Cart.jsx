import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    productStorage: [],
  };

  componentDidMount() {
    const arrayStorage = JSON.parse(localStorage.getItem('id'));
    this.setState({
      productStorage: arrayStorage,
    });
  }

  substractQty = (product) => {
    const { productStorage } = this.state;
    const newQty = productStorage.find(({ id }) => id === product.id);
    newQty.qty -= 1;
    let newProductList = productStorage.filter((prod) => prod.id !== product.id);
    newProductList = [...newProductList, newQty];
    this.setState(
      ({ productStorage: newProductList }),
      localStorage.setItem('id', JSON.stringify(newProductList)),
    );
  };

  addQty = (product) => {
    const { productStorage } = this.state;
    const newQty = productStorage.find(({ id }) => id === product.id);
    newQty.qty += 1;
    let newProductList = productStorage.filter((prod) => prod.id !== product.id);
    newProductList = [...newProductList, newQty];
    this.setState(
      ({ productStorage: newProductList }),
      localStorage.setItem('id', JSON.stringify(newProductList)),
    );
  };

  removeProduct = (product) => {
    const { productStorage } = this.state;
    const unwanted = productStorage.filter((item) => item.id !== product.id);
    this.setState({
      productStorage: unwanted,
    }, localStorage.setItem('id', JSON.stringify(unwanted)));
  };

  render() {
    const { productStorage } = this.state;
    return (
      <div>
        { productStorage.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          <div>
            <ul>
              {productStorage.map((product, index) => (
                <div
                  key={ index }
                  data-testid="product"
                  className="cart-product-details"
                >
                  <img src={ product.thumbnail } alt="cart-product" />
                  <span
                    data-testid="shopping-cart-product-name"
                  >
                    {`${product.title} || $${product.price} ||`}
                  </span>
                  <button
                    type="button"
                    onClick={ () => this.substractQty(product) }
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>
                  <span
                    data-testid="shopping-cart-product-quantity"
                  >
                    {`${product.qty}`}
                  </span>
                  <button
                    type="button"
                    onClick={ () => this.addQty(product) }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.removeProduct(product) }
                    id={ product.title }
                    data-testid="remove-product"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
