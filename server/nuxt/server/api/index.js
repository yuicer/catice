import {
	Router
} from 'express'

import users from './users'
import account from './account'

const router = Router()

router.use(users)
router.use(account)

export default router
