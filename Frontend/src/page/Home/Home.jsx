import { useEffect, useState } from 'react';
import { ListCoctails } from '../../components/ListCoctails/ListCoctails'
import { useCoctel } from '../../context/CoctelContext';
import {Loading} from '../../components/Loading/Loading';
import { Search } from '../../components/Search/Search';
import { useLocation } from 'react-router';
import './home.css'

export function Home() {

  const { loading, getCoctels } = useCoctel();

  const location = useLocation();

  const [lastFilters, setLastFilters] = useState({ search: null, categories: null });
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Para la primera carga

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const categories = params.get('categories');
    const hasAlcohol = params.get('hasAlcohol');
    const idCoctel = params.get('idCoctel');

    const filtersChanged = search !== lastFilters.search || categories !== lastFilters.categories || hasAlcohol !== lastFilters.hasAlcohol;

    if (isInitialLoad && !idCoctel && (!search && !categories && !hasAlcohol)) {
      getCoctels('');
      setIsInitialLoad(false); 
    } else if (filtersChanged) {
      getCoctels(params.toString());
      setLastFilters({ search, categories, hasAlcohol });
    }else if (isInitialLoad) {
      getCoctels('')
      setIsInitialLoad(false);
    }
  }, [location.search, lastFilters, isInitialLoad]);

  return (
    <main className="mainContainer">
      <section className='searchContent'>
        <Search />
      </section>
      {loading ? (<section className='loadingCoctails'><Loading /></section>) : <ListCoctails />} 
    </main>
  )
}
