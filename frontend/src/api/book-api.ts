import type {Book} from "@/types/book";


const BASE_URL = 'http://localhost:3000/book';

function toBook(raw: any): Book {
    return {
        id: raw.id,
        title: raw.title,
        author: raw.authors
            ? {
                name: raw.authors.name ?? '',
                birthDate: raw.authors.birth_date ? new Date(raw.authors.birth_date) : new Date(),
            }
            : { name: '', birthDate: new Date() },
        genre: raw.genre,
        synopsis: raw.synopsis,
        publishedAt: raw.published_at ? new Date(raw.published_at) : new Date(),
        isFavorite: raw.isFavorite,
    };
}

export async function getAllBooks(): Promise<Book[]> {
    const res = await fetch(`${BASE_URL}/`);
    const data = await res.json();
    return Array.isArray(data) ? data.map(toBook) : [];
}

export async function getFavoriteBooks(): Promise<Book[]> {
    const res = await fetch(`${BASE_URL}/favorites`);
    const data = await res.json();
    return Array.isArray(data) ? data.map(toBook) : [];
}

export async function getBookById(id: number): Promise<Book | null> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return toBook(data);
}

export async function addFavoriteBook(id: number): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/${id}/favorite`, {method: 'PUT'});
    return res.json();
}

export async function removeFavoriteBook(id: number): Promise<{ message: string }> {
    const res = await fetch(`${BASE_URL}/${id}/favorite`, {method: 'DELETE'});
    return res.json();
}

export async function searchBooks(
    searchString: string,
    matchType = 'contains',
    searchField = 'title'
): Promise<Book[]> {
    const params = new URLSearchParams({searchString, matchType, searchField});
    const res = await fetch(`${BASE_URL}/search?${params.toString()}`);
    const data = await res.json();
    return Array.isArray(data) ? data.map(toBook) : [];
}