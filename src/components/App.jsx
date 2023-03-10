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
    totalImgs: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.handleFeachImg(query, page);
      // fetchImg(query, page)
      //   .then(resp => {
      //     this.setState(({ images }) => ({
      //       images: page === 1 ? [...resp.hits] : [...images, ...resp.hits],
      //       totalImgs: resp.totalHits,
      //     }));
      //   })
      //   .finally(() => {
      //     this.setState({ isLoading: false });
      //   });
    }
  }
  //метод публічного класу handleFeachImg на asinc/awit
  handleFeachImg = async (query, page) => {
    try {
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
    this.setState(({ page }) => ({ page: page + 1, isLoading: true }));
  };

  handleSubmit = query => {
    this.setState({ query, isLoading: true });
  };
  renderButtonOnLoader = () => {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      this.state.images.length !== 0 &&
        this.state.images.length < this.state.totalImgs && (
          <Button onClick={this.handleLoadMore} />
        )
    );
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
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.renderButtonOnLoader()}
      </div>
    );
  }
}
