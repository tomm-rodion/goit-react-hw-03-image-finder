import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchImg } from './Service/FetchImages';
import { Searchbar } from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      fetchImg(query, page)
        .then(resp => {
          this.setState(({ images }) => ({
            images: [...images, ...resp.hits],
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1, isLoading: true }));
  };

  handleSubmit = query => {
    this.setState({ query, isLoading: true });
  };

  render() {
    return (
      <div
        style={{
          padding: 20,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'grey',
          backgroundColor: '#2a416f',
          alignItems: 'center',
        }}
      >
        {/* {this.state.isLoading && <Loader />} */}
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          !!this.state.images.length && <Button onClick={this.handleLoadMore} />
        )}
        {/* {this.state.isLoading && <Loader />} */}
      </div>
    );
  }
}
