import React, { Component } from 'react';
import { getCategories, getProductByCategory } from '../services/api';

export default class Categories extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ list: categoriesList });
  };

  categoryCheck = async ({ target }) => {
    const { list } = this.state;
    const { checked, name } = target;
    const categoryID = list.find(({ id }) => id === name);
    if (checked) {
      const productsCategoriesList = await getProductByCategory(categoryID);
      return productsCategoriesList;
    }
  };

  render() {
    const { list } = this.state;
    return (
      <div>
        <p>Categorias</p>
        <div className="category-list-container">
          {list.map((category) => (
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
    );
  }
}
