// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Transparent to Solid Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelectorAll('.nav-links'); // Desktop and Mobile navs

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.forEach(nav => {
                if(nav.closest('.mobile-header')) {
                    nav.classList.toggle('active');
                }
            });
            mobileBtn.innerHTML = document.querySelector('.mobile-header .nav-links').classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(nav => {
                if(nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if(mobileBtn) mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    });

    // 3. Scroll Reveal Animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
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

    // 5. Open Default Tab for Categories
    const defaultTab = document.getElementById("defaultOpenTab");
    if(defaultTab) {
        defaultTab.click();
    }
});

// Category Tab Logic
function openCategory(evt, categoryName) {
    let i, tabcontent, tablinks;
    
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    
    // Remove "active" class from all buttons
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    const target = document.getElementById(categoryName);
    if(target) {
        target.style.display = "block";
        // Small timeout to allow display:block to render before triggering opacity transition
        setTimeout(() => target.classList.add("active"), 10);
    }
    evt.currentTarget.className += " active";
}
