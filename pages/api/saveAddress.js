const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.body.data
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('CandidateId', params.contactid);
        request.input('Street', params.address);
        request.input('Suburb', '');
        request.input('City', params.city);
        request.input('County', params.county);
        request.input('PostCode', params.postcode);
        request.input('Country', params.country);

        let result = await request.execute('sp_spotajob_candidate_address_set');
        res.status(200).json({ results: result.recordset[0][''] })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}