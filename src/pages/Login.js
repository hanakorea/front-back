import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login({setIsAuth}){
  const navigate = useNavigate();
  const [member, setMember] = useState({
    username:'',
    password:''
  })

  const onChangeHandler = (e)=>{
    setMember({
      ...member,
      [e.target.name] : e.target.value
    })
  }
  return(
    <div>
      <h1>로그인 페이지</h1>
      아이디 : <input type="text" name="username" onChange={onChangeHandler}/><br/>
      비밀번호 : <input type="text" name="password" onChange={onChangeHandler}/><br/>
      <button onClick={()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/login`,member)
        .then(response=>{
          const jwt = response.headers.authorization

          if(jwt != null){
            sessionStorage.setItem('jwt',jwt)
            setIsAuth(true)
            navigate('/')
          }
        }).catch(error=>{
          alert('로그인 실패')
          console.log(error)
        })
      }}>로그인</button>
    </div>
  )
}
export default Login