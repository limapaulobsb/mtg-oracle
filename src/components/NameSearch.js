import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchOracleId } from '../api';

function NameSearch() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = await fetchOracleId(input);
    navigate(`/details/${id}`);
  };

  const handleChange = ({ target: { value } }) => setInput(value);

  return (
    <form className='name-search' onSubmit={handleSubmit}>
      <input type='text' className='name-search__input' onChange={handleChange} />
      <button type='submit' className='name-search__button'>
        Search
      </button>
    </form>
  );
}

export default NameSearch;
