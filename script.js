// ================================
// studioIPLab
// JavaScript
// ================================


// Mostra no console que o site carregou corretamente

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
// CARROSSEL DOS PRODUTOS
// ================================

const carousels = document.querySelectorAll(".carousel-track");

carousels.forEach((carousel) => {

    let startX = 0;
    let startScroll = 0;

    carousel.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
        startScroll = carousel.scrollLeft;
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {

        const endX = event.changedTouches[0].clientX;
        const difference = startX - endX;

        const pageWidth = carousel.clientWidth;

        if (Math.abs(difference) < 30) {
            carousel.scrollTo({
                left: Math.round(carousel.scrollLeft / pageWidth) * pageWidth,
                behavior: "smooth"
            });

            return;
        }

        let currentPage = Math.round(startScroll / pageWidth);

        if (difference > 30) {
            currentPage++;
        } else if (difference < -30) {
            currentPage--;
        }

        const totalPages = carousel.querySelectorAll("img").length;

        currentPage = Math.max(
            0,
            Math.min(currentPage, totalPages - 1)
        );

        carousel.scrollTo({
            left: currentPage * pageWidth,
            behavior: "smooth"
        });

    });

});
