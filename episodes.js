async function getEpisodes(){
    try {
        let response = await fetch('https://rickandmortyapi.com/api/episode');
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Nenhum episódio foi encontrado com esse filtro.");
            }
            throw new Error(`Erro na requisição: Status ${response.status}`);
        }
        let data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Erro:", error.message);
        return [];
    }
}

function renderCards(episodes){
    const gallery = document.getElementById('card-galery');
    gallery.innerHTML = '';

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

    gallery.innerHTML = cardsHTML;
}

async function loadEpisodes() {
    const episodes = await getEpisodes();
    renderCards(episodes);
}

loadEpisodes();