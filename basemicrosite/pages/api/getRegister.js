const config = require('../../config.js');
const sql = require('mssql');

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });


// var sqlConfig = JSON.parse(process.env.sql_config || {});

export default async function handler(req, res) {


    const params = req.body.data
    var sqlConfig = JSON.parse(process.env.sql_config || {});

    try {


            const pool2 = await sql.connect(sqlConfig);
            const request2 = await pool2.request();
            request2.input('AgencyId', process.env.NEXT_PUBLIC_AgencyID);
            request2.input('Email', params.email);
            let result2 = await request2.execute('sp_chi_ms_check_email');
            

            if (result2.returnValue == 0) {
            const pool = await sql.connect(sqlConfig);
            const request = await pool.request();
            request.input('AgencyId', process.env.NEXT_PUBLIC_AgencyID);
            request.input('TitleId', "1");
            request.input('Christian', params.forename);
            request.input('Surname', params.surname);
            request.input('Email', params.email);
            request.input('WebPassword', params.password);
            request.input('HomeTelNo', params.homeTelNo);
            request.input('MobileTelNo', params.mobileTel);
            request.input('WorkTelNo', '');
            request.input('MailName', 'Email - Registration');
            request.output("CandidateId", sql.VARCHAR(16));
           


            let result = await request.execute('sp_spotajob_candidate_register');
            res.status(200).json({ results: result.output });
            
            // });
        } else {
            res.status(200).json({ results: 'email exists' });
        }
    } catch (error) {
        res.status(500).json({ error: error })
        
    }

}