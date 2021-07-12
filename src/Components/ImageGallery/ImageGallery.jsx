import PropTypes from 'prop-types';
//Utils
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
//Components
import defaultImg from 'defaultImages/default.jpg';
//Styles
import {
  ImageGalleryList,
  ImageGalleryItem,
  ImageGalleryItemImage,
} from './ImageGallery.styled';

const ImageGallery = ({ imagesData, onClick, isLoading }) => {
  return (
    <ImageGalleryList>
      {imagesData.map(({ id, webformatURL, tags }) => {
        return (
          <ImageGalleryItem key={id}>
            {isLoading ? (
              <ImageGalleryItemImage
                src={webformatURL}
                alt={tags}
                onClick={onClick}
              />
            ) : (
              <SkeletonTheme color="#dbd7d7" highlightColor="#ebe7e7">
                <p>
                  <Skeleton count={1} height={260} duration={0.5} />
                </p>
              </SkeletonTheme>
            )}
          </ImageGalleryItem>
        );
      })}
    </ImageGalleryList>
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
