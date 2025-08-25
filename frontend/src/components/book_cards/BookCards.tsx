import styles from "./bookcards.module.css";
import {BookGenre} from "@/types/bookGenre";
import {IconButton} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useMemo} from "react";
import {getGenreDisplay} from "@/types/genreMap";

interface CardProps {
    title: string;
    author: string;
    genre: BookGenre;
    synopsis: string;
    isFavorite: boolean;
    onToggleFavorite?: () => void;
    onViewDetails?: () => void;
}

const colorGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #5f72be 0%, #9921e8 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #faaca8 0%, #ddd6f3 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f83600 0%, #f9d423 100%)',
    'linear-gradient(135deg, #00dbde 0%, #fc00ff 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
    'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
];


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

    const randomGradient = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * colorGradients.length);
        return colorGradients[randomIndex];
    }, []);

    return (
        <div className={styles.bookCard}>
            <div
                className={styles.bookImagePlaceholder}
                style={{background: randomGradient}}
            ></div>
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
                <span className={styles.bookGenre}>{getGenreDisplay(genre)}</span>
                <button
                    className={styles.viewDetailsButton}
                    onClick={handleViewDetails}
                    aria-label="Ver synopsis del libro">
                    Ver synopsis
                </button>
            </div>
        </div>
    );
}