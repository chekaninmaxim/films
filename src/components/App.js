import React, {Component} from "react"
import FilmsList from "./films"
import {orderBy} from 'lodash'
import {films} from "../data"
import FilmsForm from './forms/FilmsForm'
import TopNavigation from '../components/TopNavigation'
import {generate as id} from 'shortid'

const AppContext = React.createContext()
export {AppContext}

class App extends Component {
    state = {
        films: [],
        showAddForm: false,
        selectedFilm: {},
    }

    selectFilmForEdit = selectedFilm => {
        this.setState({
            selectedFilm,
            showAddForm: true,
        })
    }

    saveFilm = film => (film._id ? this.updateFilm(film) : this.addFilm(film))

    addFilm = film =>
        this.setState(({films, showAddForm}) => ({
            films: this.sortFilms([...films, {...film, _id: id()}]),
            showAddForm: false,
        }))

    updateFilm = film => {
        this.setState(({films, showAddForm}) => ({
            films: this.sortFilms(
                films.map(item => (item._id === film._id ? film: item))
            ),
            showAddForm: false
        }))
    }

    showAddForm = e => this.setState({
        showAddForm: true,
        selectedFilm: {},
    })

    hideAddForm = e => this.setState({
        showAddForm: false,
        selectedFilm: {},
    })

    componentDidMount() {
        this.setState({
            films: this.sortFilms(films),
        })
    }

    sortFilms = films => orderBy(films, ["featured", "title"], ["desc", "asc"])

    toggleFeatured = id =>
        this.setState(({films}) => ({
            films: this.sortFilms(
                films.map(item =>
                    item._id === id ? {...item, featured: !item.featured} : item,
                ),
            ),
        }))

    deleteFilm = film =>
        this.setState(({films, selectedFilm, showAddForm}) => ({
            films: films.filter(item => item._id !== film._id),
            selectedFilm: {},
            showAddForm: false,
        }))

    render() {
        const {films, showAddForm, selectedFilm} = this.state
        const numCol = showAddForm ? 'ten' : 'sixteen'

        return (
            <AppContext.Provider value={{
                toggleFeatured: this.toggleFeatured,
                editFilm: this.selectFilmForEdit,
                deleteFilm: this.deleteFilm,
            }}>
                <div className="ui container mt-3">
                    <TopNavigation showAddForm={this.showAddForm}/>

                    <div className='ui stackable grid'>
                        {this.state.showAddForm && (
                            <div className='six wide column'>
                                <FilmsForm
                                    hideAddForm={this.hideAddForm}
                                    submit={this.saveFilm}
                                    film={this.state.selectedFilm}
                                />
                            </div>
                        )}

                        <div className={`${numCol} wide column`}>
                            <FilmsList films={films} />
                        </div>
                    </div>
                </div>
            </AppContext.Provider>
        )
    }
}

export default App
