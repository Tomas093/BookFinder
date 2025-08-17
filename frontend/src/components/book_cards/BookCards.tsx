import styles from "./bookcards.module.css";
import {BookGenre} from "@/types/bookGenre";
import {IconButton} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";

interface CardProps {
    title: string;
    author: string;
    genre: BookGenre;
    synopsis: string;
    isFavorite: boolean;
    onToggleFavorite?: () => void;
}

export default function BookCard({title, author, genre, synopsis, isFavorite, onToggleFavorite}: CardProps) {
    return (
        <div className={styles.bookCard}>
            <div className={styles.favoriteIconContainer}>
                <IconButton
                    aria-label="Toggle Favorite"
                    onClick={onToggleFavorite}
                    className={styles.favoriteIcon}
                    color={isFavorite ? "error" : "default"}
                    size="small"
                >
                    {isFavorite ? <Favorite/> : <FavoriteBorder/>}
                </IconButton>
            </div>
            <h2 className={styles.bookTitle}>{title}</h2>
            <p className={styles.bookAuthor}>by {author}</p>
            <p className={styles.bookGenre}>Genre: {genre}</p>
            <p className={styles.bookSynopsis}>{synopsis}</p>
            <button className={styles.viewDetailsButton}>
                Ver Detalles
            </button>
        </div>
    );
}