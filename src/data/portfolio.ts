export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description?: string;
    image: string;
    status: string;
    stack: string[];
    categories: string[];
    links: { label: string; href: string }[];
    accent: string;
    // Extra media for modal
    images?: string[];
    videos?: string[];
}

export const allCategories = [
    'Websites',
    'AI & Agents',
    'Bots',
    'Games',
    'Dev Tools',
    'Minecraft',
] as const;

export interface ProjectMediaItem {
    type: 'image' | 'video';
    src: string;
}

export function getProjectMedia(project: Project): ProjectMediaItem[] {
    const media: ProjectMediaItem[] = [];

    if (project.images && project.images.length > 0) {
        project.images.forEach((img) => media.push({ type: 'image', src: img }));
    } else {
        media.push({ type: 'image', src: project.image });
    }

    if (project.videos && project.videos.length > 0) {
        project.videos.forEach((video) => media.push({ type: 'video', src: video }));
    }

    return media;
}

export function getProjectCoverImage(project: Project): string {
    const imageMedia = getProjectMedia(project).find((item) => item.type === 'image');
    return imageMedia?.src ?? project.image;
}

export const projects: Project[] = [
    {
        slug: 'patty',
        title: 'Patty Concept Website',
        tagline: 'Concept website I Designed and Developed for a burger place in Modena.',
        description: `Patty is a burger place in Modena with a really strong brand identity, and I wanted to turn that identity into a full concept website, from case study to shipped frontend. The first part of the project was pure research. I spent time on their Instagram studying everything I could pull out of it: mood, visual style, color palette, typography choices, and the general vibe they give off. Their brand is so well defined that in some ways this made the job easier, because I was not inventing a direction, I was translating one. From that analysis I built a proper little design system. I wrote down the observations, turned them into rules, and defined the visual guidelines the site had to follow before writing a single line of code. Only after that I moved to the codebase. I used my classic stack here: Next js, Tailwind CSS, and Framer Motion, which is what I reach for when I want strong SEO, great performance, and smooth motion without fighting the framework. The whole thing came together in around two days of focused work. Patty is a concept project, but it is the kind of exercise I enjoy the most: taking a real brand, studying it deeply, and rebuilding its digital presence from scratch with the same care a client project would get.`,
        image: '/projects/patty/patty.png',
        status: 'concept / 2026',
        stack: ['Next.js', 'TypeScript', 'UI Design', 'Frontend'],
        categories: ['Websites'],
        links: [{ label: 'live', href: 'https://patty.emqnuele.dev' }],
        accent: '30, 78, 215',
        images: ['/projects/patty/patty.png', '/projects/patty/patty2.png', '/projects/patty/patty3.png', '/projects/patty/patty4.png']
    },
    {
        slug: 'pulsar',
        title: 'Pulsar · Hackathon Winner',
        tagline: 'University social web app built at JeMore with team HyperLabs.',
        description: `Pulsar was born in a single day, at the JeMore hackathon, and it ended up winning first place. I built it with my team, HyperLabs, five of us in total, and we shipped the whole thing from zero to live web app inside the event. The idea came from a very real problem we all experience at university: you are surrounded by hundreds of people every day, yet you do not actually know any of them, not as friends and not as future colleagues. Pulsar is our answer to that. It is a web app for university students that sits somewhere between Tinder and LinkedIn, but designed specifically for the student world, so you can connect with people both for friendship and for career opportunities. The core flow revolves around a smart onboarding that understands who you are and what you are looking for, a matching system that pairs you with compatible people, events to move the connection from screen to real life, and a layer of gamification that keeps people coming back instead of churning after the first session. The stack is Next js on the frontend, FastAPI on the backend, and Neon as the database, a combo that let us move fast without cutting corners on the parts that actually matter in production. Looking back, Pulsar is the project that made me realize how much you can ship in 24 hours when the team is solid and the idea is clear. The app is still live, and winning that hackathon remains one of my favorite memories as a builder.`,
        image: '/projects/pulsar-linkedin2_compressed.png',
        status: 'winner / 2026',
        stack: ['Next.js', 'FastAPI', 'Product Design', 'UX', 'Hackathon'],
        categories: ['Websites'],
        links: [{ label: 'live', href: 'https://pulsar.emqnuele.dev' }],
        accent: '82, 128, 255',
        images: ['/projects/pulsar-linkedin2_compressed.png', '/projects/pulsar-match.webp', '/projects/pulsar-home.webp']
    },
    {
        slug: 'projectbea',
        title: 'ProjectBEA',
        tagline: 'A modular, autonomous AI Persona engine. That can play minecraft!',
        description: `ProjectBEA started as a simple experiment to learn Python properly and quickly spiraled into one of the most complex things I have ever built. The goal was to create an autonomous AI Persona that could hold real conversations, react with emotions, and entertain an audience on its own, all orchestrated through a modular engine where every component, from LLMs to TTS engines to OBS controls, can be swapped at runtime without touching core logic. Every capability beyond basic chat lives in a plugin skill system. The Memory skill implements a full RAG pipeline using ChromaDB, generating diary entries from past sessions and injecting relevant memories into every prompt. The Discord skill runs a cross-language voice pipeline where a Node js bot captures live audio, sends it to the Python backend for transcription and LLM processing, and streams the response back into the voice channel with barge-in detection and interrupted speech resumption. The Minecraft skill is the piece I am most proud of: a fully autonomous LLM-driven agent that plays the game from scratch, powered by a custom Fabric mod I built that exposes the entire game state over WebSocket, and a Python-side state machine that uses tool-calling to mine, craft, fight, navigate, and reason about its environment. On top of everything sits a React and FastAPI web dashboard with real-time brain activity monitoring, live chat, skill toggling, and hot-reloadable configuration. ProjectBEA is the project that turned me from someone who writes scripts into someone who can architect and manage a large, multi-module, multi-language application. It forced me to solve problems across async Python, WebSocket communication, real-time audio, vector search, LLM orchestration, and game engine modding, all within a single codebase. It is open-source and self-hostable, and I still consider it one of the best thing I have built.`,
        image: '/projects/projectbea/projectbea.png',
        status: 'live',
        stack: ['Python', 'JavaScript', 'AI', 'FastAPI', 'RAG', 'Java', 'React'],
        categories: ['AI & Agents', 'Minecraft'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/projectBEA' }, { label: 'live', href: 'https://projectbea.emqnuele.dev' }],
        accent: '220, 174, 255',
        videos: [
            "https://projectbea.emqnuele.dev/videos/hls/minecraft/playlist.m3u8",
            "https://projectbea.emqnuele.dev/videos/hls/discord/playlist.m3u8",
            "https://projectbea.emqnuele.dev/videos/hls/webui/playlist.m3u8"
        ]
    },
    {
        slug: 'quicklanding',
        title: 'QuickLanding',
        tagline: 'A full-stack Production SaaS. Multi-agent backend. Built for a client.',
        description: 'A client project I architected and shipped from scratch. Includes a multi-agent AI backend, full dashboard, database layer, sandboxed workflows, automated email system, and a production-grade VPS infrastructure with Nginx, UFW, and security hardening. The kind of project that covers everything.',
        image: '/projects/quicklanding.png',
        status: 'client / 2026',
        stack: ['Python', 'FastAPI', 'AI Agents', 'Linux', 'Nginx', 'Next.js'],
        categories: ['AI & Agents', 'Websites'],
        links: [],
        accent: '255, 143, 178'
    },
    {
        slug: 'omni',
        title: 'Omni',
        tagline: 'A full-featured streaming platform, built from scratch as a personal learning project.',
        description: `Omni is a full-featured streaming platform I built from scratch. It has a complete user system with invite-only access, progress tracking across everything you watch, a favorites library, and a recommendation engine that learns from your habits and suggests new content based on what you actually like. There's also a native watch-together feature: share a code with someone, and you're watching in perfect sync directly inside the app, no external tools, no hacks. But the real story of Omni is what it cost me to build it. Before this project I had never touched a VPS, never configured Nginx, never thought about firewalls or rate limiting or what it actually means to expose something to the internet. Omni forced me to learn all of it. I set up the entire infrastructure from scratch: Cloudflare, Nginx as reverse proxy, UFW as the firewall, Docker for the backend services, a separate PostgreSQL instance for the database. It also taught me real-world HLS video streaming and how to manage caching properly for a true end-to-end product. I learnt a lot. It's one of the projects I'm most proud of.`,
        image: '/projects/omni.png',
        status: '2026',
        stack: ['Next.js','HLS Streaming', 'Deno Deploy', 'PostgreSQL', 'Docker', 'Nginx', 'Cloudflare', 'Caching'],
        categories: ['Websites'],
        links: [],
        accent: '255, 143, 178',
        images: ['/projects/omni/omni.png', '/projects/omni/omni2.png', '/projects/omni/omni3.png']
    }, 
    {
        slug: 'helper-bot',
        title: 'VPS Helper Bot',
        tagline: 'Telegram bot for VPS and Docker monitoring on the go with smart alerting.',
        description: `Built right after Omni, when I needed a way to monitor my VPS from the phone instead of opening a terminal every time. A Telegram bot with a menu-based dashboard to check VPS metrics, memory, Docker containers, and services in a couple of taps. It sends alerts when a container crashes, stops, or when a resource usage crosses a set threshold. Mute controls let me silence notifications during deploys or maintenance, so the bot stays useful instead of spammy.`,
        image: '/projects/danilo.png',
        status: 'prod / 2025',
        stack: ['Python', 'Telegram API', 'Linux', 'Docker'],
        categories: ['Bots', 'Dev Tools'],
        links: [],
        accent: '255, 122, 214'
    },
    {
        slug: 'humanlike-telegram-bot',
        title: 'Humanlike Telegram Bot',
        tagline: 'A highly realistic AI Telegram bot.',
        description: 'Powered by Google GenAI API. It mimics human texting with natural message splitting, dynamic typing delays, and fully customizable behavior.',
        image: '/projects/finqua.png',
        status: 'live / 2025',
        stack: ['Python', 'Telegram API', 'Google GenAI'],
        categories: ['Bots', 'AI & Agents'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/humanlike-telegram-bot' }],
        accent: '255, 143, 178'
    },
    {
        slug: 'minesweeper',
        title: 'Minesweeper',
        tagline: 'A minesweeper game with cheats.',
        description: 'A minesweeper game with cheats, because why not?',
        image: '/projects/new_minesweeper.png',
        status: 'prod / 2025',
        stack: ['React', 'TypeScript', 'Vite'],
        categories: ['Games'],
        links: [
            { label: 'github', href: 'https://github.com/emqnuele/Minesweeper' },
            { label: 'live', href: 'https://minesweeper.emqnuele.dev/' }
        ],
        accent: '115, 242, 255'
    },
    {
        slug: 'all-converter',
        title: 'AllConverter',
        tagline: 'Local file converter web app.',
        description: 'Supports image, audio, video, and document conversions with advanced options such as resizing, rotating, filtering, and quality adjustments.',
        image: '/projects/new_converter.png',
        status: 'prod / 2026',
        stack: ['Python', 'FastAPI', 'FFmpeg', 'Pillow', 'Vite', 'Uvicorn'],
        categories: ['Dev Tools', 'Websites'],
        links: [
            { label: 'github', href: 'https://github.com/emqnuele/AllConverter' },
            { label: 'live', href: 'https://allconverter.emqnuele.dev/' }
        ],
        accent: '255, 196, 122'
    },
    {
        slug: 'clicker',
        title: 'Clicker',
        tagline: 'A clicker game.',
        description: 'A fun clicker game made with React!',
        image: '/projects/new_clicker.png',
        status: 'beta / 2025',
        stack: ['React', 'TypeScript', 'Vite'],
        categories: ['Games'],
        links: [{ label: 'live', href: 'https://click.gecowave.top/' }],
        accent: '220, 174, 255'
    },
    {
        slug: 'gecowave',
        title: 'Gecowave Website',
        tagline: 'A website for a music group.',
        description: 'A custom website I designed and developed for a music group.',
        image: '/projects/gecowave/gecowave.png',
        status: 'beta / 2025',
        stack: ['Vite', 'TypeScript', 'Tailwind'],
        categories: ['Websites'],
        links: [{ label: 'live', href: 'https://gecowave.top/' }],
        accent: '220, 174, 255',
        images: ['/projects/gecowave/gecowave.png', '/projects/gecowave/gecowave2.png', '/projects/gecowave/gecowave3.png']
    },
    {
        slug: 'insta-bot',
        title: 'Instagram AI Bot',
        tagline: 'Instagram DM automation with AI persona.',
        description: 'Turn your Instagram DMs into an autonomous AI persona. Mimics human behavior with realistic delays, typing simulation, and a custom deepfake persona.',
        image: '/projects/insta.png',
        status: 'prod / 2025',
        stack: ['Python', 'instagrapi', 'Google GenAI'],
        categories: ['Bots', 'AI & Agents'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/insta-bot' }],
        accent: '255, 122, 214'
    },
    {
        slug: 'markolino-plugin',
        title: 'Markolino-Chaos',
        tagline: 'A Paper plugin that spawns a bot in minecraft!',
        description: 'A fun plugin for Paper that spawns "Markolino" a bot that wants to kill you!',
        image: '/projects/markolino.webp',
        status: 'beta / 2025',
        stack: ['Java', 'Minecraft', 'Paper', 'Fabric'],
        categories: ['Minecraft', 'Games'],
        links: [{ label: 'github', href: 'https://modrinth.com/plugin/markolino-chaos' }],
        accent: '255, 122, 122'
    },
    {
        slug: 'snake',
        title: 'Snake Game',
        tagline: 'A classic snake game.',
        description: 'A fun snake game made with React!',
        image: '/projects/snake/snake.png',
        status: 'live',
        stack: ['React', 'TypeScript', 'Vite'],
        categories: ['Games', 'Websites'],
        links: [{ label: 'live', href: 'https://snake.emqnuele.dev/' }],
        accent: '220, 174, 255'
    },
    {
        slug: 'web-scraper',
        title: 'Simple Web Scraper',
        tagline: 'Modular Python web scraper.',
        description: 'Automatic content extraction. Supports batch scraping, extracts articles with full metadata, media and structure. Structured JSON output.',
        image: '/projects/scraper.png',
        status: 'beta / 2025',
        stack: ['Python', 'BeautifulSoup', 'Requests'],
        categories: ['Dev Tools'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/webscraper' }],
        accent: '125, 255, 199'
    },
    {
        slug: 'quick-resource-pack',
        title: 'Quick ResourcePack Mod',
        tagline: 'Fabric mod for Minecraft.',
        description: 'Keybind to switch texture packs on/off ingame.',
        image: '/projects/quick-resource-packs.png',
        status: 'live on modrinth',
        stack: ['Java', 'Minecraft', 'Fabric'],
        categories: ['Minecraft'],
        links: [
            { label: 'github', href: 'https://github.com/emqnuele/quick-resource-pack' },
            { label: 'live', href: 'https://modrinth.com/mod/quick-resource-pack' }
        ],
        accent: '255, 122, 122',
        images: ['/projects/quick-resource-packs.png', '/projects/new-quick-resource-pack.png']
    },
    {
        slug: 'portfolio',
        title: 'Portfolio Website',
        tagline: 'This very website.',
        description: 'Built with Next.js, showcasing projects and my skills in a modern design.',
        image: '/projects/new_portfolio.png',
        status: 'live',
        stack: ['Next.js', 'Tailwind', 'Framer Motion'],
        categories: ['Websites'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/portfolio' }, { label: 'live', href: 'https://emanuelefaraci.com/' }],
        accent: '220, 174, 255'
    }

];

export const journey = [
    {
        period: '2020 → 2025',
        title: 'High School · Human Science',
        details: ['Psychology, pedagogy, sociology and anthropology', 'Learning how people think and interact']
    },
    {
        period: '2022 → 2026',
        title: 'Indie builder · freelance',
        details: ['From landing pages to full-stack apps', 'Frontend, backend, databases and devops', 'Bots, automations, AI agents, RAG systems']
    },
    {
        period: '2025 → now',
        title: 'UNIMORE · Computer Science',
        details: ['Software eng & distributed systems', 'AI & machine learning']
    }
];

export const stats = [
    { label: 'base', value: 'Modena · IT' },
    { label: 'response time', value: '2 hours' },
    { label: 'status', value: 'CS Student' },
    { label: 'languages', value: 'English - Italian' }
];

export interface SkillCategory {
    icon: string;
    title: string;
    description: string;
    tags: string[];
    accent: string;
}

export const skills: SkillCategory[] = [
    {
        icon: 'Monitor',
        title: 'Frontend',
        description: 'Building polished, responsive UIs with modern frameworks and pixel-perfect attention.',
        tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Vercel'],
        accent: '139, 92, 246'
    },
    {
        icon: 'Server',
        title: 'Backend',
        description: 'REST APIs, server logic, databases, and everything that powers the frontend.',
        tags: ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Webhooks'],
        accent: '59, 130, 246'
    },
    {
        icon: 'Brain',
        title: 'AI & ML',
        description: 'From fine-tuning models to deploying agents and image generation pipelines.',
        tags: ['OpenAI', 'Model fine-tuning', 'RAG', 'Google GenAI', 'LangChain', 'Hugging Face', 'AI agents', 'Image generation'],
        accent: '236, 72, 153'
    },
    {
        icon: 'Bot',
        title: 'Bots & Automation',
        description: 'Custom bots and automated workflows for Telegram, Discord, and beyond.',
        tags: ['Telegram API', 'Discord.js', 'Python Discord', 'Cron jobs', 'Chatbots', 'Inline keyboards', 'Automation pipelines'],
        accent: '16, 185, 129'
    },
    {
        icon: 'Cloud',
        title: 'DevOps & Infra',
        description: 'VPS setup, reverse proxies, firewalls, DNS.',
        tags: ['Nginx', 'UFW', 'Cloudflare', 'VPS setup', 'Linux', 'Docker', 'SEO'],
        accent: '245, 158, 11'
    }
];

export const heroRoles = [
    "Software Developer",
    "FullStack Engineer",
    "AI Engineer",
    "Bot Developer",
    "Python Developer",
    "Automation Builder",
    "Creative Coder",
];
