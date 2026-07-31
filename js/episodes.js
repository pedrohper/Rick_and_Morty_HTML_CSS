let nextPageUrl = null;

async function getEpisodes(url) {
    try {
        let response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Nenhum episódio foi encontrado.");
            }
            throw new Error(`Erro na requisição: Status ${response.status}`);
        }

        let data = await response.json();
        
        nextPageUrl = data.info.next; 
        
        return data.results;

    } catch (error) {
        console.error("Erro:", error.message);
        nextPageUrl = null;
        return [];
    }
}

function renderCards(episodes, isAppend = false) {
    const gallery = document.getElementById('card-galery');
    
    if (!isAppend) {
        gallery.innerHTML = '';
    }

    let cardsHTML = '';

    episodes.forEach(episode => {
        cardsHTML += `
            <article class="card episode-list-card">
                <a href="episode-detail.html?id=${episode.id}">
                    <div class="card-content">
                        <h3>${episode.name}</h3>
                        <p class="episode-date">${episode.air_date}</p>
                        <span class="episode-code">${episode.episode}</span>
                    </div>
                </a>
            </article>
        `;
    });

    gallery.innerHTML += cardsHTML;

    const loadMoreBtn = document.querySelector('.load-more button');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = nextPageUrl ? 'block' : 'none';
    }
}

async function loadEpisodes() {
    const searchInput = document.querySelector('.search input');
    const name = searchInput ? searchInput.value : '';

    const params = new URLSearchParams();
    if (name) params.append('name', name);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const initialUrl = `https://rickandmortyapi.com/api/episode/${queryString}`;

    const episodes = await getEpisodes(initialUrl);
    
    renderCards(episodes, false); 
}

async function handleLoadMore() {
    if (!nextPageUrl) return;
    
    const newEpisodes = await getEpisodes(nextPageUrl);
    
    renderCards(newEpisodes, true); 
}

const searchInput = document.querySelector('.search input');
if (searchInput) {
    searchInput.addEventListener('input', loadEpisodes);
}

const loadMoreBtn = document.querySelector('.load-more button');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', handleLoadMore);
}

loadEpisodes();