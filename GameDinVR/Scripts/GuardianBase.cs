using UnityEngine;

/// <summary>
/// Base class for all guardian behaviours. Guardians subscribe to the
/// LilybearOpsBus and react when messages target them. Messages may originate
/// from Discord via Serafina or other in-world systems.
/// </summary>
public class GuardianBase : MonoBehaviour {
    [Header("Identity")]
    public string GuardianName = "Guardian";
    public string Role = "Undefined";

    protected virtual void OnEnable() {
        if (LilybearOpsBus.Instance != null)
            LilybearOpsBus.Instance.OnWhisper += HandleWhisper;
    }

    protected virtual void OnDisable() {
        if (LilybearOpsBus.Instance != null)
            LilybearOpsBus.Instance.OnWhisper -= HandleWhisper;
    }

    /// <summary>
    /// Called whenever the bus sends a whisper. Derived guardians override
    /// OnMessage to implement their specific behaviour.
    /// </summary>
    protected virtual void HandleWhisper(string from, string to, string message) {
        if (to == GuardianName || to == "*") {
            Debug.Log($"[{GuardianName}] received from {from}: {message}");
            OnMessage(from, message);
        }
    }

    public virtual void OnMessage(string from, string message) {}

    /// <summary>
    /// Helper for sending a whisper to another guardian or broadcast (*).
    /// </summary>
    protected void Whisper(string to, string message) {
        LilybearOpsBus.Instance?.Say(GuardianName, to, message);
    }
}
