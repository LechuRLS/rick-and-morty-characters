const lista = document.getElementById("character-list")
const API = "https://rickandmortyapi.com/api/character/?page="
let pageActual = 1;

function fetchPage(page) {
 fetch(API + page)
     .then(response => {
         if (!response.ok){
             throw new Error("Error: no se pueden obtener los datos")
    }
    return response.json();
 })
 .then(data => {
    console.log("Datos recibidos", data);
    if (!data.results) {
        throw new Error("La APi no devolvió lod datos")
    }
    lista.innerHTML = "";
    data.results.forEach(personaje => {
        const li = document.createElement("li");
        li.innerHTML = `
         <img src="${personaje.image}" alt ${personaje.name}">
         <h3>${personaje.name}</h3>
         <p>${personaje.species}</p>
        `;
        
        lista.appendChild(li);
    });

    document.getElementById("page-number").textContent = `Page ${page}`
 })
    .catch(error => console.error("Error al obtener datos", error));
}
fetchPage(pageActual);

const botonPrev = document.getElementById("prev-page")
const botonNext = document.getElementById("next-page")

botonPrev.addEventListener("click", () => {
    if (pageActual > 1) {
        pageActual--;
        fetchPage(pageActual)
    }
});

botonNext.addEventListener("click", () => {
    pageActual++;
    fetchPage(pageActual)
});
