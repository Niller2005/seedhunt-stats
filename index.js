const firebase = require('firebase-admin');
const axios = require('axios').default;

const serviceAccount = require('./sa/seedhunt-stats-firebase-adminsdk-sva6e-7313ad736e.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://seedhunt-stats.firebaseio.com',
});
const db = firebase.firestore();

setInterval(() => {
  const now = new Date(Date.now());
  axios.get('https://seedhunt.net/statistics/api/sps').then((res) => {
    db.collection('sps').add({
      value: res.data.seeds_per_secound,
      time: now,
    });
  });

  axios.get('https://seedhunt.net/statistics/api/totalviable').then((res) => {
    db.collection('totalviable').add({
      value: res.data.total_viable_seeds,
      time: now,
    });
  });

  axios.get('https://seedhunt.net/statistics/api/totalscanned').then((res) => {
    db.collection('totalscanned').add({
      value: res.data.total_scanned_seeds,
      time: now,
    });
  });
}, 60000);