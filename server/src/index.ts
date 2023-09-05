import App from "./app";
import dotenv from "dotenv";
import { firebaseApp, analytics } from "./firebaseConfig"; // import firebaseApp and analytics

dotenv.config();
const port = process.env.PORT || 5001;

const app = new App().app;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
