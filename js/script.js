// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Transparent to Solid Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    
    const handleNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbar);
    handleNavbar(); // Initial check

    // 2. Mobile Menu Toggle - Enhanced for consistency
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-header .nav-links');

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            mobileBtn.innerHTML = mobileNav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Staggered Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's a grid/container, stagger its children
                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('active');
                        }, index * 100);
                    });
                }
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#inscricao') {
                if (targetId === '#inscricao') {
                    // Just scroll to section if it exists, button is disabled in UI but link works for the section scroll
                    const target = document.querySelector('#inscricao');
                    if (target) {
                        e.preventDefault();
                        window.scrollTo({
                            top: target.offsetTop - navbar.offsetHeight,
                            behavior: 'smooth'
                        });
                    }
                    return;
                }
                return;
            }
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Category Tabs Logic
    window.openCategory = (evt, categoryName) => {
        const tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }
        
        const tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active");
        }
        
        const target = document.getElementById(categoryName);
        if(target) {
            target.style.display = "block";
            setTimeout(() => target.classList.add("active"), 10);
        }
        evt.currentTarget.classList.add("active");
    };

    const defaultTab = document.getElementById("defaultOpenTab");
    if(defaultTab) defaultTab.click();

    // 6. Countdown Timer Logic
    const eventDate = new Date("August 29, 2026 08:30:00").getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            const timerEl = document.getElementById("timer");
            if (timerEl) timerEl.innerHTML = "<h4 style='font-size: 3rem; color: var(--primary-orange);'>O GIGANTE ACORDOU!</h4>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const setTime = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.innerText = val.toString().padStart(2, '0');
        };

        setTime("days", days);
        setTime("hours", hours);
        setTime("minutes", minutes);
        setTime("seconds", seconds);
    };

    setInterval(updateTimer, 1000);
    updateTimer();
});
