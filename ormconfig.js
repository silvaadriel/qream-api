const parse = require('pg-connection-string').parse;

if (process.env.NODE_ENV === 'production') {
  const databaseUrl = process.env.DATABASE_URL;
  const connectionOptions = parse(databaseUrl);

  return (module.exports = {
    type: 'postgres',
    host: connectionOptions.host,
    port: connectionOptions.port,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    entities: ['./dist/models/*.js'],
    migrations: ['./dist/database/migrations/*.js'],
    cli: {
      migrationsDir: './dist/database/migrations',
    },
  });
}

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'qream_postgres',
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
