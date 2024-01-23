import './styles.css'; // Import the CSS file
import { Link } from 'react-router-dom';
const MainPage = ({userData}) => {
  if (!userData) {
    return <div>Loading</div>;
  }
  return (
    <div className="container">
      <h1><Link to={"/user-directory/"}>
            Home
            </Link></h1>
      {userData.map((user) => (
        <div key={user.id} className="user-container">
          <p className="user-name">
          <Link to={`/user-directory/user/${user.id}`} className="user-name">
            {user.name}
            </Link>
            </p>
          <p className="post-count">Number of Posts: {user.posts.length}</p>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
