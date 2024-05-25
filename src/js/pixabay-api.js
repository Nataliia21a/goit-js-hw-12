import axios from 'axios';

const apiKey = '43905959-78fd6b1a15a9bfecd4ebaa3d3';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = BASE_URL;

export const fetchPhotosByQuery = (query = 'dog', page = 1, perPage = 15) => {
  const searchParams = {
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  };

  return axios(`${BASE_URL}`, {
    params: searchParams,
  });
  // return fetch(`${BASE_URL}?${searchParams}`).then(response => {
  //   if (!response.ok) {
  //     throw new Error(
  //       `Sorry, there are no images matching your search query. Please try again!`
  //     );
  //   }
  //   return response.json();
  // });
};
