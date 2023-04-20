const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=63a2ce4ee63ad22b492d6a4c45cd074d&page=1"
const IMGPATH = "https://image.tmdb.org/t/p/w1280"
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=63a2ce4ee63ad22b492d6a4c45cd074d&query="

const sectionEl = document.getElementById("section")
const formEl = document.getElementById("form")
const searchEl = document.getElementById("query")

returnMovies(APILINK)

function returnMovies (url){
    console.log(url)
    fetch(url).then(res => res.json()).then(function(data){
        data.results.forEach(movie => {
            const divCard = document.createElement("div")
            const divRow = document.createElement("div")
            const divColumn = document.createElement("div")
            const image = document.createElement("img")
            const title = document.createElement("h3")

            title.innerHTML = movie.title
            image.src = IMGPATH + movie.poster_path

            divCard.appendChild(image)
            divCard.appendChild(title)
            divColumn.appendChild(divCard)
            divRow.appendChild(divColumn)

            divRow.classList.add("row")
            divColumn.classList.add("column")
            divCard.classList.add("card")
            image.classList.add("thumbnail")
            sectionEl.appendChild(divRow)
        })
    })
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    sectionEl.innerHTML = ""

    const searchItem = searchEl.value

    if (searchItem){
        returnMovies(SEARCHAPI + searchItem)
        searchItem.value= ""
    }
})