import { Router } from 'express'
import { getAllCoctels, getCoctel, postCoctel, updateCoctel } from '../controllers/coctel.controller.js'
import { uploadImage } from '../libs/multerImg.js'
import { validateId } from '../middleware/validateId.js'

const router = Router()

router.post('/postCoctel', uploadImage, postCoctel)
router.get('/getCoctels', getAllCoctels)
router.get('/getCoctel/:id', validateId, getCoctel)

router.put('/updateCoctel/:id', validateId, uploadImage, updateCoctel)

export default router