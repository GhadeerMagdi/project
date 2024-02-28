const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.body.params
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('EntityID', params.contactid);
        request.input('Agencyid', process.env.NEXT_PUBLIC_AgencyID);
        request.input('DataStr', params.xml);
        request.input('EntityType', 'Candidate');
        request.input('Userid', process.env.NEXT_PUBLIC_UserID);
        request.input('sourceid', 10536);


        let result = await request.execute('Chi_Document_Save_WorkFlow');
        res.status(200).json({ results: result.recordset[0][''] })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}