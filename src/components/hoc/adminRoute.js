import React, { useContext } from 'react'
import { AppContext } from '../App'
import { Route, Redirect } from 'react-router-dom'


const adminRoute = (path) => (Component) => 
    ({films}) => {
        const {user} = useContext(AppContext);
        return (
            'admin' === user.role ? (
                <Route path={path}
                   render={() => (
                        <div className="six wide column">
                            <Component films={films} />
                        </div>
                    )}
                />
            ) : (
                <Route
                    path='/films/*'
                    render={() => <Redirect to='/films' />}
                />
            )
        )
    }


export default adminRoute