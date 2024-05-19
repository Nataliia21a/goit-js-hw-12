const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '43905959-78fd6b1a15a9bfecd4ebaa3d3';

export const fetchPhotosByQuery = (query = 'dog') => {
  const searchParams = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(
        `Sorry, there are no images matching your search query. Please try again!`
      );
    }
    return response.json();
  });
};
