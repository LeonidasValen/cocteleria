import { useEffect, useState, useCallback } from 'react';
import { ListCoctails } from '../../components/ListCoctails/ListCoctails';
import { useCoctel } from '../../context/CoctelContext';
import { Loading } from '../../components/Loading/Loading';
import { Search } from '../../components/Search/Search';
import { useLocation } from 'react-router';
import { Filter } from '../../components/Filter/Filter';
import './home.css';

export function Home() {
  const { loading, getCoctels, coctels } = useCoctel();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isReloading, setIsReloading] = useState(false); // Indica si estamos recargando por filtros

  const [lastFilters, setLastFilters] = useState({ search: null, categories: null, hasAlcohol: null, typeMethod: null });

  const fetchCoctels = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const categories = params.getAll('categories');
    const typeMethod = params.getAll('typeMethod');
    const hasAlcohol = params.get('hasAlcohol');

    // Determina si los filtros han cambiado
    const filtersChanged =
      search !== lastFilters.search ||
      hasAlcohol !== lastFilters.hasAlcohol ||
      JSON.stringify(categories) !== JSON.stringify(lastFilters.categories) ||
      JSON.stringify(typeMethod) !== JSON.stringify(lastFilters.typeMethod);

    if (loadingMore || filtersChanged) {
      if (filtersChanged) {
        setIsReloading(true); // Indicar que estamos recargando por nuevos filtros
        setPage(1);
        setLastFilters({ search, categories, hasAlcohol, typeMethod });
        getCoctels(params.toString(), 1).finally(() => setIsReloading(false));
      } else {
        setLoadingMore(true);
        getCoctels(params.toString(), page).finally(() => setLoadingMore(false));
      }
    }
  }, [location.search, page, lastFilters, loadingMore]);

  useEffect(() => {
    fetchCoctels();
  }, [page, fetchCoctels]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 100 && page < coctels.totalPages && !loadingMore) {
        setPage((prevPage) => prevPage + 1);
        setLoadingMore(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, coctels.totalPages, loadingMore]);

  return (
    <main className="mainContainer">
      <section className="search-filter">
        <Search />
        <Filter />
      </section>

      {isReloading ? (
        // Muestra solo el indicador de carga durante la recarga de filtros
        <section className="loadingCoctails">
          <Loading />
        </section>
      ) : coctels?.cocteles && coctels?.cocteles.length > 0 ? (
        <>
          <ListCoctails coctels={coctels.cocteles} />
          {loadingMore && (
            <section className="loadingMore">
              <Loading />
            </section>
          )}
        </>
      ) : (
        <h1>No se encontraron cócteles</h1>
      )}
    </main>
  );
}
