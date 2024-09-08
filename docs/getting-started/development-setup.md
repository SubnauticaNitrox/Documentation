---
sidebar_position: 2
sidebar_label: Development Setup
title: Setting up a development environment for Nitrox
---

Please be aware that this mod is in its early stages of development, and that the steps below are to set up a _development environment_ for Nitrox. These steps are **not** for a regular install of this mod. We discourage the use of this mod for casual play until a stable public release has been made.

### Repository setup

1. Fork the repository to your own Github account (use the fork button top-right).
2. Pull git repository locally: `git clone https://github.com/<your-github-name>/Nitrox.git`
3. If you want to add the main Nitrox repository as upstream (**recommended**): `git remote add upstream https://github.com/SubnauticaNitrox/Nitrox.git`.

### Nitrox setup (using an IDE)

Make sure Subnautica is **not on legacy**. The master branch of Nitrox always targets the latest Subnautica code.

1. Load `Nitrox.sln` inside MS Visual Studio or JetBrains Rider
2. Run `dotnet restore`
3. Build the entire solution. If build fails due to dependency issues then rebuild after trying the following:
   1. Clear your IDE's index cache AND restart the IDE.
4. Use the built NitroxLauncher.exe to start the server and Subnautica.

### Nitrox setup (CLI)

Make sure you have an up-to-date Microsoft .NET SDK: https://dotnet.microsoft.com/en-us/download

```
dotnet build
```

For release builds, run this command:

```
dotnet build -c Release
```

### Verify setup

1. Run NitroxServer (if not already started) and verify that server window shows no (critical) errors.
2. Start Subnautica (if not already started).
3. If you see a `Multiplayer` button then Nitrox has been bootstrapped successfully.
4. Verify Subnautica logs from the `Nitrox Logs` folder in the launcher directory or `%UserProfile%\AppData\LocalLow\Unknown Worlds\Subnautica\Player.log` (Search for `nitrox`, verify no code exceptions)
   - **NOTE:** There will probably be some errors, but nothing substantial in the first part regarding loading of Nitrox.
5. On the main menu of Subnautica, join a new game by connecting through the multiplayer button in the UI. If you want to connect to your own server, use the "My server" option which uses 127.0.0.1/localhost IP.
