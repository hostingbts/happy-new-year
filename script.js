// Background Music Control with Autoplay
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');

let isPlaying = false;

// Set initial volume (adjust as needed, 0.0 to 1.0)
backgroundMusic.volume = 0.3;

// Multiple strategies to ensure autoplay works
function attemptAutoplay() {
    const playPromise = backgroundMusic.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Autoplay started successfully
                isPlaying = true;
                musicToggle.classList.remove('muted');
                console.log('Music autoplay started');
            })
            .catch(error => {
                // Autoplay was prevented
                console.log('Autoplay prevented, will try on user interaction');
                // Set up click handler to play on first user interaction
                const playOnInteraction = () => {
                    backgroundMusic.play()
                        .then(() => {
                            isPlaying = true;
                            musicToggle.classList.remove('muted');
                            console.log('Music started on user interaction');
                        })
                        .catch(err => console.log('Play failed:', err));
                    // Remove listener after first interaction
                    document.removeEventListener('click', playOnInteraction);
                    document.removeEventListener('touchstart', playOnInteraction);
                };
                document.addEventListener('click', playOnInteraction, { once: true });
                document.addEventListener('touchstart', playOnInteraction, { once: true });
            });
    }
}

// Try autoplay immediately when script loads
attemptAutoplay();

// Also try when DOM is fully loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!isPlaying) {
            attemptAutoplay();
        }
    }, 100);
});

// Try when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (!isPlaying) {
            attemptAutoplay();
        }
    }, 200);
});

// Toggle music play/pause
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.add('muted');
        isPlaying = false;
    } else {
        backgroundMusic.play()
            .then(() => {
                musicToggle.classList.remove('muted');
                isPlaying = true;
            })
            .catch(error => {
                console.log('Play failed:', error);
            });
    }
});

// Handle music ended (shouldn't happen with loop, but just in case)
backgroundMusic.addEventListener('ended', () => {
    isPlaying = false;
    musicToggle.classList.add('muted');
});

// Update button state when music is paused/played by other means
backgroundMusic.addEventListener('play', () => {
    isPlaying = true;
    musicToggle.classList.remove('muted');
});

backgroundMusic.addEventListener('pause', () => {
    isPlaying = false;
    musicToggle.classList.add('muted');
});

// Envelope Click Handler - Open/Close envelope to reveal message
document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('opened');
        });
    }
});
