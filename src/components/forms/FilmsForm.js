import React, {Component} from 'react'
import ReactImageFallback from "react-image-fallback";
import FormMessage from './FormMessage'

const initialData = {
    title: '',
    description: '',
    director: '',
    duration: '',
    price: '',
    img: '',
    featured: false,
    _id: null,
}

class FilmsForm extends Component {
    state = {
        data: initialData,
        errors: {},
    }

    componentDidMount() {
        if (this.props.film._id) {
            this.setState({data: this.props.film})
        }
    }

    static getDerivedStateFromProps(props, state) {
        const {film} = props

        if (film._id && film._id !== state.data._id) {
            return {
                data: film,
                error: {}
            }
        }

        if (!film._id && state.data._id !== null) {
            return {
                data: initialData,
                error: {}
            }
        }

        return null
    }

    handleSubmit = e => {
        e.preventDefault()
        const errors = this.validate(this.state.data)
        this.setState({errors})

        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data)
        }
        console.log(this.state.data)
    }

    handleStringChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        })

    handleNumberChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: parseInt(e.target.value, 10)},
        })

    handleCheckboxChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.checked}
        })

    validate(data) {
        const errors = {};

        if (!data.title) errors.title = 'This field cant be blank'
        if (!data.description) errors.description = 'This field cant be blank'
        if (!data.price) errors.price = 'This field cant be blank'
        if (!data.director) errors.director = 'This field cant be blank'
        if (!data.duration) errors.duration = 'This field cant be blank'

        if (parseInt(data.price) <= 0) errors.price = 'Error price'
        if (parseInt(data.duration) <= 0) errors.duration = 'Error duration'

        return errors
    }

    render() {
        const {data, errors} = this.state;

        return (
            <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="ui  grid">
                    <div className="twelve wide column">
                        <div className={errors.title ? 'field error': 'field'}>
                            <label>Film title</label>
                            <input type="text"  name="title"  id="title" placeholder="film title"
                                   value={data.title}
                                   onChange={this.handleStringChange}
                            />
                            <FormMessage type="error">{errors.title}</FormMessage>
                        </div>
                        <div className={errors.description ? 'field error': 'field'}>
                            <label>Film description</label>
                            <textarea name="description" id="description" placeholder="film description"
                                      onChange={this.handleStringChange}
                                      value={data.description}
                            />
                            <FormMessage type="error">{errors.description}</FormMessage>
                        </div>
                    </div>

                    <div className="twelve wide column field">
                        <ReactImageFallback
                            src={data.img}
                            alt='thumbnail'
                            className='ui image'
                            fallbackImage='http://via.placeholder.com/250x250'
                        />

                        <input type="text" name='img' id='img' placeholder='img' onChange={this.handleStringChange} value={data.img}/>
                    </div>

                    <div className="six wide column field">
                        <div className={errors.director ? 'field error': 'field'}>
                            <label>Director</label>
                            <input   type="text"  name="director"  id="director"  placeholder="film director"
                                     onChange={this.handleStringChange}
                                     value={data.director}
                            />
                            <FormMessage type="error">{errors.director}</FormMessage>
                        </div>
                    </div>

                    <div className="six wide column field">
                        <div className={errors.duration ? 'field error': 'field'}>
                            <label>Duration</label>
                            <input type="number"  name="duration" id="duration"  placeholder="Duration"
                                   value={data.duration}
                                   onChange={this.handleNumberChange}
                            />
                            <FormMessage type="error">{errors.duration}</FormMessage>
                        </div>
                    </div>

                    <div className="six wide column field">
                        <div className={errors.price ? 'field error': 'field'}>
                            <label>Price</label>
                            <input type="number" name="price"  id="price"  placeholder="price"
                                   value={data.price}
                                   onChange={this.handleNumberChange}
                            />
                            <FormMessage type="error">{errors.price}</FormMessage>
                        </div>
                    </div>

                    <div className="six wide column inline field">
                        <label htmlFor="featured">Featured</label>
                        <input  type="checkbox" name="featured"  id="featured"
                                value={data.featured}
                                onChange={this.handleCheckboxChange}
                        />
                    </div>
                </div>

                <div className="ui fluid buttons">
                    <button className="ui button primary" type="submit">Save</button>
                    <div className="or" />
                    <span className="ui button" onClick={this.props.hideAddForm}>Hide form</span>
                </div>
            </form>
        )
    }
}

export default FilmsForm;
