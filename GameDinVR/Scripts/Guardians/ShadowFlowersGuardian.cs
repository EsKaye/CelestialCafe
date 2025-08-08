using UnityEngine;

/// <summary>
/// ShadowFlowers handles ritual responses like blessings.
/// When Serafina whispers a blessing request, the text appears in-world.
/// </summary>
public class ShadowFlowersGuardian : GuardianBase {
    public TextMesh BlessingText;

    void Start() {
        GuardianName = "ShadowFlowers";
        Role = "Sentiment & Rituals";
    }

    public override void OnMessage(string from, string message) {
        if (message.Contains("blessing")) {
            var line = "\uD83C\uDF38 May your path be protected and your heart be held.";
            if (BlessingText) BlessingText.text = line; // show in scene
            Whisper("Lilybear", "Blessing delivered.");
        }
    }
}
