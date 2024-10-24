import { IconCoctail, IconCoctel } from "../../assets/icons"
import "./detailCoctel.css"

export default function DetailCoctel({ setOpenModal }) {
    return (
        <section className="modalCoctel">
            <div className="bgModal" onClick={() => setOpenModal(false)}></div>
            <div className="modalContent">
                <div className="mImgCoctel">
                    <img src="./img/gintonic.jpg" alt="logo" />
                    <button className="closeModal" onClick={() => setOpenModal(false)}>X</button>
                </div>
                <h1>Gin Tonic</h1>
                <div className="cEtiqueta">
                    <p>Clásico</p>
                    <p>Refrescante</p>
                    <p>Con alcohol</p>
                    <p>Fácil</p>
                </div>
                <div className="info">
                    <div className="CategoryCoctel">
                    </div>
                    <div className="ingredientsCoctel ">
                        <div className="ingredColumn1">
                            <h3>Ingredientes:</h3>
                            <ul>
                                <li>50ml/1.7oz gin</li>
                                <li>100ml/3.3oz agua tonica</li>
                            </ul>
                        </div>
                        <div className="ingredColumn1">
                            <h3>Garnish:</h3>
                            <ul>
                                <li>Rodaja de limon o naranja</li>
                                <li>Alguna frambuesa o frutilla</li>
                            </ul>
                        </div>
                    </div>
                    <div className="tipoPreparacion">
                        <div className="metodoPreparacion">
                            <h3>Metodo de preparación:</h3>
                            <img src="./icons/cocktail.png" alt="cocktail" />
                            <p>Metodo Dirécto</p>
                        </div>
                        <div className="vasoCoctel">
                            <h3>Vaso recomendado: </h3>
                            <div className="tipoVaso">
                                <IconCoctel />
                                <p>Copa balón</p>
                            </div>
                        </div>
                    </div>
                    <div className="metodoCoctel">
                        <h3>Método: </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, dolorum. In necessitatibus sunt nesciunt eaque labore eius. Vitae laudantium autem dolores aut facere, impedit itaque dolorem, odio fugit nemo recusandae.</p>
                    </div>
                    <div className="historyCoctel">
                        <h3>Historia: </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique sequi at recusandae tempora atque maxime incidunt saepe, repellendus laborum praesentium ex nisi veniam omnis illum unde dolorem facilis doloremque ratione? Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, dolorum. In necessitatibus sunt nesciunt eaque labore eius. Vitae laudantium autem dolores aut facere, impedit itaque dolorem, odio fugit nemo recusandae.</p>
                    </div>
                    <div className="notaCoctel">
                        <h3>Nota: </h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, dolorum. In necessitatibus sunt nesciunt eaque labore eius. Vitae laudantium autem dolores aut facere, impedit itaque dolorem, odio fugit nemo recusandae.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
