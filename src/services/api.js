export async function getCategories() {
  // Implemente aqui
  // req 1
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  // req 1
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY');
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  return data;
}

export async function getProductByQuery(query) {
  const productNameURL = encodeURI(query).replaceAll('%20', '+');
  const getProductAPI = `https://api.mercadolibre.com/sites/MLB/search?q=${productNameURL}`;
  const APIResponse = await fetch(getProductAPI);
  const { results } = await APIResponse.json();
  const response = results.map(
    ({
      id,
      title,
      price,
      thumbnail,
    }) => ({
      id,
      title,
      price,
      thumbnail,
    }),
  );
  return response;
}

export async function getProductByCategory(CATEGORY_ID) {
  const getProductAPI = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`;
  const APIResponse = await fetch(getProductAPI);
  const { results } = await APIResponse.json();
  const response = results.map(
    ({
      title,
      price,
      thumbnail,
    }) => ({
      title,
      price,
      thumbnail,
    }),
  );
  return response;
}
