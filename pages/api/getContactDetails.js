const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.query
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('CandidateId', params.contactid);
        request.output('TitleId', sql.NVarChar(2));
        request.output('Christian', sql.NVarChar(60));
        request.output('Surname', sql.NVarChar(30));
        request.output('FullName', sql.NVarChar(30));
        request.output('Email', sql.NVarChar(128));
        request.output('Password', sql.NVarChar(16));
        request.output('CVFileRef', sql.NVarChar(128));
        request.output('CVFileName', sql.NVarChar(128));
        request.output('Available', sql.NVarChar(11));
        request.output('HomeTelNo', sql.NVarChar(60));
        request.output('MobileTelNo', sql.NVarChar(60));
        request.output('WorkTelNo', sql.NVarChar(60));



        let result = await request.execute('sp_spotajob_candidate_account_get');
        res.status(200).json({ results: result.output })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}