const OMDb_key = '6c66bae';
const TMDB_key = 'ea511dd3e9897ea0212c8b74fdea23c7';
const SpotifyID = '159a3880bf1f4adab3aa681bb8b33389';
const secretID = 'db95a3d882ec42c9a85b5501d82bfd33'; 
const endPointOMDb = 'http://www.omdbapi.com/';
const endPointTMDB = 'https://api.themoviedb.org/3/movie/upcoming';
const forImageTMDB = 'https://www.themoviedb.org/t/p/original';
const endPointSpotify = 'https://api.spotify.com/v1/search';

const bloccoDeiFilm = document.querySelector('#mainblock');
const films = bloccoDeiFilm.querySelectorAll('.filminsection');

const news = document.querySelector('#news');
const presentationBox = document.createElement('div');
const titleOfNews = document.createElement('h3');
const newsFilmBox = document.createElement('div');

presentationBox.id='presentation';
titleOfNews.textContent = 'Le novità da tutto il mondo in arrivo nelle nostre sale!';
newsFilmBox.id='mainNews';

news.appendChild(presentationBox);
presentationBox.appendChild(titleOfNews);
news.appendChild(newsFilmBox);


// richiedo il token con la prima richiesta
let token;
fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body: 'grant_type=client_credentials&client_id=' + SpotifyID + '&client_secret=' + secretID,
    headers:
    {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(SpotifyID + ':' + secretID)
    }
}).then(onTokenResponse).then(onTokenJson);



for(let i = 0; i<titoli.length; i++){
    // definisco la richiesta per l'API
    let  url = endPointOMDb + "?apikey=" + OMDb_key + '&t=' + titoli[i];
    fetch(url).then(onResponse).then(onJson);
    
}

const urlAllFilm = endPointTMDB + "?api_key=" + TMDB_key;
fetch(urlAllFilm).then(onResponseAll).then(onJsonAll);

function onTokenResponse(response){
    return response.json();
}

function onResponse(response){
    return response.json();
}

function onResponseSpotify(response){
    console.log(response);
    return response.json();
}

function onResponseAll(response){
    return response.json();
}


function onTokenJson(json){
    token = json.access_token;

    for(const title of titoli){
        const urlSpotify = endPointSpotify + '?query=' + title + '+soundtrack&type=playlist&limit=1';
        fetch(urlSpotify,
        {       
            headers:
                { 
                    'Authorization': 'Bearer ' + token
                }
        }).then(onResponseSpotify).then(onJsonSpotify);
    }  
}

function onJson(json){
    console.log(json);
    const string = 'Country: ' + json.Country;
  
    for(let i=0; i<titoli.length; i++){
        const titolo = films[i].querySelector('h3').textContent;

        if(titolo == json.Title){
            const bloccoDettagli = films[i].querySelector('#details');
            const details = bloccoDettagli.querySelectorAll('h6');
            details[0].textContent = string;
            details[1].textContent = 'Genre: ' + json.Genre;
            details[2].textContent = 'Time: ' + json.Runtime;
            break;
        }
    }
    
}

function onJsonSpotify(json){
    console.log(json);
    const playlist = json.playlists
    if(playlist.items.length != 0){
        
        const scelta = playlist.items[0]
        for(const film of films){
            const titlePlaylist = scelta.name;
            const titleFilm = film.querySelector('h3')

            if(titlePlaylist.indexOf(titleFilm.textContent)!==-1){
                const boxSpotify = film.querySelector('.spotify'); // primo e unico elemento di classe spotify dentro il box "film"
                
                (boxSpotify.querySelector('a')).href = (scelta.external_urls).spotify;
                boxSpotify.classList.remove('hidden');
                break;
            }
        }
    }
}


function onJsonAll(json){
    console.log(json);
    const results = json.results;
    
    for(const result of results){
        if(result.vote_average > 7.2 && result.release_date > "2021-01-01"){
            console.log(result);
            const box = document.createElement('div');
            const image = document.createElement('img');
            const title = document.createElement('h3');
            const relase = document.createElement('h6');

            box.classList.add('filminsection');
            image.src =  forImageTMDB + result.poster_path;
            image.classList.add('locandina');
            title.textContent = result.title;
            relase.textContent = 'Release date: ' + result.release_date;

            newsFilmBox.appendChild(box);
            box.appendChild(image);
            box.appendChild(title);
            box.appendChild(relase);      
        }
    }   
}
