const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.query
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('CompanyId', process.env.NEXT_PUBLIC_AgencyID);
        request.input('T1', params.t1);
        request.input('Web', 2);
        request.input('sort', 1);



        let result = await request.execute('sp_tag_list_t2_for_t1');
        res.status(200).json({ results: result.recordsets[0] })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}