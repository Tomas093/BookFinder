import React from 'react';
import styles from './sinopsiscard.module.css';

interface SinopsisCardProps {
    title: string;
    author: string;
    synopsis: string;
    onClose: () => void;
}

const SinopsisCard: React.FC<SinopsisCardProps> = ({title, author, synopsis, onClose}) => {
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const formatSynopsis = (text: string) => {
        return text.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
        )).filter(Boolean);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={handleContentClick}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.header}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.author}>{author}</p>
                </div>

                <div className={styles.content}>
                    <div className={styles.synopsis}>
                        {formatSynopsis(synopsis)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinopsisCard;