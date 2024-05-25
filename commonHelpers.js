import{a as m,i as l,S as y}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const g of a.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&i(g)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const x="43905959-78fd6b1a15a9bfecd4ebaa3d3",f="https://pixabay.com/api/";m.defaults.baseURL=f;const L=(r="dog",e=1,o=15)=>{const i={key:x,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:o};return m(`${f}`,{params:i})},b=r=>r.map(e=>`
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
      </li>`).join(""),v=document.querySelector(".search-form"),s=document.querySelector(".gallery"),d=document.querySelector(".loader"),n=document.querySelector(".btn-load-more");let p="",c=1,h=15,u="";async function R(r){if(r.preventDefault(),p=r.target.elements.searchImages.value.trim(),p===""){s.innerHTML="",r.target.reset(),l.error({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"});return}s.innerHTML="",c=1,d.classList.remove("is-hidden");try{const o=(await L(p,c,h)).data;if(o.total===0){l.error({message:"Sorry, there are no images for this query",position:"topRight",timeout:3e3,color:"red"}),r.target.reset(),d.classList.add("is-hidden"),n.classList.add("is-hidden");return}s.innerHTML=b(o.hits),s.style.display="flex",s.style.flexWrap="wrap",s.style.gap="20px 24px",s.style.justifyContent="center",u=Math.ceil(o.totalHits/h),u>1&&n.classList.remove("is-hidden"),c>=u&&(n.classList.add("is-hidden"),l.show({message:"'We're sorry, but you've reached the end of search results.'",position:"topRight",timeout:2e3,color:"green"})),new y(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}catch(e){l.error({message:"An error occurred while fetching images",position:"topRight",timeout:2e3,color:"red"}),console.log(e)}r.target.reset(),d.classList.add("is-hidden")}const S=()=>{const o=document.querySelector(".gallery-item:last-child").getBoundingClientRect().height*2;window.scrollBy({top:o,left:0,behavior:"smooth"})};async function w(r){try{c+=1,d.classList.remove("is-hidden");const o=(await L(p,c,h)).data;s.insertAdjacentHTML("beforeend",b(o.hits)),d.classList.add("is-hidden"),s.style.display="flex",s.style.flexWrap="wrap",s.style.gap="20px 24px",s.style.justifyContent="center",new y(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh(),S(),c>=u&&(n.classList.add("is-hidden"),n.removeEventListener("click",w),l.show({message:"'We're sorry, but you've reached the end of search results.'",position:"topRight",timeout:2e3,color:"green"}))}catch(e){l.error({message:"An error occurred while fetching images",position:"topRight",timeout:2e3,color:"red"}),console.log(e)}}v.addEventListener("submit",R);n.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
