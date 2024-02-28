const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.body
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('AgencyID', process.env.NEXT_PUBLIC_AgencyID);
        request.input('Email', params.email);
        request.input('MailName', 'Email - Password Reminder');



        let result = await request.execute('sp_spotajob_candidate_password_reminder');
        res.status(200).json({ results: result.recordset[0][''] })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}