---
sidebar_position: 2
sidebar_label: Guidelines
---

### Code Formatting
Configure your IDE to use the provided `.editorconfig` file. Due to new C# language features, code style can change over time. Remember, consistency is key! If you're unsure, look at the rest of the code.

### Help your fellow developers!
If code (especially patches that touch game internals) is/are not immediately clear, add a comment explaining the situation. This goes a long way, as you're basically presenting an overview of the research you did in the game code. And it helps others to figure out what's supposed to happen, in case the game changes and the patch is not functioning properly anymore.

### Basic Code Design principles
- **<span class="do">DO</span> defensive programming :shield:** <br/>When retrieving data from the game, use `Validate.NotNull`, `Try*` APIs or similar where possible. Log if something unexpected happens. Defensive coding standards help to identify the source of issues before they cause hard to debug problems. This is doubly important for mod projects, as they change the original intent of a code without changing its design. 
- **<span class="do">DO</span> easy to remove code :wastebasket:** <br/>Removing a type should be trivial. If it causes bugs or significant compile failures, consider refactoring. Try to limit the amount of features a type has and wrap _often accessed code_ into interfaces to reduce coupling to the implementation. 
- **<span class="do">DO</span> Inversion of Control (IoC) 🔄** <br/>Supply _stateful_ APIs as constructor parameters instead of direct access in methods. Following this practice maintains a chronological order to the written code, i.e. less sphaget :wink:, reducing cognitive load.
- **<span class="do">DO</span> small interfaces 🔌** <br/>When designing them, think "I need to do X" and generalize for that use, as opposed to "I need to fulfill all needs of X". Split multiple needs into separate interfaces, within reason.
- **<span class="avoid">AVOID</span> deep type inheritance :seedling:** <br/>If you find yourself needing more than 2 parent types, inheritance is likely the wrong tool to use. Consider compositional- or functional programming.
- **<span class="avoid">AVOID</span> exact duplicates of code 🗒️** <br />If a piece of code is duplicated in 3 or more places, consider refactoring.

## Git workflow
### Git help
<sub><sup>Skip this section is if you are familiar with git.</sup></sub>
Git is there to help you develop and share code efficiently, though it may seem daunting at first. In order to use it effectively, we recommend you to read some tutorials so that you are familiar with the concept of commits, the way these are linked together, branches, and remotes.

When cloning a repository, git adds the clone url as a remote named `origin`. In this guide, we assume that's your fork. To keep your repository updated, add this official repo to your remotes:
```bash
# SSH:
git remote add upstream git@github.com:SubnauticaNitrox/Nitrox.git
# HTTPS:
git remote add upstream https://github.com/SubnauticaNitrox/Nitrox.git
```

We recommend to keep your master branch up to date with the offical master branch. This makes it easier to base feature branches on.
To go even further, you configure your master branch to pull from `SubnauticaNitrox`, and push to your own fork:
```bash
git config branch.master.remote upstream
git config branch.master.pushRemote origin
```

### Filing a PR
When filing a PR, we obviously expect the code to compile, run with no errors, and merge without conflicts.
To prevent issues, and ensure that your code is compatible with the most recent 'version',
merge master into your branch, or rebase your branch on top of master. Even if git(hub) says your code can be merged without conflicts, there might be structural changes (renamings, moved files, refactors, etc), causing the final result to fail compilation, or break at runtime.

It is not desired to remove code just because "it doesn't work", or "causes exceptions in the log". If that's the case, try to fix it (recommended to file the changes in a separate PR), or notify the other Nitrox devs (by creating an issue on github, for example). All code is there for a reason - and someone else spent time creating it.
