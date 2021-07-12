import { Component } from 'react';
import { RiAlarmWarningLine } from 'react-icons/ri';
import LinearProgress from '@material-ui/core/LinearProgress';
//Components
import Button from 'Components/Button/Button';
import ImageGallery from 'Components/ImageGallery/ImageGallery';
import Modal from 'Components/Modal/Modal';
import Searchbar from 'Components/Searchbar/Searchbar';
//Utils
import toast, { Toaster } from 'react-hot-toast';
import { getImagesData } from 'utils/fetch';
import { smoothScrollToDown } from 'utils/smoothScroll';
import isValidQuerryString from 'utils/isValidQuerryString';
//Styles
import { ImageFinderApp } from './ImageFinder.styled';

class ImageFinder extends Component {
  state = {
    imagesData: [],
    querryString: '',
    page: 1,
    modalImageData: null,
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: 'first-render' });
  }

  async componentDidUpdate(_, pervState) {
    const { querryString, page } = this.state;

    const isQuerryStringUpdate = pervState.querryString !== querryString;
    const isPageUpdate = pervState.page !== page;

    if (isQuerryStringUpdate || isPageUpdate) {
      try {
        this.setState({ isLoading: false });
        const imagesData = await getImagesData(querryString, page);
        this.setState({ isLoading: true });
        if (!imagesData.length) {
          toast.error('некорректный запрос, повторите попытку');
          return;
        }

        if (isPageUpdate) {
          this.setState(prevState => {
            return { imagesData: [...prevState.imagesData, ...imagesData] };
          });
          smoothScrollToDown();
        }

        if (isQuerryStringUpdate) {
          this.setState({ imagesData, page: 1 });
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  onSubmitForm = querryString => {
    const isValid = isValidQuerryString(querryString, this.state.querryString);
    if (isValid) this.setState({ querryString });
  };

  onClickBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageClick = ({ target }) => {
    const modalImageData = this.state.imagesData.find(
      ({ webformatURL }) => webformatURL === target.src,
    );
    this.setState({ modalImageData });
    window.addEventListener('keydown', this.onCloseModal);
  };

  onCloseModal = ({ target, type, code }) => {
    const isCloseClick = target.tagName !== 'IMG' && type === 'click';
    const isEscapePress = code === 'Escape' && type === 'keydown';

    if (isCloseClick || isEscapePress) {
      this.setState({ modalImageData: null });
      window.removeEventListener('keydown', this.onCloseModal);
    }
  };

  render() {
    const { imagesData, modalImageData, isLoading } = this.state;
    const hasImages = imagesData.length !== 0;
    const isFirstRender = isLoading === 'first-render';

    return (
      <ImageFinderApp>
        <Searchbar onSubmitForm={this.onSubmitForm} />
        {isFirstRender ? (
          <p style={{ textAlign: 'center', fontSize: '24px' }}>Что ищем..?</p>
        ) : hasImages ? (
          <ImageGallery
            imagesData={imagesData}
            onClick={this.onImageClick}
            isLoading={isLoading}
          />
        ) : (
          <LinearProgress />
        )}
        {hasImages && <Button onClick={this.onClickBtn} />}
        {modalImageData && (
          <Modal imageData={modalImageData} onClick={this.onCloseModal} />
        )}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            icon: <RiAlarmWarningLine size="30" color="red" />,
          }}
        />
      </ImageFinderApp>
    );
  }
}

export default ImageFinder;
