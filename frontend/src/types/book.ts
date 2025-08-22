import {BookGenre} from "@/types/bookGenre";
import type {Author} from "@/types/author.ts";

export interface Book {
    id: number;
    title: string;
    publishedAt: Date;
    author: Author;
    synopsis: string;
    genre: BookGenre;
    isFavorite: boolean;
}

