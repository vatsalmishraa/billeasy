db = require('./db')

usersObj = {

    getUsers: async function (req, res) {
        try {
            let query = await usersObj.UserqueryBuilder(req.query)
            let response = await db.execQuery(query)
            //users?role=admin&active=true&page=1&limit=10&sort=created_at
            console.log(response)
            res.send({ message: response })
        } catch (e) {
            console.log(e)
            res.send({ message: 'error in get users', error: e })
        }
    },

    UserqueryBuilder: async function (params) {
        try {
            let query = 'SELECT * FROM users us'
            if (params.role) {
                query += ` inner join roles as ro on us.id=ro.id where ro.name = '${params.role}' `
            }
            if (params.active) {
                if (!query.includes('where')) {
                    query += `inner join user_activities as ua on us.id=ua.user_id`
                    query += ' where ua.is_active=true'
                }
                else {
                    let arr = query.split('where')
                    query = arr[0] + ' inner join user_activities as ua on us.id=ua.user_id ' + ' where ' + arr[1] + ' and ua.is_active=true'
                }
            }
            if (params.sort) query += ` order by ${params.sort}`
            if (params.page && params.limit) {
                query += ` LIMIT ${params.limit} OFFSET ${(params.page - 1) * params.limit}`
            }
            return query
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = usersObj