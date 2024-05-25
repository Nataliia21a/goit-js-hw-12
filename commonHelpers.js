import{a as y,i as l,S as h}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function s(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=s(t);fetch(t.href,a)}})();const x="43905959-78fd6b1a15a9bfecd4ebaa3d3",f="https://pixabay.com/api/";y.defaults.baseURL=f;const L=(r="dog",e=1,s=15)=>{const i={key:x,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:s};return y(`${f}`,{params:i})},b=r=>r.map(e=>`
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
      </li>`).join(""),v=document.querySelector(".search-form"),o=document.querySelector(".gallery"),n=document.querySelector(".loader"),d=document.querySelector(".btn-load-more");let p="",c=1,g=15,m="";async function S(r){if(r.preventDefault(),p=r.target.elements.searchImages.value.trim(),p===""){o.innerHTML="",r.target.reset(),l.error({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"});return}o.innerHTML="",c=1,n.classList.remove("is-hidden");try{const s=(await L(p,c,g)).data;if(s.total===0){l.error({message:"Sorry, there are no images for this query",position:"topRight",timeout:3e3,color:"red"}),r.target.reset(),n.classList.add("is-hidden"),d.classList.add("is-hidden");return}o.innerHTML=b(s.hits),o.style.display="flex",o.style.flexWrap="wrap",o.style.gap="20px 24px",o.style.justifyContent="center",m=Math.ceil(s.totalHits/g),m>1&&d.classList.remove("is-hidden"),new h(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}catch(e){l.error({message:"An error occurred while fetching images",position:"topRight",timeout:2e3,color:"red"}),console.log(e)}r.target.reset(),n.classList.add("is-hidden")}const B=()=>{const s=document.querySelector(".gallery-item:last-child").getBoundingClientRect().height*2;window.scrollBy({top:s,left:0,behavior:"smooth"})};async function w(r){try{c+=1,n.classList.remove("is-hidden");const s=(await L(p,c,g)).data;o.insertAdjacentHTML("beforeend",b(s.hits)),n.classList.add("is-hidden"),o.style.display="flex",o.style.flexWrap="wrap",o.style.gap="20px 24px",o.style.justifyContent="center",new h(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),B(),c>=m&&(d.classList.add("is-hidden"),d.removeEventListener("click",w),l.show({message:"'We're sorry, but you've reached the end of search results.'",position:"topRight",timeout:5e3,color:"green"}))}catch(e){l.error({message:"An error occurred while fetching images",position:"topRight",timeout:2e3,color:"red"}),console.log(e)}}v.addEventListener("submit",S);d.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
