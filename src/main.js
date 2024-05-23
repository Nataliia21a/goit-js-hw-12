import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryItemMarkup } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

async function onBtnSubmit(event) {
  event.preventDefault();
  const searchImages = event.target.elements.searchImages.value.trim();

  if (searchImages === '') {
    galleryEl.innerHTML = '';
    event.target.reset();
    iziToast.error({
      message: 'Input field can not be empty',
      position: 'topRight',
      timeout: 2000,
      color: 'red',
    });
    return;
  }

  galleryEl.innerHTML = '';
  loader.classList.remove('is-hidden');

  try {
    const response = await fetchPhotosByQuery(searchImages);
    const imageData = response.data;
    if (imageData.total === 0) {
      iziToast.error({
        message: 'Sorry, there are no images for this query',
        position: 'topRight',
        timeout: 5000,
        color: 'red',
      });
      event.target.reset();
      loader.classList.add('is-hidden');
      return;
    }
    galleryEl.innerHTML = createGalleryItemMarkup(imageData.hits);
    galleryEl.style.display = 'flex';
    galleryEl.style.flexWrap = 'wrap';
    galleryEl.style.gap = '20px 24px';
    galleryEl.style.justifyContent = 'center';

    const galleryLightBox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    galleryLightBox.refresh();
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching images',
      position: 'topRight',
      timeout: 2000,
      color: 'red',
    });
    console.log(error);
  }
  event.target.reset();
  loader.classList.add('is-hidden');
}

searchForm.addEventListener('submit', onBtnSubmit);
