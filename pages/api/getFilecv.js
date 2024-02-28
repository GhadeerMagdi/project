const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.query
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        let request = await pool.request();
        let result = await request.query(
            `select dbo.fn_GetCVfileRefForContact(${ params.contactid })`
        );

        let ret = result.recordset[0][''];
        res.status(200).json({ results: ret })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}


