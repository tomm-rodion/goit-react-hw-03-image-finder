import { nanoid } from 'nanoid';

import React, { Component } from 'react';
import { Form, ButtonSearchImg } from './Searchbar.styled';

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
        <Form onSubmit={this.handleSubmit}>
          <ButtonSearchImg type="submit">
            <span>Search</span>
          </ButtonSearchImg>
          <input
            name="query"
            value={query}
            onChange={this.hendeleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </header>
    );
  }
}
