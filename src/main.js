import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryItemMarkup } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMoreEl = document.querySelector('.btn-load-more');

let searchImages = '';
let page = 1;
let perPage = 15;
let totalPages = '';

async function onBtnSubmit(event) {
  event.preventDefault();
  searchImages = event.target.elements.searchImages.value.trim();

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
    const response = await fetchPhotosByQuery(searchImages, page, perPage);
    const imageData = response.data;

    if (imageData.total === 0) {
      iziToast.error({
        message: 'Sorry, there are no images for this query',
        position: 'topRight',
        timeout: 3000,
        color: 'red',
      });
      event.target.reset();
      loader.classList.add('is-hidden');
      btnLoadMoreEl.classList.add('is-hidden');
      return;
    }
    galleryEl.innerHTML = createGalleryItemMarkup(imageData.hits);
    galleryEl.style.display = 'flex';
    galleryEl.style.flexWrap = 'wrap';
    galleryEl.style.gap = '20px 24px';
    galleryEl.style.justifyContent = 'center';

    totalPages = Math.ceil(imageData.totalHits / perPage);
    if (totalPages > 1) {
      btnLoadMoreEl.classList.remove('is-hidden');
    }

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

const scrollLoadMore = () => {
  const galleryItem = document.querySelector('.gallery-item:last-child');
  const rect = galleryItem.getBoundingClientRect().height;
  const scrollHight = rect * 2;
  window.scrollBy({
    top: scrollHight,
    left: 0,
    behavior: 'smooth',
  });
};

async function onBtnLoadMoreClick(event) {
  try {
    page += 1;
    loader.classList.remove('is-hidden');

    const response = await fetchPhotosByQuery(searchImages, page, perPage);
    const imageData = response.data;

    galleryEl.insertAdjacentHTML(
      'beforeend',
      createGalleryItemMarkup(imageData.hits)
    );
    loader.classList.add('is-hidden');

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

    scrollLoadMore();

    if (page >= totalPages) {
      btnLoadMoreEl.classList.add('is-hidden');
      btnLoadMoreEl.removeEventListener('click', onBtnLoadMoreClick);
      iziToast.show({
        message: `'We're sorry, but you've reached the end of search results.'`,
        position: 'topRight',
        timeout: 2000,
        color: 'green',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching images',
      position: 'topRight',
      timeout: 2000,
      color: 'red',
    });
    console.log(error);
  }
}

searchForm.addEventListener('submit', onBtnSubmit);
btnLoadMoreEl.addEventListener('click', onBtnLoadMoreClick);
