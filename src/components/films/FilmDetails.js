import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Featured from "./Featured"
import api from '../../api'

const FilmDetails = () => {
    const {_id} = useParams();
    const [filmData, setFilmData] = useState({});

    const getFilmData = () => {
        api.films.fetchOne(_id).then(film => setFilmData(film))
    }

    useEffect(getFilmData, []);

    return (
        <div>
            <div className="image">
                <span className="ui green label ribbon">{filmData.price}$</span>
                <img src={filmData.img} alt={filmData.title} />
            </div>
            <p>
            {filmData.description}
            </p>
        </div>
    )
}
export default FilmDetails