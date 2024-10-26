import { Router } from 'express'
import { getAllCoctels, postCoctel } from '../controllers/coctel.controller.js'
import { upload } from '../libs/multerImg.js'

const router = Router()

router.post('/postCoctel', upload, postCoctel)
router.get('/getCoctels', getAllCoctels)

export default router