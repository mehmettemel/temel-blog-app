import express from 'express'
import blogControllers from '../controllers/blogControllers'
import { auth } from '../middleware/auth'

const router = express.Router()

router.post('/blog', auth, blogControllers.createBlog)
router.get('/home/blogs', blogControllers.getHomeBlogs)
router.get('/blogs/:category_id', blogControllers.getBlogsByCategory)

export default router
