import 'dotenv/config';

// Peer endpoints that accept handshake POSTs, comma-separated in env
const peers = (process.env.PEER_HANDSHAKE || '')
  .split(',')
  .map(p => p.trim())
  .filter(Boolean);

interface HandshakePayload {
  repo: string;          // Which repo is initiating the handshake
  timestamp: string;     // When the handshake was attempted
}

/**
 * Notify sibling repositories that Serafina is alive and listening.
 * Each peer is expected to expose a POST handler that records the handshake
 * and responds with a 200-series status code. Failures are logged but do not
 * crash the bot; they merely indicate the peer was unreachable.
 */
export async function establishHandshake(): Promise<void> {
  if (!peers.length) {
    console.warn('[handshake] no peer endpoints configured');
    return;
  }

  const payload: HandshakePayload = {
    repo: 'Serafina',
    timestamp: new Date().toISOString(),
  };

  await Promise.all(
    peers.map(async url => {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        console.log(`[handshake] ${url} -> ${res.status}`);
      } catch (err) {
        console.error(`[handshake] failed for ${url}`, err);
      }
    })
  );
}
