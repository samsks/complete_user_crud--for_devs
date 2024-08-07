import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

const PORT: string = process.env.PORT ?? "";
const API_DETAIL: string = process.env.API_DETAIL ?? "";
const PathAPI: string = process.env.API_URL! + PORT + API_DETAIL;

(async (): Promise<void> => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Database connected");

      app.listen(PORT, () => {
        console.log(`Server running on ${PathAPI} 🚀`);
      });
    })
    .catch((error: any) => {
      console.log("Failed to connect to database ❌", error);
    });
})();
