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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

    const [lastFilters, setLastFilters] = useState({
    search: null,
    categories: null,
    hasAlcohol: null,
    typeMethod: null,
  });

  const fetchCoctels = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const categories = params.get('categories');
    const typeMethod = params.get('typeMethod');
    const hasAlcohol = params.get('hasAlcohol');
    const idCoctel = params.get('idCoctel');

    const filtersChanged =
      search !== lastFilters.search ||
      categories !== lastFilters.categories ||
      typeMethod !== lastFilters.typeMethod ||
      hasAlcohol !== lastFilters.hasAlcohol;

    if ( isInitialLoad || filtersChanged || ( page > 1 && loadingMore)) {
      if (!idCoctel && (!search && !categories && !hasAlcohol && !typeMethod)) {
        getCoctels('' , page);
      } else {
        getCoctels(params.toString(), page);
        setPage(1);
      }
      if (filtersChanged) {
        setLastFilters({ search, categories, hasAlcohol, typeMethod });
      }
      setIsInitialLoad(false);
      setLoadingMore(false);
    }
  }, [location.search, getCoctels, page]);

  useEffect(() => {
    fetchCoctels();
  }, [page, fetchCoctels]);

  window.onscroll = function () {
    // if the page has reached to the bottom
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 1 && page < coctels.totalPages) {
      setPage((prevPage) => prevPage + 1);
      setLoadingMore(true);
    }
  };

  return (
    <main className="mainContainer">
      <section className='search-filter'>
        <Search />
        <Filter />
      </section>

      {loading && isInitialLoad ? (
        // Mostrar el indicador de carga inicial
        <section className="loadingCoctails">
          <Loading />
        </section>
      ) : coctels?.cocteles?.length > 0 ? (
        // Mostrar la lista de cócteles si hay resultados
        <ListCoctails coctels={coctels.cocteles} />
      ) : (
        // Mostrar mensaje solo si no hay resultados y no se está cargando
        !loading && (
          <section>
            <p>No se encontraron cócteles.</p>
          </section>
        )
      )}

      {loadingMore && <Loading />}
    </main>
  );
}