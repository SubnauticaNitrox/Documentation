import { Component } from "react";
import ExecutionEnvironment from "@docusaurus/core/lib/client/exports/ExecutionEnvironment";

/**
 * Swaps content based on the operating system of the visitor.
 */
export class OsPlatformContent extends Component {
  render() {
    return this.props[this.getVisitorOperatingSystem()] ?? this.props.children;
  }

  getVisitorOperatingSystem(): string {
    if (window.user != null && window.user.os != null) {
      return window.user.os;
    }

    const match = getRawIdentifier().match(/[a-z]+/i);
    if (match == null || match.length < 1) {
      return null;
    }
    window.user = window.user ?? { os: match[0] };
    return window.user.os;

    function getRawIdentifier(): string {
      // Change vars depending on client, should run client-side only.
      if (!ExecutionEnvironment.canUseDOM) {
        return 'unknown';
      }

      // 2022 way of detecting. Note : this userAgentData feature is available only in secure contexts (HTTPS)
      if (typeof navigator.userAgentData !== 'undefined' && navigator.userAgentData != null) {
        return navigator.userAgentData.platform.toLowerCase();
      }
      // Deprecated but still works for most of the browser
      if (typeof navigator.platform !== 'undefined') {
        if (typeof navigator.userAgent !== 'undefined' && /android/.test(navigator.userAgent.toLowerCase())) {
          // android device’s navigator.platform is often set as 'linux', so let’s use userAgent for them
          return 'android';
        }
        return navigator.platform.toLowerCase();
      }
      return 'unknown';
    }
  }
}