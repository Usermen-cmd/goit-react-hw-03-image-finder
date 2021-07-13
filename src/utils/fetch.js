import axios from 'axios';
import toast from 'react-hot-toast';

const pixaBayFetch = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '21737862-f939f5808a7d35114eed75822',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getImagesData = async (querry, page) => {
  const response = await pixaBayFetch.get(`?q=${querry}&page=${page}`);
  const images = response.data.hits;
  if (!images.length) {
    toast.error('некорректный запрос, повторите попытку');
    return images;
  }
  return images;
};
