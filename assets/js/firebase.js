
    var firebaseConfig = {
        apiKey: "AIzaSyDkAhrN6PMaXHl59K0xphHtADBCIhGMXng",
        authDomain: "train-scheduler-8ef3a.firebaseapp.com",
        databaseURL: "https://train-scheduler-8ef3a.firebaseio.com",
        projectId: "train-scheduler-8ef3a",
        storageBucket: "train-scheduler-8ef3a.appspot.com",
        messagingSenderId: "152369358666",
        appId: "1:152369358666:web:d6b0dda1c03461f97e03b3"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Defines database
    const db = firebase.firestore();