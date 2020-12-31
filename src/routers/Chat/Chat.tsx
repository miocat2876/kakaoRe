import React, { useState,useEffect } from 'react';
import './Chat.css';
import * as $ from "jquery"
import 'react-stomp';
import SockJS from 'sockjs-client';
import { useLocation } from 'react-router-dom';




//웹소켓 설정//
var stompClient:any;
    var sender = localStorage.getItem('id');
    var chatId:any;
	
	//연결//
	function connect(){
		//SockJS, STOMP관련 객체 생성//
		var socket = new SockJS('http://3.35.140.126:9000/websocket');
		stompClient = Stomp.over(socket);
		
		stompClient.connect({}, function(){
			//메세지를 받는다. 각각의 구독//
			stompClient.subscribe('/topic/chat/'+ chatId, function(msg:any){

                const response = JSON.parse(msg.body);

                if(response.name == sender){ //본인아이디와 비교
                    console.log(response);
                    input(response);
                }else{
                    output(response);
                }
			});

			//입장글//
			stompClient.send("/app/chat/"+chatId, {}, JSON.stringify({'message':' 님이 입장하였습니다', 'name':''+sender}));
		});
	}
	
	//연결해제//
	function disconnect() {
	    	if (stompClient !== null) {
	    		stompClient.send("/app/chat/"+chatId, {}, JSON.stringify({'message':'님이 나갔습니다', 'name':+sender}));
	    		stompClient.disconnect();
	    	}
	}
	
	//메세지 전송//
	function sendMessage(text:String){
		stompClient.send("/app/chat/"+chatId, {}, JSON.stringify({'message':text, 'name':''+sender}));
	}
	
    //상대방메세지
    function output(value:any){
        $("#chat_view").prepend('<div class = "chat_op"> <p class = "chat_o_p">'+value.name+': '+value.message+'</p></div>');
    }

    //본인메세지
    function input(value:any){
        $("#chat_view").prepend('<div class = "chat_p"> <p class = "chat_c_p">'+value.name+': '+value.message+'</p></div>');
    }
    


const Chat = (props:any) => { 
    const [chatInfo, setChat] = useState(
        {
            name: "",
            chat: ""
        }
    );

    useEffect(() => {
        window.onpopstate = function (event:any) {
            disconnect();
            //라우터 넣기.
            history.push('/chats');
        }
          
        // console.log(location.state);
        // sender = localStorage.getItem('id');
        chatId = props.match.params.id;
        connect();
     }, []);

    const { name, chat } = chatInfo;

    const out = (e) =>{
        //방나가기 통신 넣기.
        disconnect();
        //라우터 넣기.
        history.push('/chats');
    }


    const handleKeyUp = (e) => {
        if (e.key == 'Enter') {
            console.log(chat);
    
            if(chat != "")
            sendMessage(chat);
            
            const { value, name } = e.target;
            setChat({
                ...chatInfo,
                [name]: ''
            });
        }
    }
    
    const handleChange = (e) => {
        console.log('handleChange');
        const { value, name } = e.target;
        setChat({
            ...chatInfo,
            [name]: value
        });
    }

    return(
       <div id="chat">
            <div id="chat_header">
                
                    {/* <div className="header_1">
                        <div className="inlineStyle">
                        </div>
                        <div className="inlineStyle">
                            <div><p>리액트</p></div>
                        </div>
                    </div>
                    <div className="header_2">
                        <button className="gohome" onClick={out}>나가기</button>
                    </div> */}
                <div className="left">{chatId}</div>
                <div className="center"></div>
                <div className="right">
                    <button className="gohome" onClick={out}></button>
                </div>
            </div>
            <div id="chat_view"></div>
            <div id="chat_input"> 
                <input 
                    id="inputBox"
                    type="text" 
                    name="chat" 
                    value={chat} 
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    autocomplete="off"
                /> 
            </div>
        </div>
    );
}

export default Chat;