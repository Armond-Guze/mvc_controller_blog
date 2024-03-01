const router = require('express').Router();
const { User, Post, Comment } = require('../..models')

module.exports = router

router.get('/', async (req, res) => {
    try{ 
        const savedComments = await Comment.findAll({
            include: [ 
                { model: User, attributes: ['username'] }, 
                { model: BlogPost, attributes: ['title'] } 
            ],
            attributes: ['id', 'body_text', 'user_id', 'blogpost_id', 'createdAt', 'updatedAt'],
        });
        if(!savedComments) {
            res.status(404).json({ message: "No comments to display"});
            return;
        };
        res.status(200).json(savedComments);
    } catch (err) {
        res.status(500).json(err);
    }
});