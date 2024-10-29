<<<<<<< HEAD
import { useEffect } from 'react';
import { useCoctel } from '../../context/CoctelContext';
import { ListCoctails } from '../../components/ListCoctails/ListCoctails'
import { Loading } from '../../components/Loading/Loading';
=======
import { useEffect, useState } from 'react';
import { ListCoctails } from '../../components/ListCoctails/ListCoctails'
import { useCoctel } from '../../context/CoctelContext';
import {Loading} from '../../components/Loading/Loading';
>>>>>>> main
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
<<<<<<< HEAD
    if (params.toString()) {
      getCoctels(params.toString());
    } else {
=======
    const search = params.get('search');
    const categories = params.get('categories');
    const idCoctel = params.get('idCoctel');

    const filtersChanged = search !== lastFilters.search || categories !== lastFilters.categories;

    if (isInitialLoad && !idCoctel && (!search && !categories)) {
>>>>>>> main
      getCoctels('');
      setIsInitialLoad(false); 
    } else if (filtersChanged) {
      getCoctels(params.toString());
      setLastFilters({ search, categories });
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
      {loading ? <Loading /> : <ListCoctails />}
    </main>
  )
}
