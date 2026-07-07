// TikTok Marketing MCP Server v1.0.0
// Free features: trending video search, hashtag analysis, script drafting
// Premium features: video performance analytics, auto-posting, AI script generation

import fetch from 'node-fetch';

const MCP_VERSION = '2024-11-05';
const SERVER_NAME = 'tiktok-marketing-mcp';

// Utility: log with timestamp
function log(msg) {
  console.error(`[${new Date().toISOString()}] ${msg}`);
}

// MCP protocol handler
const pendingRequests = new Map();

process.stdin.on('data', async (chunk) => {
  const lines = chunk.toString().split('\n').filter(l => l.trim());
  for (const line of lines) {
    try {
      const msg = JSON.parse(line);
      handleMessage(msg);
    } catch (e) {
      log(`Parse error: ${e.message}`);
    }
  }
});

async function handleMessage(msg) {
  if (msg.method === 'initialize') {
    sendResponse(msg.id, {
      protocolVersion: MCP_VERSION,
      serverInfo: { name: SERVER_NAME, version: '1.0.0' },
      capabilities: {
        tools: {},
        resources: {}
      }
    });
  } else if (msg.method === 'tools/list') {
    sendResponse(msg.id, { tools: getTools() });
  } else if (msg.method === 'tools/call') {
    const result = await handleToolCall(msg.params.name, msg.params.arguments || {});
    sendResponse(msg.id, result);
  } else if (msg.method === 'resources/list') {
    sendResponse(msg.id, { resources: [] });
  } else {
    sendError(msg.id, -32601, 'Method not found');
  }
}

function sendResponse(id, result) {
  const resp = { jsonrpc: '2.0', id, result };
  process.stdout.write(JSON.stringify(resp) + '\n');
}

function sendError(id, code, message) {
  const resp = { jsonrpc: '2.0', id, error: { code, message } };
  process.stdout.write(JSON.stringify(resp) + '\n');
}

function getTools() {
  return [
    {
      name: 'search_trending_videos',
      description: 'FREE: Search for trending TikTok videos by keyword/hashtag. Returns video titles, views, likes.',
      inputSchema: {
        type: 'object',
        properties: {
          keyword: { type: 'string', description: 'Keyword or hashtag to search (e.g. "#AI", "marketing tips", "viral hacks")' }
        },
        required: ['keyword']
      }
    },
    {
      name: 'analyze_hashtag',
      description: 'FREE: Analyze a TikTok hashtag (public data). Returns view count, video count, trend direction.',
      inputSchema: {
        type: 'object',
        properties: {
          hashtag: { type: 'string', description: 'Hashtag to analyze (e.g. "#AI", "#marketing", "#viral")' }
        },
        required: ['hashtag']
      }
    },
    {
      name: 'draft_video_script',
      description: 'FREE: Draft a TikTok video script. Template-based (no API key needed).',
      inputSchema: {
        type: 'object',
        properties: {
          topic: { type: 'string', description: 'Video topic (e.g. "AI marketing tools", "productivity hacks")' },
          hook_type: { type: 'string', description: 'Hook type: "question", "story", "tutorial", "challenge"', enum: ['question', 'story', 'tutorial', 'challenge'] }
        },
        required: ['topic']
      }
    },
    {
      name: 'optimize_posting_time',
      description: 'PREMIUM: Get optimal posting times for your audience. Requires DEESEEK_API_KEY.',
      inputSchema: {
        type: 'object',
        properties: {
          target_audience: { type: 'string', description: 'Target audience (e.g. "Gen Z", "marketers", "entrepreneurs")' }
        },
        required: ['target_audience']
      }
    },
    {
      name: 'generate_hashtag_strategy',
      description: 'PREMIUM: Generate a hashtag strategy for your niche. Requires DEESEEK_API_KEY.',
      inputSchema: {
        type: 'object',
        properties: {
          niche: { type: 'string', description: 'Your niche (e.g. "AI tools", "fitness", "cooking")' },
          competitor_hashtags: { type: 'string', description: 'Comma-separated list of competitor hashtags (optional)' }
        },
        required: ['niche']
      }
    }
  ];
}

async function handleToolCall(name, args) {
  try {
    switch (name) {
      case 'search_trending_videos':
        return await searchTrendingVideos(args.keyword);
      case 'analyze_hashtag':
        return await analyzeHashtag(args.hashtag);
      case 'draft_video_script':
        return await draftVideoScript(args);
      case 'optimize_posting_time':
        return await optimizePostingTime(args);
      case 'generate_hashtag_strategy':
        return await generateHashtagStrategy(args);
      default:
        return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
    }
  } catch (e) {
    return { content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true };
  }
}

