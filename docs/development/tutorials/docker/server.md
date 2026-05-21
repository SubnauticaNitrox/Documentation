---
sidebar_position: 2
sidebar_label: Docker Server Setup
title: Setup with Docker for Server
---

:::note
Only use this option if you have a specific reason: like running a containerized server on a VPS, or working around local environment issues for development purposes.
:::

## Prerequisites

- Docker Engine 24+ (or Docker Desktop)
- A copy of Subnautica on the host machine

## Setup

Clone the repo if you haven't already, then navigate to the `docker/` directory and create a `.env` file:

```env
SUBNAUTICA_PATH=/path/to/your/subnautica
```

Start the server:

```bash
docker compose --profile server up -d
```

The server will be available on **UDP port 11000**.

## Managing the server

```bash
# View logs
docker compose --profile server logs -f

# Stop the server
docker compose --profile server down

# Restart
docker compose --profile server restart
```

## Data and saves

| Volume | Contains |
|---|---|
| `/subnautica` | Subnautica game files (read-only) |
| `/data` | World saves and server config |

World saves are stored in the `nitrox-data` Docker volume and persist across restarts and image updates.

:::warning
Running `docker compose down -v` will delete the `nitrox-data` volume and all world saves with it. Back it up first.
:::

## Updating

```bash
docker compose --profile server down
docker compose --profile server build --no-cache
docker compose --profile server up -d
```