import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { fetchAllById, fetchDefaultById, fetchSetList, fetchSymbolList } from '../api';

export const MainContext = createContext();

function MainProvider({ children }) {
  const [setList, setSetList] = useState([]);
  const [symbolList, setSymbolList] = useState([]);
  const [cardDetails, setCardDetails] = useState({});
  const [defaultCards, setDefaultCards] = useState([]);
  const [allCards, setAllCards] = useState([]);

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

  const getAllCards = async (oracleId) => {
    const cardsData = await fetchAllById(oracleId);
    setAllCards(cardsData);
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
    allCards,
    getAllCards,
  };

  return <MainContext.Provider value={{ ...shared }}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainProvider;
