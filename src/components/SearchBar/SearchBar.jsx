import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import React, { Component } from 'react';
// import { Form, InputSearchBar } from './Searchbar.styled';

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
      <header>
        <form onSubmit={this.handleSubmit}>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            type="submit"
            sx={{ bgcolor: `primary.light`, color: 'white' }}
          >
            <span>Search</span>
          </Button>
          <input
            name="query"
            value={query}
            onChange={this.hendeleChange}
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
