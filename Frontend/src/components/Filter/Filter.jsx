import { useEffect, useRef, useState } from "react";
import { IconCheck, IconFilter } from "../../assets/icons";
import { useLocation, useNavigate } from "react-router";
import './filter.css';

const filterCategories = {
  dificultad: ["Fácil", "Intermedio", "Difícil"],
  sabor: ["Dulce", "Fuerte", "Suave", "Amargo", "Refrescante", "Cítrico", "Cremoso"],
  metodo: ["Metodo Directo", "Refrescado", "Machacado", "Agitado", "Escanciado o Throwing"],
  otros: ["Aperitivo", "Clásico", "Moderno", "Invierno", "Verano"]
};

export function Filter() {
  const [filterModal, setFilterModal] = useState(false);
  const [hasAlcohol, setHasAlcohol] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    typeMethod: []
  });

  const menuDrop = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Cierra el menú si haces clic fuera de él
  const handleClickOutside = (event) => {
    if (
      filterModal && // Solo se cierra si está abierto
      menuDrop.current &&
      !menuDrop.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setFilterModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterModal]);

  // Maneja la selección de filtros y actualiza la URL
  const handleCheckbox = (category, value) => {
    const updatedFilters = selectedFilters[category].includes(value)
      ? selectedFilters[category].filter(item => item !== value)
      : [...selectedFilters[category], value];

    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [category]: updatedFilters
    }));

    const queryParams = new URLSearchParams(location.search);
    queryParams.delete(category);
    updatedFilters.forEach(val => queryParams.append(category, val));
    navigate(`/?${queryParams.toString()}`, { replace: true });
  };

  // Manejador para el filtro de alcohol
  const handleAlcoholChange = (e) => {
    const value = e.target.value;
    setHasAlcohol(value);
    const queryParams = new URLSearchParams(location.search);
    if (value) {
      queryParams.set("hasAlcohol", value);
    } else {
      queryParams.delete("hasAlcohol");
    }
    navigate(`/?${queryParams.toString()}`, { replace: true });
  };

  // Sincroniza el estado de filtros con la URL al cargar o cambiar la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedFilters({
      categories: params.getAll("categories"),
      typeMethod: params.getAll("typeMethod"),
    });
    
    setHasAlcohol(params.get("hasAlcohol") || "");
  }, [location.search]);

  return (
    <div className="filterContent">

      <select onChange={handleAlcoholChange} value={hasAlcohol}>
        <option value="">Todos</option>
        <option value="true">Con Alcohol</option>
        <option value="false">Sin Alcohol</option>
      </select>

      <button className="filter" onClick={() => setFilterModal(prev => !prev)} ref={buttonRef}>
        <div className="iconFilter">
          <IconFilter />
        </div>
        Filtrar por
      </button>

      {filterModal && (
        <div className="filterModal" ref={menuDrop}>
          <div className="fColumn">
            <h3>Dificultad</h3>
            <ul className="fItems">
              {filterCategories.dificultad.map((dificultad) => (
                <li key={`dificultad ${dificultad}`} onClick={() => handleCheckbox("categories", dificultad)}>
                  <div className={`checkbox ${selectedFilters['categories']?.includes(dificultad) ? 'checked' : ''}`}>
                    <IconCheck />
                  </div>
                  {dificultad}
                </li>
              ))}
            </ul>
          </div>

          <div className="fColumn">
            <h3>Sabor</h3>
            <ul className="fItems">
              {filterCategories.sabor.map((sabor) => (
                <li key={`sabor ${sabor}`} onClick={() => handleCheckbox("categories", sabor)}>
                  <div className={`checkbox ${selectedFilters['categories']?.includes(sabor) ? 'checked' : ''}`}>
                    <IconCheck />
                  </div>
                  {sabor}
                </li>
              ))}
            </ul>
          </div>

          <div className="fColumn">
            <h3>Metodo</h3>
            <ul className="fItems">
              {filterCategories.metodo.map((metodo) => (
                <li key={`metodo ${metodo}`} onClick={() => handleCheckbox("typeMethod", metodo)}>
                  <div className={`checkbox ${selectedFilters['typeMethod']?.includes(metodo) ? 'checked' : ''}`}>
                    <IconCheck />
                  </div>
                  {metodo}
                </li>
              ))}
            </ul>
          </div>

          <div className="fColumn">
            <h3>Otros</h3>
            <ul className="fItems">
              {filterCategories.otros.map((otros) => (
                <li key={`otros ${otros}`} onClick={() => handleCheckbox("categories", otros)}>
                  <div className={`checkbox ${selectedFilters['categories']?.includes(otros) ? 'checked' : ''}`}>
                    <IconCheck />
                  </div>
                  {otros}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
