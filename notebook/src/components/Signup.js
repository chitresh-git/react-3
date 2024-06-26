// this file is used for Signup funtion 

import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Alertcont from '../context/notes/Alertcont'
import './css/signupform.css'


const Signup = () => {
    const host = process.env.REACT_APP_BACKEND_URL;
    let navigate = useNavigate() // creating a object for useNavigate
    
    const [cred, setCred] = useState({ name: "", email: "", password: "" })
    const [demo, setdemo] = useState({ warning: "", visibilty: "d-none" })
    const [loading, setLoading] = useState(false); // Loading state

    
    const context = useContext(Alertcont) // using alert conext api 
    const { usealert } = context
    
    const handleClick = async (e) => {
        setLoading(true); // Set loading state to true

        e.preventDefault(); // this will prevent the page from reloading
        
        const response = await fetch(`${host}/api/auth/createuser`, { // saving the entered detials in database by sending it to the backend through the fetch api
            method: 'POST',
            mode: 'cors', // set mode to the cors otherwise request sents the bad request 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password }) // sending the data to the backend
        });
        const json = await response.json()
        setLoading(false); // Set loading state to false after response

     
        if (json.flag) { // if flag is true then it will create a account, and storing the details in the local storage 
            localStorage.setItem('token',json.authtoken)
            localStorage.setItem('name',json.name)
            localStorage.setItem('email',json.email)
            localStorage.setItem('password',json.password)
            localStorage.setItem('date',json.date)

            usealert("Registered Successfully !") // calling the alert api function
            navigate("/dashboard")  // this will redirect to the defualt page 
        }
        else {
            console.log("not")
            setdemo({ warning: json.error, visibilty: "" })
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value }) // this will update targets(title,desc) value as soon as they are change
        //and also update the note state 
    }

    return (
        <div className="container p-2 my-3  signupcontainer">
            <h2 className='mx-2'>CREATE ACCOUNT</h2>

            <div className='text-white bg-dark p-3 rounded-4 my-2 signupform'>

                <form onSubmit={handleClick}>

                    <div className="form-group my-3 text-uppercase ">
                        <label htmlFor="exampleInputPassword1">Name</label>
                        <input type="text" className="form-control my-3" name="name" id="exampleInputPassword1" placeholder="Name" onChange={onChange} value={cred.name} minLength={2} required />
                    </div>

                    <div className="form-group my-3  text-uppercase">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control my-3" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={cred.email} required />
                        <small id="emailHelp" className="form-text text-light text-lowercase ">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group my-3 text-uppercase">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control my-3" name="password" id="exampleInputPassword1" placeholder="Password" onChange={onChange} value={cred.password} minLength={5} required />
                        <label id="emailHelp" className={`form-text text-capitalize text-danger bg-dark ${demo.visibilty}`}>{demo.warning}</label>
                    </div>


                   
                     {/* Conditional rendering of button text based on loading state */}
                     <button type="submit" className="btn btn-secondary my-2" disabled={loading}>
                        {loading ? "Creating..." : "CREATE"}
                    </button>
                </form>

            </div>
        </div>
    )
}

export default Signup
