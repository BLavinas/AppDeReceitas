import React from 'react';

export default function StartRecipeBtn() {
  return (
    <div>
      <button
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe

      </button>
    </div>
  );
}
