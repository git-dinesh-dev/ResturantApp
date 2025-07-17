function showTeamDetail(name, role, description) {
    document.getElementById('team-name').innerText = name;
    document.getElementById('team-role').innerText = role;
    document.getElementById('team-description').innerText = description;

    // Show the banner
    document.getElementById('team-details-banner').style.display = 'block';
}




document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 80; // Adjust for navbar height
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});






let slideIndex = 1;

function openLightbox() {
    document.getElementById('lightbox').style.display = 'block';
    showSlides(slideIndex);
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function setSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName('slides');
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
}






// Initialize the map
const map = L.map('map').setView([28.5280671, 77.4160909], 15); // Latitude and Longitude for Naya Gaon, Noida, Sector 87, Gali Number 5

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Add a marker for Naya Gaon, Sector 87
const marker = L.marker([28.5280671, 77.4160909]).addTo(map);

// Add click event to redirect to Google Maps
marker.on('click', function () {
    window.open('https://www.google.com/maps/place/Naya+gaon+Noida+sector+87+gali+number+5/@28.5271974,77.4154478,1245m/data=!3m1!1e3!4m15!1m8!3m7!1s0x390ce8e762e61f83:0x7910a9538bf1fd78!2sSector+87,+Noida,+Uttar+Pradesh+201305!3b1!8m2!3d28.5289286!4d77.4171237!16s%2Fg%2F12hl9fmpw!3m5!1s0x390ce9731ce5f353:0x92b8ec67695392e0!8m2!3d28.5280671!4d77.4160909!16s%2Fg%2F11v6d8gj91?entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D', '_blank');
});

// Send mail function placeholder
function sendMail() {
    alert('Send mail functionality is not implemented yet.');
}
