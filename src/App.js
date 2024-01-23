import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UserDetailPage from './pages/UserDetailPage';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const App = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios('https://jsonplaceholder.typicode.com/users');
        response = response.data;
        
        response.forEach((user) => {
          user.posts = [];
        });

        let posts = await axios('https://jsonplaceholder.typicode.com/posts');
        posts = posts.data;

        response.forEach((user) => {
          posts.forEach((post) => {
            if (user.id === post.userId) {
              user.posts.push(post);
            }
          });
        });

        setUserData(response);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage userData={userData}/>} />
        <Route path="/user/:id" element={<UserDetailPage userData={userData}/>} />
      </Routes>
    </Router>
  );
};

export default App;
