import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MainContext } from '../context/MainProvider';
import '../styles/Languages.css';

function Languages({ oracleId }) {
  const { cardLanguages, getCardLanguages } = useContext(MainContext);

  useEffect(() => {
    getCardLanguages(oracleId);
  }, [oracleId]);

  if (cardLanguages.length === 0) return null;
  return (
    <ul className='card-languages'>
      <li>Languages</li>
      {cardLanguages.map((el, i) => (
        <li key={i}>
          <span>{el.printed_name}</span>
          <span className='small-box'>{el.lang}</span>
        </li>
      ))}
    </ul>
  );
}

Languages.propTypes = {
  oracleId: PropTypes.string.isRequired,
};

export default Languages;
