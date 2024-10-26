import { useEffect, useState } from 'react';
import DetailCoctel from '../DetailCoctel/DetailCoctel';
import { useCoctel } from '../../context/CoctelContext';
import './listCoctails.css'

export function ListCoctails() {

    const { getCoctels, coctels } = useCoctel()

    useEffect(() => {
        getCoctels()
    }, [])

    const [openModal, setOpenModal] = useState(false);


    return (
        <>
            {
                coctels.length > 0 ? (
                    coctels.map((coctail) => {
                        return (
                            <article className='coctailArticle' key={`coctel=${coctail.id}`} onClick={() => setOpenModal(!openModal)}>
                                <header className='coctailImg'>
                                    <img src={coctail.fileUrl} alt={coctail.name} />
                                </header>
                                <h3 className='coctailName'>{coctail.name}</h3>
                                <div className='category'>
                                    <p className='isAlcoholic'>{coctail.hasAlcohol ? 'Con alcohol' : 'Sin alcohol'}</p>
                                    <p className='difficulty'>{coctail.difficulty}</p>
                                </div>
                            </article>
                        );
                    })
                ) : (
                    <h1>ningun coctail</h1>
                )
            }
            {openModal && <DetailCoctel setOpenModal={setOpenModal} />}
        </>
    )
}
