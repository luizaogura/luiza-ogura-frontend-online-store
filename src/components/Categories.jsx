import React, { Component } from 'react';
import { getCategories } from '../services/api';

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

  render() {
    const { list } = this.state;
    return (
      <div>
        <p>Categorias</p>
        <ul data-testid="category">
          {list.map((category) => (
            <li
              key={ category.id }
            >
              { category.name }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
