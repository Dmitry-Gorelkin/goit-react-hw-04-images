import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmitQuery }) => {
  const [query, setQuery] = useState('');

  const handelInput = e => setQuery(e.target.value);

  const formSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.error('В запросе ничего нет');
      return;
    }

    onSubmitQuery(query.trim().toLowerCase());
  };

  return (
    <Header>
      <SearchForm onSubmit={formSubmit}>
        <SearchFormButton type="submit">
          <IconContext.Provider value={{ size: '25px' }}>
            <FiSearch />
          </IconContext.Provider>
          <SearchFormButtonLabel />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          placeholder="Search images and photos"
          onChange={handelInput}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmitQuery: PropTypes.func.isRequired,
};
