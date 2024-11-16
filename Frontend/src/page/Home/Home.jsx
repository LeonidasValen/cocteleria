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
  const [loadingMore, setLoadingMore] = useState(true);

  const [lastFilters, setLastFilters] = useState({ search: null, categories: null, hasAlcohol: null, typeMethod: null });

  const fetchCoctels = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const categories = params.getAll('categories'); // Captura todos los valores de categorías
    const typeMethod = params.getAll('typeMethod'); // Captura todos los valores de métodos
    const hasAlcohol = params.get('hasAlcohol');
  
    // Comparar si los filtros han cambiado
    const filtersChanged =
      search !== lastFilters.search ||
      hasAlcohol !== lastFilters.hasAlcohol ||
      JSON.stringify(categories) !== JSON.stringify(lastFilters.categories) ||
      JSON.stringify(typeMethod) !== JSON.stringify(lastFilters.typeMethod);
  
    console.log(loadingMore, filtersChanged);
  
    if (loadingMore || filtersChanged) {
      if (filtersChanged) {
        setPage(1);
        setCoctels({ cocteles: [], totalPages: 0 });
        setLastFilters({ search, categories, hasAlcohol, typeMethod });
        getCoctels(params.toString(), 1); // Forzar página 1
      } else {
        getCoctels(params.toString(), page); // Usar el valor actual de page
      }
  
      setLoadingMore(false);
    }
  }, [location.search, page, lastFilters, loadingMore]);

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
