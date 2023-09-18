import express from 'express';
import apiRoutes from './routes';
import { WebSocketServer } from './controllers/WebsocketController';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

const websocketServer = new WebSocketServer()
websocketServer.handleConnections()

export default app;