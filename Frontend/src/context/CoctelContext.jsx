import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAxios } from "../hooks/UseAxios"


export const CoctelContext = createContext(undefined)

export const useCoctel = () => {
    const context = useContext(CoctelContext)
    if (!context) {
        throw new Error("useCoctel no esta dentro del contexto")
    }
    return context
}

export const CoctelProvider = ({ children }) => {

    const { fetchData, loading, error } = useAxios()

    const [coctels, setCoctels] = useState([]);

    const postCoctel = async (data) => {
        await fetchData({
            url: '/coctel/postCoctel',
            method: 'post',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    const getCoctels = useCallback(async (data, page) => {
        const res = await fetchData({
            url: `/coctel/getCoctels/?${data}&page=${page}`,
            method: 'get',
        });
        setCoctels((prevCoctels) => {
            if (page === 1) return res; // Reemplaza los datos si es la primera página
            return {
                ...prevCoctels,
                cocteles: [...(prevCoctels.cocteles || []), ...res.cocteles], // Acumula las nuevas páginas
            };
        });
    }, [fetchData]);

    return (
        <CoctelContext.Provider value={{ loading, error, coctels, postCoctel, getCoctels, setCoctels, setCoctels}}>
            {children}
        </CoctelContext.Provider>
    )
}
