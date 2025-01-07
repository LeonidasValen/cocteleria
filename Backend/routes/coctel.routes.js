import { Router } from 'express'
import { getAllCoctels, getCoctel, postCoctel, updateCoctel } from '../controllers/coctel.controller.js'
import { upload } from '../libs/multerImg.js'
import { validateId } from '../middleware/validateId.js'

const router = Router()

router.post('/postCoctel', upload, postCoctel)
router.get('/getCoctels', getAllCoctels)
router.get('/getCoctel/:id', validateId, getCoctel)

router.put('/updateCoctel/:id', validateId, upload, updateCoctel)

export default router