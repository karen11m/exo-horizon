const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

export function supabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

function headers() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
}

export async function insertMessage(payload) {
  if (!supabaseConfigured()) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
  return res.json();
}

export async function fetchMessages() {
  if (!supabaseConfigured()) return [];
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/messages?order=created_at.desc&limit=100`,
    { headers: headers(), cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`);
  return res.json();
}