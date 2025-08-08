using UnityEngine;
using System;
using System.Collections.Generic;

/// <summary>
/// Global in-world bus so guardians and Lilybear can whisper to each other.
/// Messages forwarded here may originate from Discord via Serafina.
/// </summary>
public class LilybearOpsBus : MonoBehaviour {
    public static LilybearOpsBus Instance;

    void Awake() {
        Instance = this; // singleton convenience
    }

    /// <summary>
    /// Delegate used for guardian whisper events.
    /// </summary>
    public delegate void Whisper(string from, string to, string message);
    public event Whisper OnWhisper;

    /// <summary>
    /// Say something on the bus; guardians subscribed will receive it.
    /// </summary>
    public void Say(string from, string to, string message) {
        Debug.Log($"[LilybearBus] {from} -> {to}: {message}");
        OnWhisper?.Invoke(from, to, message);
    }
}
