const firebase = require('firebase-admin');
const axios = require('axios').default;
const connect = require('connect');
const serveStatic = require('serve-static');

const serviceAccount = require('./sa/seedhunt-stats-firebase-adminsdk-sva6e-7313ad736e.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://seedhunt-stats.firebaseio.com',
});
const db = firebase.database();
const spsRef = db.ref('sps');
const totalviableRef = db.ref('totalviable');
const totalscannedRef = db.ref('totalscanned');

setInterval(() => {
  const now = Date.now();
  const newSpsRef = spsRef.push();
  axios.get('https://seedhunt.net/statistics/api/sps').then((res) => {
    newSpsRef.set({
      value: res.data.seeds_per_secound,
      time: now,
    });
  });

  const newTotalviablRef = totalviableRef.push();
  axios.get('https://seedhunt.net/statistics/api/totalviable').then((res) => {
    newTotalviablRef.set({
      value: res.data.total_viable_seeds,
      time: now,
    });
  });

  const newTotalscannedRef = totalscannedRef.push();
  axios.get('https://seedhunt.net/statistics/api/totalscanned').then((res) => {
    newTotalscannedRef.set({
      value: res.data.total_scanned_seeds,
      time: now,
    });
  });
}, 60000);

connect()
  .use(serveStatic(__dirname + '/static'))
  .listen(8080, () => console.log('Server running on 8080...'));