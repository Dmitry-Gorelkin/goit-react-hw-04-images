import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import {
  ImageGalleryItemBox,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imgUrl, name, modalUrl }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toglModal = () => {
    setIsOpenModal(pS => !pS);
  };

  return (
    <ImageGalleryItemBox onClick={toglModal}>
      <ImageGalleryItemImage src={imgUrl} alt={name} />

      <Modal
        modalUrl={modalUrl}
        name={name}
        isOpenModal={isOpenModal}
        onClose={toglModal}
      />
    </ImageGalleryItemBox>
  );
};

ImageGalleryItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modalUrl: PropTypes.string.isRequired,
};
