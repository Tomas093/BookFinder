import {BookGenre} from "@/types/bookGenre";
import type {Author} from "@/types/author.ts";

export interface Book {
    title: string;
    author: Author;
    genre: BookGenre;
    synopsis: string;
    isFavorite: boolean;
}