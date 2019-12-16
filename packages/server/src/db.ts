import path from 'path';
import fs from 'fs-extra';
import { ConnectionOptions, createConnection, Connection } from 'typeorm';

// workaround to typeorm limitations with placement of its ormconfig.json
// when working with yarn workspaces
export const getConnectionConfig = async (): Promise<ConnectionOptions> => {
  // can be an array of config options | objet with one config option
  const configs: ConnectionOptions = await fs.readJson(
    path.join(process.cwd(), '/ormconfig.json')
  );

  // in the case of multiple config options, find the one and return it
  if (configs instanceof Array) {
    const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'default';
    const config = configs.find(config => config.name === nodeEnv);
    return config;
  }

  // there's only one config option
  return configs;
};

export const connect = async (): Promise<Connection> => {
  const config: ConnectionOptions = await getConnectionConfig();
  return await createConnection({
    ...config,
    entities: [__dirname + '/entity/**/*.ts'],
    migrations: [__dirname + '/migration/**/*.ts']
  });
};
