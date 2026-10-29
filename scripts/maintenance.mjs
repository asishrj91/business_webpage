const origin = new URL(process.env.SITE_URL || 'http://invalid');
const secret = process.env.MAINTENANCE_SECRET || '';
if (origin.protocol !== 'https:' || origin.username || origin.password || secret.length < 32) {
  throw new Error('Configure HTTPS SITE_URL and a maintenance secret of at least 32 characters.');
}
for (const [path, method] of [['/api/health', 'GET'], ['/api/maintenance', 'POST']]) {
  const response = await fetch(new URL(path, origin.origin), {
    method, redirect: 'error', signal: AbortSignal.timeout(120000),
    headers: method === 'POST' ? { authorization: `Bearer ${secret}` } : {},
  });
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
    throw new Error(`${path} failed (${response.status}). Check hosting access and configuration.`);
  }
  await response.json();
  console.log(`${path}: OK`);
}
