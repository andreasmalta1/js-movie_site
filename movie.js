
const url = new URL(location.href)
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")

const APILINK = "http://localhost:8000/api/v1/reviews/"

const sectionEl = document.getElementById("section")
const title = document.getElementById("title")
title.textContent = movieTitle

returnReviews(APILINK)

function returnReviews(url){
    fetch(`${url}movie/${movieId}`).then(res => res.json())
    .then(function(data){
        data.forEach(review => {
            const divRow = document.createElement("div")
            const divColumn = document.createElement("div")
            const divCard = document.createElement("div")
            const reviewEl = document.createElement("p")
            const userEl = document.createElement("p")
            const aEl = document.createElement("p")
            const updateEl = document.createElement("a")
            const deleteEl = document.createElement("a")

            updateEl.setAttribute("href", "#")
            updateEl.setAttribute("onclick", `editReview('${review._id}', '${review.review}', '${review.user}')`)
            updateEl.textContent = "✏"

            deleteEl.setAttribute("href", "#")
            deleteEl.setAttribute("onclick", `deleteReview('${review._id}')`)
            deleteEl.textContent = "🚮"
            
            aEl.appendChild(updateEl)
            aEl.appendChild(deleteEl)

            userEl.textContent = `User: ${review.user}`
            reviewEl.textContent = `Review: ${review.review}`

            divCard.setAttribute("id", `${review._id}`)

            divCard.appendChild(reviewEl)
            divCard.appendChild(userEl)
            divCard.appendChild(aEl)
            divColumn.appendChild(divCard)
            divRow.appendChild(divColumn)

            divRow.classList.add("row")
            divColumn.classList.add("column")
            divCard.classList.add("card")
            sectionEl.appendChild(divRow)
        })
    })
}

function editReview(id, review, user){
    const element = document.getElementById(id)
    element.innerHTML = ""
    const reviewInputId = `review${id}`
    const userInputId = `user${id}`

    const reviewEl = document.createElement("p")
    const reviewInput = document.createElement("input")
    const userEl = document.createElement("p")
    const userInput = document.createElement("input")
    const savePar = document.createElement("p")
    const saveEl = document.createElement("a")

    saveEl.setAttribute("href", "#")
    saveEl.setAttribute("onclick", `saveReview('${reviewInputId}', '${userInputId}', '${id}')`)
    saveEl.textContent = "💾"

    userInput.setAttribute("type", "text")
    userInput.setAttribute("id", `${userInputId}`)
    userInput.setAttribute("value", `${user}`)

    userEl.textContent = "User: " 

    reviewInput.setAttribute("type", "text")
    reviewInput.setAttribute("id", `${reviewInputId}`)
    reviewInput.setAttribute("value", `${review}`)

    reviewEl.textContent = "Review: " 

    savePar.appendChild(saveEl)
    userEl.appendChild(userInput)
    reviewEl.appendChild(reviewInput)
    
    element.appendChild(reviewEl)
    element.appendChild(userEl)
    element.appendChild(savePar)
}

function saveReview(reviewInputId, userInputId, id=""){
    const review = document.getElementById(reviewInputId).value
    const user = document.getElementById(userInputId).value

    if (id){
        fetch(`${APILINK}${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json())
        .then(res => location.reload())
    } else{
        fetch(`${APILINK}new`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        }).then(res => res.json())
        .then(res => location.reload())
    }
}

function deleteReview(id){
    fetch(`${APILINK}${id}`, {
        method: 'DELETE'
    }).then(res => res.json())
    .then(res => location.reload())
    
}