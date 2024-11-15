import { useEffect, useState, useCallback } from 'react';
import { ListCoctails } from '../../components/ListCoctails/ListCoctails';
import { useCoctel } from '../../context/CoctelContext';
import { Loading } from '../../components/Loading/Loading';
import { Search } from '../../components/Search/Search';
import { useLocation } from 'react-router';
import { Filter } from '../../components/Filter/Filter';
import './home.css';

export function Home() {
  const { loading, getCoctels, coctels, setCoctels } = useCoctel();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const [lastFilters, setLastFilters] = useState({ search: null, categories: null, hasAlcohol: null, typeMethod: null });

  const fetchCoctels = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const categories = params.get('categories');
    const typeMethod = params.get('typeMethod');
    const hasAlcohol = params.get('hasAlcohol');
    const idCoctel = params.get('idCoctel');

    // Determina si los filtros han cambiado
    const filtersChanged =
      search !== lastFilters.search ||
      categories !== lastFilters.categories ||
      typeMethod !== lastFilters.typeMethod ||
      hasAlcohol !== lastFilters.hasAlcohol;

    if (filtersChanged) {
      // Si los filtros han cambiado, reinicia la página a 1 y borra los cocteles previos
      setPage(1);
      setCoctels({ cocteles: [], totalPages: 0 });
      setLastFilters({ search, categories, hasAlcohol, typeMethod });
    }

    // Solo obtiene los cocteles si es necesario
    if (!idCoctel && !search && !categories && !hasAlcohol && !typeMethod) {
      getCoctels('', page); 
    } else {
      getCoctels(params.toString(), page); // Usar la página actual con filtros
    }

    setLoadingMore(false); 
  }, [location.search, page, lastFilters]);

  console.log(coctels)

  useEffect(() => {
    fetchCoctels();
  }, [page, fetchCoctels]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

      // Si llegamos al final de la página y no estamos cargando más cócteles
      if (scrollTop + clientHeight >= scrollHeight - 1 && page < coctels.totalPages && !loadingMore) {
        setPage((prevPage) => prevPage + 1);
        setLoadingMore(true); 
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, coctels.totalPages, loadingMore]);

  return (
    <main className="mainContainer">
      <section className='search-filter'>
        <Search />
        <Filter />
      </section>

      {loading && loadingMore ? (
        // Muestra solo el indicador de carga inicial al cargar la página
        <section className="loadingCoctails">
          <Loading />
        </section>
      ) : (
        coctels?.cocteles && coctels?.cocteles.length > 0 ? (
          <>
            <ListCoctails coctels={coctels.cocteles} />
            {loadingMore && <Loading />}
          </>
        ) : (
          loading ? (
            <section className="loadingCoctails">
              <Loading />
            </section>
          ) : (
            <h1>No se encontraron cócteles</h1>
          )
        )
      )}

      {loadingMore && <Loading />}
    </main>
  );
}

