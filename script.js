// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hide');
    }, 1800);
});

// Cursor
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
document.addEventListener('mousemove', (e) => {
    if (cursor && cursorRing) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
    }
});

// Scroll Bar & Header & Back to Top
const scrollBar = document.getElementById('scroll-bar');
const header = document.querySelector('header');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
    // Scroll bar width
    if (scrollBar) {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        scrollBar.style.width = scrolled + "%";
    }

    // Header styling
    if (header) {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    }

    // Back to top indicator
    if (backTop) {
        if (window.scrollY > 300) backTop.classList.add('show');
        else backTop.classList.remove('show');
    }
});

if (backTop) {
    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Reveal Animations & Stats Number Counting
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stats Animation
            if (entry.target.classList.contains('stat-item') || entry.target.querySelector('.stat-num')) {
                const numEl = entry.target.classList.contains('stat-num') ? entry.target : entry.target.querySelector('.stat-num');
                if (numEl && !numEl.dataset.animated) {
                    numEl.dataset.animated = "true";
                    animateValue(numEl, 0, parseFloat(numEl.dataset.target), 1500, numEl.dataset.decimal === "2", numEl.dataset.suffix || "");
                }
            }
        }
    });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));
document.querySelectorAll('.stat-item').forEach(el => observer.observe(el));

function animateValue(obj, start, end, duration, isDecimal, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let current = progress * (end - start) + start;
        obj.innerHTML = (isDecimal ? current.toFixed(2) : Math.floor(current)) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = (isDecimal ? end.toFixed(2) : end) + suffix;
        }
    };
    window.requestAnimationFrame(step);
}

// Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('#mobile-menu a');

if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
             mobileMenu.classList.remove('open');
        });
    });
}

// Typing Effect
const typedTextSpan = document.getElementById("typed-text");
const textArray = ["Developer.", "Cloud Engineer.", "Problem Solver."];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(typedTextSpan) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    }
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(typedTextSpan) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    }
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

if (typedTextSpan) {
    document.addEventListener("DOMContentLoaded", function() {
      setTimeout(type, newTextDelay + 250);
    });
}

// Glitch Effect
setInterval(() => {
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        glitchElement.classList.add('active');
        setTimeout(() => {
            glitchElement.classList.remove('active');
        }, 300);
    }
}, 4000);

// Filter Validation
const filterBtns = document.querySelectorAll('.filter-btn');
const flexWrappers = document.querySelectorAll('.flip-wrapper');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            flexWrappers.forEach(wrap => {
                const tags = wrap.dataset.tags || "";
                if (filter === 'all' || tags.includes(filter)) {
                    wrap.style.display = 'block';
                    setTimeout(() => {
                        wrap.style.opacity = '1';
                        wrap.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    wrap.style.opacity = '0';
                    wrap.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        wrap.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Flip Cards on Mobile (Tap interaction)
flexWrappers.forEach(wrap => {
    wrap.addEventListener('click', () => {
        wrap.classList.toggle('tapped');
    });
});

// Dynamic Greeting based on current time
const greetingEl = document.getElementById('greeting');
if (greetingEl) {
    const hour = new Date().getHours();
    let greeter = "Good Evening";
    if (hour < 12) greeter = "Good Morning";
    else if (hour < 18) greeter = "Good Afternoon";
    greetingEl.textContent = `${greeter}, I am`;
}

// Native FormSubmit form logic used in index.html.

function showToast(msg) {
    if (toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Starfield Canvas Animation
const canvas = document.getElementById('starfield');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 150;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                vx: Math.floor(Math.random() * 50) - 25,
                vy: Math.floor(Math.random() * 50) - 25
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Ensure stars are visible in both light and dark modes
        ctx.fillStyle = document.documentElement.classList.contains('light') ? 'rgba(15, 23, 42, 0.2)' : 'rgba(255, 255, 255, 0.8)';
        
        ctx.beginPath();
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            ctx.moveTo(star.x, star.y);
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
        }
        ctx.fill();
        updateStars();
    }

    function updateStars() {
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            star.x += star.vx / 60;
            star.y += star.vy / 60;

            if (star.x < 0 || star.x > canvas.width) star.vx = -star.vx;
            if (star.y < 0 || star.y > canvas.height) star.vy = -star.vy;
        }
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initStars();
    });

    resizeCanvas();
    initStars();

    function animateStars() {
        drawStars();
        requestAnimationFrame(animateStars);
    }
    
    animateStars();
}
