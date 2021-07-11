import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { RiAlarmWarningLine } from 'react-icons/ri';
//Components
import Button from 'Components/Button/Button';
import ImageGallery from 'Components/ImageGallery/ImageGallery';
import Modal from 'Components/Modal/Modal';
import Searchbar from 'Components/Searchbar/Searchbar';
//Utils
import { getImagesData } from 'utils/fetch';
import { smoothScrollToDown } from 'utils/smoothScroll';

class ImageFinder extends Component {
  state = {
    imagesData: [],
    queryString: '',
    page: 1,
    modalImageData: null,
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: 'first-render' });
  }

  async componentDidUpdate(_, pervState) {
    const { queryString, page } = this.state;

    const isQueryStringUpdate = pervState.queryString !== queryString;
    const isPageUpdate = pervState.page !== page;

    if (isQueryStringUpdate || isPageUpdate) {
      try {
        this.setState({ isLoading: false });
        const imagesData = await getImagesData(queryString, page);
        this.setState({ isLoading: true });
        if (!imagesData.length) {
          toast.error('некорректный запрос');
          return;
        }

        if (isPageUpdate) {
          this.setState(prevState => {
            return { imagesData: [...prevState.imagesData, ...imagesData] };
          });
          smoothScrollToDown();
        }

        if (isQueryStringUpdate) {
          this.setState({ imagesData, page: 1 });
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseModal);
  }

  onSubmitForm = queryString => {
    if (!queryString) {
      toast.error('Строка поиска пуста! Введите запрос');
      return;
    }
    this.setState({ queryString });
  };

  onClickBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageClick = event => {
    const modalImageData = this.state.imagesData.find(
      el => el.webformatURL === event.target.src,
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
      <div>
        <Searchbar onSubmitForm={this.onSubmitForm} />
        {isFirstRender ? (
          <p style={{ textAlign: 'center', fontSize: '24px' }}>Что ищем..?</p>
        ) : (
          <ImageGallery
            imagesData={imagesData}
            onClick={this.onImageClick}
            isLoading={isLoading}
          />
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
      </div>
    );
  }
}

export default ImageFinder;
