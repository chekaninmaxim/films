import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { find } from 'lodash'
import { AppContext } from './App'
import FilmForm from './forms/FilmForm'
import adminRoute from './hoc/adminRoute'


const NewFilm = adminRoute("/films/new")(
    () => {
        const {saveFilm} = useContext(AppContext)
        
        return (
            <FilmForm submit={saveFilm} film={{}} />
        )
    }   
)

const EditFilm = adminRoute("/films/edit/:_id")(
    ({films}) => {
        const {saveFilm} = useContext(AppContext)
        const {_id} = useParams()
        return (
            <FilmForm
                submit={saveFilm}
                film={find(films, {_id}) || {}}
            />
        )
    }
)

export { NewFilm, EditFilm}