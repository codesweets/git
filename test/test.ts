import {GitAdd, GitClone, GitCommit, GitRepository} from "../src/main";
import {FileCreate} from "@codesweets/file";
import {TaskRoot} from "@codesweets/core";
import assert from "assert";
import fs from "fs";

(async () => {
  const root = await TaskRoot.create();
  new GitRepository(root, {
    directory: "/",
    url: "https://github.com/codesweets/file"
  });
  new GitClone(root);
  new FileCreate(root, {
    content: "hello",
    path: "/test.txt"
  });
  new GitAdd(root, {
    add_path: "."
  });
  new GitCommit(root, {
    message: "Test"
  });
  await root.run();
  assert(fs.readFileSync("/LICENSE").includes("MIT License"));
  console.log("Completed");
})();
