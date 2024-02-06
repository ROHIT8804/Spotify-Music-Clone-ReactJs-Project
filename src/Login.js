import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useUser} from './UserProvider';
// import "./login.css";

function Login() {

  const [getData, setData] = useState({
    email: '',
    password: '',
    appType: 'music'
  })

  const {signInUser} = useUser();
  

  const[getError,setError] = useState("");

  const navigate = useNavigate();


  const onChangeHandler = (event) => {
    setData({ ...getData, [event.target.name]: event.target.value })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setError('');
    axios.post("https://academics.newtonschool.co/api/v1/user/login",getData).then((response)=>{
               console.log(response.data);
               signInUser({status:response.data.status,token:response.data.token})
               navigate('/');
    }).catch((error)=>{
      console.log(error);
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("unknow error please try after sometime");
      }
    })
  }


  return (<>
    <section className="main-container">
      <form onSubmit={onSubmitHandler}>
         <h2 style={{color:'red'}}>{getError}</h2>
        <input type="email" name="email" id="email" value={getData.email} onChange={onChangeHandler} placeholder="Email address" required autoComplete="off" />
        <input type="password" name="password" id="password"  value={getData.password} onChange={onChangeHandler} placeholder="Password" required autoComplete="off" />
        
        <button type="submit">SUBMIT</button>
      </form>
      
    </section>
    
  </>)

}
export default Login;