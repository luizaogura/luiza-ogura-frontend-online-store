import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class ProductCard extends Component {
  state = {
    productArray: [],
    productStorage: [],
    clickText: 'Adicionar ao carrinho',
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

  setLocalStorage = () => {
    const { productArray, productStorage } = this.state;
    const sameId = productStorage.some(({ id }) => id === productArray.id);
    if (productStorage.length === 0) {
      productArray.qty = 1;
      this.setState({
        productStorage: productArray,
        clickText: 'Adicionado' });
      localStorage.setItem('id', JSON.stringify(productArray));
    }
    if (!sameId) {
      productArray.qty = 1;
      let newProductList = productStorage;
      newProductList = [...newProductList, productArray];
      this.setState({
        productStorage: newProductList,
        clickText: 'Adicionado' });
      localStorage.setItem('id', JSON.stringify(newProductList));
    } else {
      const newQty = productStorage.find(({ id }) => id === productArray.id);
      newQty.qty += 1;
      let newProductList = productStorage.filter((prod) => prod.id !== productArray.id);
      newProductList = [...newProductList, newQty];
      this.setState(
        ({ productStorage: newProductList,
          clickText: 'Adicionado' }),
        localStorage.setItem('id', JSON.stringify(newProductList)),
      );
    }
  };

  render() {
    const { productArray, clickText } = this.state;
    return (
      <div>
        <h4>Detalhes do produto:</h4>
        <div className="product-page-container">
          <p data-testid="product-detail-name">{productArray.title}</p>
          <img
            data-testid="product-detail-image"
            src={ productArray.thumbnail }
            alt={ productArray.title }
          />
          <p data-testid="product-detail-price">{`$${productArray.price}`}</p>
          <p>{productArray.id}</p>
          <button
            type="submit"
            onClick={ this.setLocalStorage }
            data-testid="product-detail-add-to-cart"
            value={ clickText }
          >
            { clickText }
          </button>
          <Link
            className="link-to-cart-search"
            data-testid="shopping-cart-button"
            to="/cart"
          >
            Carrinho de compras
          </Link>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {}.isRequired;
