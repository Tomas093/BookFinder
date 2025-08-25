export const genreMap: Record<string, string> = {
    Realismo_m_gico: "Realismo mágico",
    Romance: "Romance",
    Ficci_n: "Ficción",
    Fantas_a: "Fantasía",
    Fantas_a__pica: "Fantasía épica",
    Ficci_n_contempor_nea: "Ficción contemporánea",
    Terror: "Terror",
    Distop_a: "Distopía",
    B_lico: "Bélico",
    Misterio: "Misterio",
    Ciencia_ficci_n: "Ciencia ficción",
    Ficci_n_hist_rica: "Ficción histórica",
    Misterio_hist_rico: "Misterio histórico",
    Finanzas_personales: "Finanzas personales",
};

export function getGenreDisplay(genre: string): string {
    return genreMap[genre] || genre;
}