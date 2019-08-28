import React, { useState, useEffect, Component } from "react";
import { Form, Input, Button } from 'antd'

function Login(props){
    const [userName, userNameSet] = useState()
    const [password, passwordSet] = useState()

    //This is to make login faster for development would be removed along with default values
    useEffect(()=>{
        userNameSet("admin")
        passwordSet("root")
        loginbtn()
    },[]) 

    function loginbtn(callback){

        props.log([userName, password])
      
        setTimeout(function() {
            console.log(props.loginState)
        if (props.loginState["ids"] != undefined){
            props.handle()
       
            // this.setState({loginChange: props.loggedin()})
        }
    }, 10000);
        

    } 
    return(
        <div style={{position: "absolute", left: "50%", top:"25%", background: '#ECECEC', padding: '25px', width:400 }}>
            <h1>Dash Board Login In</h1>
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
