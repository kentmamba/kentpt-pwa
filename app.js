// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope: ', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed: ', error);
            });
    });
}

// Install PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installBtn').style.display = 'block'; // Show install button

    document.getElementById('installBtn').addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        });
    });
});

// Fetch and Display Word Definition
document.getElementById('searchWordBtn').addEventListener('click', () => {
    const word = document.getElementById('wordInput').value.trim();
    if (!word) {
        alert("Please enter a word to search.");
        return;
    }
    
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    document.getElementById('result-container').innerHTML = '';
    document.getElementById('backBtn').style.display = 'block';

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Word not found or API failed');
            return response.json();
        })
        .then(data => {
            const wordData = data[0];
            const wordMeaning = wordData.meanings[0].definitions[0].definition;
            const wordPronunciation = wordData.phonetics[0]?.text || "N/A";

            const resultContainer = document.getElementById('result-container');
            resultContainer.innerHTML = `
                <div class="result">
                    <h2 class="word-title">${wordData.word}</h2>
                    <p><strong>Pronunciation:</strong> ${wordPronunciation}</p>
                    <p><strong>Meaning:</strong> ${wordMeaning}</p>
                    <p><strong>Part of Speech:</strong> ${wordData.meanings[0].partOfSpeech}</p>
                    <a href="https://www.google.com/search?q=${word}" target="_blank" class="more-info-btn">More Info</a>
                </div>
            `;
        })
        .catch(error => {
            console.log('Error fetching word:', error);
            document.getElementById('result-container').innerHTML = `<p style="color: red;">Oops! Word not found or something went wrong.</p>`;
        });
});

// Back Button
document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('wordInput').value = '';
    document.getElementById('result-container').innerHTML = '';
    document.getElementById('backBtn').style.display = 'none';
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope: ', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed: ', error);
            });
    });
}
