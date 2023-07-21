import app from "./app";
import AppDataSource from "./data-source";
import "dotenv/config";

const PORT: number = Number(process.env.PORT) || 3001;
const API_DETAIL: string = process.env.API_DETAIL || "/api/v1";
export const PathAPI: string = "https://localhost:" + PORT + API_DETAIL;

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
