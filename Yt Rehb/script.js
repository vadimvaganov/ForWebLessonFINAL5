document.addEventListener('DOMContentLoaded', function() {
    
    let currentPage = window.location.pathname.split('/').pop();
    let navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(function(link) {
        let linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    function initMobileMenu() {
        if (window.innerWidth <= 768) {
            let nav = document.querySelector('nav');
            let headerContent = document.querySelector('.header-content');
            
            if (!document.querySelector('.menu-toggle')) {
                let menuBtn = document.createElement('button');
                menuBtn.className = 'menu-toggle';
                menuBtn.innerHTML = '☰ Меню';
                menuBtn.style.cssText = `
                    background: #c0392b;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    margin: 10px 0;
                `;
                
                headerContent.appendChild(menuBtn);
                
                nav.style.display = 'none';
                
                menuBtn.addEventListener('click', function() {
                    if (nav.style.display === 'none') {
                        nav.style.display = 'block';
                        menuBtn.innerHTML = '✕ Закрыть';
                    } else {
                        nav.style.display = 'none';
                        menuBtn.innerHTML = '☰ Меню';
                    }
                });
            }
        }
    }
    
    initMobileMenu();
    window.addEventListener('resize', initMobileMenu);
    
    let anchors = document.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            if (targetId === '#') return;
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    function animateOnScroll() {
        let elements = document.querySelectorAll('.fact, .consequence-card, .gallery-item, .timeline-item');
        
        for (let i = 0; i < elements.length; i++) {
            let elementPosition = elements[i].getBoundingClientRect().top;
            let screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                elements[i].style.opacity = '1';
                elements[i].style.transform = 'translateY(0)';
            }
        }
    }
    
    let animatedElements = document.querySelectorAll('.fact, .consequence-card, .gallery-item, .timeline-item');
    for (let i = 0; i < animatedElements.length; i++) {
        animatedElements[i].style.opacity = '0';
        animatedElements[i].style.transform = 'translateY(20px)';
        animatedElements[i].style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
    
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    let forms = document.querySelectorAll('form');
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', function(e) {
            if (!this.id) return;
            e.preventDefault();
            console.log('Форма отправлена (демо-режим)');
            alert('Данные не отправляются на сервер — это демонстрационная версия.');
        });
    }
    
    let buttons = document.querySelectorAll('.btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
        
        buttons[i].addEventListener('mouseleave', function() {
            this.style.cursor = 'default';
        });
    }
    
    let pageTitle = document.title;
    
    window.addEventListener('focus', function() {
        document.title = pageTitle;
    });
    
    document.addEventListener('copy', function(e) {
        console.log('Информация с сайта о вреде курения скопирована');
    });
});

function trackEvent(eventName) {
    console.log('Событие: ' + eventName + ' - ' + new Date().toLocaleString());
}

if (!('IntersectionObserver' in window)) {
    console.log('Ваш браузер не поддерживает IntersectionObserver');
}