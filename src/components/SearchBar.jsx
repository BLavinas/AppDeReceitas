import React, { useState, useEffect } from 'react';
// import { Placeholder } from "react-bootstrap";

export default function SearchBar() {
  const [filterApi, setFilterApi] = useState('');
  const [searchinput, setSearchInput] = useState('');
  const [data, setData] = useState('');

  const handleIngredientInput = ({ target: { value } }) => {
    setFilterApi(value);
  };

  const handleNameInput = ({ target: { value } }) => {
    setFilterApi(value);
  };

  const handleFirstLetterInput = ({ target: { value } }) => {
    setFilterApi(value);
  };

  const handleSearchInput = ({ target: { value } }) => {
    setSearchInput(value);
  };

  const requestApi = async (param) => {
    if (filterApi === 'ingredient') {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`;
      const responseIngredient = await fetch(endPointIngredient);
      const resultIngredient = await responseIngredient.json();
      setData(resultIngredient);
    }
    if (filterApi === 'name') {
      const endPontName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`;
      const responseName = await fetch(endPontName);
      const resultName = await responseName.json();
      setData(resultName);
    }
    if (filterApi === 'letter' && searchinput.length === 1) {
      const endPointLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${param}`;
      const responseLetter = await fetch(endPointLetter);
      const resultLetter = await responseLetter.json();
      setData(resultLetter);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  useEffect(() => {
    requestApi(searchinput);
  }, []);

  return (
    <div>
      <form>
        <label htmlFor="search">
          Search
          <input
            type="text"
            id="search"
            placeholder="Faça uma busca"
            value={ searchinput }
            onChange={ handleSearchInput }
          />
        </label>

        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="ingredient-search"
            value="ingredient"
            onChange={ handleIngredientInput }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            name="search-name"
            value="name"
            onChange={ handleNameInput }
          />
        </label>
        <label htmlFor="firstletter">
          First-letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="first-letter"
            value="letter"
            onChange={ handleFirstLetterInput }
          />
        </label>
        <button type="button" data-testid="exec-search-btn">
          Search
        </button>
      </form>
    </div>
  );
}
