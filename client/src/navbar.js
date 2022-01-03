import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './App';

export default function NavBar() {
  const { user, setUser } = React.useContext(UserContext);
  const history = useHistory();
  function logout() {
    localStorage.clear();
    setUser({});
    history.push('/');
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <a className='navbar-brand' href='#' style={{ fontFamily: 'sans-serif' }}>
        <strong>"Nader's Bank"</strong>
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav w-100'>
          {!user?._id ? (
            <>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#/CreateAccount/'
                  style={{ color: '#580505' }}
                >
                  <strong>Create Account</strong>
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#/login/'
                  style={{ color: '#580505' }}
                >
                  <strong>Login</strong>
                </a>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#/deposit/'
                  style={{ color: '#205a95' }}
                >
                  Deposit
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#/withdraw/'
                  style={{ color: '#205a95' }}
                >
                  Withdraw
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#/balance/'
                  style={{ color: '#205a95' }}
                >
                  Balance
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#/alldata/'
                  style={{ color: '#205a95' }}
                >
                  AllData
                </a>
              </li>
              <li
                className='nav-item ml-auto'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  float: 'right',
                }}
              >
                <h3 style={{ color: '#4c5a95', fontFamily: '-moz-initial' }}>
                  {user?.name}
                </h3>
                <div
                  style={{ cursor: 'pointer' }}
                  className='nav-link'
                  onClick={logout}
                >
                  <strong>Logout</strong>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
