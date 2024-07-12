import express from "express";
import cors from "cors";


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('api', routes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});