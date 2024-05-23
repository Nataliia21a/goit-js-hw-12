import{a as p,i as n,S as u}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const m="43905959-78fd6b1a15a9bfecd4ebaa3d3",d="https://pixabay.com/api/";p.defaults.baseURL=d;const f=(s="dog")=>{const e={key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"};return p(`${d}`,{params:e})},y=s=>s.map(e=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}">
          <img
            class="gallery-image"
            src="${e.webformatURL}"
            alt="${e.tags}"
          />
          <ul class="gallery-card">
            <li>
              <p>likes</p>
              <p>${e.likes}</p>
            </li>
            <li>
              <p>views</p>
              <p>${e.views}</p>
            </li>
            <li>
              <p>comments</p>
              <p>${e.comments}</p>
            </li>
            <li>
              <p>downloads</p>
              <p>${e.downloads}</p>
            </li>
          </ul>
        </a>
      </li>`).join(""),g=document.querySelector(".search-form"),o=document.querySelector(".gallery"),c=document.querySelector(".loader");async function h(s){s.preventDefault();const e=s.target.elements.searchImages.value.trim();if(e===""){o.innerHTML="",s.target.reset(),n.error({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"});return}o.innerHTML="",c.classList.remove("is-hidden");try{const a=(await f(e)).data;if(a.total===0){n.error({message:"Sorry, there are no images for this query",position:"topRight",timeout:5e3,color:"red"}),s.target.reset(),c.classList.add("is-hidden");return}o.innerHTML=y(a.hits),o.style.display="flex",o.style.flexWrap="wrap",o.style.gap="20px 24px",o.style.justifyContent="center",new u(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}catch(i){n.error({message:"An error occurred while fetching images",position:"topRight",timeout:2e3,color:"red"}),console.log(i)}s.target.reset(),c.classList.add("is-hidden")}g.addEventListener("submit",h);
//# sourceMappingURL=commonHelpers.js.map
