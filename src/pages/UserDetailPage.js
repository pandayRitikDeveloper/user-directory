import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserDetailPage.css'; // Import the CSS file
import { Link } from 'react-router-dom';
const UserDetailPage = ({ userData }) => {
  const { id } = useParams();
  const user = userData.find(user => user.id === parseInt(id));

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  // Check if the user is found
  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <div className="container">
             <h1><Link to={"/"}>
            Home
            </Link></h1>
      <div className="timer-container">
        <span className="timer">Time: {formatTime(timer)}</span>
        <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      </div>

      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>address:  {user.address.street+", "+user.address.city+", "+user.address.zipcode}</p>
      {user.posts.map((post) => (
        <div className="box" key={post.id}>
          <h3>Title: {post.title}</h3>
          <p>Body: {post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDetailPage;
