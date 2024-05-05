import server from './server';
import { config } from './config/envs';
import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import { PreloadAppointments, PreloadUsers } from './helpers/preloadData';

const iniatialApp = async () => {
  await AppDataSource.initialize();
  console.log('server connected to database');
  await PreloadUsers();
  await PreloadAppointments();

  server.listen(config.port, () => {
    console.log(
      `Server listening on port ${config.port}. http://${config.host}:${config.port}/health`
    );
  });
};
export default server;

iniatialApp();
