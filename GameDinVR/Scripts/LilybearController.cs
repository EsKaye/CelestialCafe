using UnityEngine;

/// <summary>
/// Lilybear is the voice and operations hub. She relays messages coming from
/// Discord (via Serafina) to the rest of the guardians.
/// </summary>
public class LilybearController : GuardianBase {
    [TextArea]
    public string LastMessage;

    void Start() {
        GuardianName = "Lilybear";
        Role = "Voice & Operations";
    }

    public override void OnMessage(string from, string message) {
        LastMessage = $"{from}: {message}";

        // If a Discord message begins with "/route" forward the payload.
        if (message.StartsWith("/route ")) {
            var payload = message.Substring(7); // drop command
            Whisper("*", payload); // broadcast to everyone
        }
    }

    [ContextMenu("Test Whisper")]
    void TestWhisper() {
        Whisper("*", "The council is assembled.");
    }
}
