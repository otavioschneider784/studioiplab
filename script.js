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

    const previousButton =
        carousel.querySelector(".carousel-prev");

    const nextButton =
        carousel.querySelector(".carousel-next");

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


    // ================================
    // SETA ESQUERDA
    // ================================

    if (previousButton) {

        previousButton.addEventListener("click", (event) => {

            event.stopPropagation();

            goToSlide(currentSlide - 1);

        });

    }


    // ================================
    // SETA DIREITA
    // ================================

    if (nextButton) {

        nextButton.addEventListener("click", (event) => {

            event.stopPropagation();

            goToSlide(currentSlide + 1);

        });

    }


    // ================================
    // TOUCH
    // ================================

    carousel.addEventListener(
        "touchstart",
        (event) => {

            startX = event.touches[0].clientX;

            currentX = startX;

            isDragging = true;

        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "touchmove",
        (event) => {

            if (!isDragging) {
                return;
            }

            currentX = event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "touchend",
        () => {

            if (!isDragging) {
                return;
            }

            isDragging = false;

            const difference = startX - currentX;

            const threshold = 50;


            if (difference > threshold) {

                goToSlide(currentSlide + 1);

            }

            else if (difference < -threshold) {

                goToSlide(currentSlide - 1);

            }

            else {

                goToSlide(currentSlide);

            }

        }
    );


    // ================================
    // MOUSE
    // ================================

    carousel.addEventListener(
        "mousedown",
        (event) => {

            if (event.target.closest(".carousel-arrow")) {
                return;
            }

            startX = event.clientX;

            currentX = startX;

            isDragging = true;

        }
    );


    carousel.addEventListener(
        "mousemove",
        (event) => {

            if (isDragging) {

                currentX = event.clientX;

            }

        }
    );


    carousel.addEventListener(
        "mouseup",
        () => {

            if (!isDragging) {
                return;
            }

            isDragging = false;

            const difference = startX - currentX;

            const threshold = 50;


            if (difference > threshold) {

                goToSlide(currentSlide + 1);

            }

            else if (difference < -threshold) {

                goToSlide(currentSlide - 1);

            }

            else {

                goToSlide(currentSlide);

            }

        }
    );


    carousel.addEventListener(
        "mouseleave",
        () => {

            if (isDragging) {

                isDragging = false;

                goToSlide(currentSlide);

            }

        }
    );


    // Impede arrastar a imagem diretamente

    carousel.addEventListener(
        "dragstart",
        (event) => {

            event.preventDefault();

        }
    );


    // Começa na primeira imagem

    goToSlide(0);

});
// ================================
// SETAS DO CARROSSEL
// ================================

document.querySelectorAll(".product-image.carousel").forEach((carousel) => {

    const track = carousel.querySelector(".carousel-track");

    const slides = carousel.querySelectorAll(".carousel-slide");

    const prev = carousel.querySelector(".carousel-prev");

    const next = carousel.querySelector(".carousel-next");


    if (!track || slides.length < 2) return;


    function currentSlide() {

        return Math.round(
            track.scrollLeft / track.clientWidth
        );

    }


    prev.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        const current = currentSlide();

        track.scrollTo({
            left: (current - 1) * track.clientWidth,
            behavior: "smooth"
        });

    });


    next.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        const current = currentSlide();

        track.scrollTo({
            left: (current + 1) * track.clientWidth,
            behavior: "smooth"
        });

    });

});
