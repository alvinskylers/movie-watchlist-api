import express from "express"
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ httpMethod: "GET"});
});

router.post('/test', (req, res) => {
    res.json({ httpMethod: "POST"});
});

router.put('/test', (req, res) => {
    res.json({ httpMethod: "PUT"});
});

router.delete('/test', (req, res) => {
    res.json({ httpMethod: "DELETE"});
});

export default router;