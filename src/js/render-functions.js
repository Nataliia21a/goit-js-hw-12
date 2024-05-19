'use strict';

export const createGalleryItemMarkup = images => {
  return images
    .map(
      image =>
        `
      <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}"
          />
          <ul class="gallery-card">
            <li>
              <p>likes</p>
              <p>${image.likes}</p>
            </li>
            <li>
              <p>views</p>
              <p>${image.views}</p>
            </li>
            <li>
              <p>comments</p>
              <p>${image.comments}</p>
            </li>
            <li>
              <p>downloads</p>
              <p>${image.downloads}</p>
            </li>
          </ul>
        </a>
      </li>`
    )
    .join('');
};
