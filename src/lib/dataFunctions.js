export const transformToCamelCase = (param) => {
  const modifiedString = param.replace(/-([a-z])/g, (match, group) =>
    group.toUpperCase()
  );
  return modifiedString;
};

export const filterData = (data, filterBy, value) => {
  const filterByCamelCase = transformToCamelCase(filterBy);
  const filteredBooks = data.filter((book) => {
    return book.facts[filterByCamelCase] === value;
  });
  return filteredBooks;
};


export const sortData = (data, sortBy, sortOrder) => {
  const orderMultiplier = sortOrder === 'asc' ? 1 : -1;

  return data.slice().sort((a, b) => {
    const valueA = a.facts[sortBy];
    const valueB = b.facts[sortBy];

    const numA = parseFloat(valueA);
    const numB = parseFloat(valueB);

    return (numA - numB) * orderMultiplier;
  });
};
