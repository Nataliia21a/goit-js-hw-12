import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryItemMarkup } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const searchquery = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');
const galleryEl = document.querySelector('.gallery');
const galleryItem = document.querySelector('.gallery-item');
const galleryLink = document.querySelector('.gallery-link');
const galleryImage = document.querySelector('.gallery-image');
const galleryCard = document.querySelector('.gallery-card');
const loader = document.querySelector('.loader');

function onBtnSubmit(event) {
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

  fetchPhotosByQuery(searchImages)
    .then(imageData => {
      if (imageData.total === 0) {
        iziToast.show({
          message: 'Sorry, there are no images for this query',
          position: 'topRight',
          timeout: 2000,
          color: 'red',
        });
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
    })
    .catch(error => console.log(error))
    .finally(() => {
      event.target.reset();
      loader.classList.add('is-hidden');
    });
}

searchForm.addEventListener('submit', onBtnSubmit);
