import React from 'react';
import Card from './context';

export default function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1606207963463-5836a7c211fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")`,
        height: '92.4vh',
        padding: '40px',
      }}
    >
      <Card
        bgcolor='warning'
        header='Deposit'
        status={status}
        body={
          show ? (
            <DepositForm setShow={setShow} setStatus={setStatus} />
          ) : (
            <DepositMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </div>
  );
}

function DepositMsg(props) {
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
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle() {
    fetch(`/account/update/${email}/${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.value));
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
      Amount
      <br />
      <input
        type='number'
        className='form-control'
        placeholder='Enter amount'
        min='1'
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type='submit' className='btn btn-light' onClick={handle}>
        Deposit
      </button>
    </>
  );
}
