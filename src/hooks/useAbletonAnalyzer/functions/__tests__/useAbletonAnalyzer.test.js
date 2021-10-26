import { findData } from '../useAbletonAnalyzer.functions';

import verifyExistence from '../verifyExistence.functions';

const basic = require('./project_files/basic_project.json');
const fileStructure = require('./project_files/test_projects_filestructure.json');
const maxxed = require('./project_files/maxxed_project.json');
const nested = require('./project_files/nested_project.json');
/**
 * These following tests an assortment of projects that represents different scenarios.
 * The ableton-project is tested from disk but
 *  the filestructure is already computed because of file size.
 * I'm using the basic project test as a smoke test.
 *
 * 1. Basic Project - a run of the mill project with nothing fancy.
 *      - 4 channels with some plugins and some samples
 *      - 2 return tracks with the default plugins.
 *      - Master channel with nothing on it.
 *
 * 2. Deeply Nested Project - a project with many layers of instrument
 * racks and audio effect groups.
 *    For those un-initiated it essentially means super heavily nested tree structure.
 *      - Lots nested instrument racks or audio effect
 *            racks with plugins and samples way down there.
 *
 * 3. Maxed Out Project -
 *      a project with an absurd amount of plugins and samples to see if there's a limit somehow.
 *         - As many channels as I can fit in a project.
 *         - So many samples.
 */

test('test all projects and assert the results', async () => {
  const basicPath = '/test_projects/basic_project.als';
  const basicResult = findData(basic);
  const basicVerification = verifyExistence(
    basicResult.samples,
    fileStructure,
    basicPath,
  );
  console.debug(basicVerification);
  const basicVResults = [
    ...new Set(Object.entries(basicVerification).map(([, value]) => value)),
  ];
  console.debug(basicVResults);
  expect(typeof basicResult).toBe('object');
  expect(basicVResults.length).toBe(1);
  expect(basicVResults[0]).toBe(true);
  expect(Object.keys(basicResult.samples).length).toBe(9);
  const maxxedPath = '/test_projects/maxxed_project.als';
  const maxxedResults = findData(maxxed);
  const maxxedVerification = verifyExistence(
    maxxedResults.samples,
    fileStructure,
    maxxedPath,
  );

  const maxxedVResults = [
    ...new Set(Object.entries(maxxedVerification).map(([, value]) => value)),
  ];

  expect(typeof maxxedResults).toBe('object');
  expect(maxxedVResults.length).toBe(1);
  expect(maxxedVResults[0]).toBe(true);
  expect(Object.keys(basicResult.samples).length).toBe(9);

  const nestedPath = '/test_projects/nested_project.als';

  const nestedResults = findData(nested);
  const nestedVerification = verifyExistence(
    nestedResults.samples,
    fileStructure,
    nestedPath,
  );
  const nestedVerificationResults = [
    ...new Set(Object.entries(nestedVerification).map(([, value]) => value)),
  ];

  expect(typeof nestedResults).toBe('object');
  expect(nestedVerificationResults.length).toBe(1);
  expect(nestedVerificationResults[0]).toBe(true);
  expect(Object.keys(basicResult.samples).length).toBe(9);
}, 10000);
