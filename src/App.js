import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import Header from './components/header';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [isAuth, setIsAuth] = useState(false); // 로그인하고있는지 아닌지 저장
  const [test, setTest] = useState();
  return (
    <div className="App">
      <Header isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <h1>요청결과 : {test}</h1>
      <button onClick={()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/test`)
        .then((response)=>{
          console.log(response)
          setTest(response.data)
        }).catch((error)=>{
          console.log(error)
        })
      }}>test요청</button>
      <button onClick={()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/test2`)
        .then((response)=>{
          console.log(response.data)
        }).catch((error)=>{
          console.log(error)
        })
      }}>test2 요청</button>
      <button onClick={()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/test3/7`,{
          "id":"aaa",
          "pw":"12345",
          "age":31
        },{
          // 쿼리로 보내는 것과 같음 (localhost:8888?msg='hello spring')
          params : {
            "msg" : "hello spring"
          }
        }).then((response)=>{
          console.log(response.data)
        }).catch((error)=>{
          console.log(error)
        })
      }}>서버로 전송</button>
    </div>
  );
}

export default App;
