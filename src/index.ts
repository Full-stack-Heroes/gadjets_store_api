import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Test111');
})

app.listen(3000, () => {
  console.log('Server works fine bro')
})
