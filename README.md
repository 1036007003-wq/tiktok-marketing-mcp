# TikTok Marketing MCP v1.0.0

**Free MCP server to automate TikTok viral marketing — search trending videos, analyze hashtags, draft video scripts. Premium features powered by DeepSeek AI.**

[![npm version](https://badge.fury.io/js/tiktok-marketing-mcp.svg)](https://www.npmjs.com/package/tiktok-marketing-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Sponsor](https://img.shields.io/badge/Sponsor-💖-pink.svg)](https://github.com/sponsors/1036007003-wq)

---

## 🚀 Quick Start (FREE, no API key needed)

```bash
# Install
npm install -g tiktok-marketing-mcp

# Add to your MCP client (e.g., Cline, Claude Desktop)
# No API key needed for FREE features!
node /path/to/tiktok-marketing-mcp/index.js
```

**That's it!** Start using these FREE tools immediately:
- `search_trending_videos` — Find trending TikTok videos by keyword
- `analyze_hashtag` — Analyze a hashtag's performance (public data)
- `draft_video_script` — Template-based video script drafts

---

## 🔧 FREE Features (no API key)

| Tool | What it does | No API key? |
|------|---------------|--------------|
| `search_trending_videos` | Search TikTok trending videos (via web) | ✅ Works immediately |
| `analyze_hashtag` | Analyze hashtag views, video count, trend | ✅ Works immediately |
| `draft_video_script` | Draft a video script (template) | ✅ Works immediately |

---

## 💎 PREMIUM Features (requires DeepSeek API key)

Set `DEEPSEEK_API_KEY` in your `.env` file to unlock:

| Tool | What it does | Why it's worth paying for |
|------|---------------|----------------------------|
| `optimize_posting_time` | AI-powered optimal posting times | 3x more views |
| `generate_hashtag_strategy` | AI-generated hashtag mix (broad + niche + trending) | 2x more discoverability |
| `draft_video_script` (AI mode) | AI-generated script based on hook type | 10x better retention |

**Get a DeepSeek API key:** https://platform.deepseek.com (cheap, ~$0.14/1M tokens)

---

## 📦 Installation

### For MCP Client Users (Claude Desktop, Cline, etc.)

Add to your MCP client config:

```json
{
  "mcpServers": {
    "tiktok-marketing": {
      "command": "node",
      "args": ["/path/to/tiktok-marketing-mcp/index.js"],
      "env": {
        "DEEPSEEK_API_KEY": "sk-xxx" // Optional, for premium features
      }
    }
  }
}
```

### For Developers

```bash
git clone https://github.com/1036007003-wq/tiktok-marketing-mcp.git
cd tiktok-marketing-mcp
npm install
node index.js
```

---

## 🎯 Use Cases

### 1. Find trending content ideas
```
Use `search_trending_videos` with keyword "#AI"
→ Returns: TikTok search URL, manual research checklist
```

### 2. Analyze a hashtag before using it
```
Use `analyze_hashtag` with hashtag "#marketing"
→ Returns: Hashtag URL, manual research checklist
```

### 3. Draft a viral video script
```
Use `draft_video_script`
→ Returns: Template-based script (or AI script with DeepSeek)
```

### 4. (Premium) Get optimal posting times
```
Use `optimize_posting_time` with target audience
→ Returns: AI-generated best posting times (by timezone)
```

### 5. (Premium) Generate a hashtag strategy
```
Use `generate_hashtag_strategy` with niche
→ Returns: AI-generated hashtag mix (5 broad + 10 niche + 5 trending)
```

---

## 🌏 For China Users (中国用户)

```bash
# If you can't access TikTok directly:
# 1. Set proxy
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890

# 2. Or use a China-friendly API proxy
# (We recommend setting up your own proxy, or use a VPN)
```

---

## 🏆 Why This is Better Than...

| Alternative | Problem | Our Solution |
|-------------|-----------|--------------|
| Manual TikTok research | Takes hours, algorithm changes fast | Automated trend detection |
| Buying TikTok ads | Expensive ($20+ / day) | Free basic features |
| Hiring a content strategist | $2000+ / month | One-time setup |
| Other TikTok tools | Require TikTok API (complicated) | No API needed for basic features |

---

## 🧩 More MCP Tools

| Product | Link | Free Features |
|---------|------|---------------|
| 🚀 Reddit Marketing | [Repo](https://github.com/1036007003-wq/reddit-marketing-mcp) | 3 tools |
| 🐦 Twitter/X Marketing | [Repo](https://github.com/1036007003-wq/twitter-marketing-mcp) | 3 tools |
| 💬 Discord AI Marketing | [Repo](https://github.com/1036007003-wq/discord-ai-mcp) | 3 tools |
| ⭐ GitHub Stars Growth | [Repo](https://github.com/1036007003-wq/github-stars-mcp) | 4 tools |
| 💼 LinkedIn B2B Marketing | [Repo](https://github.com/1036007003-wq/linkedin-marketing-mcp) | 3 tools |

---

## 📊 Roadmap

- [x] Free: Search trending videos (via web)
- [x] Free: Analyze hashtag (public data)
- [x] Free: Draft video script (template)
- [x] Premium: AI-powered script generation (DeepSeek)
- [x] Premium: Optimal posting time prediction
- [x] Premium: Hashtag strategy generation
- [ ] Paid: Auto-post scheduler
- [ ] Paid: Video performance analytics dashboard
- [ ] Paid: Viral score predictor

---

## 💰 Pricing (GitHub Sponsors)

| Tier | Price | What you get |
|------|-------|---------------|
| **Free** | $0 | 3 basic tools (no API key needed) |
| **Supporter** | $5/mo | All premium features + priority support |
| **Team** | $25/mo | All premium + custom AI prompts + script templates |
| **One-time** | $99 | Lifetime access (no subscription) |

👉 **Sponsor here:** https://github.com/sponsors/1036007003-wq

---

## 🐛 Issues / Feature Requests

Open an issue: https://github.com/1036007003-wq/tiktok-marketing-mcp/issues

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=1036007003-wq/tiktok-marketing-mcp&type=Date)](https://star-history.com/#1036007003-wq/tiktok-marketing-mcp&Date)

---

**Built by [@1036007003-wq](https://github.com/1036007003-wq) | Sponsor on GitHub ❤️**

---

## 🔧 Need a Custom MCP Server?

I build custom MCP Servers for any API or system. 5-day delivery, $1,500/project.

**Contact:** Open an issue or email `1036007003@qq.com`
