document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault();
    fetchPokemon();
});

function fetchPokemon() {
    const query = document.getElementById('searchQuery').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => response.json())
        .then(data => displayPokemon(data))
        .catch(error => console.error('Error fetching Pokémon:', error));
}

function displayPokemon(pokemon) {
    const pokemonInfo = document.getElementById('pokemonInfo');
    pokemonInfo.innerHTML = ''; 
    const pokemonCard = document.createElement('div');
    pokemonCard.className = 'col-md-4 pokemon-card';

    // Obtener habilidades, movimientos y estadísticas
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const moves = pokemon.moves.slice(0, 5).map(move => move.move.name).join(', '); 
    const stats = pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('');

    pokemonCard.innerHTML = `
        <div class="card">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
                <p class="card-text">ID: ${pokemon.id}</p>
                <p class="card-text">Tipo: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
                <p class="card-text">Peso: ${pokemon.weight / 10} kg</p>
                <p class="card-text">Altura: ${pokemon.height / 10} m</p>
                <p class="card-text">Habilidades: ${abilities}</p>
                <p class="card-text">Movimientos: ${moves}</p>
                <ul class="card-text">Estadísticas: ${stats}</ul>
            </div>
        </div>
    `;

    pokemonInfo.appendChild(pokemonCard);
}
