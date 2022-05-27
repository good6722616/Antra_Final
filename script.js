const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const result_number = document.getElementById('result-number');
const loader = document.querySelector("#loading");




// const apiURL = 'https://itunes.apple.com/search?term=${artist}&media=music&entity=album&attribute=artistTerm&limit=200';

//search by artist name
async function searchAlbums(term){
    displayLoading()
    const res = await fetchJsonp(`https://itunes.apple.com/search?term=${term}&media=music&entity=album&attribute=artistTerm&limit=200`);
    const data = await res.json();
    // console.log(data);

    
    result_number.innerHTML =  ` ${data.resultCount} results found `;


    const albums = await data.results;
    hideLoading()
    showData(albums);
}


function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

function hideLoading() {
    loader.classList.remove("display");
}





//show album in DOM
function showData(albums) {
    result.innerHTML = "";
    albums.forEach((album) => {
        const albumEl = document.createElement("div");
        albumEl.classList.add("album");
        albumEl.innerHTML=
        `
            <img
                src = "${album.artworkUrl100}"
                alt="${album.collectionName}"
            />
            <div class="album-info">
                <h2>${album.collectionName};
            </div>
        `;
        result.appendChild(albumEl);
    });
}

//Event Listeners
form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const searchTerm = search.value.trim();
    // console.log(searchTerm);

    if(!searchTerm){
        alert('Please type in Aritst Name');

    }else{
        searchAlbums(searchTerm);

    }
})