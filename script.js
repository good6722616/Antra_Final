const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const result_number = document.getElementsByClassName('result-number');




// const apiURL = 'https://itunes.apple.com/search?term=${artist}&media=music&entity=album&attribute=artistTerm&limit=200';

//search by artist name
async function searchAlbums(term){
    const res = await fetchJsonp(`https://itunes.apple.com/search?term=${term}&media=music&entity=album&attribute=artistTerm&limit=200`);
    const data = await res.json();
    console.log(data);

    // result_number.innerHTML=`${length} results were found`;
    showData(data.results);
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
    console.log(searchTerm);

    if(!searchTerm){
        alert('Please type in search term');

    }else{
        searchAlbums(searchTerm);

    }
})