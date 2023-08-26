import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
// import { Button } from './Button/Button';

import Button from '@mui/material/Button';
import { fetchImg } from './Service/FetchImages';
import { Searchbar } from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    totalImgs: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      console.log(
        'повторний запуск componentDidUpdate, пішов запит на зображення ...'
      );
      const resQuery = query.slice(query.indexOf('/') + 1);
      this.handleFeachImg(resQuery, page);
    }
  }

  handleFeachImg = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const resp = await fetchImg(query, page);
      this.setState(({ images }) => ({
        images: page === 1 ? [...resp.hits] : [...images, ...resp.hits],
        totalImgs: resp.totalHits,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleSubmit = query => {
    console.log('handleSubmit: ', query);
    this.setState({ query, images: [], totalImgs: 0 });
  };

  renderButtonOnLoader = () => {
    return;
  };

  render() {
    const { images, isLoading, totalImgs } = this.state;
    const showButton = !isLoading && images.length !== totalImgs;
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
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {showButton && (
          <Button
            variant="outlined"
            sx={{
              bgcolor: `primary.light`,
              color: 'white',
              marginTop: '12px',
            }}
            onClick={this.handleLoadMore}
          >
            Load More
          </Button>
        )}
      </div>
    );
  }
}
