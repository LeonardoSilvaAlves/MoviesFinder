const apiKey = "b3c38c1cb653ac82f15b9ae0e0e8c8ba"; 
const apiUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const movieId = new URLSearchParams(window.location.search).get("id"); // Obtém o ID do filme da URL
const movieDetailsSection = document.getElementById("movieDetails");
const backButton = document.getElementById("backButton");

async function loadMovieDetails() {
    try {
        const response = await fetch(`${apiUrl}/movie/${movieId}?api_key=${apiKey}&language=pt-BR`);
        const movie = await response.json();

        const movieDetailsHtml = `
            <div class="movie-card-detail">
                <img src="${imageBaseUrl + movie.poster_path}" alt="${movie.title}">
                <div class="movie-info">
                    <h2>${movie.title} (${movie.release_date.split("-")[0]})</h2>
                    <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
                    <p><strong>Nota:</strong> ${movie.vote_average} / 10</p>
                    <p><strong>Sinopse:</strong> ${movie.overview}</p>
                </div>
            </div>
        `;
        movieDetailsSection.innerHTML = movieDetailsHtml;
    } catch (error) {
        console.error("Erro ao carregar os detalhes do filme:", error);
    }
}

backButton.addEventListener("click", () => {
    window.history.back(); // Voltar para a página anterior
});

document.addEventListener("DOMContentLoaded", loadMovieDetails);
