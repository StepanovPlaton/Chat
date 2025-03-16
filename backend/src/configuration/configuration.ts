import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IDatabaseConfigKey } from './database';

const config = {};

export type IConfig = typeof config & {
  [k in IDatabaseConfigKey]: TypeOrmModuleOptions;
};

const getConfig = () => config;
export default getConfig;
