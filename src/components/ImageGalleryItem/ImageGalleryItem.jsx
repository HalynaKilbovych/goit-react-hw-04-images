import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ item: { webformatURL, tags }, onClick }) {
  return (
    <GalleryItem onClick={onClick}>
      <img src={webformatURL} alt={tags} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};