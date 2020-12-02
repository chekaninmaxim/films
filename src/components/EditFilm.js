import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { find } from 'lodash'
import { AppContext } from './App'
import FilmForm from './forms/FilmForm'
import adminRoute from './hoc/adminRoute'


const EditFilm = ({ films }) => {
    const { saveFilm } = useContext(AppContext)
    const { _id } = useParams()
    return (
        <FilmForm
            submit={saveFilm}
            film={find(films, { _id }) || {}}
        />
    )
}

export default adminRoute("/films/edit/:_id")(EditFilm)