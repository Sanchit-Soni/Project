

  import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
     
        apiKey: "AIzaSyDPJWPznN8uIF35gC4sroCUR16uNaFaS7I",
        authDomain: "travel-insta-75aa4.firebaseapp.com",
        projectId: "travel-insta-75aa4",
        storageBucket: "travel-insta-75aa4.appspot.com",
        messagingSenderId: "823137429111",
        appId: "1:823137429111:web:d684f7ecca1b328eb9c872",
        measurementId: "G-CF5QDLLB6H"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage };
    //export default db;