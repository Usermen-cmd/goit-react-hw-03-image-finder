import { Skeleton } from '@material-ui/lab';
import defaultImg from 'ImageFinder/defaultImages/default.jpg';

// import PropTypes from 'prop-types';

const ImageGallery = ({ imagesData, onClick, isLoading }) => {
  return (
    <ul className="ImageGallery">
      {imagesData.map(({ id, webformatURL = defaultImg, tags }) => {
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

export default ImageGallery;
