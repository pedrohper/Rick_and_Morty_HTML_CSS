async function getCharacters(name = '', species = '', gender = '', status = '') {
    try {
    let url = `https://rickandmortyapi.com/api/character/?name=${name}&species=${species}&gender=${gender}&status=${status}`;
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Nenhum personagem foi encontrado com esse filtro.");
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

function renderCards(characters) {
    const gallery = document.getElementById('card-galery');
    gallery.innerHTML = '';

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

async function loadCharacters(searchTerm = '') {
    const characters = await getCharacters(searchTerm);
    renderCards(characters);
}

const searchInput = document.querySelector('.search input');

searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    loadCharacters(searchTerm);
});

loadCharacters();