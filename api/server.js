import { app } from './src/app.js';

const port = process.env.PORT;

app.listen(port, '192.168.0.100', () => {
  console.log(`Server online at http://192.168.0.100:${port}`);
});
