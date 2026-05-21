---
sidebar_position: 3
sidebar_label: Docker Launcher Build
title: Building the Launcher with Docker
---

:::note
Only use this option if you have a specific reason: easy cross compilation, weird environment issues, etc.
:::

## Prerequisites

- Docker Engine 24+ (or Docker Desktop)
- A copy of Subnautica on the host machine

## Setup

Clone the repo if you haven't already, then navigate to the `docker/` directory and create a `.env` file:

```env
SUBNAUTICA_PATH=/path/to/your/subnautica
```

## Building

Build the launcher for all platforms:

```bash
docker compose --profile launcher build
```

This will cross-compile the launcher for all four targets in parallel. Once complete, extract the binaries using the provided script:

```bash
# Linux / macOS
./extract-launcher.sh

# Windows
extract-launcher.bat
```

The built binaries will be in the `out/` directory at the root of the repo:

| Directory | Platform |
|---|---|
| `out/win-x64/` | Windows (x64) |
| `out/linux-x64/` | Linux (x64) |
| `out/osx-x64/` | macOS (Intel) |
| `out/osx-arm64/` | macOS (Apple Silicon) |

## Building a single platform

```bash
docker compose --profile launcher build launcher-win-x64
docker compose --profile launcher build launcher-linux-x64
docker compose --profile launcher build launcher-osx-x64
docker compose --profile launcher build launcher-osx-arm64
```

Then run the extract script as normal; it will only copy outputs for images that exist.

## Self-contained builds

By default the launcher requires the .NET runtime to be installed on the target machine. To bundle the runtime into the output instead:

```env
SUBNAUTICA_PATH=/path/to/your/subnautica
SELF_CONTAINED=true
```

Then build as normal. Self-contained outputs are larger but run on any machine without .NET installed.

## Rebuilding

To do a clean rebuild from scratch:

```bash
docker compose --profile launcher build --no-cache
```