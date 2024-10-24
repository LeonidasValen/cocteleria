import { useState } from 'react';
import DetailCoctel from '../DetailCoctel/DetailCoctel';
import './listCoctails.css'

export function ListCoctails() {

    const [openModal, setOpenModal] = useState(false);

    const cocktails = [
        { id: 1, name: "Margarita", image: "./img/gintonic.jpg", difficulty: "Fácil", alcoholic: true },
        { id: 2, name: "Mojito", image: "./img/gintonic.jpg", difficulty: "Medio", alcoholic: true },
        { id: 3, name: "Piña Colada", image: "./img/gintonic.jpg", difficulty: "Fácil", alcoholic: true },
        { id: 4, name: "Daiquiri", image: "./img/gintonic.jpg", difficulty: "Medio", alcoholic: true },
        { id: 5, name: "Martini", image: "./img/gintonic.jpg", difficulty: "Fácil", alcoholic: true },
        { id: 6, name: "Cosmopolitan", image: "./img/gintonic.jpg", difficulty: "Medio", alcoholic: true },
        { id: 7, name: "Negroni", image: "./img/gintonic.jpg", difficulty: "Difícil", alcoholic: true },
        { id: 8, name: "Limonada de Fresa", image: "./img/gintonic.jpg", difficulty: "Fácil", alcoholic: false },
    ]

    return (
        <>
            {
                cocktails.length > 0 ? (
                    cocktails.map((coctail) => (
                        <article className='coctailArticle' key={coctail.id} onClick={()=>setOpenModal(!openModal)}>
                            <header className='coctailImg'>
                                <img src={coctail.image} alt={coctail.name} />
                            </header>
                            <h3 className='coctailName'>{coctail.name}</h3>
                            <div className='category'>
                                <p className='isAlcoholic'>{coctail.alcoholic ? "Con alcohol" : "Sin alcohol"}</p>
                                <p className='difficulty'>{coctail.difficulty}</p>
                            </div>
                        </article>
                    ))
                ) : (
                    <h1>ningun coctail</h1>
                )
            }
            {openModal && <DetailCoctel setOpenModal={setOpenModal}/>}
        </>
    )
}
