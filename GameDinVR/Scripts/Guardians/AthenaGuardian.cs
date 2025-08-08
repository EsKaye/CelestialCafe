using UnityEngine;

/// <summary>
/// Athena monitors strategic status updates and responds when asked.
/// Messages routed from Discord with keywords like "status" will trigger
/// her to whisper back to Lilybear.
/// </summary>
public class AthenaGuardian : GuardianBase {
    void Start() {
        GuardianName = "Athena";
        Role = "Strategy & Intelligence";
    }

    public override void OnMessage(string from, string message) {
        if (message.Contains("status")) {
            Whisper("Lilybear", "Athena: All systems nominal.");
        }
    }
}
