using UnityEngine;

/// <summary>
/// Serafina focuses on routing blessings and communications.
/// When she hears "bless" from Discord she asks ShadowFlowers to deliver.
/// </summary>
public class SerafinaGuardian : GuardianBase {
    void Start() {
        GuardianName = "Serafina";
        Role = "Comms & Routing";
    }

    public override void OnMessage(string from, string message) {
        if (message.StartsWith("bless")) {
            Whisper("ShadowFlowers", "Please deliver a blessing to the hall.");
        }
    }
}