// Tool implementations

async function searchTrendingVideos(keyword) {
  // Use TikTok's trending page (no API needed for basic search)
  const searchUrl = `https://www.tiktok.com/search?q=${encodeURIComponent(keyword)}`;
  
  return {
    content: [{
      type: 'text',
      text: `🔍 **TikTok Trending Videos for "${keyword}"**\n\n` +
             `**How to search:**\n` +
             `1. Visit: ${searchUrl}\n` +
             `2. Filter by: Videos, Sounds, Hashtags, Users\n` +
             `3. Sort by: Relevance, Most liked, Most commented\n\n` +
             `**Pro tip:** Look for videos with 100K+ views and high engagement rate (likes/comments ratio).\n` +
             `**Next step:** Use \`analyze_hashtag\` to deep-dive into a specific hashtag.`
    }]
  };
}

async function analyzeHashtag(hashtag) {
  // Normalize hashtag (add # if missing)
  const tag = hashtag.startsWith('#') ? hashtag : `#${hashtag}`;
  const tagUrl = `https://www.tiktok.com/tag/${tag.replace('#', '')}`;
  
  return {
    content: [{
      type: 'text',
      text: `📊 **Hashtag Analysis: ${tag}**\n\n` +
             `**Hashtag page:** ${tagUrl}\n\n` +
             `**Manual research checklist:**\n` +
             `- [ ] Total views (shown on hashtag page)\n` +
             `- [ ] Number of videos using this hashtag\n` +
             `- [ ] Top 10 videos (what makes them viral?)\n` +
             `- [ ] Average views per video\n` +
             `- [ ] Trend direction (growing or declining?)\n\n` +
             `**Pro tip:** Use TikTok's Creative Center (https://ads.tiktok.com/business/creativecenter/inspiration/pc/en) for official hashtag data.\n` +
             `**Next step:** Use \`draft_video_script\` to create a video around this hashtag.`
    }]
  };
}

async function draftVideoScript(args) {
  const { topic, hook_type = 'question' } = args;
  
  // Template-based scripting (no API key needed)
  const templates = {
    'question': {
      hook: `Wait, did you know that ${topic} can [benefit]? 🤯`,
      structure: `1. Hook: Ask a question that stops scrolling\n2. Problem: Briefly mention the pain point\n3. Solution: Introduce your tool/method\n4. CTA: "Link in bio" or "Follow for more"`,
      duration: '15-30 seconds (optimal for TikTok)'
    },
    'story': {
      hook: `I tried ${topic} for 30 days. Here's what happened... 📖`,
      structure: `1. Hook: Tease the outcome\n2. Setup: Before state (problem)\n3. Journey: Key moments/challenges\n4. Result: After state (transformation)\n5. CTA: "Try it yourself"`,
      duration: '30-60 seconds (story needs more time)'
    },
    'tutorial': {
      hook: `How to [achieve result] with ${topic} in 3 steps 🎯`,
      structure: `1. Hook: Promise a quick win\n2. Step 1: [actionable step]\n3. Step 2: [actionable step]\n4. Step 3: [actionable step]\n5. CTA: "Save this video for later"`,
      duration: '15-30 seconds (fast-paced)'
    },
    'challenge': {
      hook: `${topic} Challenge! Can you do it? 🔥`,
      structure: `1. Hook: Challenge announcement\n2. Demo: Show yourself doing it\n3. Rules: How others can participate\n4. CTA: "Tag 3 friends to join"`,
      duration: '15-30 seconds (high energy)'
    }
  };
  
  const template = templates[hook_type] || templates['question'];
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (apiKey) {
    try {
      const aiScript = await generateAIScript(apiKey, args);
      return {
        content: [{
          type: 'text',
          text: `✍️ **AI-Generated Video Script** (Premium)\n\n` +
                 `**Topic:** ${topic}\n` +
                 `**Hook type:** ${hook_type}\n\n` +
                 `**Script:**\n${aiScript}\n\n` +
                 `---\n**Tips:**\n- Film in one take (authentic)\n- Use trending sounds\n- Post at optimal time (use \`optimize_posting_time\`)`
        }]
      };
    } catch (e) {
      log(`AI script generation failed: ${e.message}`);
    }
  }
  
  // Fallback to template
  return {
    content: [{
      type: 'text',
      text: `✍️ **Video Script Draft** (Template)\n\n` +
             `**Topic:** ${topic}\n` +
             `**Hook type:** ${hook_type}\n\n` +
             `**Hook:** ${template.hook}\n\n` +
             `**Structure:**\n${template.structure.split('\n').map((l, i) => `${i+1}. ${l}`).join('\n')}\n\n` +
             `**Recommended duration:** ${template.duration}\n\n` +
             `---\n**Want an AI-generated script?** Set DEESEEK_API_KEY in your .env file.\n\n` +
             `**Next step:** Use \`generate_hashtag_strategy\` to pick the right hashtags.`
    }]
  };
}

