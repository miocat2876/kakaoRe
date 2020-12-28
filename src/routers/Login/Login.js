import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import kakaoLogo from '../../images/kakaoLogo.png';
import { call } from 'file-loader';


const Login = ({ history }) => {
    const [login, setLogin] = useState(
        {
            id: "",
            pw: "",
            loginChk : false
        }
    );

    const { id, pw, loginChk } = login;

    const setLocal = (login) => {
        if(loginChk == true)
            localStorage.setItem('login', JSON.stringify(login));
        else
            localStorage.setItem('login', JSON.stringify({id: "", pw: "", loginChk : false}));
    }

    const getLocal = (callback) => {
        let val = JSON.parse(localStorage.getItem('login'));
        if(val!= null && Object.keys(val).length>0){
            setLogin(val);
            callback(val);
        }
    }

    useEffect(() => {
        getLocal(function(val){
            setTimeout(() => {
                if(val.loginChk===true){
                    if(confirm("로그인 하시겠습니까?")){
                        setLocal(val);
                        handleClick(val);
                    }
                }
            }, 100);
        });
    }, []);

    const goChats = (id) =>{
        localStorage.setItem('id', JSON.stringify(id));
        history.push('/chats');
    }

    const handleClick = (login) => {
        if(login == undefined) {login = this.login;} 

        axios.post('http://3.35.140.126:9000/user/login', login)
        .then(function(response) {
            if(true){ //response.data.return !== "fail"
                console.log(response);
                setLocal(login);
                goChats(login.id);
            }else{
                alert('로그인정보가 일치하지 않습니다.');
            }
        })
        .catch(function(error) {
            alert(error);
        });
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        if(e.target.type =="checkbox"){
            setLogin({
                ...login,
                [name]: e.target.checked
            }); 
        }else{
            setLogin({
                ...login,
                [name]: value
            });
        }
    }

    const signUp = () => {
        history.push('/signUp');
    }

    return (
    <div id="wrap">
        <div id="main">
            <div className="logoContainer">
                <img src={kakaoLogo}/>
            </div>
            <div className="section">
                <div id="login_input">
                    <input 
                        type="text" 
                        placeholder="카카오계정" 
                        value={id}
                        name="id"
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        placeholder="비밀번호"
                        value={pw}
                        name="pw"
                        onChange={handleChange}
                    />
                </div>
                <div id="login_button">
                    <button onClick={()=>{handleClick(login)}}><p>로그인</p></button>
                </div>
                <div id="login_auto">
                    <div id="loginAutoSection">
                        <input type="checkbox" name="loginChk" checked={loginChk} onChange={handleChange} /><p>자동로그인</p>
                    </div>
                    <a id="signUp" onClick={signUp}>회원가입</a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;