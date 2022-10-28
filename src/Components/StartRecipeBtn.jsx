import React from 'react';

export default function StartRecipeBtn() {
  const getLocalInProgress = localStorage.getItem('inProgressRecipes');
  const checkBtn = () => {
    if (getLocalInProgress !== null) {
      return (
        <button
          style={ { position: 'fixed', bottom: '0px' } }
          type="button"
          data-testid="start-recipe-btn"
        >
          Continue Recipe
        </button>
      );
    }
    return (
      <button
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe

      </button>
    );
  };

  return (
    <div>
      {checkBtn()}
    </div>
  );
}
