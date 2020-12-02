import React, {useContext} from 'react'
import { AppContext } from './App'
import FilmForm from './forms/FilmForm'
import adminRoute from './hoc/adminRoute'


const NewFilm = () => {
    const {saveFilm} = useContext(AppContext)
    
    return (
        <FilmForm submit={saveFilm} film={{}} />
    )
}


export default adminRoute("/films/new")(NewFilm)