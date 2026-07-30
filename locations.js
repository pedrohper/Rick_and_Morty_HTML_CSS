async function getLocations() {
    try {
        let response = await fetch('https://rickandmortyapi.com/api/location');

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Nenhum local foi encontrado com esse filtro.");
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

function renderCards(locations) {
    const gallery = document.getElementById('card-galery');
    gallery.innerHTML = '';

    let cardsHTML = '';

    locations.forEach(location => {
        cardsHTML += `
            <article class="card location-card">
                <a href="${location.id}">
                    <div class="card-content">
                        <h3>${location.name}</h3>
                        <p>${location.type}</p>
                    </div>
                </a>
            </article>
        `;
    });

    gallery.innerHTML = cardsHTML;
}

async function loadLocations() {
    const locations = await getLocations();
    renderCards(locations);
}

loadLocations();