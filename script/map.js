//Gets where to print content
const text1 = document.querySelector('#text1');
const text2 = document.querySelector('#text2');
const list = document.querySelector('#list');

//Switches JSON file
const btnted = document.querySelector("#btnted");
const btnzodiac= document.querySelector("#btnzodiac");
const btnramirez = document.querySelector("#btnramirez");
const btnmiyazaki = document.querySelector("#btnmiyazaki");
const btnmanson = document.querySelector("#btnmanson");


// Gets new markers in array
let map;
let markers = [];

//Switches between jsons
btnzodiac.onclick = (evt) => {
    evt.preventDefault();

    //Removes prev. markers
    for(const mark of markers) {
        mark.remove();
    }

    jsonfil = "https://jonmagneaaj.github.io/Tema5-API-Innlevering/json/zodiac.json";
    lesMap();
}
btnted.onclick = (evt) => {
    evt.preventDefault();

    for(const mark of markers) {
        mark.remove();
    }

    jsonfil = "./json/ted.json";
    lesMap();
}
btnmanson.onclick = (evt) => {
    evt.preventDefault();

    for(const mark of markers) {
        mark.remove();
    }

    jsonfil = "https://jonmagneaaj.github.io/Tema5-API-Innlevering/json/manson.json";
    lesMap();
}
btnmiyazaki.onclick = (evt) => {
    evt.preventDefault();

    for(const mark of markers) {
        mark.remove();
    }

    jsonfil = "https://jonmagneaaj.github.io/Tema5-API-Innlevering/json/miyazaki.json";
    lesMap();
}
btnramirez.onclick = (evt) => {
    evt.preventDefault();

    for(const mark of markers) {
        mark.remove();
    }

    jsonfil = "https://jonmagneaaj.github.io/Tema5-API-Innlevering/json/ramirez.json";
    lesMap();
}

// Default json file
let jsonfil = "https://jonmagneaaj.github.io/Tema5-API-Innlevering/json/ted.json";

//JSON info
const lesMap = async () => {

    //Removes previous list
    list.innerHTML = ``;

    // Get json file
    const jsonres = await fetch(jsonfil, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      });
    const json = await jsonres.json();

    //zoom and center
    let zoom = json.zoom;
    let center = json.center;


    // Map
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ubWFnbmVhaiIsImEiOiJjazUzbHU2a2MwOXpuM2dvNDU5Y3dsYWcxIn0.XienIjNlif4OkJWKgd2u0A';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
    });

    map.flyTo({
        center: center,
        zoom: zoom,
        speed: 0.5
    })


    //Adds navigation controlls 
    map.addControl(new mapboxgl.NavigationControl());


    //Text from json
    const content1 = json.text1;
    const content2 = json.text2;
    const content3 = json.text3;
    const name = json.name;

    //print text
    text1.innerHTML = `
        <h1>${name}</h1>
        <br>
        ${content1} 
        <br>
        <h2 class='title'>The victims:</h2>`;
    text2.innerHTML = `
        ${content2}
        <br>
        <br>
        <h2 class='title'>End:</h2>
        <br>
        ${content3}
        `;

    // Map markers
    json.features.forEach(function(marker) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        const popup = new mapboxgl.Popup({ offset: 0 }).setHTML(
            `
            <div class='marker-container'>
                <div class='marker-popup-img'>
                    <img src='${marker.properties.img}' alt='Image of ${marker.properties.name}'>
                </div>
                <div id='marker-popup-info'>
                    <h3> <b>Name:</b> ${marker.properties.name}</h3>
                    <h3> <b>Age:</b> ${marker.properties.age}</h3>
                    <h3> <b>Date:</b> ${marker.properties.when}</h3>
                    <h3> <b>cause of death:</b> ${marker.properties.weapon}</h3>
                </div>
            </div>
            ${marker.properties.how}
            `
            );

        const mark = new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map)
            .setPopup(popup);

        markers.push(mark);

        //Makes a list under the map that shows an overview of victims
        const liste = () =>{
        list.innerHTML += `
            <div data-point='${marker.geometry.coordinates}' class='list-item shadow'>
                 <div class='list-img'>
                    <img src='${marker.properties.img}' alt='Image of ${marker.properties.name}'>
                </div>
                <h3>${marker.properties.name}</h3>
            </div>
            `;
        }

        liste();

        const listItem = document.querySelector('#list');

        // Onclick event to go to victims marker
        listItem.onclick=(evt) =>{

            let st = evt.target.dataset.point;

            let arr = st.split(",");

            arr[0] = Number(arr[0]);
            arr[1] = Number(arr[1]);
            
            map.flyTo({
                zoom: 18,
                center:  arr
            })
        }
    }); 
    start();
}
lesMap();
