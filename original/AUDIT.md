# Audit of the live pushary.com frontend

Source: the scrape in this folder (`scripts/capture-original.mjs`, pages `/`, `/pricing`, `/vs`, `/docs`).
Viewports: desktop 1440x900 and mobile 390x844, both at 2x pixel density.
All pixel positions below are CSS pixels on the 1440px desktop layout unless noted.
All paths are relative to `original/`.

Important context before reading:

- The live site is a **light theme**. The capture ran in light mode (`<html class="light">`).
  The site also ships a dark theme (344 `.dark` rules in the main stylesheet, a theme toggle
  in the footer, `theme-color` `#1a2b2b` for dark). The dark theme was not captured, so
  nothing below describes it.
- The text in this audit is copied from `*.text.txt`, `*.meta.json` and `*.rendered.html`.
  Text that only exists inside an image is marked "(in image)".

---

## 1. Content inventory

### Home (`/`)

Page title: "Approve Your AI Agents From Your Phone | Pushary"
Meta description: "Your AI agents stop when they need permission. Approve from your phone in one tap so they keep working. For Claude Code, Codex, Cursor, and any MCP agent."

17 blocks in order: header, 15 content sections, footer.

**1. Header**
- Logo (P mark) + "Pushary"
- Nav: "How it works", "For agent builders", "Docs"
- Language picker: "🇬🇧 English"
- "Sign in"
- After scrolling, the desktop header also shows a dark "Start your trial" button (seen in the video).
- Mobile: logo + hamburger ("Toggle navigation menu").

**2. Hero**
- H1: "Your agent froze, waiting for your yes."
- Sub: "Pushary sends the question to your phone. Tap Approve and it keeps working."
- Button: "Start your trial" (with arrow)
- Trust line (shield icon): "Pushary sends the step that needs you, not your codebase."
- Interactive demo, left: terminal card with tabs "Claude Code", "Codex", "Cursor", "Hermes". DOM text at capture end:
  ```
  $ codex exec "add migration"
  inspected schema, 8 tables
  generated the migration plan
  ask_user(which adapter?)            MCP tool
  └ pg selected, migrated
  $
  ```
- Interactive demo, right: phone lock screen. DOM text: "Wednesday, March 5", "9:14", "Agents working. Nothing needs you.", notification "Codex" / "now" / "Which database adapter?" with options "pg", "mysql", "sqlite".
- Under the demo: "Tap Approve to try it" (left) and "Replay" (right).

**3. Works-with strip and badges**
- "WORKS WITH" Claude Code, Codex, Antigravity CLI, Hermes, Cursor (each with logo)
- Product Hunt badge: "PRODUCT HUNT #2 Product of the Day" (in image, SVG)
- "Featured on Hacker News" (with HN logo)

**4. Stats row** (four cells)
- "6+" / "agents, one setup"
- "1 tap" / "to approve or deny"
- "Any device" / "iPhone, Android, Mac, Windows, Linux"
- "< 2 min" / "one-command setup"

**5. Walk away**
- H2: "Walk away. Come back to finished work."
- "WITHOUT PUSHARY" (red label)
  - "9:12" "Hand off a long task. Walk away."
  - "9:14" "The agent reaches a step it should not take alone. It stops and waits."
  - "9:51" "You come back. It has not moved in 37 minutes." (red, warning icon)
- "WITH PUSHARY" (teal label)
  - "9:12" "Hand off the same task. Walk away for real."
  - "9:14" "Your phone buzzes. Approve the change before it goes live? You tap yes."
  - "9:51" "You come back. The task finished half an hour ago." (check icon)
- "Your agent should not wait 37 minutes for a single yes."
- Button: "Start your trial"

**6. What is Pushary?**
- H2: "What is Pushary?"
- Body: "Pushary is the control panel for AI agents. When your agent needs a yes, Pushary sends the question to your phone, your Mac, Slack or the web app. You approve or deny, and every answer is saved. Works with Claude Code, Codex, Cursor, Hermes, Windsurf, and any MCP agent."
- Diagram card (screen-reader text: "Your AI agents send permission requests to Pushary, which delivers them to your phone, your Mac's notch, Slack, the web app, and an audit trail.")
  - "YOUR AGENTS": Claude Code, Codex, Cursor, Antigravity CLI, Hermes
  - Center: P logo, "PUSHARY"
  - Bottom row: "Your phone", "Your Mac", "Slack", "Web app", "Audit trail"
  - "WHERE IT REACHES YOU" (red label)
  - "+ any MCP agent, wired the same way"

**7. How it works**
- Eyebrow: "HOW IT WORKS"
- H2: "See the whole flow"
- Sub: "One approval, start to finish, in 20 seconds."
- Video poster with play button. Poster shows a light mint phone, "Wednesday, July 15", "9:41", notification "Claude Code" / "Bash: bun run db:migrate. Proceed?" / "Deny" / "Approve", caption "The question lands on your lock screen." (all in image). The video file itself was not captured.
- Steps:
  - "01" "Your agent asks. It pauses at a step that needs your call. Run a command, change a file, or pick between options."
  - "02" "Your phone buzzes. When a decision is needed, not for every step. Approve or deny right from the notification, or open it to pick an option or type a reply."
  - "03" "It keeps going. Your answer flows straight back to the agent. When the task finishes, you get a ping for that too."

**8. Stay in control**
- Eyebrow: "STAY IN CONTROL"
- H2: "Set the rules once. Approve only what matters."
- Sub: "YOLO mode approves everything, including the rm and the deploy. Pushary auto-runs only the safe steps and pings you for the ones you cannot undo."
- "Auto-approve the safe stuff" / "Low-risk steps you can undo. Allow them once and stop seeing them."
- "The risky ones come to you" / "Deleting, deploying, spending money, anything you cannot undo. These go to your phone."
- "You set the wait time" / "Set how long each step waits. If you do not answer, your rule decides: deny, or hand it back to the terminal."

