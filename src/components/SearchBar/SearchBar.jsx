import { nanoid } from 'nanoid';

import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  hendeleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(`${nanoid()}/${this.state.query}`);
    this.resetQuery();
  };

  resetQuery = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            name="query"
            value={query}
            onChange={this.hendeleChange}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
