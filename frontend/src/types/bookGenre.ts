export const BookGenre = {
    REALISMO_MAGICO: 'Realismo mágico',
    ROMANCE: 'Romance',
    FICCION: 'Ficción',
    FANTASIA: 'Fantasía',
    FANTASIA_EPICA: 'Fantasía épica',
    FICCION_CONTEMPORANEA: 'Ficción contemporánea',
    TERROR: 'Terror',
    DISTOPIA: 'Distopía',
    BELICO: 'Bélico',
    MISTERIO: 'Misterio',
    CIENCIA_FICCION: 'Ciencia ficción',
    FICCION_HISTORICA: 'Ficción histórica',
    MISTERIO_HISTORICO: 'Misterio histórico',
    FINANZAS_PERSONALES: 'Finanzas personales',
} as const;


export type BookGenre = typeof BookGenre[keyof typeof BookGenre];