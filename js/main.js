document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       1. SMOOTH SCROLL
    ========================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    /* =========================
       2. ACTIVE NAV HIGHLIGHT (IntersectionObserver)
    ========================== */
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href").includes(id)
                    );
                });
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => navObserver.observe(section));


    /* =========================
       3. FORM FEEDBACK
    ========================== */
    const form = document.querySelector(".contact-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = form.querySelector("button");
            const originalText = btn.innerText;

            btn.innerText = "Terkirim! ✅";
            btn.classList.add("success");

            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove("success");
                form.reset();
            }, 3000);
        });
    }


    /* =========================
       4. SCROLL REVEAL + COUNTER
    ========================== */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");

                const counters = entry.target.querySelectorAll(".stat-number");
                counters.forEach(counter => {
                    if (!counter.dataset.animated) {
                        animateCounter(counter);
                        counter.dataset.animated = "true";
                    }
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".reveal-group").forEach(el => {
        revealObserver.observe(el);
    });


    function animateCounter(counter) {
        const target = +counter.dataset.target;
        const duration = 2000;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            counter.innerText = Math.floor(progress * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

});
