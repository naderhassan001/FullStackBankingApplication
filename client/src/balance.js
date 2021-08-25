import React from 'react';
import { UserContext } from './App';
import Card from './context';

export default function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1512358958014-b651a7ee1773?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")`,
        height: '92.4vh',
        padding: '40px',
      }}
    >
      <Card
        bgcolor='info'
        header='Balance'
        status={status}
        body={
          show ? (
            <BalanceForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <BalanceMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </div>
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type='submit'
        className='btn btn-light'
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const { user, setUser } = React.useContext(UserContext);

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(text);
          props.setShow(false);
          setBalance(user.balance);
          console.log('JSON:', data);
        } catch (err) {
          props.setStatus(text);
          console.log('err:', text);
        }
      });
  }

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
      <button type='submit' className='btn btn-light' onClick={handle}>
        Check Balance
      </button>
    </>
  );
}
