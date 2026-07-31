let nextPageUrl = null;

async function getLocations(url) {
    try {
        let response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Nenhuma localização foi encontrada.");
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

function renderCards(locations, isAppend = false) {
    const gallery = document.getElementById('card-galery');
    
    if (!isAppend) {
        gallery.innerHTML = '';
    }

    let cardsHTML = '';

    locations.forEach(location => {
        cardsHTML += `
            <article class="card location-card">
                <a href="location-detail.html?id=${location.id}">
                    <div class="card-content">
                        <h3>${location.name}</h3>
                        <p>${location.type}</p>
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

async function loadLocations() {
    const searchInput = document.querySelector('.search input');
    const selects = document.querySelectorAll('.filters select');

    const name = searchInput ? searchInput.value : '';
    const type = selects[0] ? selects[0].value : '';
    const dimension = selects[1] ? selects[1].value : '';

    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (type) params.append('type', type); 
    if (dimension) params.append('dimension', dimension);

    // Endpoint corrigido para 'location' (singular)
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const initialUrl = `https://rickandmortyapi.com/api/location/${queryString}`;

    const locations = await getLocations(initialUrl);
    
    renderCards(locations, false); 
}

async function handleLoadMore() {
    if (!nextPageUrl) return;
    
    const newLocations = await getLocations(nextPageUrl);
    
    renderCards(newLocations, true); 
}

const searchInput = document.querySelector('.search input');
if (searchInput) {
    searchInput.addEventListener('input', loadLocations);
}

const selects = document.querySelectorAll('.filters select');
selects.forEach(select => {
    select.addEventListener('change', loadLocations);
});

const loadMoreBtn = document.querySelector('.load-more button');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', handleLoadMore);
}

loadLocations();