import { nanoid } from '@reduxjs/toolkit';
import { AbletonProject } from '../../../types/abletonProjectStructure';

import verifyExistence from './verifyExistence.functions';

import {
  nameExtractor,
  stripDuplicatePlugins,
  stripDuplicateSamples,
  recursiveFormat,
} from './utility.functions';

import deviceChainExtractor from './extractors.functions';

const pako = require('pako');
const txml = require('txml');

/**
 * Extracts data from each audio track of given
 * project and returns it's findings about samples and plugins.
 * @param {AbletonProject} object - project to analyse
 * @param Patterns - shapes of data to find.
 */

export const findData = function findInformationInProject({
  Ableton: { LiveSet },
}: AbletonProject) {
  const results: any = {};

  Object.entries({
    ...LiveSet.Tracks,
    MasterTrack: LiveSet.MasterTrack,
  }).forEach(([, value]) => {
    const { samples, plugins }: any = {
      Name: nameExtractor(value.Name),
      ...deviceChainExtractor(value.DeviceChain),
    };
    results.samples = { ...results.samples, ...samples };
    results.plugins = { ...results.plugins, ...plugins };
  });

  results.samples = stripDuplicateSamples(results.samples);
  results.plugins = stripDuplicatePlugins(results.plugins);

  return results;
};

/**
 *
 * @param {File} file - a File Blob that is hopefully an ableton project.
 * @returns results.
 *
 * - This function parses the File from Blob -> Gzipped XML -> XML -> Shitty Json -> Good Json
 * - The good json is then sent to findData and then returned
 * -
 * * An ableton project is just XML gzipped and called .als
 */

export async function projectAnalyzer(file: File, path: string) {
  try {
    const XMLstring = pako.inflate(new Uint8Array(await file.arrayBuffer()), {
      to: 'string',
    });
    // console.debug({ XMLstring });
    const parsedXML = txml.parse(XMLstring);
    // console.debug({ parsedXML });

    const formatted = recursiveFormat('root', parsedXML);
    // console.debug({ formatted });

    return { data: findData(formatted), path, file };
  } catch (e) {
    console.error(e);
    return null;
  }
}
/**
 * This function is the main entry for the useAbletonAnalyzer hook.
 * It sends each desired file to the projectAnalyzer -
 * of which the results file dependencies are verified to be present in the filestructure.
 * For each file:
 * 1. Check if it's an ableton file
 * 2. If so - send to the projectAnalyzer.
 * 3. Make sure that all the samples are present
 * in the result of projectAnalyzer by checking for them in the filestructure.
 * 4. Append to the results.
 * @param files - Nested array of [file, filePath]
 * @param fileStructure - the filestructure of the files represented in a tree.
 * @returns object with result of each file successfully analysed.
 */

export const fileStructureAnalyzer = async (
  files: [File, string][],
  fileStructure: object,
) => {
  const results: { [key: string]: object } = {};
  const promises: any[] = [];

  files.forEach(([file, path]) => {
    if (file instanceof Blob !== true) return;
    if (path.includes('Backup')) return;
    if (['.als', '.adg', '.alp'].some((v) => file.name.includes(v))) {
      promises.push(projectAnalyzer(file, path));
    }
  });

  const promRes = await Promise.all(promises);
  console.debug({promRes});
  promRes.forEach(({ data, path, file }) => {
    const verifiedSamples = verifyExistence(
      data.samples,
      fileStructure,
      path,
    );
    results[nanoid()] = {
      // ...file,
      fileName: file.name,
      path,
      ...data,
      verifiedSamples,
    };
  });

  return results;
};
