import type {Author} from "../../author/domain/author.js";
import type {BookGenere} from "./book-genere.js";

export interface Book {
    id: number;
    title: string;
    publishedAt: Date;
    author: Author;
    synopsis: string;
    genre: BookGenere;
    isFavorite: boolean;
}


