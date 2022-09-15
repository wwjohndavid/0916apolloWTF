import { startServer } from './server';
import { createDatabaseConnection, closeDatabaseConnection } from './database';
import { populateDB } from './acronyms/acronym.controller';

startServer();
// createDatabaseConnection();
// populateDB();
async function exitGracefully() {
    await closeDatabaseConnection();
    process.exit(0);
}

process
    // cleanup when process is terminated
    .on('SIGINT', exitGracefully)
    .on('SIGTERM', exitGracefully)
    // cleanup when process is restarted
    .on('SIGHUP', exitGracefully);
