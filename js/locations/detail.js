async function getLocationDetail(id) {
    try {
        let response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
        if (!response.ok) throw new Error("Localização não encontrada.");
        return await response.json();
    } catch (error) {
        console.error("Erro:", error.message);
        return null;
    }
}

async function getResidentsData(residentUrls) {
    if (!residentUrls || residentUrls.length === 0) return [];
    try {
        const promises = residentUrls.map(url => fetch(url).then(res => res.json()));
        return await Promise.all(promises);
    } catch (error) {
        console.error("Erro ao carregar residentes:", error);
        return [];
    }
}

function renderLocationDetail(location) {
    if (!location) return;

    document.querySelector('#location-name').innerText = location.name;
    document.querySelector('#location-type').innerText = location.type;
    document.querySelector('#type').innerText = location.type || 'Unknown';
    document.querySelector('#dimension').innerText = location.dimension || 'Unknown';
}

function renderResidents(residents) {
    const gallery = document.getElementById('residents-gallery');
    if (!gallery) return;

    if (residents.length === 0) {
        gallery.innerHTML = '<p>Nenhum residente encontrado neste local.</p>';
        return;
    }

    let cardsHTML = '';
    residents.forEach(character => {
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
        const location = await getLocationDetail(id);
        renderLocationDetail(location);

        if (location && location.residents) {
            const residents = await getResidentsData(location.residents);
            renderResidents(residents);
        }
    } else {
        console.error("Nenhum ID informado na URL.");
    }
}

initDetail();