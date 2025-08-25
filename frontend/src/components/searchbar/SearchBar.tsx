import React, {type FormEvent, useState} from 'react';
import styles from './searchbar.module.css';

export type SearchField = 'title' | 'author' | 'synopsis' | 'genre';
export type MatchType = 'contains' | 'startsWith' | 'endsWith';

interface SearchBarProps {
    onSearch: (query: string, field: SearchField, match: MatchType) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
    const [query, setQuery] = useState('');
    const [field, setField] = useState<SearchField>('title');
    const [match, setMatch] = useState<MatchType>('contains');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const q = query.trim();
        if (!q) return;
        onSearch(q, field, match);
    };

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit} role="search" aria-label="Site search">
            <span className={styles.icon} aria-hidden="true">🔍</span>
            <select
                className={styles.select}
                value={field}
                onChange={e => setField(e.target.value as SearchField)}
                aria-label="Search field"
            >
                <option value="title">Titulo</option>
                <option value="author">Autor</option>
                <option value="synopsis">Sinopsis</option>
                <option value="genre">Genero</option>
            </select>
            <select
                className={styles.select}
                value={match}
                onChange={e => setMatch(e.target.value as MatchType)}
                aria-label="Match type"
            >
                <option value="contains">Contiene</option>
                <option value="startsWith">Empieza Por</option>
                <option value="endsWith">Termina Por</option>
            </select>
            <input
                className={styles.input}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={`Buscar Libro`}
                autoComplete="off"
                aria-label="Search query"
            />
            {query && (
                <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => setQuery('')}
                    aria-label="Limpiar Busqueda"
                >
                    ×
                </button>
            )}
            <button type="submit" className={styles.submitBtn} disabled={!query.trim()}>
                Search
            </button>
            <div className={styles.focusGlow} aria-hidden="true"/>
        </form>
    );
};

export default SearchBar;