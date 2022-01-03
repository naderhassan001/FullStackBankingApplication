import Card from './context';
import bank from './bank.png';

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1554091780-bb3e99c4b02a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1951&q=80")`,
        height: '92.4vh',
        padding: '10px',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ padding: '20px' }}>
        <Card
          txtcolor='black'
          header='Full Bank Landing Module'
          title="Welcome to Nader's Bank"
          text='You can move around using the navigation bar.'
          body={<img src={bank} className='img-fluid' alt='Responsive image' />}
        />
      </div>
    </div>
  );
}
