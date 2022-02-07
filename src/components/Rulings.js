import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MainContext } from '../context/MainProvider';
import '../styles/Rulings.css';

function Rulings({ oracleId }) {
  const { cardRulings, getCardRulings } = useContext(MainContext);

  useEffect(() => {
    getCardRulings(oracleId);
  }, [oracleId]);

  if (cardRulings.length === 0) return null;
  return (
    <section className='card-rulings'>
      <h2>Rulings</h2>
      <ul>
        {cardRulings.map((el, i) => (
          <li key={i}>
            <div>{el.published_at}</div>
            <div>{el.comment}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

Rulings.propTypes = {
  oracleId: PropTypes.string.isRequired,
};

export default Rulings;
