import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductByQuery, getCategories, getProductByCategory } from '../services/api';

export default class Search extends Component {
  state = {
    inputSearch: '',
    products: [],
    categoryList: [],
    productStorage: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchCategories();
    const arrayStorage = JSON.parse(localStorage.getItem('id')) || [];
    this.setState({ productStorage: arrayStorage });
  }

  // Recebe o valor do input de search //
  handleChange = ({ name, value }) => {
    this.setState({
      [name]: value,
    });
  };

  // Button que tras os produtos por meio do input search //
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

  // Function que lista as categorias na barra lateral //
  fetchCategories = async () => {
    const listComplete = await getCategories();
    this.setState({ categoryList: listComplete });
  };

  // Function que tras os produtos de acordo com o click na categoria desejada //
  categoryCheck = async (event) => {
    const { target } = event;
    const { categoryList } = this.state;
    const { id } = target;
    const categoryID = categoryList.find((product) => product.id === id);
    this.setState({ loading: true });
    const productsCategoriesList = await getProductByCategory(categoryID.id);
    this.setState({
      products: productsCategoriesList,
      loading: false,
    });
  };

  enterToSubmit = (e) => {
    e.preventDefault();
    this.submitBtn();
  };

  addToCartAndLocalStorage = async (product) => {
    const { productStorage } = this.state;
    const sameId = productStorage.some(({ id }) => id === product.id);
    if (productStorage.length === 0) {
      product.qty = 1;
      this.setState({ productStorage: product });
      localStorage.setItem('id', JSON.stringify(product));
    }
    if (!sameId) {
      product.qty = 1;
      let newProductList = productStorage;
      newProductList = [...newProductList, product];
      this.setState({ productStorage: newProductList });
      localStorage.setItem('id', JSON.stringify(newProductList));
    } else {
      const newQty = productStorage.find(({ id }) => id === product.id);
      newQty.qty += 1;
      let newProductList = productStorage.filter((prod) => prod.id !== product.id);
      newProductList = [...newProductList, newQty];
      this.setState(
        ({ productStorage: newProductList }),
        localStorage.setItem('id', JSON.stringify(newProductList)),
      );
    }
  };

  render() {
    const {
      inputSearch,
      loading,
      products,
      categoryList,
    } = this.state;
    const nullResult = products.length === 0;

    return (
      <div className="page-container">
        <div>
          <div>
            <div className="category-list-container">
              <p>Categorias</p>
              {categoryList.map((category) => (
                <div
                  key={ category.id }
                  className="input-category"
                >
                  <label htmlFor={ category.id }>
                    <input
                      data-testid="category"
                      type="radio"
                      id={ category.id }
                      onChange={ this.categoryCheck }
                    />
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="search-container">
          <div>
            <form
              onSubmit={ this.enterToSubmit }
              className="search-form"
            >
              <input
                type="text"
                data-testid="query-input"
                onChange={ ({ target }) => this.handleChange(target) }
                name="inputSearch"
                value={ inputSearch }
                placeholder="Search"
              />
              <button
                type="submit"
                data-testid="query-button"
                onClick={ this.submitBtn }
              >
                Pesquisar
              </button>
            </form>
          </div>

          <section className="main-section">
            {loading && 'Carregando...'}
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </section>
          <Link
            data-testid="shopping-cart-button"
            to="/cart"
            className="link-to-cart-search"
          >
            Carrinho de compras
          </Link>

          <div>
            {nullResult ? (
              <p className="not-found">Nenhum produto foi encontrado</p>
            ) : (
              products.map((product) => (
                <div
                  key={ product.id }
                  data-testid="product"
                  className="product-container-search"
                >
                  <Link
                    to={ `/product-card/${product.id}` }
                    data-testid="product-detail-link"
                    className="product-container-link"
                  >
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p>{product.title}</p>
                    <p>{`$${product.price}`}</p>
                  </Link>
                  <button
                    type="button"
                    onClick={ () => this.addToCartAndLocalStorage(product) }
                    name={ product.title }
                    data-testid="product-add-to-cart"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
