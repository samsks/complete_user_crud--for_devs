import path from "path";
import { DataSourceOptions, DataSource } from "typeorm";
import "dotenv/config";
import "reflect-metadata";

const getDataSourceOptions = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{js,ts}"
  );

  const dbUrl: string | undefined =
    process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;

  if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  } else if (nodeEnv === "dev") {
    return {
      type: "postgres",
      url: dbUrl,
      synchronize: false, // Disable it when resolving migration issues, and remember to re-enable it afterward.
      logging: true,
      entities: [entitiesPath],
      migrations: [migrationsPath],
    };
  }

  // CHANGE AND CONFIGURE IN PRODUCTION
  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: false,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const AppDataSource = new DataSource(getDataSourceOptions());

export default AppDataSource;
