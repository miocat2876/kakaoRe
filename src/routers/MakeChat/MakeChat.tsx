import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './MakeChat.css';

const MakeChat = (props) => {

    // const [friendList, setFriends] = useState([]);
    const [chatInfo, setChatInfo] = useState({
        id: "",
        chatTitle: "",
        friendList: []
    });

    const { isOpen, close, userId } = props;
    const { chatTitle, friendList  } = chatInfo;

    const onChangeValue = (e) => {
        const { value, name } = e.target;
        
        setChatInfo({
            ...chatInfo,
            [name]: value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(friendList);
        setChatInfo({ //사용자 정보 받아 설정
            ...chatInfo,
            id: {userId},
            friendList: [friendList] 
        });

        console.log(chatInfo);
        //체크된 유저 목록 담기 
        axios.post('http://3.35.140.126:9000/chat/room-create', chatInfo)
        .then(res => {
            //등록 성공 시
            console.log(props);
            // axios.post
            if(true){
                props.history.push('/chat/100');//리턴받은 방번호로 이동
            }
            // <Link to="/chat/1"/>
        })
        .catch(error =>{
            //등록 실패 시
            props.history.push('/chat/100');
        })
    }

    const users = [{id: "test1@daum.net"}, {id: "test2@daum.net"}, {id: "test3@daum.net"}, {id: "test4@daum.net"},{id: "test5@daum.net"}, {id: "test6@daum.net"}, {id: "test7@daum.net"}];

    //1. 친구 조회  2. 친구 선택 후 방제목 입력과 생성  3. 방이동 4. 서버에 초대한 사람들 리스트 보내주기 방번호랑 
    const userList = () => {
        // axios.get('http://3.35.140.126:9000/user/list')
        // .then(res => {
            
        // })
        // .catch(res => {

        // })

    }

    const onChangeCheck = (user) => {
        // setFriends([...friendList, user]);
        setChatInfo({
            ...chatInfo,
            friendList: [...friendList, user]
        })
        console.log(friendList);
    }
 
    return(
        <div>
            {isOpen ? (
                <div className="modal">
                    <div onClick={close}/>
                        <div className="modalContents">
                            <div className="close" onClick={close}>&times;</div>
                            <div className="contents">
                                <input
                                    className="chatTitle"
                                    placeholder="채팅방 이름을 입력하세요"
                                    value={chatTitle}
                                    onChange={onChangeValue}
                                    name="chatTitle">
                                </input>
                                <div className="userList">
                                    {
                                        users.map(item => (
                                            <div className="item">
                                                <div className='userName'>{item.id}</div>
                                                <input type="checkbox" name="user" value={item.id} className="chkbox" onChange={() => {onChangeCheck(item)}}/>
                                            </div>
                                        ))
                                    }
                                </div>
                                <button className="btn" onClick={onSubmit}>채팅방 생성</button>
                            </div>
                            
                        </div>
                    {/* </div> */}
                </div>
            ) : null}
        </div>
    );
}

export default MakeChat;