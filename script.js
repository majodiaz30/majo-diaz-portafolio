
/* ==========================================
   PORTAFOLIO - FUNCIONALIDADES
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // 1. MENÚ PARA CELULARES
    // ======================================

    const botonMenu = document.getElementById("menu-toggle");
    const enlacesMenu = document.getElementById("nav-links");

    if (botonMenu && enlacesMenu) {

        botonMenu.addEventListener("click", function () {

            enlacesMenu.classList.toggle("show");

            const abierto = enlacesMenu.classList.contains("show");

            botonMenu.setAttribute("aria-expanded", abierto);

            const icono = botonMenu.querySelector("i");

            if (icono) {
                icono.className = abierto
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }

        });

        // Cerrar menú al seleccionar un enlace

        const enlaces = enlacesMenu.querySelectorAll("a");

        enlaces.forEach(function (enlace) {

            enlace.addEventListener("click", function () {

                enlacesMenu.classList.remove("show");

                botonMenu.setAttribute("aria-expanded", "false");

                const icono = botonMenu.querySelector("i");

                if (icono) {
                    icono.className = "fa-solid fa-bars";
                }

            });

        });

    }


    // ======================================
    // 2. ENLACE ACTIVO EN LA NAVEGACIÓN
    // ======================================

    const secciones = document.querySelectorAll("main section[id]");
    const enlacesNavegacion = document.querySelectorAll(".nav-link");

    function actualizarEnlaceActivo() {

        let seccionActual = "inicio";

        secciones.forEach(function (seccion) {

            const posicion = seccion.getBoundingClientRect();

            if (posicion.top <= 160) {
                seccionActual = seccion.id;
            }

        });

        enlacesNavegacion.forEach(function (enlace) {

            enlace.classList.remove("active");

            if (enlace.getAttribute("href") === "#" + seccionActual) {
                enlace.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", actualizarEnlaceActivo, {
        passive: true
    });

    actualizarEnlaceActivo();


    // ======================================
    // 3. AÑO AUTOMÁTICO DEL FOOTER
    // ======================================

    const footerYear = document.getElementById("footer-year");

    if (footerYear) {
        footerYear.textContent = "© " + new Date().getFullYear();
    }


    // ======================================
    // 4. ANIMACIONES AL HACER SCROLL
    // ======================================

    const elementosAnimados = document.querySelectorAll(
        ".section-heading, " +
        ".highlight-card, " +
        ".skill-card, " +
        ".project-card, " +
        ".service-card, " +
        ".about-text, " +
        ".contact-box"
    );

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");

                    observador.unobserve(entrada.target);

                }

            });

        }, {
            threshold: 0.1
        });

        elementosAnimados.forEach(function (elemento) {
            elemento.classList.add("reveal");
            observador.observe(elemento);
        });

    } else {

        elementosAnimados.forEach(function (elemento) {
            elemento.classList.add("visible");
        });

    }

});
