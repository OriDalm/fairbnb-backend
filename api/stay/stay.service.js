import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { utilService } from '../../services/util.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const PAGE_SIZE = 3


async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('stay')
        const stays = await collection.find(criteria).toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = collection.findOne({ _id: ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

// async function remove(stayId) {
//     try {
//         const collection = await dbService.getCollection('stay')
//         await collection.deleteOne({ _id: ObjectId(stayId) })
//         return stayId
//     } catch (err) {
//         logger.error(`cannot remove stay ${stayId}`, err)
//         throw err
//     }
// }

// async function add(stay) {
//     try {
//         const collection = await dbService.getCollection('stay')
//         await collection.insertOne(stay)
//         return stay
//     } catch (err) {
//         logger.error('cannot insert stay', err)
//         throw err
//     }
// }

// async function update(stay) {
//     try {
//         const stayToSave = {
//             vendor: stay.vendor,
//             price: stay.price
//         }
//         const collection = await dbService.getCollection('stay')
//         await collection.updateOne({ _id: ObjectId(stay._id) }, { $set: stayToSave })
//         return stay
//     } catch (err) {
//         logger.error(`cannot update stay ${stayId}`, err)
//         throw err
//     }
// }

// async function addStayMsg(stayId, msg) {
//     try {
//         msg.id = utilService.makeId()
//         const collection = await dbService.getCollection('stay')
//         await collection.updateOne({ _id: ObjectId(stayId) }, { $push: { msgs: msg } })
//         return msg
//     } catch (err) {
//         logger.error(`cannot add stay msg ${stayId}`, err)
//         throw err
//     }
// }

// async function removeStayMsg(stayId, msgId) {
//     try {
//         const collection = await dbService.getCollection('stay')
//         await collection.updateOne({ _id: ObjectId(stayId) }, { $pull: { msgs: {id: msgId} } })
//         return msgId
//     } catch (err) {
//         logger.error(`cannot add stay msg ${stayId}`, err)
//         throw err
//     }
// }

export const stayService = {
    // remove,
    query,
    getById,
    // add,
    // update,
    // addStayMsg,
    // removeStayMsg
}

function _buildCriteria(filterBy) {
    console.log(filterBy);
    const { country, labels, type, bedrooms, bathrooms, minPrice, maxPrice, } = filterBy
console.log(typeof country);
    let criteria = {}

    if (country) {
        // criteria['loc.city'] = {$regex: country}
        criteria = {
            $or: [
              { 'loc.city': { $regex: country } },
              { 'loc.country': { $regex: country } }
            ]
          };
    }

    if (type) {
        criteria.type = { $regex: type, $options: 'i' }
    }

    if (labels) {
        criteria.labels = { $regex: labels, $options: 'i' }
    }

    if (bedrooms) {
        criteria.bedrooms = bedrooms
    }

    if (bathrooms) {
        criteria.bathrooms = bathrooms
    }

    if (minPrice && maxPrice) {
        criteria.price = { $gte: minPrice, $lte: maxPrice }
    }
    return criteria
}