async function getCharacterDetail(id) {
    try {
        let response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        
        if (!response.ok) {
            throw new Error("Personagem não encontrado.");
        }

        let character = await response.json();
        return character;

    } catch (error) {
        console.error("Erro:", error.message);
        return null;
    }
}

function renderCharacterDetail(character) {
    if (!character) return;

    const imgElement = document.querySelector('.profile-header img');
    const nameElement = document.querySelector('.profile-header h1');

    const genderElement = document.querySelector('#gender');
    const statusElement = document.querySelector('#status');
    const speciesElement = document.querySelector('#species');
    const originElement = document.querySelector('#origin');
    const typeElement = document.querySelector('#type');
    const locationElement = document.querySelector('.info-item.clickable .value');

    if (imgElement) {
        imgElement.src = character.image;
        imgElement.alt = character.name;
    }
    if (nameElement) nameElement.innerText = character.name;
    
    if (genderElement) genderElement.innerText = character.gender;
    if (statusElement) statusElement.innerText = character.status;
    if (speciesElement) speciesElement.innerText = character.species;
    if (originElement) originElement.innerText = character.origin.name;
    if (typeElement) typeElement.innerText = character.type || 'Unknown';
    if (locationElement) locationElement.innerText = character.location.name;
}

async function initDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        const character = await getCharacterDetail(id);
        renderCharacterDetail(character);

        if (character && character.episode) {
            const episodes = await getEpisodesData(character.episode);
            renderEpisodes(episodes);
        }
    } else {
        console.error("Nenhum ID encontrado na URL.");
    }
}

async function getEpisodesData(episodeUrls) {
    const fetchPromises = episodeUrls.map(url => fetch(url).then(res => res.json()));
    
    const episodes = await Promise.all(fetchPromises);
    return episodes;
}

function renderEpisodes(episodes) {
    const episodesList = document.querySelector('.episodes-list');
    if (!episodesList) return;

    let html = '';

    episodes.forEach(episode => {
        html += `
            <li>
                <a href="episode-detail.html?id=${episode.id}" class="episode-card">
                    <div class="episode-details">
                        <h3>${episode.episode}</h3>
                        <p class="episode-name">${episode.name}</p>
                        <span class="episode-date">${episode.air_date}</span>
                    </div>
                    <span class="chevron">&rsaquo;</span>
                </a>
            </li>
        `;
    });

    episodesList.innerHTML = html;
}

initDetail();

