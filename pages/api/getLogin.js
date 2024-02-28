const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.query
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('agencyid', process.env.NEXT_PUBLIC_AgencyID);
        request.input('Email', params.email);
        request.input('Password', params.password);
        request.output("CustomerID", sql.Int());



        let result = await request.execute('sp_spotajob_candidate_login');
        res.status(200).json({ results: result.output.CustomerID })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}