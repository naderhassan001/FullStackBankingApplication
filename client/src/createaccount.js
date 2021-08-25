import React from 'react';
import Card from './context';

export default function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1609726494499-27d3e942456c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
        height: '92.4vh',
        padding: '40px',
      }}
    >
      <Card
        bgcolor='primary'
        header='Create Account'
        status={status}
        body={
          show ? (
            <CreateForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <CreateMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </div>
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type='submit'
        className='btn btn-light'
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle() {
    fetch(`/account/create/${name}/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus('');
          props.setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus(text);
          console.log('err:', text);
        }
      });
  }

  return (
    <>
      Name
      <br />
      <input
        type='input'
        className='form-control'
        placeholder='Enter name'
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />
      Email address
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
      <button type='submit' className='w-100 btn btn-light' onClick={handle}>
        Create Account
      </button>
    </>
  );
}
