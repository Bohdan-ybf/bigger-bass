const preloader = document.getElementById('preloader');
const startTime = Date.now();

window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, 1000 - elapsed); 

    setTimeout(() => {
        preloader.classList.add('hidden');
    }, remaining);
});



window.onload = function() {
    const symbols = [
        './img/slot/slot1.png',
        './img/slot/slot2.png',
        './img/slot/slot3.png',
        './img/slot/slot4.png',
        './img/slot/slot5.png',
        './img/slot/slot6.png',
        './img/slot/slot7.png',
        './img/slot/slot8.png',
        './img/slot/slot9.png',
        './img/slot/slot10.png',
        './img/slot/slot11.png',
        './img/slot/slot12.png',
        './img/slot/slot13.png',
        './img/slot/slot14.png',
        './img/slot/slot15.png',
        './img/slot/slot16.png',
    ];

    const spinBtn = document.querySelector('.bigger_btn');
    const reels = document.querySelectorAll('.reel');
    const counter = document.querySelector('.bigger_counter span');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-btn');
    const startModal = document.getElementById('start-modal');
    const activateBtn = document.getElementById('activate-btn');

    let spinsLeft = 3;

    spinBtn.disabled = true;
    spinBtn.style.opacity = 0.5;
    spinBtn.style.pointerEvents = 'none';

    activateBtn.addEventListener('click', () => {
        startModal.style.display = 'none';
        spinBtn.disabled = false;
        spinBtn.style.opacity = 1;
        spinBtn.style.pointerEvents = 'auto';
    });

    function getRandomSymbol() {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function getRandom3Symbols(win = false) {
        if (win) {
            return [getRandomSymbol(), './img/slot/slot1.png', getRandomSymbol()];
        } else {
            return [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
        }
    }

    function setReelSymbols(reel, symbolsArr) {
        reel.innerHTML = '';
        symbolsArr.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            reel.appendChild(img);
        });
    }

    function animateReelWithStop(reel, isFinal, delay = 0) {
        const frames = 15;
        let currentFrame = 0;

        const interval = setInterval(() => {
            const newSymbols = getRandom3Symbols();
            setReelSymbols(reel, newSymbols);
            currentFrame++;

            if (currentFrame >= frames) {
                clearInterval(interval);
                setTimeout(() => {
                    if (isFinal) {
                        const finalSymbols = getRandom3Symbols(true);
                        setReelSymbols(reel, finalSymbols);
                    }
                }, delay);
            }
        }, 80);
    }

    function handleSpin() {
        if (spinsLeft > 0) {
            spinsLeft--;
            counter.textContent = spinsLeft;

            const isFinal = spinsLeft === 0;

            reels.forEach((reel, index) => {
                animateReelWithStop(reel, isFinal, index * 150);
            });

            if (isFinal) {
                setTimeout(() => {
                    modal.style.display = 'flex';
                }, 3000);
            }
        }
    }

    reels.forEach(reel => {
        const initial = getRandom3Symbols();
        setReelSymbols(reel, initial);
    });

    spinBtn.addEventListener('click', handleSpin);
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
};