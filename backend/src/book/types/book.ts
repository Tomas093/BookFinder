import type {Author} from "../../author/domain/author.js";
import type {genre_enum} from "@prisma/client";

export interface Book {
    id: number;
    title: string;
    publishedAt: Date;
    author: Author;
    synopsis: string;
    genre: genre_enum;
    isFavorite: boolean;
}


