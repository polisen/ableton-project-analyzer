const pako = require("pako");
const txml = require("txml");
import {
  AbletonProject,
  AbletonTrack,
  TrackName,
  DeviceChain
} from "./abletonProject.types";

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
          let projectObj = recursiveFormat("root", parsedXML);
          console.log(projectObj)
          findData(projectObj);
          // featureExtractor(projectObj);
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

/**
 * Recursively traverses object structure, recursing for each layer, returning a simplified version of the layer.
 * The recursive case is if there are no more children;
 * @param obj - the processed output of txml.parse()
 */

const recursiveFormat = function recursiveProjectInfoFormatter(
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
          ...recursiveFormat(tagName, children),
        },
      };
    } else if (attributes.Value) {
      obj = { ...obj, [tagName]: attributes.Value };
    }
  }
  return obj;
};

/**
 * Extracts the data I have decided is relevant.
 * @param {AbletonProject} object - project to analyse
 * @param Patterns - shapes of data to find.
 */


const nameExtractor = (Name: TrackName) => {
  return Name.MemorizedFirstClipName ?? Name.EffectiveName;
}

const pluginExtractor = (DeviceChain: DeviceChain) => {

}

const mainExtractor = (DeviceChain: DeviceChain) => {
  
  
  return {}
}

const trackExtractor = ({Name, DeviceChain}: AbletonTrack) => {
  return {
    Name: nameExtractor(Name),
    ...mainExtractor(DeviceChain)
  }
}

const findData = function findInformationInProject(
  object: AbletonProject
) {
  console.log(object)
  let results = {};
  let tracks = {
    ...object.Ableton.LiveSet.Tracks,
    MasterTrack: object.Ableton.LiveSet.MasterTrack
  }
  for(let [key,value] of Object.entries(tracks)) {
    console.log(trackExtractor(value))
  }
  
  


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
