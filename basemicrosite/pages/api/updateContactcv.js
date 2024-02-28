const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.body.params
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('Contactid', params.contactid);
        request.input('NewCVFileRef', params.Newcvfileref);



        let result = await request.execute('sp_chi_Contactcv_update');
        res.status(200).json({ results: result.recordsets[0] })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}