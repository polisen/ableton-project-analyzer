const pako = require("pako");
const txml = require("txml");
export const bigTask = async (file: any) => {
  if (file) {
    let r = new FileReader();
    r.onload = function (e: any) {
      logFileData(file);
      try {
        if (file.type.includes("gzip") || file.name.includes(".als")) {
          let XMLstring = pako.inflate(new Uint8Array(e.target.result), {
            to: "string",
          });
          const parsedXML = txml.parse(XMLstring);
          console.log(parsedXML);
          let projectObj = recursiveFormatter("root", parsedXML);
          featureExtractor(projectObj);
        } else {
          // ...
        }
        // ...
      } catch (e) {
        console.error(e);
      }
    };
    r.readAsArrayBuffer(file);
  }
};

const featureExtractor = (projectObj: any) => {
  console.log(projectObj);
  console.log(
    projectObj.Ableton.LiveSet.Tracks.AudioTrack_15.DeviceChain.MainSequencer
      .Sample.ArrangerAutomation.Events
  );
};

/**
 * Recursively traverses object structure, recursing for each layer, returning a simplified version of the layer.
 * The recursive case is if there are no more children;
 * @param obj - the processed output of txml.parse()
 */

const recursiveFormatter = function recursiveProjectInfoFormatter(
  tagName: string,
  arr: any
) {
  if (arr instanceof Array !== true) console.log(arr);
  // console.log(tagName)
  if (arr.length === 0) return;
  let obj: any = {};
  for (let child of arr) {
    let { children, tagName, attributes } = child;
    if (!children || !tagName || !attributes) {
      return child;
    }
    if (children.length === 0 && attributes.Value)
      if (Object.keys(attributes).length > 0) {
        obj.attributes = attributes;
      }
    if (children.length > 0) {
      obj = {
        ...obj,
        [attributes.Id ? `${tagName}_${attributes.Id}` : tagName]: {
          ...recursiveFormatter(tagName, children),
        },
      };
    } else if (attributes.Value) {
      obj = { ...obj, [tagName]: attributes.Value };
    }
  }
  return obj;
};

/**
 * Logs metadata about file.
 * @param {file} File - File<Blob>
 */
const logFileData = ({ name, type, size }: any) => {
  console.log(
    "User layout file:\n" +
      "name: " +
      name +
      "\n" +
      "type: " +
      type +
      "\n" +
      "size: " +
      size +
      " bytes\n"
  );
};
