import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

  const [getData, setData] = useState({
    email: '',
    name: '',
    password: '',
    appType: 'music'
  })

  const[getError,setError] = useState("");

  const navigate = useNavigate();


  const onChangeHandler = (event) => {
    setData({ ...getData, [event.target.name]: event.target.value })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setError('');
    axios.post("https://academics.newtonschool.co/api/v1/user/signup",getData).then((response)=>{
               console.log(response);
               navigate('/login');
    }).catch((error)=>{
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
    <div>
      <div id="login-container">
        <div className='login-containt'>
          <div className="login">
          <div id='message'>Register to Spotify</div>
      <form onSubmit={onSubmitHandler}>
      <h2 style={{color:'red'}}>{getError}</h2>
        <input type="email" name="email" id="email" value={getData.email} onChange={onChangeHandler} placeholder="Email address" required autoComplete="off" />
        <input type="text" name="name" id="name" value={getData.userName} onChange={onChangeHandler} placeholder="User Name" required autoComplete="off" />
        <input type="password" name="password" id="password"  value={getData.password} onChange={onChangeHandler} placeholder="Password" required autoComplete="off" />

        <button type="submit">SUBMIT</button>
      </form>
          </div>
        </div>
      </div>
    </div>
    </section>
  </>)

}
export default Register;