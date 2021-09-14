type EnvType = "development" | "production" | "test" | string;

const env: EnvType = process.env.NODE_ENV || "development";

interface IConfig {
  port: number;
}

interface IConfigs {
  [key: string]: IConfig;
}

const configs: IConfigs = {
  base: {
    port: 7070,
  },
  development: {
    port: 7070,
  },
};

const config = Object.assign(configs.base, configs[env]);

export default config;
