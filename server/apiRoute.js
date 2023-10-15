const router = require("express").Router();
const posts = require("./scrape");

router.get('/', async (req, res, next) => {
    try {
        const result = await posts.getData()
        res.json(result)
    } catch (e) {
        next(e);
    }
})

router.get('/:title', async (req, res, next) => {
    try {
        const result = await posts.getData()
        res.json(result
            .filter(p => p.title === req.params.title))
    } catch (e) {
        next(e);
    }
})

module.exports = router;
