import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  fetchSetList,
  fetchSymbolList,
  fetchDefaultById,
  fetchLanguages,
  fetchRulings,
} from '../api';

export const MainContext = createContext();

function MainProvider({ children }) {
  const [setList, setSetList] = useState([]);
  const [symbolList, setSymbolList] = useState([]);
  const [cardDetails, setCardDetails] = useState({});
  const [defaultCards, setDefaultCards] = useState([]);
  const [cardLanguages, setCardLanguages] = useState([]);
  const [cardRulings, setCardRulings] = useState([]);

  const getLists = async () => {
    const promises = [fetchSetList(), fetchSymbolList()];
    const lists = await Promise.all(promises);
    setSetList(lists[0].data);
    setSymbolList(lists[1].data);
  };

  const getCardDetails = async (id) => {
    const [cardData] = await fetchDefaultById(id);
    setCardDetails(cardData);
  };

  const getDefaultCards = async (oracleId) => {
    const cardsData = await fetchDefaultById(oracleId);
    setDefaultCards(cardsData);
  };

  const getCardLanguages = async (oracleId) => {
    const cardsData = await fetchLanguages(oracleId);
    setCardLanguages(cardsData);
  };

  const getCardRulings = async (oracleId) => {
    const cardData = await fetchRulings(oracleId);
    setCardRulings(cardData);
  };

  useEffect(() => {
    getLists();
  }, []);

  const shared = {
    setList,
    symbolList,
    cardDetails,
    getCardDetails,
    defaultCards,
    getDefaultCards,
    cardLanguages,
    getCardLanguages,
    cardRulings,
    getCardRulings,
  };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainProvider;
