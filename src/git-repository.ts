import * as git from "isomorphic-git";
import {Directory, DirectoryData} from "@codesweets/file";
import {EventEmitter} from "events";
import {TaskMeta} from "@codesweets/core";
import fs from "fs";

export interface GitRepositoryData extends DirectoryData {
  url: string;
  username?: string;
  password_or_token?: string;
}

export interface GitArgs {
  corsProxy: string;
  dir: string;
  emitter: EventEmitter;
  fs: typeof fs;
  password: string;
  url: string;
  username: string;
}

export class GitRepository extends Directory<GitRepositoryData> {
  public static meta: TaskMeta = new TaskMeta({
    construct: GitRepository,
    outputs: [Directory],
    schema: require("ts-schema!./git-repository.ts?GitRepositoryData"),
    typename: "GitRepository",
    uiSchema: {
      password_or_token: {
        "ui:widget": "password"
      }
    }
  })

  public git = git

  public get args (): GitArgs {
    return {
      corsProxy: "https://cors.isomorphic-git.org",
      dir: this.data.directory,
      emitter: this,
      fs,
      password: this.data.password_or_token,
      url: this.data.url,
      username: this.data.username
    };
  }

  protected async onInitialize () {
    this.on("message", (message) => this.log("info", message));
  }
}
