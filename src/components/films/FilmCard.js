import React, {useState} from "react"
import PropTypes from 'prop-types'
import Featured from './Featured'

const FilmCard = ({film}) => {
    const [showDesc, setShowDesc] = useState(false);
    const toggleDescription = (e) => {
        e.preventDefault();
        setShowDesc((showDesc) => !showDesc)
    }
    return (
        <div className="ui card">

            {
                showDesc ? <p>{film.description}</p> : <div className="image">
                    <span className="ui green label ribbon">$ {film?.price} </span>
                    <Featured featured={film.featured} id={film._id} />
                    <img src={film?.img} alt={film?.title} />
                </div>
            }

            <div className="content">
                <span href="#" className="header">
                    {film?.title}
                </span>
                <div className="meta">
                    <i className="icon users" /> {film?.director}
                    <span className="right floated">
                        <i className="icon wait right" />
                        {film?.duration} min
                    </span>
                </div>
                <div>
                    <i className={"icon link eye" + (showDesc ? " slash" : "")} onClick={toggleDescription} />
                </div>
            </div>
        </div>
    )
}

FilmCard.proptTypes = {
    film: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        featured: PropTypes.bool.isRequired,
    })
}

export default React.memo(FilmCard)
