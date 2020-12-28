import React, { useState , useEffect } from 'react';
import './Chats.css';
import MakeChat from '../MakeChat/MakeChat';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

const Chats = ({ history }) => {
    var userId = localStorage.getItem('id');
    const [lists, setLists] = useState([]);
    const location =  useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    

    const [searchList, setSearchList] = useState(
        {
            searchList: "",
        }
    );


    const enterChat = (e, value) => {
        history.push({
            pathname: '/chat/default',
            state: value
          });
    }
    

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    // const logoutView = () => {
    //     if( $("#logout").css("display")!=="none")
    //         $("#logout").css("display","none");
    //     else
    //         $("#logout").css("display","block");
        

    // }
    const logout = () => {

        console.log(location.state.userId);

        axios({url:'http://3.35.140.126:9000/user/logout',
        method: 'get',
        params: {userId : location.state.userId},
        headers: {Authorization : 'eyJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6WyJ1c2VyMUBkYXVtLm5ldCJdLCJpYXQiOjE2MDc4NDc4NDIsImV4cCI6MTYwNzg1NTA0Mn0.0YO5auTaymOy_w9SRlbJM3w08ZOaG5JapuQ0qWlIV9g'}
        })
        .then(function (response) {

            console.info(response);
            if(response.data.return == 'success')
                history.push('/login');
            
        })
        .catch(function (error) {
            
            console.log(error);
        });
        

    }

    const listSearch = () => {
        history.push('/search');
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
            setSearchList({
                ...searchList,
                [name]: value
            });

            console.log(searchList);
    }
    
    const list = ()=>{
        axios.get('http://3.35.140.126:9000/chat/room-list', 
            {userId : userId}
        )
        .then(function (response) {
            setLists([...lists,{
                image : 'aa.jpg',
                title : "chat1",
                chatId : "1"
            },{
            
                image : 'bb.jpg',
                title : "chat2",
                chatId : "2"
            },{
            
                image : 'cc.jpg',
                title : "chat3",
                chatId : "3"
            }]);
        })
        .catch(function (error) {
            console.log(error);
    });
    }
    
    const chatList = lists.map((list, index) =>
            <div className="chatBoxInner" key={index}>
                <div className="leftSection">
                    {/* 유저 프로필사진 조회 처리  */}
                    <div className="img" ></div> 
                    <div className="title">{list.title}</div>
                </div>
                <div className="rightSection">
                    <button className="enterBtn" type="submit" onClick={(e) => {enterChat(e,{roomId: index, userId: userId})}}></button>
                </div>
            </div>
    );
    useEffect(() => {
        list();
    }, []);

    return (
        <div className="chats">
            <div className="header">
                <div id="title">채팅</div>
                <div id='icons'>
                    <li onClick={listSearch}></li>
                    <li id="settings">
                        <label for="toggle"></label>
                        <input type="checkbox" id="toggle" />
                        <ul id="nav">
                            <li id="logout">로그아웃</li>
                            <li id='setting'>설정</li>
                        </ul>
                    </li>
                </div>  
            </div>
            {/* <div id="searchInput"><input type="text" name = "searchList" onChange={handleChange}/></div> */}
            <div className="chatBoxList">
                {chatList}
            </div>
            <div className="footer">
                <div className="friends"></div>
                <div className="chatList"></div>
                <div className="etc"></div>
                <div className="makeChat" onClick={openModal}></div>
                <MakeChat isOpen={isModalOpen} close={closeModal} history={history}/>
            </div>
        </div>
    );
}

export default Chats;