const config = require('../../config.js')
const sql = require('mssql');
// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {
    const params = req.query
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {
        const pool = await sql.connect(sqlConfig);
        const request = await pool.request();
        request.input('AgencyID', process.env.NEXT_PUBLIC_AgencyID);
        request.input('Entity', params.entity);
        request.input('SkillCategory', params.category);
        request.input('UserID', process.env.NEXT_PUBLIC_UserID);



        let result = await request.execute('sp_chi_ddl_populate');
        res.status(200).json({ results: result.recordsets[0] })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}