import { useEffect, useState, useContext } from "react"
import getGifs from "../services/getGifs"
import {GifsContext} from "../context/GifsContext"

const INITIAL_PAGE = 0

export default function useGifs({keyword} = { keyword: null }){
    const {gifs, setGifs} = useContext(GifsContext)
    const [loading, setLoading] = useState(false)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const [page, setPage] = useState(INITIAL_PAGE)

    //Recupamos la keyword del local storage
    const keywordToUse = keyword || localStorage.getItem('lastKeyword') || 'random'
    
    useEffect(function () {
            setLoading(true)
            getGifs({ keyword : keywordToUse })
            .then(gifs => {
                setGifs(gifs)
                setLoading(false)
                //Guardamos la keyword en el local storage
                localStorage.setItem('lastKeyword', keyword)
            }
            )
        },[keyword, keywordToUse, setGifs])

    useEffect(function(){
        if(page === INITIAL_PAGE)
        
        return 
        setLoadingNextPage(true)
        getGifs ({keyword: keywordToUse, page })
        .then(nextGifs => {
            setGifs(prevGifs => prevGifs.concat(nextGifs))
            setLoadingNextPage(false)
        })

    },[keywordToUse, page, setGifs])

    return {gifs, loading, loadingNextPage, setPage}
}