async function getEpisodeDetail(id) {
    try {
        let response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        if (!response.ok) throw new Error("Episódio não encontrado.");
        return await response.json();
    } catch (error) {
        console.error("Erro:", error.message);
        return null;
    }
}

async function getCharactersData(characterUrls) {
    if (!characterUrls || characterUrls.length === 0) return [];
    try {
        const promises = characterUrls.map(url => fetch(url).then(res => res.json()));
        return await Promise.all(promises);
    } catch (error) {
        console.error("Erro ao carregar personagens do episódio:", error);
        return [];
    }
}

function renderEpisodeDetail(episode) {
    if (!episode) return;

    document.querySelector('#episode-name').innerText = episode.name;
    document.querySelector('#episode-code').innerText = episode.episode;
    document.querySelector('#code-val').innerText = episode.episode;
    document.querySelector('#air-date').innerText = episode.air_date;
}

function renderCharacters(characters) {
    const gallery = document.getElementById('characters-gallery');
    if (!gallery) return;

    if (characters.length === 0) {
        gallery.innerHTML = '<p>Nenhum personagem encontrado neste episódio.</p>';
        return;
    }

    let cardsHTML = '';
    characters.forEach(character => {
        cardsHTML += `
            <article class="card">
                <a href="character-detail.html?id=${character.id}">
                    <div class="card-image-container">
                        <img src="${character.image}" alt="${character.name}">
                    </div>
                    <div class="card-content">
                        <h3>${character.name}</h3>
                        <p>${character.species}</p>
                    </div>
                </a>
            </article>
        `;
    });

    gallery.innerHTML = cardsHTML;
}

async function initDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (id) {
        const episode = await getEpisodeDetail(id);
        renderEpisodeDetail(episode);

        if (episode && episode.characters) {
            const characters = await getCharactersData(episode.characters);
            renderCharacters(characters);
        }
    } else {
        console.error("Nenhum ID informado na URL.");
    }
}

initDetail();