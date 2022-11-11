/* import React, { Component } from 'react';
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
    return (
      <div>
        <p>Categorias</p>
      </div>
    );
  }
} */
