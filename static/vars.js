// TODO: Code blocks (```) will ignore variables, find workaround.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// TODO: These vars won't work in code blocks (```), find workaround.
export const vars = {
  projects: {
    client: {
      name: 'NitroxClient'
    },
    launcher: {
      name: 'Nitrox.Launcher'
    },
    server: {
      name: 'NitroxServer-Subnautica'
    }
  },
  paths: {
    nitrox: {
      logs: '%APPDATA%\\Nitrox\\Logs'
    },
    subnautica: {
      player_log: '%UserProfile%\\AppData\\LocalLow\\Unknown Worlds\\Subnautica\\Player.log'
    }
  }
};

// Change vars depending on client, should run client-side only.
if (ExecutionEnvironment.canUseDOM) {
  function get_platform() {
    // 2022 way of detecting. Note : this userAgentData feature is available only in secure contexts (HTTPS)
    if (typeof navigator.userAgentData !== 'undefined' && navigator.userAgentData != null) {
      return navigator.userAgentData.platform;
    }
    // Deprecated but still works for most of the browser
    if (typeof navigator.platform !== 'undefined') {
      if (typeof navigator.userAgent !== 'undefined' && /android/.test(navigator.userAgent.toLowerCase())) {
        // android device’s navigator.platform is often set as 'linux', so let’s use userAgent for them
        return 'android';
      }
      return navigator.platform;
    }
    return 'unknown';
  }

  if (/linux/i.test(get_platform())) {
    vars.paths.nitrox.logs = '~/.config/Nitrox/Logs';
    vars.paths.subnautica.player_log = '~/.steam/steam/steamapps/compatdata/264710/pfx/drive_c/users/steamuser/AppData/LocalLow/Unknown Worlds/Subnautica/Player.log';
  }
}

export default vars;