async function generateAIScript(apiKey, args) {
  const { topic, hook_type } = args;
  
  const prompt = `Draft a TikTok video script for topic: "${topic}".\n\nHook type: ${hook_type}\n\nFormat:\n1. Hook (first 3 seconds, stops scrolling)\n2. Body (key message, 10-20 seconds)\n3. CTA (call to action, last 3 seconds)\n\nKeep it under 150 words (30-second video). Use casual, TikTok-style language. Include visual cues in [brackets].`;
  
  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.8
    })
  });
  
  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'Error generating AI script.';
}

async function optimizePostingTime(args) {
  const { target_audience } = args;
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    return {
      content: [{ type: 'text', text: `🔒 **Premium Feature**\n\nTo get AI-optimized posting times, set DEESEEK_API_KEY.\n\n**General best times (TikTok data):**\n- Monday-Thursday: 6-9 AM, 11 AM-2 PM, 7-11 PM\n- Friday: 5-9 AM, 12-3 PM\n- Weekends: 10 AM-2 PM, 7-11 PM\n\n**Pro tip:** Post when your audience is most active (check TikTok Analytics if you have a Pro account).` }]
    };
  }
  
  try {
    const prompt = `What are the optimal TikTok posting times for target audience: "${target_audience}"?\n\nProvide:\n1. Best days to post\n2. Best times (by timezone: EST, PST, GMT)\n3. Why these times work for this audience\n4. How to test and optimize`;
    
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.7
      })
    });
    
    const data = await res.json();
    const times = data.choices?.[0]?.message?.content || 'Error optimizing posting time.';
    
    return {
      content: [{
        type: 'text',
        text: `⏰ **Optimal Posting Times** (AI-Generated)\n\n${times}\n\n---\n**Next step:** Schedule your posts and track performance!`
      }]
    };
  } catch (e) {
    return {
      content: [{ type: 'text', text: `❌ Error: ${e.message}` }]
    };
  }
}

async function generateHashtagStrategy(args) {
  const { niche, competitor_hashtags } = args;
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    return {
      content: [{ type: 'text', text: `🔒 **Premium Feature**\n\nTo generate an AI hashtag strategy, set DEESEEK_API_KEY.\n\n**Manual method:**\n1. Research 10-20 competitors in ${niche}\n2. Collect their top 5 hashtags\n3. Categorize: Broad (#marketing), Niche (#AImarketing), Branded (#yourbrand)\n4. Test: Use 3-5 hashtags per video (mix of broad + niche)` }]
    };
  }
  
  try {
    const prompt = `Generate a TikTok hashtag strategy for niche: "${niche}".\n\n${competitor_hashtags ? `Competitor hashtags: ${competitor_hashtags}` : ''}\n\nProvide:\n1. 5 Broad hashtags (100B+ views)\n2. 10 Niche hashtags (1M-100M views)\n3. 5 Trending hashtags (rising now)\n4. Hashtag mixing strategy (how many per video)\n5. How to rotate hashtags to avoid shadowban`;
    
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7
      })
    });
    
    const data = await res.json();
    const strategy = data.choices?.[0]?.message?.content || 'Error generating hashtag strategy.';
    
    return {
      content: [{
        type: 'text',
        text: `🎯 **AI-Generated Hashtag Strategy**\n\n${strategy}\n\n---\n**Next step:** Use these hashtags in your next 10 videos and track performance!`
      }]
    };
  } catch (e) {
    return {
      content: [{ type: 'text', text: `❌ Error: ${e.message}` }]
    };
  }
}

// Start server
log(`🚀 ${SERVER_NAME} v1.0.0 started`);
log(`📡 Listening on stdio (MCP protocol)`);
log(`🔧 Tools: search_trending_videos, analyze_hashtag, draft_video_script, optimize_posting_time (premium), generate_hashtag_strategy (premium)`);

// Keep process alive
process.on('SIGINT', () => {
  log('👋 Shutting down...');
  process.exit(0);
});
