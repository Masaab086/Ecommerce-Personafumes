import App from "./app";
import connection from "./db/db";
import dotenv from "dotenv";

dotenv.config();
connection.connect((err) => {
  if (err) throw err;

  console.log(`Db connected to ${process.env.DB}`);
});

App.listen(process.env.PORT, () => {
  console.log(`Backend connected ${process.env.PORT} welcome`);
});
