// ================================
// studioIPLab
// JavaScript
// ================================

console.log("studioIPLab carregada com sucesso.");


// ================================
// ANIMAÇÃO AO ENTRAR NA TELA
// ================================

const elements = document.querySelectorAll(
    ".product-card, .gallery-item, .contact-card, .about-box > div"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.1
    }
);


elements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(20px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});


// ================================
// CARROSSEL
// ================================

const carousels = document.querySelectorAll(".carousel");


carousels.forEach((carousel) => {

    const track = carousel.querySelector(".carousel-track");

    const slides = carousel.querySelectorAll(".carousel-slide");

    if (!track || slides.length === 0) {
        return;
    }


    let currentSlide = 0;

    let startX = 0;

    let currentX = 0;

    let isDragging = false;

    const totalSlides = slides.length;


    function goToSlide(index) {

        currentSlide = Math.max(
            0,
            Math.min(index, totalSlides - 1)
        );

        track.style.transform =
            `translateX(-${currentSlide * 50}%)`;

    }


    function startDrag(x) {

        startX = x;

        currentX = x;

        isDragging = true;

        track.style.transition = "none";

    }


    function moveDrag(x) {

        if (!isDragging) {
            return;
        }

        currentX = x;

    }


    function endDrag() {

        if (!isDragging) {
            return;
        }

        isDragging = false;

        const difference = startX - currentX;

        const threshold = 50;


        if (difference > threshold) {

            goToSlide(currentSlide + 1);

        } else if (difference < -threshold) {

            goToSlide(currentSlide - 1);

        } else {

            goToSlide(currentSlide);

        }

    }


    // ================================
    // TOUCH
    // ================================

    carousel.addEventListener(
        "touchstart",
        (event) => {

            startDrag(
                event.touches[0].clientX
            );

        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "touchmove",
        (event) => {

            moveDrag(
                event.touches[0].clientX
            );

        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "touchend",
        () => {

            endDrag();

        }
    );


    // ================================
    // MOUSE
    // ================================

    carousel.addEventListener(
        "mousedown",
        (event) => {

            startDrag(event.clientX);

        }
    );


    carousel.addEventListener(
        "mousemove",
        (event) => {

            if (isDragging) {
                moveDrag(event.clientX);
            }

        }
    );


    carousel.addEventListener(
        "mouseup",
        () => {

            endDrag();

        }
    );


    carousel.addEventListener(
        "mouseleave",
        () => {

            if (isDragging) {
                endDrag();
            }

        }
    );


    // Evita seleção acidental da imagem

    carousel.addEventListener(
        "dragstart",
        (event) => {

            event.preventDefault();

        }
    );


    // Começa sempre na primeira imagem

    goToSlide(0);

});
