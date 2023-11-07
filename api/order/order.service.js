import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const orderService = {
    remove,
    query,
    getById,
    add,
    update,
    // addStayMsg,
    // removeStayMsg
}

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        const orders = await collection.find(criteria).sort({_id:-1}).toArray()
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = collection.findOne({ _id: ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ _id: ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        order.createdAt = Date.now()
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('cannot add order', err)
        throw err
    }
}

async function update(order) {
    try {
        const id = order._id
        delete order._id
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: ObjectId(id) }, { $set: order })
        order._id = id
        return order

    } catch (err) {
        logger.error(`cannot update order ${orderId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.hostId) {
        criteria['order.host'] = { $regex: filterBy.hostId }
    }
    else if (filterBy.buyerId) {
        criteria['order.buyer'] = { $regex: filterBy.buyerId }
    }
    return criteria
}