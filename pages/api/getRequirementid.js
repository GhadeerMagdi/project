const sql = require('mssql');


export default async function handler(req, res) {
    const params = req.query
    var sqlConfig = JSON.parse(process.env.sql_config || {});
   
    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('Entity', 'Requirement');
        request.input('UID', params.jobid);
        request.output("Id", sql.VARCHAR(32));



        let result = await request.execute('sp_chi_id_from_uid');
        res.status(200).json({ results: result.recordsets[0] })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}