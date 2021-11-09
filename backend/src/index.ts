import startServer from './startServer';
import "reflect-metadata";
import { connect } from './config/typeorm';

connect();
const server = startServer();