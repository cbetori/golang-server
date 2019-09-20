import React, { useState, useEffect, Component } from "react";
import { Form, Input, Button } from 'antd'

function Login(props){
    const [userName, userNameSet] = useState()
    const [password, passwordSet] = useState()
    const [invalid, invalidSet] = useState()

    //This is to make login faster for development would be removed along with default values
    useEffect(()=>{
        userNameSet("admin")
        passwordSet("root")
    },[]) 

    //Handles login btn or "enter" key updates login based on  api response or throws error
    function loginbtn(e){
        e.preventDefault()
        props.loginValue([userName, password])
        setTimeout(()=>{
            invalidSet("Incorrect username or password")
        },500)
    } 

    if (props.loginState['ids'] === undefined){
        props.handleLogin()
    }

    return(
        <div style={{position: "absolute", left: "35%", top:"25%", background: '#ECECEC', padding: '25px', width:400 }}>
            <h1>Dashboard Login</h1>
            <Form onSubmit={(e)=> loginbtn(e)}>
                Username
                <Input onChange={(e)=> userNameSet(e.target.value)} defaultValue="admin" style={{margin: 5}} placeholder="Username"/>
                Password
                <Input onChange={(e)=> passwordSet(e.target.value)} defaultValue="root" style={{margin: 5}} placeholder="Password"/>
                <div style={{display:"inline"}}>
                    <Button style={{margin: 5}} type="primary" htmlType="submit">
                        Log in
                    </Button>
                    <div style={{color:"red", display: "inline"}}>{invalid}</div>
                </div>
            </Form>
        </div>
    );    
}

export default Login
