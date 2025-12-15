export default {
  projects: {
    client: {
      name: "NitroxClient"
    },
    launcher: {
      name: "Nitrox.Launcher"
    },
    model: {
      name: "Nitrox.Model"
    },
    subnautica_server: {
      name: "Nitrox.Server.Subnautica"
    },
    subnautica_model: {
      name: "Nitrox.Model.Subnautica"
    },
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