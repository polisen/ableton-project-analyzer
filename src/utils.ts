const pako = require("pako");

export const bigTask = async (file: any) => {
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
        let jsonContent = null;
        if ( file.type == "application/x-gzip" ) {
            jsonContent=pako.inflate(new Uint8Array( e.target.result ) , {"to":"string"});
            console.log(jsonContent)
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