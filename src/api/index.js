const host = 'localhost:3000';

export const fetchDefaultById = async (id) => {
  const data = await fetch(`http://${host}/api/v1/default/${id}`);
  const result = await data.json();
  // console.log(result);
  return result;
};

export const fetchAllById = async (id) => {
  const data = await fetch(`http://${host}/api/v1/allcards/${id}`);
  const result = await data.json();
  // console.log(result);
  return result;
};

export const fetchOracleId = async (name) => {
  const data = await fetch(`http://${host}/api/v1/oracle?n=${name}`);
  const result = await data.json();
  // console.log(result);
  return result;
};

export const fetchSetList = async () => {
  const data = await fetch('https://api.scryfall.com/sets');
  const result = await data.json();
  // console.log(result);
  return result;
};

export const fetchSymbolList = async () => {
  const data = await fetch('https://api.scryfall.com/symbology');
  const result = await data.json();
  // console.log(result);
  return result;
};
