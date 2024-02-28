const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.query
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('RequirementId', params.RequirementID);
        request.input('ContactId', 0);
        request.input('CandidateId', 0);
        request.input('AgencyId', process.env.NEXT_PUBLIC_AgencyID);



        let result = await request.execute('sp_spotajob_client_job_details_edit_get');
        res.status(200).json({ results: result.recordsets[0] })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}