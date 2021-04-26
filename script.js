
function show(event) {
    const elem = event.currentTarget;
    elem.textContent = elem.textContent == "Visualizza meno dettagli" ? "Visualizza più dettagli" : "Visualizza meno dettagli";
    elem.parentNode.querySelector('div').classList.toggle('hidden');
}

function searchLetter(event){
    const barra = event.currentTarget;
    const movies = container.querySelectorAll('.filminsection'); // container = #mainblock
    
    for(const movie of movies){
        const title = movie.querySelector('h3');
        const text = (title.textContent).toUpperCase();
        if(text.search((barra.value).toUpperCase())!== -1){
            movie.classList.remove('hidden');
        }
        else{
            movie.classList.add('hidden');
        }
    }

}

const mainPref = document.querySelector('#preferiti');
const buy = document.createElement('a');
buy.textContent = 'Clicca qui per comprare i biglietti';
mainPref.appendChild(buy);

const favourites = [];

function addPreff(event){

    event.currentTarget.classList.remove('unchecked');
    const film = event.currentTarget.parentNode; // film e' tutto il blocco immagine , icona, titolo, regista, visualizza dettagli
    const title = film.querySelector('h3');

    if(!favourites.includes(title.textContent)){
        favourites.push(title.textContent);
        const images = film.querySelectorAll('img');
        
        /* la section al caricamento della pagine ha la classe hidden quindi , quando  si esegue addPreff 
        si controlla se stiamo effettuando il primo inserimento  e in caso affermativo, 
        si deve rimuovere la classe hidden dalla sezione #prefeirti per rendere la sezione visibile*/
        if(favourites.length === 1){ 
            mainPref.classList.remove('hidden'); // mainPref = #preferiti
        }

        const boxPref = document.createElement('div');
        boxPref.classList.add('filminsection');
        mainPref.appendChild(boxPref);

        const imgPref = document.createElement('img');
        imgPref.src = images[0].src;
        imgPref.classList.add('locandina');
        boxPref.appendChild(imgPref);

        const remove = document.createElement('img');
        remove.src = "remove.png";
        remove.classList.add('othericon');
        remove.addEventListener("click", removePreff);
        boxPref.appendChild(remove);

        const titPref = document.createElement('h3');
        titPref.textContent = title.textContent;
        boxPref.appendChild(titPref);
    }
}

function removePreff(event){
    const boxFilmPref = event.currentTarget.parentNode;
    const mainboxPr = boxFilmPref.parentNode
    boxFilmPref.remove(); // piuttosto che usare boxFilmPref.parentNode.removeChild(boxFilmPref)
    
    const title = boxFilmPref.querySelector('h3');
    favourites.splice(favourites.indexOf(title.textContent), 1); 

    if(favourites.length === 0){ // ad ogni rimozione controllo che favourites non si sia svuotato del tutto, quando si svuota tutto allara nascondo la sezioen #preferiti
        mainboxPr.classList.add('hidden');
    }

    const films = container.querySelectorAll('h3'); //container = #mainblock

    for(const film of films){
        if(film.textContent === title.textContent){
            const icon = film.parentNode.querySelector('.othericon');
            icon.classList.add('unchecked');
            break;
        }
    }
}  

const section = document.querySelector('#dinamicSection');

const searchBox = document.createElement('div');
searchBox.id='searchBar';
section.appendChild(searchBox);

const presentation = document.createElement('h3');
presentation.textContent = "Tutti i titoli di questo mese!";
searchBox.appendChild(presentation);

const search = document.createElement('input');
search.placeholder="Search..";
search.addEventListener('keyup', searchLetter);
searchBox.appendChild(search);

const insection = document.createElement('div');
insection.id = 'mainblock';
section.appendChild(insection);

const container = document.querySelector('#mainblock');

for(let i = 0; i<titoli.length; i++){

    const newBox = document.createElement('div');
    newBox.classList.add('filminsection');
    container.appendChild(newBox);

    const newImg = document.createElement('img');
    newImg.src = immagini[i];
    newImg.classList.add('locandina');
    newBox.appendChild(newImg);

    const pref = document.createElement('img');
    pref.src = "pixeldino.png"
    pref.classList.add('othericon');
    pref.classList.add('unchecked');
    pref.addEventListener("click", addPreff);
    newBox.appendChild(pref);

    const newH3 = document.createElement('h3');
    newH3.textContent = titoli[i];
    newBox.appendChild(newH3);

    const newH5 = document.createElement('h5');
    newH5.textContent = "Regista: " + regista[i];
    newBox.appendChild(newH5); 
    
    const newShow = document.createElement('h6');
    newShow.classList.add('underline');
    newShow.textContent = "Visualizza più dettagli";
    newShow.classList.add('information');
    newShow.addEventListener("click", show);
    newBox.appendChild(newShow);
    
    const more = document.createElement('div')
    more.id='details';
    more.classList.add('hidden');
    more.classList.add('overflow');
    newBox.appendChild(more);

    const country = document.createElement('h6');
    more.appendChild(country);
    const genre = document.createElement('h6');
    more.appendChild(genre);
    const runtime = document.createElement('h6');
    more.appendChild(runtime);

    const spotify = document.createElement('div');
    spotify.classList.add('spotify');
    spotify.classList.add('hidden');
    more.appendChild(spotify);
    const soundTrack = document.createElement('a');
    soundTrack.textContent = 'Soundtrack on Spotify';
    spotify.appendChild(soundTrack);
    const imgSoundTrack = document.createElement('img');
    imgSoundTrack.src = 'spotify.png'
    soundTrack.appendChild(imgSoundTrack);
    
    const newP = document.createElement('p');
    newP.textContent = "Trama: " + trama[i];
    more.appendChild(newP);
    
}
