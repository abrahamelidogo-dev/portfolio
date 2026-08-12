/* =========================================================
   ABRAHAM ELI DOGO — PORTFOLIO JAVASCRIPT
   Premium Dark Portfolio
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

const yearElement = document.getElementById("year");

const header = document.querySelector(".header");

const projectCards = document.querySelectorAll(".project-card");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const menuIsOpen =
            navMenu.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            menuIsOpen
        );

        if (menuIsOpen) {

            menuToggle.innerHTML =
                '<i class="fas fa-xmark"></i>';

        } else {

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';

        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.innerHTML =
            '<i class="fas fa-bars"></i>';

    });

});


/* =========================================================
   CLOSE MENU WITH ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';
        }

    }

});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll(
    "section[id]"
);


function updateActiveNavigation() {

    const currentPosition =
        window.scrollY + 200;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            currentPosition >= sectionTop &&
            currentPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add(
                    "active"
                );

            }

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }


    if (window.scrollY > 50) {

        header.classList.add(
            "header-scrolled"
        );

    } else {

        header.classList.remove(
            "header-scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader
);


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            !targetId.startsWith("#")
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) {
            return;
        }


        event.preventDefault();


        const headerHeight =
            document.querySelector(".navbar")
                ?.offsetHeight || 80;


        const targetPosition =
            target.offsetTop - headerHeight;


        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const animatedElements =
    document.querySelectorAll(
        `
        .section-heading,
        .about-content,
        .about-card,
        .timeline-item,
        .experience-card,
        .skill-card,
        .project-card,
        .contact-item,
        .contact-form
        `
    );


animatedElements.forEach((element) => {

    element.classList.add("fade-in");

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }
    );


animatedElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   STAGGER PROJECT ANIMATIONS
========================================================= */

projectCards.forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;

    }
);


/* =========================================================
   PROJECT CARD MOUSE EFFECT
========================================================= */

projectCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            /*
                This creates a very subtle
                3D movement when the mouse
                moves over a project.
            */

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -1.5;

            const rotateY =
                ((x - centerX) / centerX) * 1.5;


            card.style.transform =
                `
                translateY(-8px)
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;
        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim();


            const subject =
                document
                    .getElementById("subject")
                    ?.value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    ?.value
                    .trim();


            /* -----------------------------------------
               VALIDATION
            ----------------------------------------- */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showFormMessage(
                    "Please complete all fields.",
                    "error"
                );

                return;

            }


            /* -----------------------------------------
               EMAIL VALIDATION
            ----------------------------------------- */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /* -----------------------------------------
               CREATE EMAIL
            ----------------------------------------- */

            const recipient =
                "abrahamelidogo@gmail.com";


            const emailSubject =
                encodeURIComponent(
                    subject
                );


            const emailBody =
                encodeURIComponent(
                    `Hello Abraham,

Name: ${name}
Email: ${email}

Message:
${message}

Regards,
${name}`
                );


            /*
                Opens the visitor's email application.
            */

            const mailtoLink =
                `mailto:${recipient}` +
                `?subject=${emailSubject}` +
                `&body=${emailBody}`;


            showFormMessage(
                "Opening your email application...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    mailtoLink;

            }, 700);

        }
    );

}


/* =========================================================
   FORM MESSAGE FUNCTION
========================================================= */

function showFormMessage(
    message,
    type
) {

    if (!formMessage) {
        return;
    }


    formMessage.textContent =
        message;


    if (type === "success") {

        formMessage.style.color =
            "#00ffe0";

    } else {

        formMessage.style.color =
            "#ff6b6b";

    }

}


/* =========================================================
   AUTOMATIC COPYRIGHT YEAR
========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   IMAGE HANDLING
========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            /*
                If an image cannot be found,
                keep the layout intact.
            */

            image.classList.add(
                "image-error"
            );

        }
    );


    image.addEventListener(
        "load",
        () => {

            image.classList.add(
                "image-loaded"
            );

        }
    );

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        /*
            Trigger navigation detection
            when the page initially loads.
        */

        updateActiveNavigation();

        updateHeader();

    }
);


/* =========================================================
   DISABLE 3D PROJECT EFFECT ON TOUCH DEVICES
========================================================= */

const isTouchDevice =
    window.matchMedia(
        "(hover: none)"
    ).matches;


if (isTouchDevice) {

    projectCards.forEach((card) => {

        card.style.transitionDelay =
            "0ms";

    });

}


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "%cAbraham Eli Dogo — Portfolio",
    `
    color: #00ffe0;
    font-size: 18px;
    font-weight: bold;
    `
);

console.log(
    "Welcome to my portfolio."
);