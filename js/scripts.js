// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Create additional confetti pieces
    createConfetti();
    
    // Add sparkle effect to the main title
    addSparkleEffect();
    
    // Add floating hearts animation
    createFloatingHearts();
    
    // Add click sound effect (using Web Audio API)
    setupAudioContext();
    
    // Add floating images
    createFloatingImages();
    
    // Restart floating images every 10 seconds
    setInterval(createFloatingImages, 10000);
});

// Function to show surprise message
function showSurprise() {
    const surpriseMessage = document.getElementById('surpriseMessage');
    const button = document.querySelector('.surprise-btn');
    
    // Hide the button and show the message
    button.style.display = 'none';
    surpriseMessage.classList.add('show');
    
    // Play celebration sound
    playSound('celebration');
    
    // Trigger extra confetti
    createExtraConfetti();
    
    // Add a "Reset" button after 3 seconds
    setTimeout(() => {
        const resetBtn = document.createElement('button');
        resetBtn.textContent = '🎉 Celebrate Again! 🎉';
        resetBtn.className = 'surprise-btn';
        resetBtn.onclick = resetSurprise;
        surpriseMessage.appendChild(resetBtn);
    }, 3000);
}

// Function to reset surprise
function resetSurprise() {
    const surpriseMessage = document.getElementById('surpriseMessage');
    const button = document.querySelector('.surprise-btn');
    
    // Remove the reset button
    const resetBtn = surpriseMessage.querySelector('button');
    if (resetBtn) {
        resetBtn.remove();
    }
    
    // Hide surprise message and show original button
    surpriseMessage.classList.remove('show');
    button.style.display = 'inline-block';
}

// Create dynamic confetti
function createConfetti() {
    const container = document.querySelector('.confetti');
    const colors = ['#ff6b9d', '#ffa500', '#87ceeb', '#98fb98', '#dda0dd', '#ffb6c1'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: confetti-fall ${3 + Math.random() * 2}s infinite linear;
            animation-delay: ${Math.random() * 3}s;
            opacity: 0.8;
        `;
        container.appendChild(confetti);
    }
}

// Create extra confetti for surprise
function createExtraConfetti() {
    const container = document.querySelector('.confetti');
    const colors = ['#ff6b9d', '#ffa500', '#87ceeb', '#98fb98', '#dda0dd', '#ffb6c1'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'extra-confetti';
        confetti.style.cssText = `
            position: absolute;
            width: 12px;
            height: 12px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: confetti-burst 2s ease-out forwards;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        container.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 2500);
    }
}

// Add sparkle effect to main title
function addSparkleEffect() {
    const title = document.querySelector('.main-title');
    
    setInterval(() => {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 1.5em;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle 1s ease-out forwards;
            pointer-events: none;
        `;
        
        title.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }, 2000);
}

// Create floating hearts
function createFloatingHearts() {
    const container = document.querySelector('.container');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.cssText = `
            position: fixed;
            font-size: 2em;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 50}px;
            animation: float-up 4s ease-out forwards;
            pointer-events: none;
            z-index: 5;
        `;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }, 3000);
}

// Setup audio context for sound effects
function setupAudioContext() {
    // Create audio context
    window.audioContext = null;
    
    // Initialize on first user interaction
    document.addEventListener('click', function initAudio() {
        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        document.removeEventListener('click', initAudio);
    });
}

// Play sound effect
function playSound(type) {
    if (!window.audioContext) return;
    
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    if (type === 'celebration') {
        // Play a happy celebratory sound
        oscillator.frequency.setValueAtTime(523.25, window.audioContext.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(783.99, window.audioContext.currentTime + 0.1); // G5
        oscillator.frequency.exponentialRampToValueAtTime(1046.50, window.audioContext.currentTime + 0.2); // C6
        
        gainNode.gain.setValueAtTime(0.3, window.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(window.audioContext.currentTime + 0.3);
    }
}

// Add click effect to candles
document.addEventListener('DOMContentLoaded', function() {
    const candles = document.querySelectorAll('.flame');
    
    candles.forEach(flame => {
        flame.addEventListener('click', function() {
            // Blow out candle effect
            this.style.opacity = '0';
            playSound('blow');
            
            // Relight after 2 seconds
            setTimeout(() => {
                this.style.opacity = '1';
            }, 2000);
        });
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes float-up {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes confetti-burst {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
        }
    }
    
    .flame {
        cursor: pointer;
        transition: opacity 0.3s ease;
    }
    
    .flame:hover {
        transform: scale(1.2);
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const surpriseMessage = document.getElementById('surpriseMessage');
        const button = document.querySelector('.surprise-btn');
        
        if (button.style.display !== 'none') {
            showSurprise();
        }
    }
    
    if (e.key === 'Escape') {
        resetSurprise();
    }
});

// Add touch support for mobile
document.addEventListener('touchstart', function(e) {
    // Add touch ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(255, 107, 157, 0.3);
        border-radius: 50%;
        left: ${e.touches[0].clientX - 10}px;
        top: ${e.touches[0].clientY - 10}px;
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Create floating images function
function createFloatingImages() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = '../images/510434506_1256081902761270_5304385400308496768_n.png';
            img.alt = 'Floating image';
            img.style.cssText = `
                position: fixed;
                width: ${Math.random() * 40 + 40}px;
                height: auto;
                opacity: 0;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 3;
                pointer-events: none;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;

            document.body.appendChild(img);

            setTimeout(() => {
                img.style.opacity = '0.6';
            }, 100);

            setTimeout(() => {
                if (img.parentNode) {
                    img.remove();
                }
            }, 7000);
        }, i * 400);
    }
}
