---
sidebar_position: 1
title: Platform Architecture
---

![Nitrox-Architecture](https://user-images.githubusercontent.com/23176718/164521320-c808ce81-3c94-4694-8dfa-395438669677.png)

## Application projects

### NitroxServer-Subnautica

Server application that is started by the NitroxLauncher project. It has serialization logic for Subnautica game entities which makes it easier to communicate with Nitrox clients. A future plan is to abstract away serialization to custom Nitrox objects instead of Subnautica game objects.

### NitroxLauncher

WPF application for starting the server and/or Subnautica. The launcher will inject the Nitrox client code before starting Subnautica.

---

## Nitrox library projects

### NitroxModel

Contains code common to the client and server without referencing Subnautica code directly. For example: Packet classes that are serialized between client and server.

### NitroxModel-Subnautica

Contains code common to the client and server (like NitroxModel) with serialization logic for Subnautica game entities which makes it easier to communicate with Nitrox clients. A future plan is to abstract away serialization to custom Nitrox objects instead of Subnautica game objects.

### NitroxPatcher

Library that is injected into Subnautica. Handles modifying internal data structures and bootstrapping the client. It depends on the Harmony library.

### NitroxServer

Server code library that knows about the packets sent between client and server. It should not reference any code of Subnautica directly.

### NitroxClient

Injected as a reference to Subnautica via the NitroxPatcher project. Contains monobehaviours, tcp client, and packet handlers.

### NitroxUnity

Asset library for UI/Game components introduced by Nitrox.

### Nitrox.Test

Core unit testing project for all of the other projects.
