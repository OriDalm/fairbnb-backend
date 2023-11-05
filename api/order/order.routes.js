import express from 'express'
import { requireAuth } from '../../middlewares/requireAuth.middleware.js'
import { log } from '../../middlewares/logger.middleware.js'
import { getOrderById, getOrders, addOrder, removeOrder, updateOrder } from './order.controller.js'


const router = express.Router()


router.get('/', log, getOrders)
router.get('/:id', getOrderById)
router.post('/', requireAuth, addOrder)
router.put('/:id', requireAuth, updateOrder)
router.delete('/:id', requireAuth, removeOrder)

export const orderRoutes = router