**9. Control panel**
- H3: "Your agent control panel"
- Sub: "Every agent in one place. See which one is waiting on you, plus the full audit trail."
- Mock dashboard: "Agent / Overview", "Live"
  - Stats: "3" agents active, "212" asked today, "174" auto-cleared, "38" you answered
  - "Waiting for you 1": "Ship the billing webhook", "Codex · now", "git push origin main", "auto-deny 30s", "Approve", "Deny"
  - "Working 2": "Refactor the auth module", "Claude Code · 4m", "src/auth/session.ts"; "Nightly data sync", "Hermes · 12m", "bun run test"
  - "Decision ledger", "212 today":
    - "rm -rf ./dist" Denied, Phone, 2m
    - "vercel deploy --prod" Approved, Phone, 6m
    - "bun run db:migrate" Approved, Slack, 14m
    - "cat src/auth/session.ts" Auto, Policy, 15m
    - "DELETE /v1/customers/:id" Denied, Mac, 22m
  - "View the full ledger"

**10. One command setup**
- H2: "One command sets up every agent."
- Sub: "It finds the agents on your computer and connects them all to your phone, in under two minutes."
- Terminal block: label "terminal", command "npx pushary@latest setup", copy button
- "WORKS WITH YOUR AGENT": Claude Code, Codex, Cursor, Antigravity CLI, Gemini CLI, Hermes Agent, VS Code, OpenCode
- "Windsurf or another MCP client? Connect it by hand"
- OS icons + "Works on Mac, Windows and Linux."
- "On a Mac? The Pushary app can set it up for you, no terminal needed."
- Steps: "01 Start your trial." "02 Run the command on your computer." "03 Scan the QR code with your phone. Done."
- Button: "Start your trial"
- "$9.99/mo after a 3-day free trial. Cancel anytime."
- "Already have an account? Get the phone and Mac apps"

**11. FAQ**
- H2: "Questions, answered"
- Q: "Can I approve an AI agent from my phone?" A: "Yes. Setup shows a QR code, you scan it once with your phone camera, and questions start arriving on your lock screen. Works on iOS and Android. App or browser, your choice. From the notification you approve, deny, choose an option, or type a reply, and the agent keeps going."
- Q: "How much does it cost?" A: "The Agent plan is $9.99 a month after a 3-day free trial, with 5,000 notifications a month, about 160 a day. It covers every agent you run. Agent Pro, at $19.99 a month, adds unlimited notifications, budgets, and up to 5 people."
- Q: "Is my code sent to Pushary's servers?" A: "Not on routine product paths. The decision path transmits notification metadata (title, body text, tool name). Pushary-launched transcripts are redacted and encrypted on your machine; your phone can decrypt them, and authorized Pushary compliance admins can recover them for documented legal obligations."
- Q: "How long does it take to set up?" A: "Under 2 minutes. Run npx pushary@latest setup. It finds Claude Code, Codex, Cursor, Hermes and the other agents on your computer and connects each one, installing the Hermes plugin for you. On a Mac, the Pushary app does the same without a terminal."
- Q: "How is this different from YOLO mode or auto-approve?" A: "YOLO mode blindly approves everything, including destructive commands. Pushary lets you set per-tool rules: auto-approve safe commands (read, lint, test) and only escalate dangerous ones (rm, git push, deploy) to your phone. You stay in control without the fatigue."
- Q: "What AI agents work with Pushary?" A: "Pushary works with Claude Code, Codex, Hermes Agent, Cursor, Windsurf, and any MCP-compatible AI agent. Claude Code gets permission hooks and a setup wizard. Hermes gets a native plugin with automatic error notifications."
- Q: "How do I get notified when Claude Code needs permission?" A: "Install Pushary's hook with one command (npx pushary@latest setup). When Claude Code hits a permission prompt, you get a push notification to approve or deny from your phone. Safe tools can auto-approve so only the decisions that matter reach you."
- Q: "What are permission hooks?" A: "Permission hooks intercept Claude Code's tool approval prompts and route them through push notifications. When the agent wants to run a command or edit a file, you get a push to approve or deny from your phone. If you do not answer, your rule answers for you, deny or hand back to the terminal."
- Q: "What is human-in-the-loop for AI agents?" A: "Human-in-the-loop means an AI agent pauses at important or risky steps and waits for a person to decide before it continues. Pushary delivers that decision to your phone as a push notification, so you can keep an autonomous agent moving without watching it and still catch the actions that matter."
- Q: "What question types does Pushary support?" A: "Three types: confirm (yes/no), select (multiple choice with 2 to 6 options), and input (free text). Your agent picks the right type for the situation."

**12. Why I built this**
- Eyebrow: "WHY I BUILT THIS"
- H2: "I kept coming back to an agent that had been waiting the whole time"
- Body: "I would kick off a task, switch to something else, and come back to find the agent had paused for a yes 40 minutes earlier. So I built Pushary to move that decision to my phone. The agent asks, I tap, and the work keeps going while I am away. This is the 2 minute version."
- "Aadil Ghani · Founder, Pushary"
- Video poster with play button. Poster shows the founder in a circle crop and an older hero: "Stop babysitting your terminal." / "Your agent freezes the second it needs a yes. Pushary moves that decision to your phone, so a 40-minute task never waits 40 m..." (in image). The video file was not captured.

**13. Testimonials**
- H2: "What people running agents tell us"
- Five stars each.
- "I instantly related with the pain of coming back to my Claude Code and seeing "waiting for your permission" instead of "your task is completed."" / "Reagan McCullough · AgentPays"
- "Your tool really helped me improve my Cursor workflow and notifies me when the agent needs me or when it has finished a task. I don't know why this problem wasn't solved by someone already." / "Andreas Kuoppa · Portality"
- "I love your vision of speeding AI agents up by unblocking the stuck permission screen and eventually learning from your permission behaviour based on the context. This is gonna go big very soon." / "Takanari · AI Plaza"

