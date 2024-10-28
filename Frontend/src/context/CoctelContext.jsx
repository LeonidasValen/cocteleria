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

    const [loadingModal, setLoadingModal] = useState(false);

    const [coctels, setCoctels] = useState([]);
    const [coctelModal, setCoctelModal] = useState([]);

    const postCoctel = async (data) => {
        await fetchData({
            url: 'https://cocteleria-back.vercel.app/coctel/postCoctel',
            method: 'post',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    const getCoctels = useCallback(async (data) => {
        const res = await fetchData({
<<<<<<< HEAD
            url: 'https://cocteleria-back.vercel.app/coctel/getCoctels',
=======
            url: `/coctel/getCoctels/?${data}`,
>>>>>>> main
            method: 'get',
        });
        setCoctels(res);
    }, [fetchData]);

    const getCoctel = useCallback(async (id) => {
        try {
            const res = await fetchData({
                url: `/coctel/getCoctel/${id}`,
                method: 'get',
            })
            setCoctelModal(res)
        } catch (error) {
            console.log(error);
        }finally{
            setLoadingModal(false);
        }
    }, [fetchData]);

    return (
        <CoctelContext.Provider value={{ loading, error, coctels, loadingModal, coctelModal, postCoctel, getCoctels, getCoctel }}>
            {children}
        </CoctelContext.Provider>
    )
}