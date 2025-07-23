import app, { connectDB } from './app';
import * as http from 'http';
const port = process.env.PORT || 2024;

const server = http.createServer(app);

connectDB();

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('server is running');
});

process.on('SIGINT', () => {
  server.close(() => console.log('Exit Server Express'));
});
