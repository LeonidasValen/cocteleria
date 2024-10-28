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

    
    //al hacer clic en el boton buscar
    const handleSearch = () => {
        if (search.trim()) { 
            const newSearchParams = new URLSearchParams(searchParams.toString()); 
            newSearchParams.set('search', search);
            navigate(`/?${newSearchParams.toString()}`, { replace: true }); // Navega a la nueva URL sin reemplazar los filtros existentes
        } else {
            // Si el campo está vacio, eliminamos 'search' de los parametros
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('search');
            navigate(`/?${newSearchParams.toString()}`, { replace: true });
        }
    };

    // maneja la busqueda al presionar Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // llama la busqueda
        }
    };

  return (
    <div className='search'>
        <button><IconSearch /></button>
        <input type="text" placeholder='search...'  value={search} onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
    </div>
  )
}
