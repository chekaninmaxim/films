// import React, {Component} from "react"
// import FilmsList from "./films"
// import {orderBy} from 'lodash'
// import {films} from "../data"
// import FilmsForm from './forms/FilmsForm'
// import TopNavigation from '../components/TopNavigation'
// import {generate as id} from 'shortid'

// const AppContext = React.createContext()
// export {AppContext}

// class App extends Component {
//     state = {
//         films: [],
//         showAddForm: false,
//         selectedFilm: {},
//     }

//     selectFilmForEdit = selectedFilm => {
//         this.setState({
//             selectedFilm,
//             showAddForm: true,
//         })
//     }

//     saveFilm = film => (film._id ? this.updateFilm(film) : this.addFilm(film))

//     addFilm = film =>
//         this.setState(({films, showAddForm}) => ({
//             films: this.sortFilms([...films, {...film, _id: id()}]),
//             showAddForm: false,
//         }))

//     updateFilm = film => {
//         this.setState(({films, showAddForm}) => ({
//             films: this.sortFilms(
//                 films.map(item => (item._id === film._id ? film: item))
//             ),
//             showAddForm: false
//         }))
//     }

//     showAddForm = e => this.setState({
//         showAddForm: true,
//         selectedFilm: {},
//     })

//     hideAddForm = e => this.setState({
//         showAddForm: false,
//         selectedFilm: {},
//     })

//     componentDidMount() {
//         this.setState({
import React, { Component } from "react"
import { Route } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'
import FilmsPage from './FilmsPage'
import HomePage from './HomePage'
import FilmDetails from './films/FilmDetails'

const AppContext = React.createContext()
export { AppContext }

class App extends Component {
    render() {
        return (
            <div className='ui container'>
                <TopNavigation />
                <Route exact path='/' component={HomePage} />
                <Route exact path='/films' component={FilmsPage} />
                <Route
                    path='/films/:_id'
                    component={FilmDetails}
                />
            </div>
        )
    }
}

export default App