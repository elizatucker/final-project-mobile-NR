const video = document.getElementById("scrollytelling-video");
const videoContainer = document.getElementById("video-container");
const scrolly = document.querySelector("#scrolly");
const article = scrolly.querySelector("article");
const steps = article.querySelectorAll(".step");

// Initialize Scrollama
const scroller = scrollama();

// Handle Scrollama step entry
function handleStepEnter(response) {
    // response = { element, direction, index }
    var el = response.element;

    // Remove 'is-active' class from all steps
    steps.forEach(step => step.classList.remove('is-active'));
    el.classList.add('is-active');

    // Update graphic (optional, if you need to update the content or UI)
    // sticky.querySelector("p").innerText = el.dataset.step; // Adjust according to your structure
}

// Sync video with scroll percentage
function syncVideoWithScroll() {
    // Get the scroll percentage (scroll position relative to the document's height)
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    
    // Get the video's total duration
    const videoDuration = video.duration;

    // Calculate the video's current time based on the scroll percentage
    video.currentTime = scrollPercentage * videoDuration;
}

// Initialize Scrollama functionality
function init() {
    // Setup scrollama instance
    scroller
        .setup({
            step: "#scrolly article .step", // Target each step element for scroll actions
            offset: 0.33, // Trigger step when it is 33% from the top
            debug: false // Turn off debug mode
        })
        .onStepEnter(handleStepEnter); // Bind step enter event handler

    // Add scroll event listener to sync the video with the scroll
    window.addEventListener("scroll", syncVideoWithScroll);

    // Add resize listener for scrollama reflow
    window.addEventListener("resize", scroller.resize);
}

// Start Scrollama and video sync
init();

 
 // Intersection Observer to trigger animations when scrolling
 document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-and-caption-v, .image-and-caption-h');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: '-100px'
    });
    
    images.forEach(image => {
        observer.observe(image);
    });
});
window.addEventListener('scroll', () => {
const video = document.querySelector('.video-container');
const background = document.querySelector('.background');

if (window.scrollY > 150) { // Adjust scroll threshold for smooth transition
    video.style.opacity = "0"; 
    video.style.pointerEvents = "none";

    // Wait for the fade-out to complete before removing video
    setTimeout(() => {
        video.style.display = "none"; 
    }, 500); // Matches the CSS transition time

    background.style.opacity = "1"; 
} else {
    video.style.opacity = "1"; 
    video.style.pointerEvents = "auto";
    video.style.display = "block"; // Ensure video reappears when scrolling up
    background.style.opacity = "0"; 
}
});