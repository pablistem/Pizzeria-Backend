import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export enum ENVIRONMENTS {
  PRODUCTION = 'production',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
  AUTOMATED_TEST = 'automated_tests',
}

const production: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['./data/migration/**/*.ts'],
  synchronize: false,
};

const staging: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['./data/migration/**/*.ts'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const development: DataSourceOptions = {
  type: 'better-sqlite3',
  database: process.env.DB_PATH,
  migrations: ['./data/migration/**/*.js'],
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

const automatedTests: DataSourceOptions = {
  type: 'better-sqlite3',
  database: `data/tests/test.${Math.random()}.db`,
  migrations: ['./data/migration/**/*.ts'],
  synchronize: true,
  dropSchema: false,
  namingStrategy: new SnakeNamingStrategy(),
  verbose: console.log,
};

export const datasourceOptions: DataSourceOptions = (() => {
  if (process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION) {
    return production;
  }

  if (process.env.NODE_ENV === ENVIRONMENTS.STAGING) {
    return staging;
  }

  if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
    return development;
  }

  if (process.env.NODE_ENV === ENVIRONMENTS.AUTOMATED_TEST) {
    return automatedTests;
  }

  throw new Error('No environment defined');
})();

export default new DataSource({
  ...datasourceOptions,
  entities: [join(__dirname, 'src/**/infrastructure/persistence/*.schema.ts')],
});
