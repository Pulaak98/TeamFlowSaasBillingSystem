import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler.js";
import { notFound } from "./middlewares/not-found.js";
import memberRoutes from "./routes/member.routes.js";
import creditUsageRoutes from "./routes/credit-usage.routes.js";
import billingRoutes from "./routes/billing.routes.js";




const app = express();

app.use(cors());
app.use(express.json());

app.use("/organizations", memberRoutes);
app.use("/organizations", creditUsageRoutes);
app.use("/organizations", billingRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;