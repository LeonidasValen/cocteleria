import { createContext, useContext, useState } from "react"
import { useAxios } from "../hooks/UseAxios"


export const CoctelContext = createContext(undefined)

export  const useCoctel = ()=>{
    const context = useContext(CoctelContext)
    if(!context){
        throw new Error("useCoctel no esta dentro del contexto")
    }
    return context
}

export const CoctelProvider = ({children}) =>{ 

    const {fetchData, loading, error} = useAxios()

    const [coctels, setCoctels] = useState([]);

    const postCoctel = async(data) =>{
        console.log(data)
        await fetchData({
            url: 'https://cocteleria-back.vercel.app/coctel/postCoctel',
            method: 'post',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    }

    const getCoctels = async() =>{
        const res = await fetchData({
            url: 'https://cocteleria-back.vercel.app/coctel/getCoctels',
            method: 'get',
        })
        setCoctels(res)
    }

    return(
        <CoctelContext.Provider value={{ loading, error, coctels, postCoctel, getCoctels}}>
            {children}
        </CoctelContext.Provider>
    )
}