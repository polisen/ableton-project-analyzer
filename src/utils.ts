const pako = require("pako");
const txml = require("txml");
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

/**
 * Recursively traverses object structure, recursing for each layer, returning a simplified version of the layer.
 * The recursive case is if there are no more children;
 * @param obj - the processed output of txml.parse()
 */

 const recursiveFormatter = function recursiveProjectInfoFormatter(tagName: string, arr: any){
        if (arr.length === 0) return
        let obj: any = {}
        for(let child of arr) {
            let {children, tagName, attributes} = child;
            if (!children || !tagName || !attributes) {
                return child;
            }
            if (Object.keys(attributes).length > 0 ) {
                obj.attributes = attributes
            }
            obj = {...obj, [attributes.Id ? `${tagName}_${attributes.Id}`: tagName]: {
                ...recursiveFormatter(tagName, children)
            }}
        }
        return obj;
}