**14. Final CTA card** (solid dark teal)
- H2: "Send the next yes to your phone."
- "The next long task can finish while you are away. One tap and the agent keeps working."
- Button (white): "Start your trial"
- "$9.99/mo after a 3-day free trial. Cancel anytime."
- Below the card, repeated trust line: "Pushary sends the step that needs you, not your codebase."

**15. Agent builders callout**
- "Building an AI agent for your own customers? Let them approve what it does, from their phone. See Pushary for agent builders"

**16. Link directory** (three columns, then one line)
- "WORKS WITH YOUR AGENT": Claude Code notifications, Claude Cowork notifications, ChatGPT notifications, Cursor notifications, Codex notifications, Gemini CLI notifications, Windsurf notifications, Hermes notifications, GitHub Copilot notifications, Cline notifications, Warp notifications, Kilo Code notifications, Zed notifications, Continue notifications, Lovable notifications, MCP notifications
- "STAY IN CONTROL": AI agent control panel, Mac notch app, Permission policy, Audit trail, Kill switch, Permission control, Approve AI tasks, Manage agents remotely, Run multiple AI agents, Session receipts, Embed human approval, Slack approvals, Best AI agent control tools, AI agent glossary, Compare alternatives
- "GUIDES": Human in the loop for AI agents, explained; Run an AI agent overnight, stay in control; Claude Code hooks explained; Skip permissions in Claude Code safely; Skip permissions in Codex safely; What permissions should an AI agent have?; Is it safe to run an AI agent unattended?; All guides and updates
- "Running e-commerce or marketing? Explore push notifications"

**17. Footer**
- Logo + "Pushary", tagline "The decision layer for AI agents"
- Product Hunt badge, App Store badge, Google Play badge
- "Product": Features, Pricing, Download app, FAQ, Get Started, Human-in-the-loop, For agent builders, Compare
- "Agent control": Control panel, Permission policies, Audit trail, Kill switch, Mac app, Claude Code notifications, Best control tools
- "Company": About, Blog, Contact
- "Social": Twitter, GitHub, Discord
- "Legal": Security, Privacy, Terms
- "© 2026 RalphNex OÜ. All rights reserved"
- "Narva mnt 7-652, Kesklinna linnaosa, 10117 Tallinn, Harju maakond, Estonia"
- "Your Privacy Choices", "🇬🇧 English", theme toggle "Light theme"

**Mobile only:** a sticky bottom bar "Unblock your agent." with a "Start your trial" button and a close (x) button. Seen in the mobile video and present in the HTML payload. It is not in `home.text.txt`.

### Pricing (`/pricing`)

Title: "Pricing | Pushary". Header adds a "Get Started" button next to "Sign in".

- Eyebrow "PRICING". H1: "Approvals from your phone, from $9.99 a month."
- "One plan covers all your agents. The phone app and the Mac app are included."
- Checks: "3-day free trial", "Cancel anytime", "Switch plans whenever"

Agent plans:

| Plan | Tagline | Price | Features | Button |
|---|---|---|---|---|
| Agent ("MOST POPULAR") | For one person, every agent | $9.99 per month | 5K notifications/month; Every agent you run; Approve, deny, or answer from your phone; Mac app included; Permission policies; Full MCP and API access; 30-day history | Start 3-day free trial |
| Agent Pro | For power users and small teams | $19.99 per month | Unlimited notifications; Budgets; Priority support; Policy Autopilot suggestions; 90-day history; Everything in Agent | Start 3-day free trial |
| Team | For teams that need a shared record | $59.99 per month | Everything in Agent Pro; Up to 10 members; Shared audit trail with export; Weekly team digest; 365-day history; Invite your security team | Start 3-day free trial |

- "Every agent plan includes Pushary Isle, the Mac app. Your agents' questions show up in your Mac's notch. See the Mac app"

Partner plans:
- H2 "Partner plans". "For companies that ship an AI agent. Your users approve what it does from their phone. See the Partner plan"
- "Pick the size that fits your product. Existing Partner customers keep their terms."

| Plan | Tagline | Price | Features | Button |
|---|---|---|---|---|
| Partner Launch | Approvals inside your product | $99 per month | Your users approve what your agent does; Up to 5K of your users; 25K approval requests a month; Up to 3 members; 90 days of answer history; Every answer sent to your server; TypeScript, Python, REST and MCP | Start with Partner |
| Partner Growth | Approvals inside your product | $299 per month | Your users approve what your agent does; Up to 25K of your users; 100K approval requests a month; Up to 10 members; 365 days of answer history; Every answer sent to your server; TypeScript, Python, REST and MCP; Priority support | Start with Partner |
| Partner Scale | Approvals inside your product | $799 per month | Your users approve what your agent does; Up to 100K of your users; 500K approval requests a month; Up to 25 members; 730 days of answer history; Every answer sent to your server; TypeScript, Python, REST and MCP; Priority support | Start with Partner |
| Enterprise | Custom agreement | Custom, let's talk | Your users approve what your agent does; Every answer sent to your server; TypeScript, Python, REST and MCP | Contact Sales |

- "Your first trial covers 100 of your users and 100 approval requests for 3 days. Paid limits start when billing starts. Retries and extra devices don't count as extra requests. Plain notifications without a question aren't included. No automatic overage charges."
- "All paid plans include a 3-day free trial. Cancel anytime."
- "Need custom limits? Let's talk"

