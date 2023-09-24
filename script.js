const accessKey = "5TKYIt81cYr876iJ3Vk6ESgp5KUrlWyTEW1HzS3GYzo";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }

    
    const results = data.results

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imagelink = document.createElement("a");
        imagelink.href=result.links.html;
        imagelink.target = "_blank"; // Opens link in new tab

        imagelink.appendChild(image); // place the image inside the a tag

        searchResult.appendChild(imagelink);
    })
    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault(); // prevent the default feature when we submit the form
    page = 1;  // Page will be one every time we enter a new keyword
    searchImages();
})

showMoreBtn.addEventListener("click", ()=> {
    page++;   // Incrementing by +1 to get next set of images from API
    searchImages();
})