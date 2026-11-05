// GET /api/health — liveness probe for uptime monitors (UptimeRobot, BetterStack, ...)
export default function handler(_req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json({
    status: 'ok',
    service: 'mechanicgo-web',
    commit: (process.env.VERCEL_GIT_COMMIT_SHA || 'local').slice(0, 7),
    region: process.env.VERCEL_REGION || 'local',
    time: new Date().toISOString(),
  })
}
