// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu transparente para sólido ao rolar a página
    const navbar = document.querySelector('.navbar');
    
    const handleNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbar);
    handleNavbar(); // Verificação inicial

    // 2. Alternar Menu Mobile - Aprimorado para consistência
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-header .nav-links');

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            mobileBtn.innerHTML = mobileNav.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Fechar menu mobile ao clicar em um link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Animações em cascata ao rolar a página (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se for um container ou grid, animar os filhos em cascata
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

    // 4. Rolagem suave para links internos (ignora links externos)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ignorar se o link tiver target="_blank" ou for externo
            if (this.getAttribute('target') === '_blank') return;

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
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

    // 5. Lógica das Abas de Categoria
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

    // 6. Lógica do Cronômetro de Contagem Regressiva
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

    // 7. Calculadora de Cotas Extras e Gerador de Link do WhatsApp
    const COTA_PRICE = 2.00;
    const MIN_COTAS = 10;

    const quantityInput = document.getElementById("cotaQuantity");
    const quantitySlider = document.getElementById("cotaSlider");
    const btnMinus = document.getElementById("btnMinus");
    const btnPlus = document.getElementById("btnPlus");
    const totalSpan = document.getElementById("cotaTotal");
    const cotaForm = document.getElementById("cotaForm");

    if (quantityInput && totalSpan) {
        const calculateTotal = (qty) => {
            const val = parseInt(qty) || MIN_COTAS;
            const total = val * COTA_PRICE;
            totalSpan.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
            
            // Micro-animação para mudança de preço
            totalSpan.style.transform = "scale(1.1)";
            totalSpan.style.color = "var(--primary-orange)";
            setTimeout(() => {
                totalSpan.style.transform = "scale(1)";
                totalSpan.style.color = "var(--accent-yellow)";
            }, 150);
        };

        const updateInputs = (val) => {
            let cleanVal = parseInt(val) || MIN_COTAS;
            if (cleanVal < MIN_COTAS) cleanVal = MIN_COTAS;
            
            quantityInput.value = cleanVal;
            if (quantitySlider) quantitySlider.value = cleanVal;
            calculateTotal(cleanVal);
        };

        // Evento de input do controle deslizante (slider)
        if (quantitySlider) {
            quantitySlider.addEventListener("input", (e) => {
                updateInputs(e.target.value);
            });
        }

        // Evento de mudança do campo numérico
        quantityInput.addEventListener("change", (e) => {
            updateInputs(e.target.value);
        });

        // Eventos dos botões de Mais e Menos
        if (btnMinus) {
            btnMinus.addEventListener("click", () => {
                const cur = parseInt(quantityInput.value) || MIN_COTAS;
                if (cur > MIN_COTAS) {
                    updateInputs(cur - 1);
                } else {
                    // Efeito de tremer caso o usuário tente baixar do mínimo permitido
                    quantityInput.style.animation = "vibration 0.2s 2 ease-in-out";
                    setTimeout(() => quantityInput.style.animation = "", 400);
                }
            });
        }

        if (btnPlus) {
            btnPlus.addEventListener("click", () => {
                const cur = parseInt(quantityInput.value) || MIN_COTAS;
                updateInputs(cur + 1);
            });
        }

        // Máscara de telefone (formatação básica brasileira)
        const phoneInput = document.getElementById("cotaPhone");
        if (phoneInput) {
            phoneInput.addEventListener("input", (e) => {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            });
        }

        // Envio do formulário para o WhatsApp
        if (cotaForm) {
            cotaForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const name = document.getElementById("cotaName").value;
                const phone = phoneInput ? phoneInput.value : "";
                const qty = parseInt(quantityInput.value) || MIN_COTAS;
                const totalText = totalSpan.innerText;

                const message = `Olá, Equipe Paracuru Off Road! 🏍️💨\n\nQuero garantir minhas Cotas Extras para o sorteio da KLX 300cc!\n\n👤 *Nome:* ${name}\n📱 *WhatsApp:* ${phone}\n🎟️ *Quantidade:* ${qty} cotas\n💰 *Valor Total:* ${totalText}\n\nPor favor, me envie a chave PIX para confirmar a reserva! 🏁🔥`;
                
                const url = `https://wa.me/5585989357703?text=${encodeURIComponent(message)}`;
                window.open(url, "_blank");
            });
        }
    }
});
