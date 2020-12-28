import React from 'react';

const Search = () => {

    const list = () => {
        axios.get('http://3.35.140.126:9000/chat/room-list', 
                {userId : location.state.userId,
                chatId : '3'}
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
    
    return (
        <div id="board">
            <div id="header">search component</div>
        </div>
    );
}

export default Search;