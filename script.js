const picOfTheDay = document.getElementById("picture-of-the-day");
const infoDiv = document.getElementById("info");
const infoParagraph = document.getElementById("info-paragraph");
const videoLink = document.querySelector("#info > a");
const dateParagrah = document.getElementById("date");
const seeMoreBtn = document.getElementById("see-more-btn");
const leftControl = document.getElementById("left");
const rightControl = document.getElementById("right");
const DEMO_KEY = '' || 'DEMO_KEY'; // add API key

let apodPictures = [];
let savedPictures = [];
let requestedPic = {};

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
    requestedPic = apodPictures.find(pic => pic.date === date);
    videoLink.style.visibility = 'hidden';
    info.style.visibility = 'visible';
    info.style.opacity = 1;
    infoParagraph.innerText = 'Loading...';
    picOfTheDay.style.filter = 'blur(10px)';
    if(!requestedPic) {
        requestedPic = await getImages(date);
        apodPictures.push(requestedPic);
    }
    if(requestedPic.media_type === 'video') {
        picOfTheDay.style.cursor = 'default';
        picOfTheDay.src = './media/transparent_img.png';
        infoParagraph.innerHTML = 'NASA has provided a video on this date:';
        videoLink.href = requestedPic.url;
        videoLink.style.visibility = 'visible';
    }
    else {
        const preloadImg = new Image();
        preloadImg.onload = () => {
            picOfTheDay.style.cursor = 'pointer';
            picOfTheDay.src = requestedPic.url;
            picOfTheDay.style.filter = 'blur(0)';
            picOfTheDay.alt = requestedPic.explanation;
            info.style.opacity = '0';
            info.style.visibility = 'hidden';
        };
        preloadImg.src = requestedPic.url;
    }
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

const fullScreenDialog = document.getElementById("full-screen");
const imageTitle = document.getElementById("img-title");
const fullImage = document.getElementById("hd-image");
const imageExplanation = document.getElementById("explanation");
const closeDialog = document.getElementById("close-full-screen");


picOfTheDay.addEventListener("click", () => {
    if(picOfTheDay.src && !picOfTheDay.src.includes('/media/transparent_img.png'))
    {
        fullImage.src = requestedPic.hdurl;
        imageTitle.innerText = requestedPic.title;
        imageExplanation.innerText = requestedPic.explanation;
        fullScreenDialog.show();
    }
});

closeDialog.addEventListener("click", () => {
    fullScreenDialog.close();
});

// add save photo button for localStorage

/*
seeMoreBtn.addEventListener("click", () => {

});
*/