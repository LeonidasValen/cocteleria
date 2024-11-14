import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useAxios } from "../hooks/UseAxios"


export const GetCoctelContext = createContext(undefined)

export const useGetCoctel = () => {
    const context = useContext(GetCoctelContext)
    if (!context) {
        throw new Error("useCoctel no esta dentro del contexto")
    }
    return context
}

export const GetCoctelProvider = ({ children }) => {

    const { fetchData, loading, error } = useAxios()

    const [coctelsModal, setCoctelsModal] = useState(null);

    const getCoctel = useCallback(async (id) => {
        const res = await fetchData({
            url: `/coctel/getCoctel/${id}`,
            method: 'get',
        })
        setCoctelsModal(res)
    }, [fetchData]);

    const modalCoctel = useMemo(() => ({
        loading,
        error,
        coctelsModal,
        getCoctel,
    }), [loading, error, coctelsModal, getCoctel])

    return (
        <GetCoctelContext.Provider value={modalCoctel}>
            {children}
        </GetCoctelContext.Provider>
    )
}