import React, { useState } from 'react';

const copy = require('clipboard-copy');

export default function ShareBtn() {
  const [linkCopied, setLinkCopied] = useState(false);
  const handleClick = () => {
    copy(window.location.href);
    setLinkCopied(true);
  };
  return (
    <div>
      <button type="button" data-testid="share-btn" onClick={ handleClick }>Share</button>
      {linkCopied && <span>Link copied!</span>}
    </div>
  );
}
