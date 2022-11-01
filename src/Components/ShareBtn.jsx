import React, { useState } from 'react';
import shareBtn from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareBtn() {
  const [linkCopied, setLinkCopied] = useState(false);
  const handleClick = () => {
    copy(window.location.href);
    setLinkCopied(true);
  };
  return (
    <div>
      <button type="button" data-testid="share-btn" onClick={ handleClick }>
        <img src={ shareBtn } alt="share-button" />
      </button>
      {linkCopied && <span>Link copied!</span>}
    </div>
  );
}
