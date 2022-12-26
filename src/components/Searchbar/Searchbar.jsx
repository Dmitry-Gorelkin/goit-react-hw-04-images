import { Component } from 'react';
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

export class Searchbar extends Component {
  static propTypes = {
    onSubmitQuery: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handelInput = e => {
    this.setState({
      query: e.target.value,
    });
  };

  formSubmit = e => {
    e.preventDefault();
    const { query } = this.state;

    if (query.trim() === '') {
      toast.error('В запросе ничего нет');
      return;
    }

    this.props.onSubmitQuery(query.trim().toLowerCase());
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.formSubmit}>
          <SearchFormButton type="submit">
            <IconContext.Provider value={{ size: '25px' }}>
              <FiSearch />
            </IconContext.Provider>
            <SearchFormButtonLabel />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            placeholder="Search images and photos"
            onChange={this.handelInput}
          />
        </SearchForm>
      </Header>
    );
  }
}
