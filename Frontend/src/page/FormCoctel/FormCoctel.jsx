import { useEffect, useState } from "react";
import { Cocteles } from './category';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { IconCam } from "../../assets/icons";
import { useAuth } from "../../context/AuthContext";
import { useCoctel } from "../../context/CoctelContext";
import './formCoctel.css'

export function FormCoctel() {

    const { loading, isAuthenticated, user } = useAuth();

    const { postCoctel } = useCoctel();

    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('session_username');

        if (!storedUsername) {
            navigate('/');  // Si no hay usuario en localStorage, redirige inmediatamente.
        } else if (!loading && (!isAuthenticated || !user)) {
            // Solo navega cuando los datos ya no están cargando y el usuario no está autenticado.
            navigate('/');
        }
    }, [loading, isAuthenticated, user, navigate]);


    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        method: '',
        history: '',
        note: '',
        file: null,
        typeMethod: 'Metodo directo',
        glassType: '',
        categories: [],
        ingredients: [],
        garnish: [],
        hasAlcohol: false,
        difficulty: 'Fácil',
    });

    // Maneja los cambios en los campos de inputs
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

    // Maneja cambios en el select de react-select
    const handleSelectChange = (selectedOptions) => {
        const selectedCategories = selectedOptions.map(option => option.value);
        setFormData({ ...formData, categories: selectedCategories });
    };

    const handleChangeCheck = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked, // El valor del checkbox se captura correctamente
        });
    };

    // Manejo de inputs dinamicos
    const handleAddInput = (type) => {
        setFormData({
            ...formData,
            [type]: [...formData[type], ''],
        });
    };

    const handleRemoveInput = (index, type) => {
        const updatedList = formData[type].filter((_, i) => i !== index);
        setFormData({
            ...formData,
            [type]: updatedList,
        });
    };

    const handleInputChange = (index, event, type) => {
        const updatedList = formData[type].map((item, i) =>
            i === index ? event.target.value : item
        );
        setFormData({
            ...formData,
            [type]: updatedList,
        });
    };

    // Envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.name || !formData.categories.length || !formData.ingredients.length || !formData.garnish.length || !formData.typeMethod || !formData.glassType || !formData.method) {
            errors.name = 'El campo "Nombre" es obligatorio';
            errors.categories = 'La categoría es obligatoria';
            errors.ingredients = 'El ingrediente es obligatorio';
            errors.garnish = 'El garnish es obligatorio';
            errors.typeMethod = 'El tipo de metodo es obligatorio';
            errors.glassType = 'El tipo de vaso es obligatorio';
            errors.method = 'El metodo es obligatorio';
        }
        if (formData.categories.length < 2) {
            errors.categories = 'debes seleccionar al menos 2 categorías';
        }
        if (formData.ingredients.length < 2) {
            errors.ingredients = 'debes ingresar al menos 2 ingredientes';
        }
        if (formData.garnish.length < 1) {
            errors.garnish = 'debes ingresar al menos 1 garnish';
        }
        if (!formData.file) {
            errors.file = 'Debes subir una foto de portada';
        } else if (formData.file instanceof File) {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowedTypes.includes(formData.file.type)) {
                errors.file = 'Debes agregar una foto válida (JPEG, PNG, JPG)';
            }
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const formSend = new FormData();
        formSend.append("name", formData.name);
        formSend.append("categories", formData.categories);
        formSend.append("ingredients", formData.ingredients);
        formSend.append("garnish", formData.garnish);
        formSend.append("typeMethod", formData.typeMethod);
        formSend.append("glassType", formData.glassType);
        formSend.append("method", formData.method);
        formSend.append("history", formData.history);
        formSend.append("note", formData.note);
        formSend.append("file", formData.file);
        formSend.append("hasAlcohol", formData.hasAlcohol);
        formSend.append("difficulty", formData.difficulty);

        // formSend.forEach((value, key) => {
        //     console.log(`${key}: ${value}`);
        // });

        try {
            await postCoctel(formSend);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
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
                {errors.file && <div className="field-error">{errors.file}</div>}

                <div className="inputTitle inputRow">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} placeholder="Nombre" />
                </div>
                {errors.name && <div className="field-error">{errors.name}</div>}

                <div className="inputCategoria inputRow">
                    <label htmlFor="categoria">Categorías:</label>
                    <Select
                        isMulti
                        name="categories"
                        options={Cocteles}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={Cocteles.filter(option => formData.categories.includes(option.value))}
                        onChange={handleSelectChange}
                    />
                </div>
                {errors.categories && <div className="field-error">{errors.categories}</div>}

                <div>
                    <label>Tiene alcohol?</label>
                    <input type="checkbox"  name="hasAlcohol" checked={formData.hasAlcohol} onChange={handleChangeCheck} />
                </div>

                <div>
                    <label>Dificultad:</label>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                        <option value="Fácil">Fácil</option>
                        <option value="Medio">Medio</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                </div>

                <div className="fIngredients inputRow">
                    {/* Inputs Dinámicos: Ingredientes */}
                    <div className="ingredientsField">
                        <label>Ingredientes:</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(event) => handleInputChange(index, event, 'ingredients')}
                                    placeholder={`Ingrediente ${index + 1}`}
                                />
                                {formData.ingredients.length > 1 && (
                                    <button type="button" className="btnSubmit" onClick={() => handleRemoveInput(index, 'ingredients')}>X</button>
                                )}
                            </div>
                        ))}
                        <button type="button" className="btnSubmit" onClick={() => handleAddInput('ingredients')}>Agregar Ingrediente</button>
                        {errors.ingredients && <div className="field-error">{errors.ingredients}</div>}
                    </div>

                    {/* Inputs Dinámicos: Garnish */}
                    <div className="garnishField">
                        <label>Garnish:</label>
                        {formData.garnish.map((garnish, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <input
                                    type="text"
                                    value={garnish}
                                    onChange={(event) => handleInputChange(index, event, 'garnish')}
                                    placeholder={`Garnish ${index + 1}`}
                                />
                                {formData.garnish.length > 1 && (
                                    <button type="button" className="btnSubmit" onClick={() => handleRemoveInput(index, 'garnish')}>X</button>
                                )}
                            </div>
                        ))}
                        <button type="button" className="btnSubmit" onClick={() => handleAddInput('garnish')}>Agregar Garnish</button>
                        {errors.garnish && <div className="field-error">{errors.garnish}</div>}
                    </div>
                </div>

                <div className="inputTipo">
                    <label htmlFor="typeMethod ">Tipo de metodo:</label>
                    <select name="typeMethod" id="typeMethod" value={formData.typeMethod} onChange={handleChange}>
                        <option value="Metodo Directo">Metodo directo</option>
                        <option value="Machacado">Machacado</option>
                        <option value="Escanciado o Throwing">Escanciado o Throwing</option>
                        <option value="Refrescado">Refrescado</option>
                        <option value="Agitado">Agitado</option>
                    </select>
                </div>
                {errors.typeMethod && <div className="field-error">{errors.typeMethod}</div>}

                <div className="inputTipo">
                    <label htmlFor="vaso">Vaso:</label>
                    <input type="text" id="vaso" name="glassType" value={formData.glassType} onChange={handleChange} placeholder="Vaso" />
                </div>
                {errors.glassType && <div className="field-error">{errors.glassType}</div>}

                <div className="inputMetodo inputRow">
                    <label htmlFor="method">Metodo:</label>
                    <textarea name="method" id="method" value={formData.method} onChange={handleChange} placeholder="Metodo"></textarea>
                </div>
                {errors.method && <div className="field-error">{errors.method}</div>}

                <div className="inputHistoria inputRow">
                    <label htmlFor="history">Historia:</label>
                    <textarea name="history" id="history" value={formData.history} onChange={handleChange} placeholder="Historia"></textarea>
                </div>
                {errors.history && <div className="field-error">{errors.history}</div>}

                <div className="inputNota inputRow">
                    <label htmlFor="note">Nota:</label>
                    <textarea name="note" id="note" value={formData.note} onChange={handleChange} placeholder="Nota"></textarea>
                </div>
                {errors.note && <div className="field-error">{errors.note}</div>}

                <button type="submit" className="btnSubmit">Subir cóctel</button>
            </form>
        </main>
    );
}
