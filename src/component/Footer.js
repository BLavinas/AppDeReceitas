import React from 'react';
import { Link } from 'react-router-dom';

import '../style/footer.css';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div>
      <footer data-testid="footer" className="generalFooter">
        <div className="Container-footer">
          <Link to="/drinks">
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
              alt="Link para pagina de bebidas"
            />
          </Link>
          <Link to="/meals">
            <img
              src={ mealIcon }
              alt="Link para pagina de bebidas"
              data-testid="meals-bottom-btn"
            />
          </Link>
        </div>
      </footer>
    </div>
  );
}
