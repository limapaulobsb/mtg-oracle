import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { MainContext } from '../context/MainProvider';
import Rulings from '../components/Rulings';
import Printings from '../components/Printings';
import Languages from '../components/Languages';
import '../styles/CardDetails.css';

function CardDetails() {
  const { cardDetails, getCardDetails, setList, symbolList } = useContext(MainContext);
  const { id } = useParams();

  const getSetSymbolUrl = (setId) => setList.find(({ id }) => id === setId).icon_svg_uri;

  const renderManaCost = (manaCost) => {
    const arr = manaCost.replaceAll('}{', '},{').split(',');
    return arr.map((el, index) => {
      const manaSymbol = symbolList.find(({ symbol }) => symbol === el);
      return (
        <img
          src={manaSymbol.svg_uri}
          className='symbol-svg'
          key={index}
          alt={manaSymbol.english}
        />
      );
    });
  };

  const renderLegality = (status) => {
    if (status === 'legal') return <span className='small-box bg-green'>Legal</span>;
    else if (status === 'not_legal') return <span className='small-box'>Not Legal</span>;
    else if (status === 'banned') return <span className='small-box bg-red'>Banned</span>;
    else if (status === 'restricted')
      return <span className='small-box bg-blue'>Restricted</span>;
  };

  useEffect(() => {
    getCardDetails(id);
  }, [id]);

  if (
    Object.keys(cardDetails).length === 0 ||
    setList.length === 0 ||
    symbolList.length === 0
  )
    return null;

  return (
    <main>
      <section className='card-details'>
        <div>
          <img src={cardDetails.image_uris.png} className='card-image' alt='Card Image' />
        </div>
        <div
          className='card-text'
          style={{ backgroundImage: `url('${getSetSymbolUrl(cardDetails.set_id)}')` }}
        >
          <div>
            <h2>{cardDetails.name}</h2>
            {cardDetails.mana_cost && (
              <div className='mana-symbols-container'>
                {renderManaCost(cardDetails.mana_cost)}
              </div>
            )}
          </div>
          {cardDetails.reserved && <span className='small-box'>Reserved List</span>}
          <div>
            <h4>{cardDetails.type_line}</h4>
            {cardDetails.power && (
              <strong>{`${cardDetails.power}/${cardDetails.toughness}`}</strong>
            )}
          </div>
          <pre>{cardDetails.oracle_text}</pre>
          <div>
            <p>{cardDetails.set_name}</p>
            <p>{`Illustrated by  ${cardDetails.artist}`}</p>
          </div>
        </div>
      </section>
      {cardDetails.flavor_text && cardDetails.lang === 'en' && (
        <pre>{cardDetails.flavor_text}</pre>
      )}
      <div className='legalities'>
        <div>
          <span>Standard</span>
          {renderLegality(cardDetails.legalities.standard)}
        </div>
        <div>
          <span>Pioneer</span>
          {renderLegality(cardDetails.legalities.pioneer)}
        </div>
        <div>
          <span>Modern</span>
          {renderLegality(cardDetails.legalities.modern)}
        </div>
        <div>
          <span>Legacy</span>
          {renderLegality(cardDetails.legalities.legacy)}
        </div>
        <div>
          <span>Vintage</span>
          {renderLegality(cardDetails.legalities.vintage)}
        </div>
        <div>
          <span>Pauper</span>
          {renderLegality(cardDetails.legalities.pauper)}
        </div>
        <div>
          <span>Commander</span>
          {renderLegality(cardDetails.legalities.commander)}
        </div>
        <div>
          <span>Brawl</span>
          {renderLegality(cardDetails.legalities.brawl)}
        </div>
      </div>
      <section className='more-details'>
        <Printings oracleId={cardDetails.oracle_id} />
        <Languages oracleId={cardDetails.oracle_id} />
      </section>
      <Rulings oracleId={cardDetails.oracle_id} />
    </main>
  );
}

export default CardDetails;
