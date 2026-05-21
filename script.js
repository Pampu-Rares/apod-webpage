const picOfTheDay = document.getElementById("picture-of-the-day");
const dateParagrah = document.getElementById("date");
const seeMoreBtn = document.getElementById("see-more-btn");
const leftControl = document.getElementById("left");
const rightControl = document.getElementById("right");
const DEMO_KEY = '' || 'DEMO_KEY'; // add API key

let apodPictures = [];
let savedPictures = [];

async function getImages(date) {   
    try {
        todayApod = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${DEMO_KEY}&date=${date}`);
        todayApod = await todayApod.json();

        console.log(todayApod);
        return todayApod;
    }   catch(err) {
        console.log("Error: ", err.message);
    }
}

async function updatePhoto(date) {
    let requestedPic = apodPictures.find(pic => pic.date === date);
    if(!requestedPic) {
        requestedPic = await getImages(date);
        apodPictures.push(requestedPic);
    }
    picOfTheDay.src = requestedPic.url;
    picOfTheDay.alt = requestedPic.explanation;
}


const dateOfToday = new Date();
let date = new Date(dateOfToday);
dateParagrah.innerText = date.toISOString().split('T')[0];

leftControl.addEventListener("click", async () => {
    date.setDate(date.getDate() - 1);
    dateParagrah.innerText = date.toISOString().split('T')[0];
    updatePhoto(dateParagrah.innerText);
});

rightControl.addEventListener("click", async () => {
    date.setDate(date.getDate() + 1);
    if(date <= dateOfToday) {
        dateParagrah.innerText = date.toISOString().split('T')[0];
        updatePhoto(dateParagrah.innerText);
    } else date = new Date(dateOfToday);
});

// add save photo button for localStorage

/*
seeMoreBtn.addEventListener("click", () => {

});
*/