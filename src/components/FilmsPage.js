import React, {Component} from "react"
import FilmsList from "./films"
import {orderBy, find} from 'lodash'
import api from '../api'
import FilmsForm from './forms/FilmsForm'
import {AppContext} from './App'
import {Route} from 'react-router-dom'

// GET /api/films/ - get all films
// POST /api/films - create film
// PUT /api/films/_id - update film
// DELETE /api/films/_id - delete film

class FilmsPage extends Component {
    state = {
        films: [],
        isLoading: true,
    }

    saveFilm = film => (film._id ? this.updateFilm(film) : this.addFilm(film))

    // saveFilm = film => (film._id === null ? this.addFilm(film) : this.updateFilm(film))
    //     .then(() => this.props.history.push('/films'))

    addFilm = filmData =>
        api.films.create(filmData).then(film =>
            this.setState(({films, showAddForm}) => ({
                films: this.sortFilms([...films, {...film}]),
                showAddForm: false,
            }))
        )

    updateFilm = filmData => {
        return api.films.update(filmData).then(film =>
            this.setState(({films, showAddForm}) => ({
                films: this.sortFilms(
                    films.map(item => (item._id === film._id ? film: item))
                ),
                showAddForm: false,
            }))
        )
    }

    componentDidMount() {
        api.films.fetchAll()
            .then(films => this.setState({
                films: this.sortFilms(films),
                isLoading: false,
            }))
    }

    sortFilms = films => orderBy(films, ["featured", "title"], ["desc", "asc"])

    toggleFeatured = id => {
        const film = find(this.state.films, {_id: id})

        return this.updateFilm({...film, featured: !film.featured})
    }

    deleteFilm = film =>
        api.films.delete(film).then(() =>
            this.setState(({films}) => ({
                films: this.sortFilms(films.filter(item => item._id !== film._id)),
            }))
        )

    render() {
        const {films} = this.state
        const numCol = this.props.location.pathname === '/films' ? 'sixteen': 'ten'

        return (
            <AppContext.Provider value={{
                toggleFeatured: this.toggleFeatured,
                deleteFilm: this.deleteFilm,
            }}>
                <div className='ui stackable grid'>
                    <Route
                        path='/films/new'
                        render={() => (
                            <div className='six wide column'>
                                <FilmsForm
                                    submit={this.saveFilm}
                                    film={{}}
                                />
                            </div>
                        )}
                    />

                    <Route
                        path='/films/edit/:_id'
                        render={props => (
                            <div className='six wide column'>
                                <FilmsForm
                                    submit={this.saveFilm}
                                    film={find(this.state.films, { _id: props.match.params._id }) }
                                />
                            </div>
                        )}
                    />

                    <div className={`${numCol} wide column`}>
                        {
                            this.state.isLoading ? (
                                <div className="ui icon message">
                                    <i className="notched circle loading icon" />
                                    <div className="content">
                                        <div className="header">films loading</div>
                                    </div>
                                </div>
                            ) : (
                                <FilmsList films={films} />
                            )
                        }

                    </div>
                </div>
            </AppContext.Provider>
        )
    }
}

export default FilmsPage
