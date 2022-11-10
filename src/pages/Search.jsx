import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductByQuery } from '../services/api';

export default class Search extends Component {
  state = {
    inputSearch: '',
    products: [],
    loading: false,
  };

  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  submitBtn = () => {
    const { inputSearch } = this.state;
    this.setState(
      {
        loading: true,
      },
      async () => {
        const productSearched = await getProductByQuery(inputSearch);
        this.setState({
          products: productSearched,
          loading: false,
          inputSearch: '',
        });
      },
    );
  };

  render() {
    const { inputSearch, loading, products } = this.state;
    const nullResult = products.length === 0;

    return (
      <div>
        <div>
          <input
            type="text"
            data-testid="query-input"
            onChange={ ({ target }) => this.handleChange(target) }
            name="inputSearch"
            value={ inputSearch }
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ this.submitBtn }
          >
            Pesquisar
          </button>
        </div>
        {loading && 'Carregando...'}
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/cart">
          Carrinho de compras
        </Link>
        <Categories />
        <div>
          {nullResult ? (
            <p>Nenhum produto foi encontrado</p>
          ) : (
            products.map((result) => (
              <div key={ result.id } data-testid="product">
                <img src={ result.thumbnail } alt={ result.title } />
                <p>{result.title}</p>
                <p>{result.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}
