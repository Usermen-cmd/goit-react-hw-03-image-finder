import { Component } from 'react';

import PropTypes from 'prop-types';

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
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            name="name"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default Searchbar;
