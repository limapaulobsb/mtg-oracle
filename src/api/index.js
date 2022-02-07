const host = 'localhost:3000';

export const fetchOracleId = async (name) => {
  const data = await fetch(`http://${host}/api/v1/oracle?n=${name}`);
  const result = await data.json();
  return result;
};

export const fetchDefaultById = async (id) => {
  const data = await fetch(`http://${host}/api/v1/default/${id}`);
  const result = await data.json();
  return result;
};

export const fetchLanguages = async (oracleId) => {
  const data = await fetch(`http://${host}/api/v1/lang/${oracleId}`);
  const result = await data.json();
  return result;
};

export const fetchRulings = async (oracleId) => {
  const data = await fetch(`http://${host}/api/v1/rulings/${oracleId}`);
  const result = await data.json();
  return result;
};

export const fetchSetList = async () => {
  const data = await fetch('https://api.scryfall.com/sets');
  const result = await data.json();
  return result;
};

export const fetchSymbolList = async () => {
  const data = await fetch('https://api.scryfall.com/symbology');
  const result = await data.json();
  return result;
};
