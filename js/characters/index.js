let nextPageUrl = null;

async function getCharacters(url) {
    try {
        let response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Nenhum personagem foi encontrado.");
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

function renderCards(characters, isAppend = false) {
    const gallery = document.getElementById('card-galery');
    
    if (!isAppend) {
        gallery.innerHTML = '';
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

    gallery.innerHTML += cardsHTML;

    const loadMoreBtn = document.querySelector('.load-more button');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = nextPageUrl ? 'block' : 'none';
    }
}

async function loadCharacters() {
    const searchInput = document.querySelector('.search input');
    const selects = document.querySelectorAll('.filters select');

    const name = searchInput ? searchInput.value : '';
    const species = selects[0] ? selects[0].value : '';
    const gender = selects[1] ? selects[1].value : '';
    const status = selects[2] ? selects[2].value : '';

    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (species) params.append('species', species);
    if (gender) params.append('gender', gender);
    if (status) params.append('status', status);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const initialUrl = `https://rickandmortyapi.com/api/character/${queryString}`;

    const characters = await getCharacters(initialUrl);
    
    renderCards(characters, false); 
}

async function handleLoadMore() {
    if (!nextPageUrl) return;
    
    const newCharacters = await getCharacters(nextPageUrl);
    
    renderCards(newCharacters, true); 
}

const searchInput = document.querySelector('.search input');
if (searchInput) {
    searchInput.addEventListener('input', loadCharacters);
}

const selects = document.querySelectorAll('.filters select');
selects.forEach(select => {
    select.addEventListener('change', loadCharacters);
});

const loadMoreBtn = document.querySelector('.load-more button');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', handleLoadMore);
}

loadCharacters();
