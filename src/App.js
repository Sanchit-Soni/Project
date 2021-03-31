import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Chatbox from './Chatbox';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Home from './Home';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        console.log(authUser);
        setUser(authUser);

        // if(authUser.displayName) {
        //   //dont update username
        // } else {
        //   //if we just created someone...
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      
      } else {
        //user has logged out...
        setUser(null);
      }
    })

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);


  const Routing = () => {
    return (
      <Switch>
        <Route path = "/" exact component={Home}/>
      <Route path= "/Chatbox" exact component={Chatbox}/>
    </Switch>
    )
     
  }



 // const [posts, setPosts] = useState([
    // {
    //   username: "samia_rekhi",
    //   caption: "React",
    //   imageUrl: "https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
    // },
    // {
    //   username: "rejtshawarma",
    //   caption: "React",
    //   imageUrl: "https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
    // }
  //]);
 // const [open, setOpen] = useState(false);
  
  // useEffect -> runs a piece of code based on a specific condition

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (event) => {
      event.preventDefault();

      auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
       return authUser.user.updateProfile({
          displayName: username
        });
      })
      .catch((error) => alert(error.message))

      setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  return (
    <Router>
      
      <Home />
    </Router>
    
    // <Router>
    //    <Routing />
    // <div className="app">
     
     
     

    //   <Modal
      
    //     open={open}
    //     onClose={() => setOpen(false)}
    //   >
    //      <div style={modalStyle} className={classes.paper}>
    //        <form className="app__signup">
    //        <center>
    //         <img
    //         className="app__headerImage"
    //         src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
    //         alt=""
    //         />
    //        </center>
    //         <Input
    //           placeholder="username"
    //           type="text"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //         />

    //         <Input
    //           placeholder="email"
    //           type="text"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />

    //         <Input 
    //           placeholder="password"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <Button type="submit" onClick={signUp}>Sign Up</Button>
    //        </form>
    //      </div>
         
        
    //   </Modal>

    //   <Modal
    //     open={openSignIn}
    //     onClose={() => setOpenSignIn(false)}
    //   >
    //      <div style={modalStyle} className={classes.paper}>
    //        <form className="app__signup">
    //        <center>
    //         <img
    //         className="app__headerImage"
    //         src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
    //         alt=""
    //         />
    //        </center>
    //         <Input
    //           placeholder="email"
    //           type="text"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />

    //         <Input 
    //           placeholder="password"
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <Button type="submit" onClick={signIn}>Sign In</Button>
    //        </form>
    //      </div>
        
    //   </Modal>
      
    //   <div className="app__header">
    //     <img
    //       className="app__headerImage"
    //       src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
    //       alt=""
    //     />
    //     {user ? (
    //     <div>
    //       <Link to="/Chatbox">
    //       <button>Chatbox</button></Link>
    //       <Button onClick={() => auth.signOut()}>Logout</Button>
    //     </div>
    //     ):  
    //     (
    //     <div className="app__loginContainer">
    //     <Button onClick={() => setOpenSignIn(true)}>Log In</Button>
    //     <Button onClick={() => setOpen(true)}>Sign Up</Button>
    //     </div>
    //   )}
    //   </div>

    //   <div className="app__posts">
    //     <div className="app__postsLeft">
    //     {
    //     posts.map(({id, post}) => (
    //       <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
    //     ))
    //     }
    //     </div>
    //     <div className="app__postsRight">
     
    //     </div>
    //   </div>
      
      

    //   {user?.displayName ? (
    //        <ImageUpload username={user.displayName} />
    //   ): (
    //     <h3>Sorry you need to login to Upload</h3>
    //   )}
      
    // </div>
    // </Router>
  );
}

export default App;
