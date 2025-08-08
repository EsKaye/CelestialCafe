import fetch from 'node-fetch';

/**
 * Sends a whisper to a guardian inside Unity via MCP's /osc bridge.
 * This allows Discord slash commands to trigger in-world reactions.
 */
export async function whisper(to: string, message: string) {
  const url = `${process.env.MCP_URL}/osc`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: `/${to}`, value: message })
    });
  } catch (err) {
    console.error('Failed to send OSC message', err);
  }
}
