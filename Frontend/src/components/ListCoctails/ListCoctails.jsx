import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DetailCoctel from '../DetailCoctel/DetailCoctel';
import { useCoctel } from '../../context/CoctelContext';
import './listCoctails.css'

export function ListCoctails({coctels}) {

    //const { coctels } = useCoctel();

    const [openModal, setOpenModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(() => { 
        const idCoctel = searchParams.get('idCoctel');
        if (idCoctel) {

            setOpenModal(true);
            document.documentElement.style.overflow = 'hidden'; 
        }else{
            setOpenModal(false);
            document.documentElement.style.overflow = 'auto'
        }
    },[searchParams]);

    const handleDetailCoctel = (id) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('idCoctel', id);
        setSearchParams(newSearchParams);
    };

    const handleCloseModal = () => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete('idCoctel');
        setSearchParams(newSearchParams); // Usa `setSearchParams` en lugar de `navigate`
    };

    return (
        <section className='ListCoctails'>
            {coctels.length > 0 ? (
               coctels.map((coctail) => (
                    <article
                        className='coctailArticle'
                        key={`coctel=${coctail._id}`}
                        onClick={() => handleDetailCoctel(coctail._id)}
                    >
                        <header className='coctailImg'>
                            <img src={coctail.fileUrl} alt={coctail.name} />
                        </header>
                        <h3 className='coctailName'>{coctail.name}</h3>
                        <div className='category'>
                            <p className='isAlcoholic'>{coctail.hasAlcohol ? 'Con alcohol' : 'Sin alcohol'}</p>
                            <p className='difficulty'>{coctail.difficulty}</p>
                        </div>
                    </article>
                ))
            ) : (
                <h1>No se econtro ningún cóctel</h1>
            )}
            {openModal && (< DetailCoctel id={searchParams.get('idCoctel')} handleCloseModal={handleCloseModal} />)}
        </section>
    );
}
