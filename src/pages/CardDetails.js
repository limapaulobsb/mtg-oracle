import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { MainContext } from '../context/MainProvider';
import PrintList from '../components/PrintList';
import '../styles/CardDetails.css';

function CardDetails() {
  const { cardDetails, getCardDetails, setList, symbolList } = useContext(MainContext);
  const { id } = useParams();

  const getSetSymbolUrl = (id) => setList.find((set) => set.id === id).icon_svg_uri;

  const renderManaCost = (manaCost) => {
    const arr = manaCost.replaceAll('}{', '},{').split(',');
    return arr.map((el, index) => {
      const url = symbolList.find(({ symbol }) => symbol === el).svg_uri;
      return <img src={url} className='symbol-svg' key={index} alt='' />;
    });
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
              <div className='mana-symbols'>{renderManaCost(cardDetails.mana_cost)}</div>
            )}
          </div>
          {cardDetails.reserved && <p>Reserved List</p>}
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
      {cardDetails.flavor_text && <em>{cardDetails.flavor_text}</em>}
      <section>
        <PrintList oracleId={cardDetails.oracle_id} />
      </section>
    </main>
  );
}

export default CardDetails;
