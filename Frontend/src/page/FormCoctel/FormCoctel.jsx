import { useState } from "react";
import { IconCam } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { colourOptions } from './category';
import './formCoctel.css'

export function FormCoctel() {

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    // State inicial del formulario con varios campos
    const [formData, setFormData] = useState({
        title: '',
        metodo: '',
        historia: '',
        nota: '',
        file: null,
    });

    // Maneja los cambios en los campos de texto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Limpiar errores
    };

    // Maneja los cambios en el archivo
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFormData({ ...formData, file: selectedFile });
    };

    // Manejo de inputs dinámicos
    const [inputsIngredients, setInputsIngredients] = useState([{ value: '' }]);

    const handleAddInput = () => {
        setInputsIngredients([...inputsIngredients, { value: '' }]);
    };

    const handleRemoveInput = (index) => {
        const newInputs = inputsIngredients.filter((_, i) => i !== index);
        setInputsIngredients(newInputs);
    };

    const handleInputChange = (index, event) => {
        const newInputs = inputsIngredients.map((input, i) =>
            i === index ? { value: event.target.value } : input
        );
        setInputsIngredients(newInputs);
    };

    // Manejo de inputs dinámicos
    const [inputsGarnish, setInputsGarnish] = useState([{ value: '' }]);

    const handleAddInputGarnish = () => {
        setInputsGarnish([...inputsGarnish, { value: '' }]);
    };

    const handleRemoveInputGarnish = (index) => {
        const newInputs = inputsGarnish.filter((_, i) => i !== index);
        setInputsGarnish(newInputs);
    };

    const handleInputChangeGarnish = (index, event) => {
        const newInputs = inputsGarnish.map((input, i) =>
            i === index ? { value: event.target.value } : input
        );
        setInputsGarnish(newInputs);
    };

    // Manejo de envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar la lógica para enviar los datos del formulario
        console.log('Datos del formulario:', formData, inputs, inputsGarnish);
        // Aquí iría la lógica para subir la información del cóctel (ej. llamar a una API)
    };

    return (
        <main className="formContent">
            <form className="formCoctel" onSubmit={handleSubmit}>
                <div className="imgCoctel">
                    {formData.file ? (
                        <img src={typeof formData.file === "string" ? `./img/${formData.file}` : URL.createObjectURL(formData.file)} alt="Foto de portada" />
                    ) : null}
                    {!formData.file && <IconCam />}
                    <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                </div>

                <div className="inputTitle inputRow">
                    <label htmlFor="title">Nombre:</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder="Nombre" />
                </div>

                <div className="inputCategoria inputRow">
                    <label htmlFor="categoria">Categorías:</label>
                    <Select
                        isMulti
                        name="colors"
                        options={colourOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>

                <div className="fIngredients inputRow">
                    <div className="ingredientsField">
                        <label>Ingredientes:</label>
                        {inputsIngredients.map((input, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    value={input.value}
                                    onChange={(event) => handleInputChange(index, event)}
                                    placeholder={`Ingrediente ${index + 1}`}
                                />
                                {inputsIngredients.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveInput(index)}>X</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddInput}>Agregar Ingrediente</button>
                    </div>
                    <div className="garnishField">
                        <label>Garnish:</label>
                        {inputsGarnish.map((inputGarnish, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    value={inputGarnish.value}
                                    onChange={(event) => handleInputChangeGarnish(index, event)}
                                    placeholder={`Garnish ${index + 1}`}
                                />
                                {inputsGarnish.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveInputGarnish(index)}>X</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={handleAddInputGarnish}>Agregar garnish</button>
                    </div>
                </div>

                <div className="inputTipo">
                    <label htmlFor="typeMethod ">Tipo de metodo:</label>
                    <select name="typeMethod" id="typeMethod">
                        <option value="Metodo directo">Metodo directo</option>
                        <option value="Machacado">Machacado</option>
                        <option value="Refrescado">Refrescado</option>
                        <option value="Agitado">Agitado</option>
                    </select>
                </div>

                <div className="inputTipo">
                    <label htmlFor="vaso">Vaso:</label>
                    <input type="text" id="vaso" placeholder="Vaso"/>
                </div>

                <div className="inputMetodo inputRow">
                    <label htmlFor="metodo">Metodo:</label>
                    <textarea name="metodo" id="metodo" value={formData.metodo} onChange={handleChange} placeholder="Metodo"></textarea>
                </div>

                <div className="inputHistoria inputRow">
                    <label htmlFor="historia">Historia:</label>
                    <textarea name="historia" id="historia" value={formData.historia} onChange={handleChange} placeholder="Historia"></textarea>
                </div>

                <div className="inputNota inputRow">
                    <label htmlFor="nota">Nota:</label>
                    <textarea name="nota" id="nota" value={formData.nota} onChange={handleChange} placeholder="Nota"></textarea>
                </div>

                <button type="submit">Subir cóctel</button>
            </form>
        </main>
    );
}
