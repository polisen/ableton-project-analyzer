import { findData } from "../useAbletonAnalyzer.functions";
import { verifyExistence } from "../verifyExistence.functions";

/**
 * These following tests an assortment of projects that represents different scenarios.
 * The ableton-project is tested from disk but the filestructure is already computed because of file size.
 * I'm using the basic project test as a smoke test.
 *
 * 1. Basic Project - a run of the mill project with nothing fancy.
 *      - 4 channels with some plugins and some samples
 *      - 2 return tracks with the default plugins.
 *      - Master channel with nothing on it.
 *
 * 2. Deeply Nested Project - a project with many many layers of instrument racks and audio effect groups.
 *    For those un-initiated it essentially means super heavily nested tree structure.
 *      - Lots nested instrument racks or audio effect racks with plugins and samples way down there.
 *
 * 3. Maxed Out Project - a project with an absurd amount of plugins and samples to see if there's a limit somehow.
 *         - As many channels as I can fit in a project.
 *         - So many samples.
 */

test("test all projects and assert the results", async () => {
  const fileStructure = require("./test_projects_filestructure.json");

  const basic = require("./basic_project.json");
  const basicPath = "/test_projects/basic_project.als";
  let basic_result = findData(basic);
  let basic_verification = verifyExistence(
    basic_result.samples,
    fileStructure,
    basicPath
  );
  let basic_v_results = [
    ...new Set(Object.entries(basic_verification).map(([key, value]) => value)),
  ];

  expect(typeof basic_result).toBe("object");
  expect(basic_v_results.length).toBe(1);
  expect(basic_v_results[0]).toBe(true);
  expect(Object.keys(basic_result.samples).length).toBe(9)
  const maxxed = require("./maxxed_project.json");
  const maxxedPath = "/test_projects/maxxed_project.als";
  let maxxed_results = findData(maxxed);
  let maxxed_verification = verifyExistence(
    maxxed_results.samples,
    fileStructure,
    maxxedPath
  );



  let maxxed_v_results = [
    ...new Set(
      Object.entries(maxxed_verification).map(([key, value]) => value)
    ),
  ];
  console.log(maxxed_v_results)

  expect(typeof maxxed_results).toBe("object");
  expect(maxxed_v_results.length).toBe(1);
  expect(maxxed_v_results[0]).toBe(true);
  expect(Object.keys(basic_result.samples).length).toBe(9)




  const nested = require("./nested_project.json");
  const nestedPath = "/test_projects/nested_project.als";

  let nested_results = findData(nested);
  let nested_verification = verifyExistence(
    nested_results.samples,
    fileStructure,
    nestedPath
  );
  let nested_v_results = [
    ...new Set(
      Object.entries(nested_verification).map(([key, value]) => value)
    ),
  ];

  expect(typeof nested_results).toBe("object");
  expect(nested_v_results.length).toBe(1);
  expect(nested_v_results[0]).toBe(true);
  expect(Object.keys(basic_result.samples).length).toBe(9)

}, 10000);
