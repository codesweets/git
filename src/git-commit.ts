import {TaskMeta, TaskWithData} from "@codesweets/core";
import {GitRepository} from "./git-repository";

export interface GitCommitData {
  message: string;
  name?: string;
  email?: string;
}

export class GitCommit extends TaskWithData<GitCommitData> {
  public static meta: TaskMeta = new TaskMeta({
    construct: GitCommit,
    inputs: [GitRepository],
    schema: require("ts-schema!./git-commit.ts?GitCommitData"),
    typename: "GitCommit"
  })

  protected async onInitialize (repo: GitRepository) {
    const name = this.data.name || repo.data.username || "anonymous";
    const email = this.data.email || `${repo.data.username}@example.com`;
    await repo.git.commit({
      ...repo.args,
      ...this.data,
      author: {
        email,
        name
      }
    });
  }
}
