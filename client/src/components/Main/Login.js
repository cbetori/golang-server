import React, { useState, useEffect, Component } from "react";
import { Form, Input, Button } from 'antd'
import { func } from "prop-types";

function Login(props){
    const [login , loginSet] = useState(props.loginState)
    const [userName, userNameSet] = useState()
    const [password, passwordSet] = useState()

    //This is to make login faster for development would be removed along with default values
    useEffect(()=>{
        userNameSet("admin")
        passwordSet("root")
        loginSet()
        // updateCredentials()
        // loginbtn()
    },[]) 

    // function updateCredentials(){
    //     props.log([userName, password])
    //     loginSet(props.loginState)
    // }

    function loginbtn(){
        props.log([userName, password])
        console.log(userName)
        console.log(password)
        console.log(props.loginState)
        if (props.loginState["ids"] != undefined){
            props.handle()
        }
    } 
    return(
        <div style={{position: "absolute", left: "35%", top:"25%", background: '#ECECEC', padding: '25px', width:400 }}>
            <h1>DashBoard Login In</h1>
            <Form>
                <Input onChange={(e)=> userNameSet(e.target.value)} defaultValue="admin" style={{margin: 5}} placeholder="Username"/>
                <Input onChange={(e)=> passwordSet(e.target.value)} defaultValue="root" style={{margin: 5}} placeholder="Password"/>
                <Button onClick={(e)=> loginbtn()} style={{margin: 5}} type="primary" htmlType="submit">
                Log in
                </Button>
            </Form>
        </div>
    );    
}

export default Login
