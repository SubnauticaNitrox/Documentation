---
sidebar_position: 3
---

# Debugging Subnautica

1. Make sure you have the latest version of [dnSpyEx](https://github.com/dnSpyEx/dnSpy/releases/latest) installed.
2. Swap Subnautica's release build `mono.dll` with dnSpy's patched version that can be debugged:
    1. Download the debug mono dll [here](https://github.com/SubnauticaNitrox/Nitrox/files/11311138/mono-2.0-bdwgc-UNITY-2019.4.36f1.zip).
    2. Navigate to Subnautica's directory. Then go to `/MonoBleedingEdge/EmbedRuntime/`.
    3. Rename your `mono-2.0-bdwgc.dll` with `mono-2.0-bdwgc-old.dll` to avoid loosing the original one.
    4. Swap out `MonoBleedingEdge/EmbedRuntime/mono-2.0-bdwgc.dll` with the `mono-2.0-bdwgc.dll` from the zip above.
3. Start up Subnautica and dnSpy.
4. While on the main menu, go to `Debug > Start Debugging` (or press `F5`) in dnSpy.
5. Select `Unity (Connect)` as the Debug engine
6. If DnsSpy debug environment variables are not set, provide `127.0.0.1`:`5555` for the socket. Then press OK.
7. Once the bottom of dnSpy says "Running..." in orange, the debugger is now connected to Subnautica. 

**NOTE**: By default the debug socket will listen on *127.0.0.1:5555*, you can change this behavior by updating the environment variable called `DNSPY_UNITY_DBG2` (Unity with .NET 4.x assemblies) :
* `--debugger-agent=transport=dt_socket,server=y,address=127.0.0.1:55555,suspend=n`
* `--debugger-agent=transport=dt_socket,server=y,address=127.0.0.1:55555,suspend=n,no-hide-debugger`to enable detection of the debugger

To view the game's code:
1. Go to `Debug > Windows > Modules`, find `Assembly-CSharp.dll` and double click it.
    - **NOTE:** You can also debug through Nitrox's code by finding Nitrox modules after the patcher loads them in.

You can place breakpoints anywhere in any of the modules and the game will pause and show all local variables when the breakpoint is hit.

**NOTE:** It might take a few seconds for the debugger to connect to your game. Be careful when setting breakpoints and pausing the game for long periods of time when it's in multiplayer, because you will be disconnected from the server after you resume execution due to timeout (default timeout is `5m` if building Nitrox in `DEBUG` mode). It's recommended to attach the debugger before you join a multiplayer server.