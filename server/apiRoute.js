const router = require("express").Router();
const posts = require("./scrape");

router.get('/', async (req, res) => {
    try {
        const result = await posts.getData()
        res.json(result)
    } catch (e) {
        next(err);
    }
})

router.get('/:title', async (req, res) => {
    try {
        const result = await posts.getData()
        res.json(result
            .filter(p => p.title === req.params.title))
    } catch (e) {
        next(err);
    }
})

module.exports = router;