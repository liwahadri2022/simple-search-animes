const searchBar = document.getElementById('search');
const searchBtn = document.getElementById('interact');
const searchRst = document.getElementById('reset_interact');
let textFound = document.getElementById('found');


//remove NSFW animes
const nsfw = false;

let Timer;
let array = [];


fetchApi();
array.forEach(data => {
    items_grid(data.images.jpg.image_url,data.title);
})

searchBtn.addEventListener('click', () => {
    //simple condition if user click on search bar
    searchBar.value ? fetchApi() : print('null value');
})

searchRst.addEventListener('click', () => {
    resetApi();
})


//Update gridview;
function main() {
    print('main function called');
    textFound.textContent = 'items currently founds: ' + array.length
    remove_grid();
    array.forEach(data => {
        items_grid(data.images.jpg.image_url,data.title);
    })
}

//create fetch data from api

async function fetchApi() {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchBar.value}&sfw=${nsfw}`)
    if (response.status === 200) {
        const data = await response.json();
        if (data) {
            array = []; // <- make array empty if user interact on button -JUST FIX BUG 
            // loop all data
            data.data.forEach(element => {
                array.push(element); // <- push item's in array
            });
            searchBar.value = '';
            main(); // <- call void function
        }
    } else {
        textFound.textContent = 'Failed response API';
        print('Failed response');
    }
}


//reset api to zero page

async function resetApi() {
    const response = await fetch(`https://api.jikan.moe/v4/anime?sfw=${nsfw}`)
    if (response.status === 200) {
        const data = await response.json();
        if (data) {
            array = []; // <- make array empty if user interact on button -JUST FIX BUG 
            // loop all data
            data.data.forEach(element => {
                array.push(element); // <- push item's in array
            });
            main(); // <- call void function
        }
    } else {
        print('Failed response');
    }
}


// Function create Grid;
function items_grid(source,text) {
    const seton = document.getElementById('data');
    const column = document.createElement('div');
    const card = document.createElement('div');
    const picture = document.createElement('div');
    const img = document.createElement('img');
    const container = document.createElement('div');
    const paragraphe = document.createElement('p');
    column.setAttribute('class','column');
    card.setAttribute('class','card');
    card.setAttribute('id','card');
    picture.setAttribute('class','imgAnime');
    img.setAttribute('src',source);
    img.setAttribute('style','display: bloack; width: 100%; height: 150px; object-fit: cover;');
    img.setAttribute('alt','Avatar');
    container.setAttribute('class','name');
    container.setAttribute('style','white-space: nowrap; overflow: hidden;text-overflow: ellipsis;')
    paragraphe.textContent = text;
    column.appendChild(card);
    picture.appendChild(img);
    card.appendChild(picture);
    card.appendChild(container);
    container.appendChild(paragraphe);
    seton.appendChild(column);
}



// function remove grid;
function remove_grid() {
    const querySelect = document.querySelectorAll('.column');
    querySelect.forEach(elements => {
        elements? elements.remove() : print('failed remove');
    })
}





function print(syntex) {
    return console.log(syntex);
}