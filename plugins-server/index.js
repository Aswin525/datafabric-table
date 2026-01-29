import express from 'express';
import { env } from 'node:process';

const router = express.Router();
const app = express();
const port = env.PORT || 3000;
const basePath = env.BASE_PATH || '';

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}${basePath}`);
});

router.get('/ping', (req, res) => {
    res.send({ message: 'Hello World!' });
});
router.use('/plugins', express.static('plugins'));

app.use(basePath, router);
