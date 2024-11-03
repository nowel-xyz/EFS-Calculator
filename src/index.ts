import CustomClient from "./base/classes/CustomClient";
import dotenv from 'dotenv';

dotenv.config();
(new CustomClient).Init();

process.on('unhandledRejection', error => console.error('-----\nUncaught Rejection:\n-----\n', error));
process.on('uncaughtException', error => console.error('-----\nUncaught Exception:\n-----\n', error));