import { Component } from 'react';
import PropTypes from 'prop-types';
//Styles
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styles';

class Searchbar extends Component {
  state = {
    value: '',
  };

  onInputChange = event => {
    const value = event.target.value;
    this.setState({ value });
  };

  onSubmit = event => {
    const normalizeString = this.state.value.trim();
    event.preventDefault();
    this.props.onSubmitForm(normalizeString);
    this.setState({ value: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            name="name"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.onInputChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default Searchbar;
