import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../style/searchBar.css';

export default function SearchBar() {
  const [filterApi, setFilterApi] = useState('');
  const [searchinput, setSearchInput] = useState('');
  const [data, setData] = useState({});

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

  const history = useHistory();
  const { location: { pathname } } = history;

  const requestMealApi = async (param) => {
    if (filterApi === 'ingredient') {
      const endPointIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`;
      const responseIngredient = await fetch(endPointIngredient);
      const resultIngredient = await responseIngredient.json();
      setData(resultIngredient);
      console.log(data);
    } else if (filterApi === 'name') {
      const endPontName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${param}`;
      const responseName = await fetch(endPontName);
      const resultName = await responseName.json();
      setData(resultName);
      console.log(data);
    } else if (filterApi === 'letter' && searchinput.length === 1) {
      const endPointLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${param}`;
      const responseLetter = await fetch(endPointLetter);
      const resultLetter = await responseLetter.json();
      setData(resultLetter);
      console.log(data);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const requestDrinkApi = async (param) => {
    if (filterApi === 'ingredient') {
      const endPointIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`;
      const responseIngredient = await fetch(endPointIngredient);
      const resultIngredient = await responseIngredient.json();
      setData(resultIngredient);
      console.log(data);
    } else if (filterApi === 'name') {
      const endPontName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${param}`;
      const responseName = await fetch(endPontName);
      const resultName = await responseName.json();
      setData(resultName);
      console.log(data);
    } else if (filterApi === 'letter' && searchinput.length === 1) {
      const endPointLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${param}`;
      const responseLetter = await fetch(endPointLetter);
      const resultLetter = await responseLetter.json();
      setData(resultLetter);
      console.log(data);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleClick = () => (pathname.includes('meals')
    ? requestMealApi(searchinput) : requestDrinkApi(searchinput));

  return (
    <div className="searchBar-container">
      <form>
        <div className="searchBar-input">
          <label htmlFor="search">
            <input
              data-testid="search-input"
              type="text"
              id="search"
              placeholder="Faça uma busca"
              value={ searchinput }
              onChange={ handleSearchInput }
            />
          </label>
          <button
            type="button"
            onClick={ handleClick }
            data-testid="exec-search-btn"
          >
            Search
          </button>
        </div>
        <div className="searchBar-radioButton">
          <label htmlFor="ingredient">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              name="filter-radio"
              value="ingredient"
              onChange={ handleIngredientInput }
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              data-testid="name-search-radio"
              name="filter-radio"
              value="name"
              onChange={ handleNameInput }
            />
            Name
          </label>
          <label htmlFor="firstletter">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              name="filter-radio"
              value="letter"
              onChange={ handleFirstLetterInput }
            />
            First-letter
          </label>
        </div>
      </form>
    </div>
  );
}
