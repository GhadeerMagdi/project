const convert = require('xml-js');
var axios = require('axios');



// getfile_contents(file_path)
/////get file as base64 from file service
export default async function getfile_contents(req, res) {

    const params = req.body.params

    let xmls = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<soap:Body>' +
      '<SaveOldCVByCVFileRf xmlns="http://tempuri.org/">' +
        '<Password>masrhiaommi</Password>' +
        '<ContactID>' + params.contactid + '</ContactID>' +
        '<CVFileRf>' + params.fileref + '</CVFileRf>' +
      '</SaveOldCVByCVFileRf>' +
    '</soap:Body>' +
  '</soap:Envelope>';

    var toreturn = await axios.post('https://files.chameleoni.com/chiFiles.asmx',
        xmls, {
        headers: {
            'Content-Type': 'text/xml; charset=utf-8'
        }
    }).catch((error) => { return error; });

    var toreturn;

    try {
        var xml2json = JSON.parse(convert.xml2json(toreturn.data, { compact: true, spaces: 4 }));

        toreturn = xml2json['soap:Envelope']['soap:Body']['SaveOldCVByCVFileRfResponse']['SaveOldCVByCVFileRfResult']['_text'];
    } catch (err) {
        res.status(200).json({ results: toreturn })
    }

    if (toreturn == undefined) { toreturn = ''; }
    res.status(200).json({ results: toreturn })

}
