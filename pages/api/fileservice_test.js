const convert = require('xml-js');
var axios = require('axios');

// getfile_contents(file_path)
/////get file as base64 from file service
export default async function getfile_contents() {

    const file_path = '';

    let xmls = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<soap:Body>' +
        '<getfile_as_base64 xmlns="http://tempuri.org/">' +
        '<Password>masrhiaommi</Password>' +
        '<Path>' + _xml_escape(file_path) + '</Path>' +
        '</getfile_as_base64>' +
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

        toreturn = xml2json['soap:Envelope']['soap:Body']['getfile_as_base64Response']['getfile_as_base64Result']['_text'];
    } catch (err) {
        res.status(200).json({ results: toreturn })
    }

    if (toreturn == undefined) { toreturn = ''; }
    res.status(200).json({ results: toreturn })

}
///////////////////////////////////



function _xml_escape(inputString) {
    var output = [];

    for (var i = 0; i < inputString.length; ++i) {
        switch (inputString[i]) {
            case '&':
                output.push("&amp;");
                break;
            case '"':
                output.push("&quot;");
                break;
            case "<":
                output.push("&lt;");
                break;
            case ">":
                output.push("&gt;");
                break;
            default:
                output.push(inputString[i]);
        }


    }

    return output.join("");
}