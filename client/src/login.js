import React from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { UserContext } from './App';
import Card from './context';

export default function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")`,
        height: '92.4vh',
        padding: '40px',
      }}
    >
      <Card
        bgcolor='secondary'
        header='Login'
        status={status}
        body={
          show ? (
            <LoginForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <LoginMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </div>
  );
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type='submit'
        className='btn btn-light'
        onClick={() => props.setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}

function LoginForm(props) {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setToken, setUser } = React.useContext(UserContext);
  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setUser(data.user);
          props.setStatus('');
          props.setShow(false);
          history.push('/');
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus(text);
          console.log('err:', text);
        }
      });
  }

  const responseGoogle = async (response) => {
    console.log(response);
    try {
      const res = await fetch('/account/googlelogin/' + response.tokenId);
      const { token, user } = await res.json();
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      props.setStatus('');
      history.push('/');
    } catch (err) {
      console.log({ err });
      props.setStatus(err.response.message);
    }
  };
  const errResponseGoogle = (response) => {
    console.log(response);
    props.setStatus('Unable to login with Google');
  };

  return (
    <>
      Email
      <br />
      <input
        type='input'
        className='form-control'
        placeholder='Enter email'
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type='password'
        className='form-control'
        placeholder='Enter password'
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type='submit' className='btn btn-light w-100' onClick={handle}>
        Login
      </button>
      {/* <div className='ml-1'> */}
      <GoogleLogin
        className='mt-2 w-100 text-center font-weight-bold'
        theme='dark'
        clientId='118740429808-b9r40h91la2cdm4sm74ml1uqgkk3tkfa.apps.googleusercontent.com'
        buttonText='Login with Google'
        onSuccess={responseGoogle}
        onFailure={errResponseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      {/* </div> */}
    </>
  );
}
