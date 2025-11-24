import express from "express";
import connectDb from "./config/db.js";
import httpError from "./middleware/errorHanding.js";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoute.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));  


app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use("/blog", blogRoutes);

app.get("/", (req, res) => {
  res.redirect("/blog/get");
});
app.use((req, res, next) => {
  return next(new httpError("route not found", 404));
});


// app.use((error, req, res, next) => {
//   if (req.headersSent) return next(error);

//   res.status(error.statusCode || 500).json({
//     message: error.message,
//   });
// });

app.use((error, req, res, next) => {
  console.log("ERROR:", error);   // 👈 SHOW REAL ERROR IN TERMINAL
  res.status(error.statusCode || 500).json({
    message: error.message,
  });
});


const port = 5000;

const startServer = async () => {
  try {
    await connectDb();
    console.log("DB connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
