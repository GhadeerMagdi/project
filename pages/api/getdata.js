const config = require('../../config.js')
const sql = require('mssql');

export default async function handler(req, res) {
  const params = req.query;
  var sqlConfig = JSON.parse(process.env.sql_config || {});

  try {
    const pool = await sql.connect(sqlConfig);
    const request = await pool.request();
    request.input('AgencyId', process.env.NEXT_PUBLIC_AgencyID);
    request.input('TownId', 0);
    request.input('ClientId', 0);
    request.input('MarketSectorSkillId', 0);
    request.input('JobDepartmentSkillId', 0);
    request.input('Radius', '');
    request.input('ResultLimit', 10000);
    request.input('keywords', params.keyword);
    request.input('SectorCategory', params.category);
    request.input('SectorSkills', '');
    request.input('TagString1', '');
    request.input('Loc', parseInt(params.location));
    request.input('JobTitle', '');
    request.input('JobTitleAndReference', '');
    request.input('PageSize', 10);
    request.input('PageNo', params.pageno);
    request.input('MinPerm', 0);
    request.input('MaxPerm', 0);

    if(params.types){
      if(params.types == "Permanent") {
        request.input('chkPermanent', 'True');
      }
      else {
        request.input('chkPermanent', 'False');
      }
  
      if(params.types == "Contract") {
        request.input('chkContract', 'True');
      }
      else {
        request.input('chkContract', 'False');
      }
  
      if(params.types == "Temporary") {
        request.input('chkTemporary', 'True');
      }
      else {
        request.input('chkTemporary', 'False');
      }
  
    } else {
      
      request.input('chkPermanent', 'True');
      request.input('chkContract', 'True');
      request.input('chkTemporary', 'True');
    }
    
    request.input('MinContract', 0);
    request.input('MaxContract', 0);
    request.input('MinTemporary', 0);
    request.input('MaxTemporary', 0);
    request.input('chkSelfEmployed', 'True');
    request.input('MinSelfEmployed', 0);
    request.input('MaxSelfEmployed', 0);
    request.input('TagIDs', params.salary);
    request.input('TagIDs2', '');
    request.input('TagIDs3', '');
    request.input('GetTagDesc', 1);
    request.input('GetTagDescparentID', 215469);
    request.input('GetTagSalary', 1);
    request.input('GetTagSalaryID', 470951); 
    request.input('GetTagGeneric', 0);
    request.input('GetTagGenericID', 0);
    request.input('ClientIP', '10.0.0.64');

    let result = await request.execute('sp_microsites_jobsearch_Cached_paging');
    res.status(200).json({ results: result.recordsets[0] })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
