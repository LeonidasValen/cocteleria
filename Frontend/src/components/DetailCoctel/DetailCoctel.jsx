import { useEffect } from "react"
import { IconCoctel } from "../../assets/icons"
import {Loading} from "../Loading/Loading"
import { useGetCoctel } from "../../context/GetCoctelContext"
import "./detailCoctel.css"

export default function DetailCoctel({ handleCloseModal, id }) {

    const { loading, getCoctel, coctelsModal } = useGetCoctel()

    useEffect(() => {
        if (id) {
            getCoctel(id);
        }
    }, [id])

    if (loading) return (
        <section className="modalCoctel">
            <div className="bgModal" onClick={handleCloseModal}></div>
            <div className="modalContent">
                <div className="loadingConetent">
                    <Loading />
                </div>
            </div>
        </section>
    );

    return (
        <section className="modalCoctel">
            <div className="bgModal" onClick={handleCloseModal}></div>
            {coctelsModal ? (
                <div className="modalContent">
                    <div className="mImgCoctel">
                        <img src={coctelsModal.fileUrl} alt="logo" />
                        <button className="closeModal" onClick={handleCloseModal}>X</button>
                    </div>
                    <h1>{coctelsModal.name}</h1>

                    <div className="cEtiqueta">
                        {coctelsModal.categories.map(cat => (
                            <p key={`cat ${cat}`}>{cat}</p>
                        ))}
                    </div>
                    <div className="info">
                        <div className="CategoryCoctel">
                        </div>
                        <div className="ingredientsCoctel ">
                            <div className="ingredColumn1">
                                <h3>Ingredientes:</h3>
                                <ul>
                                    {coctelsModal.ingredients.map((ingredient) => (
                                        <li key={`ingredient ${ingredient}`}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="ingredColumn1">
                                <h3>Garnish:</h3>
                                <ul>
                                    {coctelsModal.garnish.map((garnish) => (
                                        <li key={`garnish ${garnish}`}>{garnish}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="tipoPreparacion">
                            <div className="vasoCoctel">
                                <h3>Vaso recomendado: </h3>
                                <div className="tipoVaso">
                                    <IconCoctel />
                                    <p>{coctelsModal.glassType}</p>
                                </div>
                            </div>
                            <div className="metodoPreparacion">
                                <h3>Metodo de preparación:</h3>
                                <img src="./icons/cocktail.png" alt="cocktail" />
                                <p>{coctelsModal.typeMethod}</p>
                            </div>
                        </div>
                        <div className="metodoCoctel">
                            <h3>Método: </h3>
                            <p>{coctelsModal.method}</p>
                        </div>
                        {coctelsModal.history && (
                            <div className="historyCoctel">
                                <h3>Historia: </h3>
                                <p>{coctelsModal.history}</p>
                            </div>
                        )}
                        {coctelsModal.note && (
                            <div className="notaCoctel">
                                <h3>Nota: </h3>
                                <p>{coctelsModal.note}</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="modalContent">
                    <div className="loadingConetent">
                        <h1>Coctel no encontrado</h1>
                    </div>
                </div>
            )}
        </section>
    )
}
