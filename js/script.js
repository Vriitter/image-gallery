const imagesWrapper = document.querySelector('.images');
const loadMoreBtn = document.querySelector('.load-more');

const apiKey = "A3V9J66Wq8vD4mzygAQswTL95xwo8BdFyVkpDY1ZUcziZuXVGtDRnpz9";
const perPage = 15;
let currentPage = 1;

const generateHTML = (images) => {
   imagesWrapper.innerHTML += images.map(img => 
      `<li class="card">
            <img src="${img.src.large2x}" alt="img">
            <div class="details">
               <div class="photographer">
                  <i class="uil uil-camera"></i>
                  <span>${img.photographer}</span>
               </div>
               <button>
                  <i class="uil uil-import"></i>
               </button>
            </div>
         </li>`
   ).join("");
}

const getImages = (apiURL) => {
   loadMoreBtn.innerText = 'Loading...';
   loadMoreBtn.classList.add('disabled');
   fetch(apiURL, {
      headers: { Authorization: apiKey }
   }).then(res => res.json()).then(data => {
      generateHTML(data.photos);
      loadMoreBtn.innerText = 'Load More';
      loadMoreBtn.classList.remove('disabled');
   })
}

const loadMoreImages = () => {
   currentPage++;
   let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`;
   getImages(apiURL);
}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`);
loadMoreBtn.addEventListener('click', loadMoreImages);