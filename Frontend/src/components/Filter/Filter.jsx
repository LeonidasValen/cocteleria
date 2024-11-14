import { useEffect, useRef, useState } from "react";
import { IconCheck, IconFilter } from "../../assets/icons";
import { useLocation, useNavigate } from "react-router";
import './filter.css';

const filterCategories = {
  dificultad: ["Fácil", "Medio", "Difícil"],
  sabor: ["Dulce", "Fuerte", "Suave", "Amargo", "Refrescante", "Ácido", "Cremoso"],
  metodo: ["Metodo Directo", "Refrescado", "Machacado", "Agitado", "Escanciado o Throwing"],
  otros: ["Aperitivo", "Clásico", "Moderno", "Invierno", "Verano"]
};

export function Filter() {
  const [filterModal, setFilterModal] = useState(false);
  const menuDrop = useRef(null)
  const buttonRef = useRef(null);

  // cerrar menú al hacer clic fuera de él
  const handleClickOutside = (event) => {
    if (
      menuDrop.current &&
      !menuDrop.current.contains(event.target) && // Si el clic no es en el menú
      buttonRef.current &&
      !buttonRef.current.contains(event.target)   // Y no es en el botón
    ) {
      setFilterModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  //Filtro
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    typeMethod: []
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Función para manejar la selección de checkboxes
  const handleCheckbox = (category, value) => {
    const queryParams = new URLSearchParams(location.search);
    const updatedFilters = selectedFilters[category].includes(value)
      ? selectedFilters[category].filter(item => item !== value)
      : [...selectedFilters[category], value];

    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [category]: updatedFilters
    }));

    // Actualiza la URL con los filtros seleccionados
    queryParams.delete(category);
    updatedFilters.forEach(val => queryParams.append(category, val));
    navigate(`/?${queryParams.toString()}`, { replace: true });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtersFromUrl = {
      categories: params.getAll("categories"),
      typeMethod: params.getAll("typeMethod")
    };

    if (filtersFromUrl.categories.length || filtersFromUrl.typeMethod.length) {
      setFilterModal(true);
    }
    setSelectedFilters(filtersFromUrl);
  }, [location.search]);

  return (
    <div className="filterContent">
      <button className="filter" onClick={() => setFilterModal((prev) => !prev)} ref={buttonRef}>
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
                  <div
                    className={`checkbox ${selectedFilters['categories']?.includes(dificultad) ? 'checked' : ''
                      }`}
                  >
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
                  <div
                    className={`checkbox ${selectedFilters['categories']?.includes(sabor) ? 'checked' : ''
                      }`}
                  >
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
                  <div
                    className={`checkbox ${selectedFilters['typeMethod']?.includes(metodo) ? 'checked' : ''
                      }`}
                  >
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
                  <div
                    className={`checkbox ${selectedFilters['categories']?.includes(otros) ? 'checked' : ''
                      }`}
                  >
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
