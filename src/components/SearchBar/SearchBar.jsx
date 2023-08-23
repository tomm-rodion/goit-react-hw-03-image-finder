import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
            sx={{ bgcolor: `primary.light`, color: 'white', margin: '8px' }}
          >
            <span>Search</span>
          </Button>
          <TextField
            sx={{
              borderRadius: '4px',
            }}
            variant="outlined"
            label="Search images and photos"
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
