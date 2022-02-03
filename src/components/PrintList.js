import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { MainContext } from '../context/MainProvider';
import '../styles/PrintList.css';

function PrintList({ oracleId }) {
  const { defaultCards, getDefaultCards } = useContext(MainContext);
  const printRef = useRef();

  const printImg = {
    show: (url) => {
      printRef.current.style.backgroundImage = `url(${url})`;
      printRef.current.style.display = 'block';
    },
    hide: () => {
      printRef.current.style.display = 'none';
    },
    move: (x, y) => {
      printRef.current.style.left = `${x + 20}px`;
      printRef.current.style.top = `${y + window.scrollY}px`;
    },
  };

  useEffect(() => {
    getDefaultCards(oracleId);
  }, [oracleId]);

  return (
    <>
      <ul className='print-list'>
        <li>
          <div>Prints</div>
          <div>N</div>
          <div>F</div>
        </li>
        {defaultCards.map((el, i) => (
          <li
            key={i}
            onMouseEnter={() => printImg.show(el.image_uris.png)}
            onMouseLeave={() => printImg.hide()}
            onMouseMove={({ clientX, clientY }) => printImg.move(clientX, clientY)}
          >
            <div>
              <Link to={`/details/${el.id}`}>{el.set_name}</Link>
            </div>
            <div>{el.prices.usd && `U$${el.prices.usd}`}</div>
            <div>{el.prices.usd_foil && `U$${el.prices.usd_foil}`}</div>
          </li>
        ))}
      </ul>
      <div className='print-img-container' ref={printRef}></div>
    </>
  );
}

PrintList.propTypes = {
  oracleId: PropTypes.string.isRequired,
};

export default PrintList;
