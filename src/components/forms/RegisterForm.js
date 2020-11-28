import React, { useReducer, useState } from 'react'
import formInModal from '../hoc/formInModal'


const inputChangeReducer = (state, action) => {
    console.log("action", action);
    switch (action.name) {
        case 'email':
            return { ...state, email: action.value }
        case 'password':
            return { ...state, password: action.value }
        case 'conPassword':
            return { ...state, conPassword: action.value }
        default:
            throw new Error('Unsupported action...')
    }
}

const RegisterForm = ({closeDialog}) => {
    const [data, dispatch] = useReducer(inputChangeReducer, {
        email: "",
        password: "",
        conPassword: ""
    });
    const [passwordsMath, setError] = useState(true);

    const handleInputChange = (e) => {
        dispatch({ name: e.target.name, value: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.password === data.conPassword) {
            closeDialog();
        } else {
            setError(false);
        }
    }

    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <div className="field" >
                <label>Film title</label>
                <input type="email" name="email" id="email" placeholder="example@beetroot-academy.com"
                    value={data.email}
                    onChange={handleInputChange}
                />
            </div>

            <div className={passwordsMath ? "field" : "field error"} >
                <label>Password</label>
                <input type="password" name="password" id="password"
                    value={data.password}
                    onChange={handleInputChange}
                />
            </div>

            <div className={passwordsMath ? "field" : "field error"} >
                <label>Confirm Password</label>
                <input type="password" name="conPassword" id="conPassword"
                    value={data.conPassword}
                    onChange={handleInputChange}
                />
            </div>

            <button className="ui button" type="submit">
                Submit
            </button>
            <button className="ui button" onClick={closeDialog}>
                Cancel
            </button>

        </form>
    )
}

export default formInModal("Sign up")(RegisterForm)
