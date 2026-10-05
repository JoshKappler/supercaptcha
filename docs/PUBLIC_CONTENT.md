# Pushary: publicly known facts (fallback only)

Collected from web search on 2026-10-05 because pushary.com itself was blocked. The scrape
in `original/` is the source of truth; use this only to sanity check, or if the owner
explicitly says to build without a scrape.

- Page title: "Approve Your AI Agents From Your Phone"
- Positioning: "the decision layer for AI agents" / "the control panel for AI agents".
  Your agent asks, a person decides on their phone. Before an agent refunds money, sends a
  message or deletes data, Pushary asks the right person, waits for Approve or Deny, and
  sends the answer back.
- Channels: phone (iPhone and Android apps), Mac, Slack, web app.
- Lock screen: approve, deny, choose an option, or type a reply without unlocking.
- Works with Claude Code, Codex, Hermes Agent, Cursor, Windsurf, any MCP-compatible agent.
  SDKs: Vercel AI SDK (`Pushary/pushary-ai-sdk`), OpenAI Agents (`pushary-openai-agents` on PyPI).
- Per-tool rules: auto-approve safe commands (read, lint, test), escalate dangerous ones
  (rm, git push, deploy) to the phone.
- Pricing (as reported by search snippets, verify against scrape):
  - Agent: $9.99/mo, 5,000 notifications/month (about 160/day), 3-day card-first trial
  - Agent Pro: $19.99/mo, unlimited notifications, priority support, full audit trail
  - Partner: from $99/mo
- Known routes: `/`, `/privacy`, `/docs/changelog`, `/vs`, `/vs/humanlayer`, `/vs/vibe-island`
- Company: RalphNex OÜ (Estonia), operating as Pushary.
- Listed on Product Hunt ("Control panel for AI agents on your lock screen").

Sources: https://pushary.com/, https://github.com/Pushary,
https://apps.apple.com/us/app/pushary/id6785677563,
https://www.producthunt.com/products/pushary, https://pushary.com/vs
