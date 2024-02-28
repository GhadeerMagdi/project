const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.body.params
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('CandidateId', params.contactid);
        request.input('RequirementId', params.RequirementID);
        request.input('MailName', 'Email - Application');
        request.input('WebApplicationTaskTypeId', 119);
        request.output('Result', sql.NVarChar(16));


        let result = await request.execute('sp_spotajob_shortlist_candidate');
        res.status(200).json({ results: result.output.Result })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}