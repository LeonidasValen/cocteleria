import { useEffect } from "react"
import { Link } from "react-router-dom"
import { IconCoctel, IconDelete, IconEdit, IconShaker } from "../../assets/icons"
import { Loading } from "../Loading/Loading"
import { useGetCoctel } from "../../context/GetCoctelContext"
import { useAuth } from "../../context/AuthContext"
import "./detailCoctel.css"

export default function DetailCoctel({ handleCloseModal, id }) {

    const { loading, getCoctel, coctelsModal } = useGetCoctel()

    const { user } = useAuth()

    useEffect(() => {
        if (id) {
            getCoctel(id);
        }
    }, [id])

    const handleDeleteCoctel = () => {
        console.log("delete");
    };

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
        <section className="modalCoctel" onClick={handleCloseModal}>
            {/* <div className="bgModal" ></div> */}
            {coctelsModal ? (
                <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                    <div className="mImgCoctel">
                        <img src={coctelsModal.fileUrl} alt="logo" />
                        <button className="closeModal" onClick={handleCloseModal}>X</button>
                        {
                            user && (
                                <div className="editCoctel">
                                    <Link to={`/formCoctel/?edit=${coctelsModal._id}`} state={coctelsModal} className="editCoctelBtn"><IconEdit /></Link>
                                    <button onClick={handleDeleteCoctel} className="editCoctelBtn"><IconDelete /></button>
                                </div>
                            )
                        }
                    </div>
                    <h1>{coctelsModal.name}</h1>

                    <div className="cEtiqueta">
                        {coctelsModal.categories.map(cat => (
                            <p key={`cat ${cat}`}>{cat}</p>
                        ))}
                    </div>

                    <div className="info">

                        <div className="tipoPreparacion">
                            <div className="metodoPreparacion">
                                <IconCoctel />
                                <div className="infoSquare">
                                    <span>Vaso recomendado</span>
                                    <div className="tipoVaso">
                                        <p>{coctelsModal.glassType}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="metodoPreparacion">
                                {/* <img src="./icons/cocktail.png" alt="cocktail" /> */}
                                <IconShaker />
                                <div className="infoSquare">
                                    <span>Método de preparación</span>
                                    <p>{coctelsModal.typeMethod}</p>
                                </div>
                            </div>
                        </div>


                        <div className="ingredientsCoctel ">
                            <div className="ingredColumn1">
                                <h3>Ingredientes</h3>
                                <ul>
                                    {coctelsModal.ingredients.map((ingredient, index) => (
                                        <li key={`ingredient-${index}`}>
                                            <p>{index + 1}</p>
                                            <span>{ingredient}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="ingredColumn1">
                                <h3>Garnish</h3>
                                <ul>
                                    {coctelsModal.garnish.map((garnish) => (
                                        <li key={`garnish ${garnish}`}>{garnish}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="metodoCoctel">
                            <h3>Método</h3>
                            <p>{coctelsModal.method}</p>
                        </div>
                        {coctelsModal.history && (
                            <div className="historyCoctel">
                                <h3>Historia</h3>
                                <p className="detailInfo">{coctelsModal.history}</p>
                            </div>
                        )}
                        {coctelsModal.note && (
                            <div className="notaCoctel">
                                <h3>Nota</h3>
                                <p className="detailInfo">{coctelsModal.note}</p>
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
