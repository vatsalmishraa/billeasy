
const db = require('./db')
const config = require('./config.json')


productObj = {
    insertProd: async function (req, res) {
        try {
            isValid = productObj.productValidaion(req.body)
            if (!isValid) return res.send({ status: false, message: 'validation failed' })
            let data = req.body
            if (!config.categories.includes(data.category)) return res.send({ status: false, message: 'category missing' })
            if (config.priceApprovalThreshold < data.price && data.approval_code != config.approvalCode) return res.send({ status: false, message: 'approval missing' })
            let query = `INSERT INTO products (name, description, category, price,available) VALUES('${data.name}', '${data.description}', '${data.category}', '${data.price}',${data.available}) RETURNING *`
            let insert = await db.execQuery(query)
            res.send({ status: true, message: insert[0] })

        } catch (e) {
            console.log(e)
            res.send(e)
        }
    },
    productValidaion: function (body) {
        try {
            let feildsobj = {
                "name": 'string',
                "description": 'string',
                "category": 'string',
                "price": 'number',
                "available": 'boolean'
            }
            Object.keys(feildsobj).map(k => {
                console.log(k)
                if ([null, undefined, 'null', '', ' '].includes(body[k])) return false
                if (typeof body[k] != feildsobj[k]) return false
            })
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
module.exports = productObj