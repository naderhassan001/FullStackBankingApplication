import React from 'react';

export default function AllData() {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/account/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <div
      style={{ backgroundColor: '#EDF5FF', height: '100vh', padding: '10px' }}
    >
      <h5>All Data in Store:</h5>
      <table className='table table-bordered'>
        <th>Name</th>
        <th>Email</th>
        <th>Account No</th>
        <th>Balance</th>
        {console.log('HI', data)}
        {Array.isArray(data) &&
          data?.map((d) => (
            <tr>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.accountno}</td>
              <td>{d.balance}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
