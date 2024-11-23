---
sidebar_position: 1
sidebar_label: Patching a method
title: Patching a method
---

### Objectives
 - Learn how to find and cancel a base game method
 - Learn the different patching possibilities

### Prerequisites
 - [dnSpyEx](/docs/getting-started/debugging) or any .NET assembly editor

# Getting Started

First of all you want to know what code you're willing to change. For that, you want to look into the game code thanks to any assembly editor like dnSpy.

1. In my case, I found it interesting to patch the `OnTriggerEnter` method from the `SignalPing` class.
:::note
My final goal will be to send an event to the server when this method happens. But this part is omitted from this guide.
:::
2. To do so, I'll create a new class in the NitroxPatcher project, under `Patches/Dynamic`, which I'll call `SignalPing_OnTriggerEnter_Patch`
    > NB 1: The naming convention is `<Class>_<Method>_Patch`<br/>
    > NB 2: Dynamic patches are applied once the player has loaded into the world. Persistent patches are applied on game launch. For most of the cases, you will want to make a dynamic patch.
3. You need to make your class implement `NitroxPatch` and `IDynamicPatch` and add the override for the Patch method
    ```cs
    using HarmonyLib;
    
    namespace NitroxPatcher.Patches.Dynamic;
    
    public sealed partial class SignalPing_OnTriggerEnter_Patch : NitroxPatch, IDynamicPatch
    {
    }
    ```
4. Now, you need to tell the class to actually patch the method. To do so, first create a reference to the method itself from the base game.
    ```csharp
    private static readonly MethodInfo TARGET_METHOD = Reflect.Method((SignalPing t) => t.OnTriggerEnter(default));
    ```
    > NB 1: It should always be private (or internal), static and be named TARGET_METHOD (by convention)<br/>
    > NB 2: Import from System.Reflection and NitroxModel.Helper
5. Then, depending on your goal, you want to choose the [type of patch](https://harmony.pardeike.net/articles/patching.html) you want to apply. In my case, I just want to patch the Prefix of this method.
    :::tip
    You can find a list of them in the [Harmony documentation](https://harmony.pardeike.net/articles/patching.html), for basic understanding this is what happens when you call a function `foo()`
    ```csharp
    ... foo() 
    {
        foo_Prefix();
        foo_actual();
        foo_Postfix();
    }
    
    ```
    :::note
    Where `foo_Prefix()` is the prefix you (or someone else) may have set for this method and `foo_Postfix()` is the postfix that may have been set for this method. `foo_actual()` is evidently the method itself.
    :::
6. We create the `Prefix()` method just like this
    ```csharp
    public static bool Prefix(SignalPing __instance, Collider collider)
    {
        return true;
    }
    ```
   :::tip
   Please look [at the list of injections you can take from the actual method in the Harmony documentation](https://harmony.pardeike.net/articles/patching-injections.html).
   In my case, I'll be using the `__instance` one which refers to the instance of the `SignalPing` class in which this method was called. I'll also use the base method's parameter `Collider other` (which is optional) because I need it.
   :::
7. As I want to be able to cancel the method's execution (it depends on the situation), I need to make `Prefix()` return a bool. If I return true, it means the actual method will happen, but if I return false, the actual method won't happen.
   
   This is what the actual method looks like btw
   ```csharp
    public void OnTriggerEnter(Collider other)
    {
        if (this.disableOnEnter && other.gameObject.Equals(Player.main.gameObject))
        {
            this.pingInstance.SetVisible(false);
        }
    }
   ```
   My goal is to add some code inside the if condition to make it look like this
    ```csharp
    public void OnTriggerEnter(Collider other)
    {
        if (this.disableOnEnter && other.gameObject.Equals(Player.main.gameObject))
        {
            // In the case the ping instance was still visible, we want to acknowledge it's "removal"
            if (__instance.pingInstance.visible)
            {
                // DO SOMETHING
            }
            this.pingInstance.SetVisible(false);
        }
    }
    ```
    :::note
    Usually we would use a [Transpiler](https://harmony.pardeike.net/articles/patching-transpiler.html) for that, which lets you insert code at a precise place in the method. But it also is a pain to make, so I'll go with the Prefix to keep readability and because this method is kinda small :)
    :::
8. Because I need the exact same conditions as in the original method, I'll just return false at the end of the executed code (inside the if statement) so that it doesn't execute twice.
   
### Final code
```csharp
using System.Reflection;
using HarmonyLib;
using NitroxModel.Helper;
using UnityEngine;

namespace NitroxPatcher.Patches.Dynamic;

public sealed partial class SignalPing_OnTriggerEnter_Patch : NitroxPatch, IDynamicPatch
{
    private static readonly MethodInfo TARGET_METHOD = Reflect.Method((SignalPing t) => t.OnTriggerEnter(default));

    public static bool Prefix(SignalPing __instance, Collider other)
    {
        if (__instance.disableOnEnter && other.gameObject == Player.main.gameObject)
        {
            // In the case the ping instance was still visible, we want to acknowledge its "removal"
            if (__instance.pingInstance.visible)
            {
                Log.Debug("A Signal Ping was removed, now do something");
            }

            // Original code:
            __instance.pingInstance.SetVisible(false);
        }
        return false;
    }
}
```