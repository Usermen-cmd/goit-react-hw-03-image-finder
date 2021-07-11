import { Skeleton } from '@material-ui/lab';
import defaultImg from 'defaultImages/default.jpg';

import PropTypes from 'prop-types';

const ImageGallery = ({ imagesData, onClick, isLoading }) => {
  return (
    <ul className="ImageGallery">
      {imagesData.map(({ id, webformatURL, tags }) => {
        return (
          <li className="ImageGalleryItem" key={id}>
            {isLoading ? (
              <img
                src={webformatURL}
                alt={tags}
                className="ImageGalleryItem-image"
                onClick={onClick}
              />
            ) : (
              <Skeleton variant="rect" width="100%" height="260px" />
            )}
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.defaultProps = {
  imagesData: [
    {
      webformatURL: defaultImg,
    },
  ],
};

ImageGallery.propTypes = {
  imagesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ImageGallery;
