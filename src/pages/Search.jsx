import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductByQuery, getCategories, getProductByCategory } from '../services/api';

export default class Search extends Component {
  state = {
    inputSearch: '',
    products: [],
    categoryList: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchCategories();
  }

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

  fetchCategories = async () => {
    const listComplete = await getCategories();
    this.setState({ categoryList: listComplete });
  };

  categoryCheck = async ({ target }) => {
    const { categoryList } = this.state;
    const { checked, name } = target;
    const categoryID = categoryList.find(({ id }) => id === name);
    console.log(categoryID);
    if (checked) {
      const productsCategoriesList = await getProductByCategory(categoryID);
      console.log(productsCategoriesList);
      return productsCategoriesList;
    }
  };

  render() {
    const { inputSearch, loading, products, categoryList } = this.state;
    const nullResult = products.length === 0;

    return (
      <div className="page-container">
        <div>
          <div>
            <p>Categorias</p>
            <div className="category-list-container">
              {categoryList.map((category) => (
                <div
                  key={ category.id }
                  data-testid="category"
                >
                  <input
                    type="checkbox"
                    id="category-checkbox"
                    name={ category.id }
                    onChange={ this.categoryCheck }
                  />
                  <label htmlFor="category-checkbox">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="search-container">
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
      </div>
    );
  }
}
