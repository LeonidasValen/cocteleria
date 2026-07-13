import { useEffect, useState } from 'react';
import { IconSearch } from '../../assets/icons'
import { useNavigate, useSearchParams } from 'react-router-dom';
import './search.css'

export function Search() {

    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const searchFromUrl = searchParams.get('search');
        if (searchFromUrl) {
            setSearch(searchFromUrl);
        } else {
            setSearch('');
        }
    }, [searchParams]);


    const handleSearch = () => {
        if (search.trim()) {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set('search', search);
            navigate(`/?${newSearchParams.toString()}`, { replace: true });
        } else {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('search');
            navigate(`/?${newSearchParams.toString()}`, { replace: true });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página
        handleSearch(); // Ejecuta la búsqueda
    };

    return (
        <div className="searchContent">
            <form className="search" onSubmit={handleFormSubmit}>
                <button type="submit" aria-label="search"><IconSearch /></button>
                <input
                    type="text"
                    placeholder="search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </div>   
        )
}

