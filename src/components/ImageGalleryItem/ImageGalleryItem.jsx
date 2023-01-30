import { Modal } from 'components/Modal/Modal';
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  hendleToggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };
  render() {
    const { webformatURL, largeImageURL } = this.props.image;
    const { isModalOpen } = this.state;
    return (
      <>
        <li onClick={this.hendleToggleModal} className="ImageGalleryItem">
          <img
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt="img"
          />
        </li>
        {isModalOpen && (
          <Modal onClick={this.hendleToggleModal} largeImg={largeImageURL} />
        )}
      </>
    );
  }
}
