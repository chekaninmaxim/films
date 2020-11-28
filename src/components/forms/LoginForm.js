import React, { useState } from 'react'
import formInModal from '../hoc/formInModal'


const LoginForm = ({ closeDialog }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        closeDialog()
    }

    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <div className="field" >
                <label>Film title</label>
                <input type="email" name="email" id="email" placeholder="example@beetroot-academy.com"
                    value={email}
                    onChange={handleInputChange}
                />
            </div>

            <div className="field" >
                <label>Password</label>
                <input type="password" name="password" id="password"
                    value={password}
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

export default formInModal("Sign in")(LoginForm)
