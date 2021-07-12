import axios from 'axios';

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
  return images;
};
