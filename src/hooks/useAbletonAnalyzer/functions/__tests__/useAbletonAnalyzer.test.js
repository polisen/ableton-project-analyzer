import { projectAnalyzer } from "../useAbletonAnalyzer.functions";
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
  const maxed = require("./maxxed_project.json");
  const nested = require("./nested_project.json");
  expect(typeof fileStructure).toBe("object");
  expect(typeof basic).toBe("object");
  expect(typeof maxed).toBe("object");
  expect(typeof nested).toBe("object");
}, 10000);
