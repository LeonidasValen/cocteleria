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

    const getCoctels = useCallback(async (data) => {
        const res = await fetchData({
            url: `/coctel/getCoctels/?${data}`,
            method: 'get',
        });
        setCoctels(res);
    }, [fetchData]);


    return (
        <CoctelContext.Provider value={{ loading, error, coctels, loadingModal, coctelModal, postCoctel, getCoctels }}>
            {children}
        </CoctelContext.Provider>
    )
}
