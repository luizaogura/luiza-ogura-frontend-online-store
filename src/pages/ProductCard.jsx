import React, { Component } from 'react';
import { getProductById } from '../services/api';

export default class ProductCard extends Component {
  state = {
    productArray: [],
    loading: false,
  };

  // comentario 7
  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.setState({ loading: true,
    }, async () => {
      const productSelected = await getProductById(id);
      console.log(productSelected);
      this.setState({
        productArray: productSelected,
        loading: false,
      });
    });
  }

  render() {
    const { productArray, loading } = this.state;
    return (
      <div>
        {loading && 'Carregando...' }
        { productArray.map((product) => (
          <div key={ product.id }>
            <p data-testid="product-detail-name">{ product.title }</p>
            <p data-testid="product-detail-image">{ product.thumbnail }</p>
            <p data-testid="product-detail-price">{ product.price }</p>
            <p>{ product.id }</p>
            <button
              type="submit"
              data-testid="shopping-cart-button"
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}

      </div>
    );
  }
}

ProductCard.propTypes = {}.isRequired;
