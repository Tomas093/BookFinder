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
    onViewDetails?: () => void;
}

export default function BookCard({
                                     title,
                                     author,
                                     genre,
                                     isFavorite,
                                     onToggleFavorite,
                                     onViewDetails
                                 }: CardProps) {

    const handleViewDetails = () => {
        if (onViewDetails) {
            onViewDetails();
        }
    };

    return (
        <div className={styles.bookCard}>
            <div className={styles.bookImagePlaceholder}></div>
            <div className={styles.favoriteIconContainer}>
                <IconButton
                    onClick={onToggleFavorite}
                    className={styles.favoriteIcon}
                    color={isFavorite ? "error" : "default"}
                    size="small"
                    aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                    {isFavorite ? <Favorite/> : <FavoriteBorder/>}
                </IconButton>
            </div>

            <div className={styles.bookContent}>
                <h2 className={styles.bookTitle}>{title}</h2>
                <p className={styles.bookAuthor}>por {author}</p>
                <span className={styles.bookGenre}>{genre}</span>
                <button
                    className={styles.viewDetailsButton}
                    onClick={handleViewDetails}
                    aria-label="Ver Sinopsis del libro">
                    Ver Sinopsis
                </button>
            </div>
        </div>
    );
}