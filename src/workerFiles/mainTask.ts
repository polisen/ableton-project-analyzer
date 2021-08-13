const pako = require("pako");
const txml = require("txml");

import {recursiveFormatter} from './utility'

export const AbletonProjectAnalyzer = async (file: any) => {
  // var zip = new AdmZip("./my_file.zip");
  // const buffer = await file.arrayBuffer();

  if (file) {
    let r = new FileReader();
    r.onload = function (e: any) {
    //   var contents = e.target.result;
      console.log(
        "User layout file:\n" +
          "name: " +
          file.name +
          "\n" +
          "type: " +
          file.type +
          "\n" +
          "size: " +
          file.size +
          " bytes\n"
      );

      try {
        if ( file.type == "application/x-gzip" ) {
            let XMLstring = pako.inflate(new Uint8Array( e.target.result ) , {"to":"string"});
            console.log(txml.parse(XMLstring))
            let projectObj = recursiveFormatter('root',txml.parse(XMLstring)) 
            console.log(projectObj)
        } else {
           // ...
        }
        // ...
    } catch(e) {
        console.error(e)
    }
    }
    r.readAsArrayBuffer(file); 
  }
}