"Common Questions" (answers from the page's FAQ data; the HubSpot answer from the page payload):
- "Do customers need an app?" "No. Push works through browsers. Customers click 'Allow' once and get notifications on phone, tablet, or desktop. No app store. No downloads. One click."
- "Does it actually move the needle?" "80%+ open rates vs 20% for email. Teams see 3-4x more engagement on time-sensitive messages - product launches, renewals, limited offers. Instant delivery wins. Trial expiring? Nudge them in 5 min. Big announcement? Hit their phone immediately."
- "How does the HubSpot integration work?" "Bi-directional sync. Your HubSpot contacts become Pushary subscribers automatically. Every push notification event (sent, opened, clicked, dismissed) flows back into the HubSpot contact timeline." "Trigger push notifications from HubSpot workflows. Segment by lifecycle stage, deal stage, or any HubSpot property. No CSV uploads, no stale data."
- "Is setup hard?" "Add your website URL, upload your logo and brand colors, then share your subscriber page. Start sending notifications in under 5 minutes. No code required for the hosted approach. SDKs available for React, Next.js, and Node.js if you want full control."
- "Can I brand it?" "Yes. Control title, message, image, icon, link. Create templates for common notifications. Customize subscription prompt with your brand colors."
- "Can I try Pushary before committing?" "Every paid plan includes a 3-day free trial with full access to all features. This gives you time to set up, test campaigns, and see results before you pay."
- "What if I go over limits?" "We notify you before limits. If exceeded, sends pause until next cycle or upgrade. No surprise charges. Most start Starter → Growth → Pro as they scale."
- "What infrastructure powers Pushary?" "Built on Apache Kafka, the industry-standard event streaming platform trusted by Netflix, Uber, and LinkedIn for mission-critical messaging. 99.9% delivery guarantee with at-least-once delivery semantics. Messages are persisted before acknowledgment, ensuring zero loss even during system failures or traffic spikes."

Footer: same as home, without the theme toggle.

Content notes (facts, not fixes):
- The pricing FAQ answers describe the website push product (browser opt-in, HubSpot, "Starter → Growth → Pro"), not the agent plans on the same page.
- Home FAQ says Agent Pro "adds ... up to 5 people". The pricing card for Agent Pro lists no member count.

### Compare (`/vs`)

Title: "Pushary vs Happy, Omnara, HumanLayer & More (2026)". Different header: logo + "Try Pushary" only.

- Eyebrow "COMPARISONS". H1 "How Pushary compares"
- "There are many ways to keep an eye on AI agents. These are honest, feature-by-feature breakdowns that say plainly where each tool wins and who it is for. Not sure where to start? Read the roundup of the whole category."
- Button "Read: Best tools to control AI agents"
- H2 "Controlling AI agents", 16 cards (title + one line each): ClickUp, Trello, Zapier, Asana; Happy; Omnara; HumanLayer; Knock; Courier; Novu; Svix; Conductor; Vibe Island; Forge Remote; Claude Code Notifier; ntfy; Pushover; Pushcut; Claude Code Remote Control; Claude Cowork Notifications. Full card text is in `vs.text.txt`.
- "Switching from a specific tool? Happy alternative · Omnara alternative"
- H2 "E-commerce web push": "Pushary vs OneSignal" ("How Pushary compares to OneSignal for web push notifications."), "Pushary vs PushEngage" ("How Pushary compares to PushEngage for e-commerce push.")
- H2 "See it for yourself": "Set your guardrails once, approve from your phone, and keep an exportable audit trail. Works with Claude Code, Codex, Cursor, Hermes, and any MCP client. 3-day free trial." Button "Start your trial".
- Different footer: columns AGENTS, CONTROL, FOR AGENT BUILDERS, COMPARE, RESOURCES (full list in section 7), then Privacy, Terms, Security, Your Privacy Choices, "© 2026 Pushary".

### Docs (`/docs`)

Title: "Pushary Documentation". A separate docs layout: left sidebar, main column, right "On this page".

- Sidebar top: "Pushary Docs", "Search Ctrl K", "Dashboard", "Pricing", "Pushary Documentation", "AI Agents" > "Overview"
- Sidebar groups: "Use it yourself" (Quickstart, Receiving notifications, Supported agents, Get your API key, How it works, Human in the loop, Use cases and prompts, FAQ); "Setup guides" (Mac app (Pushary Isle), Claude Code setup, Codex setup, Gemini CLI setup, Antigravity CLI setup, Cursor setup, Hermes Agent setup, fx setup, Windsurf and other MCP agents, Lovable, Claude.ai, Claude Desktop, and Cowork, ChatGPT, ChatGPT decision events, Langdock, Langflow, Connect any agent); "Control and safety" (Permission policies, When you don't answer, Multi-agent control panel, Kill switch, Audit trail and export); "Build it into your agent" (Build approvals into your agent, Vercel AI SDK, LangGraph, OpenAI Agents SDK, Hosted OpenAI Agents API, Mastra, Claude Agent SDK, Framework adapters, Embed human approval in your product, Test your integration); "Reference" (CLI reference, CLI changelog, Pushary REST API reference, Available tools, Troubleshooting, Pricing and limits, Changelog); "Push API (websites)". Light/dark toggle at the sidebar bottom.
- Main: H1 "Pushary Documentation"; lead "Pushary sends your AI agent's questions and approvals to your phone. Set it up with one command, then approve, deny or answer from anywhere."; buttons "Copy Markdown", "Open"; intro paragraph; code block `npx pushary@latest setup`; "Run it on the computer where your agent runs. It finds your agents, connects them, saves your API key and pairs your phone. The quickstart walks through each step."
- "Pick what you want to do": "Use Pushary with my own agents", "Build approvals into my product" (cards with one line each)
- "Most used pages": Supported agents, Claude Code setup, Policies, REST API, Pricing and limits, Troubleshooting (cards)
- "Building a website instead?" paragraph, changelog line, "Was this page helpful? Yes No"
- Full copy is in `docs.text.txt`.

---

## 2. Fonts

Font files loaded (from `@font-face` in `site/pushary.com/_next/static/immutable/chunks/0fcr6bjgcmure.css`):

- `GeistSans` = Geist Variable, weights 100 to 900 (`media/Geist_Variable-s.p.2-i4fw5gbtlb7.woff2`)
- `GeistMono` = Geist Mono Variable, weights 100 to 900 (`media/GeistMono_Variable.p.0b02cdm7g7y6h.woff2`)
- `GeistPixelSquare` = Geist Pixel Square, weight 500 (`media/GeistPixel_Square.p.3ig4wtfmw09gh.woff2`)
- `GeistSans Fallback` = local Arial with metric overrides (fallback only)

Counted on the rendered pages by computed `font-family` of every visible text node (JavaScript off, page CSS on):

| Font stack (first family) | Home | Pricing | /vs | /docs | Where it appears |
|---|---|---|---|---|---|
| GeistSans | 270 nodes | 167 | 99 | 110 | Headings, body, nav, buttons, cards, footer. On home it appears at 13 sizes (11px to 48px) and weights 300, 400, 500, 600. |
| GeistMono | 40 | 23 | 5 | 0 | Home: terminal lines, "Tap Approve to try it", "Replay", eyebrow labels (WORKS WITH, HOW IT WORKS, STAY IN CONTROL, WHY I BUILT THIS, column labels), the 9:12 / 9:14 / 9:51 timestamps, ledger commands. Pricing: all prices, "per month", "Most Popular", "Custom". /vs: footer column labels. |
| GeistPixelSquare | 10 | 0 | 0 | 0 | Home only: stat values "6+", "1 tap", "Any device", "< 2 min", and step numbers "01 02 03" (twice). |
| `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", system-ui` | 9 | 0 | 0 | 0 | Home only: everything inside the hero phone (date, clock at 78px weight 550, notification text). On Windows this resolves to Segoe UI, as in this capture. |
| `ui-monospace, SFMono-Regular, Menlo, ...` (system mono) | 1 | 0 | 0 | 5 | Home: the `npx pushary@latest setup` command. Docs: all code and "Ctrl K". |

Totals: 3 web font families (Geist, Geist Mono, Geist Pixel Square) plus 2 system stacks.
That is **5 distinct font stacks on the home page**, 4 of them visible in the first screen
(Geist Sans headline, Geist Mono terminal, system font in the phone, Geist Pixel just below the fold).
The two video posters add more type that is baked into the images.

---

## 3. Colors

Hex values were computed in Chromium from the CSS values in `*.meta.json`. Page band colors were sampled from `screenshots/home-desktop-full.png`.

Core tokens (used on every marketing page):

| Role | CSS value | Hex |
|---|---|---|
| Page background | `oklch(0.97 0.006 195)` | `#f1f6f6` (very light mint) |
| Text, primary | `oklch(0.18 0.02 195)` | `#061414` |
| Text, muted | `lab(36.52 -9.79 -3.01)` | `#425b5a` (also at 40 to 80% alpha) |
| Accent (buttons, links, CTA card) | `oklch(0.42 0.1 195)` | `#005d5e` (dark teal) |
| Card surface | `lab(98.87 -0.98 -0.30)` | `#fafcfc` |
| Secondary surface / borders | `lab(93.10 -1.96 -0.61)` | `#e7ecec` |
| Text on dark | `lab(97.73 -1.63 -0.51)` | `#f5faf9` |

Other colors on home:

| Hex | Used for |
|---|---|
| `#b63132` | "WITHOUT PUSHARY" label, its 9:12 / 9:14 / 9:51 timestamps, the 37 minutes line, "WHERE IT REACHES YOU" label |
| `#d40924` | "Denied" pill text in the decision ledger |
| `#bb4d00` | "auto-deny 30s" in the control panel |
| `#d80a27` at 10% | "Denied" pill background |
| `#fe9a00` | "Waiting for you" dot (the testimonial stars are a similar orange, drawn as SVG; exact value not measured) |
| `#00bc7d` | "Working" dot |
| `#faf8f0` | Cream panel behind the engraving illustrations |
| `#050506`, `#3a3a3f` | Phone frame and hardware |
| `#dde7e6` | Selected option row ("pg") in the phone |
| `#000000` at 10 to 70%, `#ffffff` at 15 to 95% | Overlays, phone glass layers, shadows |

Counts from `home.meta.json`: 23 distinct text color values and 30 distinct background values (many are the same hue at different alphas).

Docs uses a different, neutral gray set: text `#0a0a0a`, `#171717`, `#737373`; surfaces `#f1f1f1`, `#f5f5f5`, `#d1d1d1` at 50%; code syntax `#24292e`, `#6f42c1`, `#032f62`. Its sidebar is gray (`#f1f1f1`) while its main column is the mint `#f1f6f6`.

---

## 4. Section backgrounds and separators (home, desktop)

Full-width bands, sampled at x=20 down `home-desktop-full.png` (page height 10069 CSS px):

| y range (CSS px) | Band color | Sections |
|---|---|---|
| 0 to 804 | `#f1f6f6` | Header, hero |
| 804 to 1071 | `#eff4f4` | Works-with strip, badges, stats (stat cells split by 1px `#e7ecec` lines) |
| 1071 to 2707 | `#f1f6f6` | Walk away, What is Pushary? (1px hairline above "What is Pushary?" at about y 1892) |
| 2707 to 3895 | `#eff4f4` to `#eff5f5` | How it works |
| 3895 to 7306 | `#f1f6f6` | Stay in control, control panel, one command, FAQ, why I built this |
| 7306 to 7850 | `#eff4f4` | Testimonials |
| 7850 to 10069 | `#f1f6f6` | Final CTA, callout, link directory, footer |

The full-width bands differ by only 2 to 3 RGB steps. They are close to invisible.

Inset panels inside those bands carry their own backgrounds, and these are what change the look from block to block:

| Section | Panel background |
|---|---|
| Hero | White terminal card; phone with dark teal gradient wallpaper and near-black frame |
| What is Pushary? (y about 2085 to 2626) | `#fafcfc` card over a cream `#faf8f0` panel with a black halftone forest engraving and a dot grid |
| How it works (y about 2960 to 3780) | Video poster: gray-mint photo, dot-matrix world map, light mint phone |
| Control panel (y about 4528 to 5048) | Card over a cream panel with a black halftone mountain and forest engraving |
| Why I built this (y about 6800 to 7210) | Video poster: gray background, founder photo, dark terminal, dark teal phone |
| Testimonials | Three `#fafcfc` cards |
| Final CTA (y 7962 to 8286) | Solid `#005d5e` card, white button |
| Agent builders callout | Light box with a 1px border |

Other separators: a 1px rule between the "Without" and "With" lists; 1px rules between FAQ rows; 1px rules between ledger rows; short teal rule before the "HOW IT WORKS" and "STAY IN CONTROL" eyebrows.

Other pages: `/pricing` is one flat `#f1f6f6` from top to bottom. `/vs` has one `#eef3f3` band (y 2462 to 2904) around "E-commerce web push". `/docs` pairs a gray `#f1f1f1` sidebar with the mint main column.

---

## 5. The hero phone animation, frame by frame

Source: `video/desktop/858748bff46de4a9f357a5e93ee15508.webm` (1440x900, 25 fps, 44.8 s) and `video/mobile/c954554dccd91bb644aedd113ed5a486.webm` (390x844, 44.4 s).
Frames were pulled at 2 fps for the whole clip and at 10 fps for 1.0 to 5.8 s.
Each video is one recording of the whole capture session: home (about 0 to 13 s), then pricing, /vs and /docs. The script scrolls the home page at about 8 s, so the hero is only on screen for about 0 to 8 s and again around 9.5 to 12 s.
Times are seconds from the start of the recording (page navigation included), accurate to about 0.1 s in the 10 fps window and 0.5 s elsewhere.

The demo is built in HTML and CSS, not a video. Phone: dark teal gradient wallpaper, Dynamic Island with a camera dot, status bar (signal, wifi, battery), lock icon, "Wednesday, March 5", large "9:14", flashlight and camera buttons, home indicator, side buttons. Outer size about 274 x 556 CSS px (ratio 2.03). Next to it a terminal card with tabs; a short line with a dot connects the terminal to the phone.

| Time | Terminal | Phone |
|---|---|---|
| 0.0 | Tabs only, empty | Lock screen, line under the clock: "Agents working. Nothing needs you." |
| 0.5 to 1.0 | "Claude Code" tab active. Lines 1 to 3: `$ claude refactor auth/ --apply`, `rewrote session + token refresh`, `12 files changed, tests passing` | Unchanged |
| 1.5 | Lines 1 to 3 dim. Lines 4 to 5 highlighted: `Bash(git push origin develop)` with tag `PreToolUse`, `└ paused for approval, sent to your phone`. A dot moves along the connector toward the phone. | The status line blurs out. A notification fades in with a blur at the top of the screen: P icon, "Claude Code", "now", "Allow bash: git push origin develop?" |
| 1.8 | Same | Notification fully opaque and still. Entry took about 0.3 s. No slide and no overshoot are visible at 10 fps. |
| 2.4 to 2.9 | Same | A gray circle (a drawn touch point) appears on the right end of the notification and grows, as a long press. |
| 2.8 to 3.1 | Same | The clock and date blur. A second white card fades in under the notification: "Approve" with a check mark, "Deny" in red with an x. |
| 3.1 to 4.5 | Same | The touch circle sits over the "Approve" row. |
| 4.5 | Line 5 changes to `└ approved, pushed to develop`. Line 6 shows `$` with a cursor. | Both cards turn gray and fade out in about 0.2 s. No "Approved" state is shown on the phone. |
| 4.8 | Same | Clock unblurs. "Agents working. Nothing needs you." returns. |
| 6.0 | Tab switches to "Codex". Lines 1 to 3: `$ codex exec "add migration"`, `inspected schema, 8 tables`, `generated the migration plan` | Lock screen, idle |
| 7.0 | Lines 4 to 5: `ask_user(which adapter?)` with tag `MCP tool`, `└ question sent to your phone` | A notification arrives: "Codex", "now", "Which database adapter?" |
| about 8.0 | Page scrolls away (capture script) | |
| 9.5 to 10.0 | Hero back on screen | Touch circle on the right of the Codex notification |
| fold screenshot | Same terminal state | Clock blurred; under the notification an option list "pg", "mysql", "sqlite" with the touch circle on "pg" (`screenshots/home-desktop-fold.png`) |
| end state (DOM) | Line 5 reads `└ pg selected, migrated`, then `$` | Not visible in the recording |

Not observed: whether the sequence loops by itself. A "Replay" button exists, so it may stop after the Codex round. Unknown.

Mobile (390px): the terminal sits above the phone. At first load only the top of the phone is on screen; the notification lands at the bottom edge of the viewport (`screenshots/home-mobile-fold.png`).

---

## 6. The owner's three complaints, checked against the capture

**"Different fonts flying around": supported.**
- 5 font stacks on the home page: Geist Sans, Geist Mono, Geist Pixel Square, the Apple system stack (phone), and the system monospace (setup command).
- 4 of them sit in or right under the first screen.
- Geist Sans alone is used at 13 sizes on home.
- Mono is used for labels and timestamps as well as code. The pixel face appears only for the stats and step numbers.
- The setup command uses system mono while the terminal above it uses Geist Mono. Docs code uses system mono too.
- Mitigating fact: the three web fonts are all from the Geist family, so they share proportions.

**"Background separators in different colors clashing": partly supported.**
- The full-width section bands do not clash. In light mode they are `#f1f6f6` and `#eff4f4`, 2 to 3 RGB steps apart.
- The contrast comes from inset panels, each with a different material: cream `#faf8f0` with black halftone engravings (twice), a gray-mint photographic video poster, a second gray video poster with a dark terminal and a dark teal phone, then a saturated `#005d5e` CTA card. Scrolling the page moves between these five looks.
- The dark theme was not captured. The engravings get `dark:invert` and `dark:opacity-25`, so the dark page looks different. Whether the owner's complaint is about dark mode is unknown.

**"The phone animation is super unrealistic": supported, with exceptions.**
Evidence for the complaint:
- The page shows three different phone designs: the hero HTML phone (dark teal, March 5, 9:14), the How it works poster (light mint, July 15, 9:41, side-by-side Deny and Approve buttons), and the founder poster (dark teal, "PUSHARY" header, pill buttons).
- The phone text uses the visitor's system font. On Windows and Android it is not an iOS face; in this capture the clock renders in Segoe UI. The clock is weight 550.
- The notification is an opaque white card. No wallpaper shows through it.
- It fades and blurs in over about 0.3 s. There is no slide from the top and no spring.
- A gray circle is drawn on the screen to fake a finger press.
- After approval both cards fade out. The phone shows no confirmation; only the terminal does.
- Under the clock is a custom status sentence, "Agents working. Nothing needs you."
- On mobile the phone starts mostly below the fold.

Evidence against:
- The frame proportions are close to a real iPhone 15 Pro: about 2.03 here versus 146.6 / 70.6 mm = 2.08.
- It has a Dynamic Island, status bar, flashlight and camera buttons, home indicator and side buttons.
- The background blurs while the actions are open.

---

## 7. Assets and links

### Logo and images

Note: the scraper saved every `/_next/image?url=...` response with an `.html` extension. These files are WebP images (they start with `RIFF....WEBP`). Rename or copy them to `.webp` before use. Where two sizes of one image were requested, the later request overwrote the earlier one under the same name.

| Asset | Path (in `original/`) | Format, size | Original URL |
|---|---|---|---|
| Pushary logo (black serif "P" on white) | `site/pushary.com/_next/image__P3VybD0lMkZsb2dvLndlYnAm.html` | WebP 256x256 | `https://pushary.com/logo.webp` |
| Claude Code | `site/pushary.com/_next/image__P3VybD0lMkZjbGF1ZGUud2Vi.html` | WebP 32x32 | `/claude.webp` |
| Codex | `site/pushary.com/_next/image__P3VybD0lMkZjb2RleC53ZWJw.html` | WebP 48x48 | `/codex.webp` |
| Cursor | `site/pushary.com/_next/image__P3VybD0lMkZjdXJzb3Iud2Vi.html` | WebP 32x32 | `/cursor.webp` |
| Hermes | `site/pushary.com/_next/image__P3VybD0lMkZoZXJtZXMud2Vi.html` | WebP 32x32 | `/hermes.webp` |
| Antigravity CLI | `site/pushary.com/_next/image__P3VybD0lMkZhbnRpZ3Jhdml0.html` | WebP 32x32 | `/antigravity.webp` |
| Gemini CLI | `site/pushary.com/_next/image__P3VybD0lMkZnZW1pbmkud2Vi.html` | WebP 32x32 | `/gemini.webp` |
| Hacker News | `site/pushary.com/_next/image__P3VybD0lMkZoYWNrZXItbmV3.html` | WebP 48x48 | `/hacker-news.webp` |
| VS Code | `site/pushary.com/vscode__P2RwbD1kcGxfNDhQUGhBMmNn.svg` | SVG | `/vscode.svg` |
| OpenCode | `site/pushary.com/opencode__P2RwbD1kcGxfNDhQUGhBMmNn.svg` | SVG | `/opencode.svg` |
| App Store badge | `site/pushary.com/badges/app-store.svg` | SVG | `/badges/app-store.svg` |
| Google Play badge | `site/pushary.com/badges/google-play.svg` | SVG | `/badges/google-play.svg` |
| Product Hunt badge (light) | `site/pushary.com/badges/product-hunt-top-post-light.svg` | SVG | `/badges/product-hunt-top-post-light.svg` |
| How it works poster | `site/pushary.com/_next/image__P3VybD0lMkZ0ZWFzZXItZGVt.html` | WebP 1920x1080 | `/teaser-demo-poster.webp` |
| Founder video poster | `site/pushary.com/_next/image__P3VybD0lMkZob21lLWRlbW8t.html` | WebP 2026x1140 | `/home-demo-poster.webp` |
| Engraving (mountains) | `site/pushary.com/_next/image__P3VybD0lMkZlbmdyYXZpbmct.html` | WebP 2560x1081 | either `/engraving-tuscan-plate.webp` or `/engraving-ridge-plate.webp`; both mapped to this name and one overwrote the other. Which one survived is unknown. |

Not captured: an SVG logo (none was requested by the page), favicons (`/favicon.ico`, `/favicon-*.png`, `/apple-touch-icon.png` are referenced but not saved), the dark Product Hunt badge, and both video files. No Windsurf logo is used on the page. Fallback logo outside the scrape: `vendor/Pushary__pushary-skill/logo.png`.

Fonts: `site/pushary.com/_next/static/immutable/media/` (three WOFF2 files listed in section 2).

### CTA URLs

| CTA | URL |
|---|---|
| App Store | https://apps.apple.com/us/app/pushary/id6785677563 |
| Google Play | https://play.google.com/store/apps/details?id=com.pushary.app |
| Start your trial (home, all instances; pricing Agent plan) | https://pushary.com/sign-up?from=agent |
| Start 3-day free trial, Agent Pro | https://pushary.com/sign-up?from=agent&plan=agent_pro |
| Start 3-day free trial, Team | https://pushary.com/sign-up?from=agent&plan=team |
| Start with Partner (Launch / Growth / Scale) | https://pushary.com/sign-up?from=agent&plan=partner_launch, `...plan=partner_growth`, `...plan=partner_scale` |
| Contact Sales | mailto:business@pushary.com?subject=Pushary%20Partner%20Enterprise |
| Let's talk | mailto:business@pushary.com |
| Try Pushary / Start your trial on /vs | https://pushary.com/sign-up?from=ai-coding |
| Get Started (pricing header, footer) | https://pushary.com/sign-up |
| Sign in | https://pushary.com/sign-in |
| Dashboard (docs) | https://pushary.com/dashboard |
| Download app / Get the phone and Mac apps / The Pushary app | https://pushary.com/download |
| Product Hunt badge | https://www.producthunt.com/products/pushary?utm_source=badge-top-post-badge&utm_medium=badge&utm_campaign=badge-pushary-4 |

### Header nav (home and pricing)

- Pushary: https://pushary.com/
- How it works: https://pushary.com/#demo
- For agent builders: https://pushary.com/partners
- Docs: https://pushary.com/docs
- Sign in: https://pushary.com/sign-in
- Pricing only: Get Started: https://pushary.com/sign-up

/vs header: Pushary (https://pushary.com/), Try Pushary (https://pushary.com/sign-up?from=ai-coding).
/docs header: Pushary Docs (https://pushary.com/), Dashboard, Pricing, then the sidebar (all links in `docs.meta.json`).

### Footer (home and pricing)

- Product: Features https://pushary.com/#features, Pricing https://pushary.com/pricing, Download app https://pushary.com/download, FAQ https://pushary.com/#faq, Get Started https://pushary.com/sign-up, Human-in-the-loop https://pushary.com/human-in-the-loop, For agent builders https://pushary.com/partners, Compare https://pushary.com/vs
- Agent control: Control panel https://pushary.com/ai-agent-control-panel, Permission policies https://pushary.com/ai-agent-permission-policy, Audit trail https://pushary.com/ai-agent-audit-trail, Kill switch https://pushary.com/ai-agent-kill-switch, Mac app https://pushary.com/mac-notch-app, Claude Code notifications https://pushary.com/claude-code-notifications, Best control tools https://pushary.com/best-ai-agent-control-tools
- Company: About https://pushary.com/about, Blog https://pushary.com/blog, Contact mailto:business@pushary.com
- Social: Twitter https://twitter.com/aadilbuilds, GitHub https://github.com/Pushary, Discord https://discord.gg/9v3VvUByrr
- Legal: Security https://pushary.com/security, Privacy https://pushary.com/privacy, Terms https://pushary.com/terms
- Badges: Product Hunt, App Store, Google Play (URLs above)

### Home link directory (above the footer)

- Works with your agent: /claude-code-notifications, /claude-cowork-notifications, /chatgpt-notifications, /cursor-notifications, /codex-notifications, /gemini-cli-notifications, /windsurf-notifications, /hermes-notifications, /github-copilot-notifications, /cline-notifications, /warp-notifications, /kilo-code-notifications, /zed-notifications, /continue-notifications, /lovable-notifications, /mcp-notifications
- Stay in control: /ai-agent-control-panel, /mac-notch-app, /ai-agent-permission-policy, /ai-agent-audit-trail, /ai-agent-kill-switch, /ai-agent-permission-control, /approve-ai-tasks, /manage-ai-agents-remotely, /run-multiple-ai-agents, /receipts, /agent-notifications-integration, /slack, /best-ai-agent-control-tools, /ai-agent-glossary, /vs
- Guides: /blog/human-in-the-loop-for-ai-agents, /blog/run-ai-agent-overnight, /blog/claude-code-hooks-explained, /claude-code-dangerously-skip-permissions, /codex-dangerously-skip-permissions, /blog/what-permissions-should-an-ai-agent-have, /blog/is-it-safe-to-run-an-ai-agent-unattended, /blog
- Explore push notifications: /push-notifications
- Other home links: agent chips in "Works with your agent" go to /docs/agents/guides/{claude-code, codex, cursor, antigravity-cli, gemini-cli, hermes}, VS Code and OpenCode go to /docs/agents/supported-agents, Windsurf line goes to /docs/agents/guides/windsurf-other. Testimonial companies: https://agentpays.dev/, https://portality.co/, https://ai-plaza.io/.

All paths above are on https://pushary.com.

### /vs footer

- AGENTS: Claude Code /claude-code-notifications, Cursor /cursor-notifications, Codex /codex-notifications, Gemini CLI /gemini-cli-notifications, Hermes notifications /hermes-notifications, Claude Cowork /claude-cowork-notifications, All agents /
- CONTROL: Control panel, Permission policies, Audit trail, Kill switch (same URLs as home), Claude Code skip permissions /claude-code-dangerously-skip-permissions, Codex skip permissions /codex-dangerously-skip-permissions, Cursor skip permissions /cursor-dangerously-skip-permissions, Gemini skip permissions /gemini-dangerously-skip-permissions, Permission control /ai-agent-permission-control, Best control tools /best-ai-agent-control-tools, Approve AI tasks /approve-ai-tasks
- FOR AGENT BUILDERS: Human-in-the-loop /human-in-the-loop, Vercel AI SDK /human-in-the-loop-vercel-ai-sdk, LangGraph /human-in-the-loop-langgraph, CrewAI /human-in-the-loop-crewai, MCP /human-in-the-loop-mcp, Partner plan /partners, Embed approvals /agent-notifications-integration
- COMPARE: vs HumanLayer /vs/humanlayer, vs Omnara /vs/omnara, vs Conductor /vs/conductor, All comparisons /vs
- RESOURCES: Docs /docs, Blog /blog, Glossary /ai-agent-glossary, Pricing /pricing, Phone app /download, Mac app /mac-notch-app, Agent Approval Index /agent-approval-index, Manage agents remotely /manage-ai-agents-remotely, Notifications not working /claude-code-notifications-not-working, Support /support
- Bottom: Privacy /privacy, Terms /terms, Security /security, Your Privacy Choices, "© 2026 Pushary"

---

## Other observations

- Three different header and footer designs across four pages: home and pricing share one, /vs has a minimal header and a five-column footer, /docs has its own app shell.
- Copyright differs: "© 2026 RalphNex OÜ" (home, pricing) versus "© 2026 Pushary" (/vs).
- The founder video poster still shows an older hero headline, "Stop babysitting your terminal."
- `manifest.json` lists 637 responses, but `site/` holds 392 files, because responses with the same path and a similar query string overwrote each other.
- `*.rendered.html` files reference CSS and fonts by absolute paths (`/_next/...`), so they open unstyled from disk. The screenshots are the faithful view.
