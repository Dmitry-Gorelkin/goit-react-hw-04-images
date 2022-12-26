import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItemBox,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    imgUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modalUrl: PropTypes.string.isRequired,
  };

  state = {
    isOpenModal: false,
  };

  toglModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  render() {
    const { imgUrl, name, modalUrl } = this.props;
    const { isOpenModal } = this.state;

    return (
      <ImageGalleryItemBox onClick={this.toglModal}>
        <ImageGalleryItemImage src={imgUrl} alt={name} />

        <Modal
          modalUrl={modalUrl}
          name={name}
          isOpenModal={isOpenModal}
          onClose={this.toglModal}
        />
      </ImageGalleryItemBox>
    );
  }
}
