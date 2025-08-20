import { BookGenere} from "./book-genere.js";

export interface BookFromDB {
    title: string;
    publishedAt: Date;
    authorId: number;
    synopsis: string;
    genre: BookGenere;
    isFavorite: boolean;
}

export interface AuthorFromDB {
    name: string;
    birthDate: Date;
}