import { Button } from './Button/Button';
import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
// import { Loader } from './Loader/Loader';
// import { Modal } from './Modal/Modal';
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImg } from './Service/FetchImages';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      fetchImg(query, page).then(resp => {
        console.log(resp.hits);
        this.setState(({ images }) => ({
          images: [...images, ...resp.hits],
        }));
      });
    }
  }

  handleLoadMore = () => {
    this.setState(page => ({ page: page + 1 }));
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div
        style={{
          padding: 20,
          display: 'flex',
          justifyContent: 'center',
          color: 'grey',
          backgroundColor: '#2a416f',
          alignItems: 'center',
        }}
      >
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {/* <ImageGalleryItem /> */}
        {/* <Loader /> */}
        <Button onClik={this.handleLoadMore} />
        {/* <Modal /> */}
      </div>
    );
  }
}
