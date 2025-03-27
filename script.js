const apiKey = "b3c38c1cb653ac82f15b9ae0e0e8c8ba"; 
const apiUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
const searchButton = document.getElementById("searchButton");
const movieInput = document.getElementById("movieInput");
const movieInfo = document.getElementById("movieInfo");
const featuredList = document.getElementById("featuredList");
const searchResults = document.getElementById("searchResults");
const backButton = document.getElementById("backButton");

// Carregar filmes populares
async function loadTrendingMovies() {
    try {
        const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=pt-BR`);
        const data = await response.json();
        displayMovies(data.results, featuredList);
    } catch (error) {
        console.error("Erro ao carregar filmes populares:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadTrendingMovies);

searchButton.addEventListener("click", async () => {
    const movieName = movieInput.value.trim();
    if (movieName === "") {
        return;
    }
    try {
        const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}&language=pt-BR`);
        const data = await response.json();
        displayMovies(data.results, movieInfo);
        searchResults.classList.remove("hidden");
        featuredList.parentElement.classList.add("hidden");
        backButton.classList.remove("hidden");
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
});

function displayMovies(movies, container) {
    container.innerHTML = movies.map(movie => `
        <div class="movie-card" onclick="window.location.href='movie-details.html?id=${movie.id}'">
            <img src="${movie.poster_path ? imageBaseUrl + movie.poster_path : 'https://via.placeholder.com/300'}" alt="${movie.title}">
            <h2>${movie.title} (${movie.release_date ? movie.release_date.split("-")[0] : "N/A"})</h2>
        </div>
    `).join('');
}

backButton.addEventListener("click", () => {
    searchResults.classList.add("hidden");
    featuredList.parentElement.classList.remove("hidden");
    backButton.classList.add("hidden");
});
