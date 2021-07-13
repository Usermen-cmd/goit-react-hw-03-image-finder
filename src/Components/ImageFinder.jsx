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
import { ImageFinderApp } from './ImageFinder.styles';

class ImageFinder extends Component {
  state = {
    imagesData: [],
    querryString: '',
    page: 1,
    modalImageData: null,
    status: null,
  };

  componentDidMount() {
    this.setState({ status: 'idle' });
  }

  async componentDidUpdate(_, prevState) {
    const { querryString, page } = this.state;

    const isQuerryStringUpdate = prevState.querryString !== querryString;
    const isPageUpdate = prevState.page !== page;

    if (isQuerryStringUpdate || isPageUpdate) {
      try {
        this.setState({ status: 'pending' });
        const imagesData = await getImagesData(querryString, page);
        this.setState({ status: 'resolve' });
        // if (!imagesData.length) {
        //   toast.error('некорректный запрос, повторите попытку');
        //   return;
        // }

        if (isPageUpdate) {
          this.setState(prevState => {
            return {
              imagesData: [...prevState.imagesData, ...imagesData],
            };
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
    const { imagesData, modalImageData, status } = this.state;
    const hasImage = imagesData.length > 0;
    const isResolve = status === 'resolve';
    const isIdle = status === 'idle';
    const isPending = status === 'pending';

    return (
      <ImageFinderApp>
        <Searchbar onSubmitForm={this.onSubmitForm} />
        {isIdle && (
          <p style={{ textAlign: 'center', fontSize: '24px' }}>Что ищем..?</p>
        )}
        {hasImage && (
          <ImageGallery
            imagesData={imagesData}
            onClick={this.onImageClick}
            status={isResolve}
          />
        )}
        {isPending && !hasImage && <LinearProgress />}
        {hasImage && <Button onClick={this.onClickBtn} />}
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
