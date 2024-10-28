import { useEffect } from 'react';
import { useCoctel } from '../../context/CoctelContext';
// import { ListCoctails } from '../../components/ListCoctails/ListCoctails'
// import { Loading } from '../../components/loading/Loading';
import { Search } from '../../components/Search/Search';
import { useLocation } from 'react-router';
import './home.css'

export function Home() {

  const { loading, getCoctels } = useCoctel();

  const location = useLocation();

  //detecta los cambios en la url
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params.toString());
    if (params.toString()) {
      getCoctels(params.toString());
    } else {
      getCoctels('');
    }
  }, [location.search]);

  return (
    <main className="mainContainer">
      <section className='searchContent'>
        <Search />
      </section>
      {/* {loading ? <Loading /> : <ListCoctails />} */}
    </main>
  )
}
