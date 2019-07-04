import {Task, TaskMeta} from "@codesweets/core";
import {GitRepository} from "./git-repository";

export class GitPush extends Task {
  public static meta: TaskMeta = new TaskMeta({
    construct: GitPush,
    inputs: [GitRepository],
    typename: "GitPush"
  })

  protected async onInitialize (repo: GitRepository) {
    await repo.git.push(repo.args);
  }
}
