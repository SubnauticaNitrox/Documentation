export default {
  projects: {
    client: {
      name: "NitroxClient"
    },
    launcher: {
      name: "Nitrox.Launcher"
    },
    subnautica_server: {
      name: "NitroxServer-Subnautica"
    }
  },
  paths: {
    nitrox: {
      logs: "%APPDATA%\\Nitrox\\Logs",
      logs$linux: "~/.config/Nitrox/Logs"
    },
    subnautica: {
      player_log: "%UserProfile%\\AppData\\LocalLow\\Unknown Worlds\\Subnautica\\Player.log",
      player_log$linux: "~/.steam/steam/steamapps/compatdata/264710/pfx/drive_c/users/steamuser/AppData/LocalLow/Unknown Worlds/Subnautica/Player.log"
    }
  }
};