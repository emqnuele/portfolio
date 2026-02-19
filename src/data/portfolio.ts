export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description?: string;
    image: string;
    status: string;
    stack: string[];
    links: { label: string; href: string }[];
    accent: string;
    // Extra media for modal
    images?: string[];
    videos?: string[];
}

export const projects: Project[] = [
    {
        slug: 'projectbea',
        title: 'ProjectBEA',
        tagline: 'A modular, autonomous AI VTuber engine.',
        description: 'Features RAG memory, OBS ws, Discord, and an autonomous Minecraft agent. It supports swappable LLMs/TTS and a plugin-based skill system for easy extension.',
        image: '/projects/projectBEA.png',
        status: 'live',
        stack: ['Python', 'JavaScript', 'AI', 'Java', 'React'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/projectBEA' }, { label: 'live', href: 'https://projectbea.emqnuele.dev' }],
        accent: '220, 174, 255',
        videos: [
            "https://projectbea.emqnuele.dev/videos/hls/minecraft/playlist.m3u8",
            "https://projectbea.emqnuele.dev/videos/hls/discord/playlist.m3u8",
            "https://projectbea.emqnuele.dev/videos/hls/webui/playlist.m3u8"
        ]
    },
    {
        slug: 'portfolio',
        title: 'Portfolio Website',
        tagline: 'This very website.',
        description: 'Built with Next.js, showcasing projects and my skills in a modern design.',
        image: '/projects/portfolio.png',
        status: 'live',
        stack: ['Next.js', 'Tailwind', 'Framer Motion'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/portfolio' }, { label: 'live', href: 'https://emanuelefaraci.com/' }],
        accent: '220, 174, 255'
    },
    {
        slug: 'humanlike-telegram-bot',
        title: 'Humanlike Telegram Bot',
        tagline: 'A highly realistic AI Telegram bot.',
        description: 'Powered by Google GenAI API. It mimics human texting with natural message splitting, dynamic typing delays, and fully customizable behavior.',
        image: '/projects/aibot.webp',
        status: 'live / 2025',
        stack: ['Python', 'Telegram API', 'Google GenAI'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/humanlike-telegram-bot' }],
        accent: '255, 143, 178'
    },
    {
        slug: 'insta-bot',
        title: 'Instagram AI Bot',
        tagline: 'Instagram DM automation with AI persona.',
        description: 'Turn your Instagram DMs into an autonomous AI persona. Mimics human behavior with realistic delays, typing simulation, and a custom deepfake persona.',
        image: '/projects/instabot1.webp',
        status: 'prod / 2025',
        stack: ['Python', 'instagrapi', 'Google GenAI'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/insta-bot' }],
        accent: '255, 122, 214'
    },
    {
        slug: 'minesweeper',
        title: 'Minesweeper',
        tagline: 'A minesweeper game with cheats.',
        description: 'A minesweeper game with cheats, because why not?',
        image: '/projects/minesweeper.png',
        status: 'prod / 2025',
        stack: ['React', 'TypeScript', 'Vite'],
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
        image: '/projects/converter.webp',
        status: 'prod / 2024',
        stack: ['Python', 'Flask', 'FFmpeg', 'Pillow', 'PyPDF2'],
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
        image: '/projects/clicker.png',
        status: 'beta / 2025',
        stack: ['React', 'TypeScript', 'Vite'],
        links: [{ label: 'live', href: 'https://click.gecowave.top/' }],
        accent: '220, 174, 255'
    },
    {
        slug: 'gecowave',
        title: 'Gecowave Website',
        tagline: 'A website for a music group.',
        description: 'A custom website I designed and developed for a music group.',
        image: '/projects/gecowave.png',
        status: 'beta / 2025',
        stack: ['Vite', 'TypeScript', 'Tailwind'],
        links: [{ label: 'live', href: 'https://gecowave.top/' }],
        accent: '220, 174, 255'
    },
    {
        slug: 'markolino-plugin',
        title: 'Markolino-Chaos',
        tagline: 'A Paper plugin that spawns a bot in minecraft!',
        description: 'A fun plugin for Paper that spawns "Markolino" a bot that wants to kill you!',
        image: '/projects/markolino.webp',
        status: 'beta / 2025',
        stack: ['Java', 'Minecraft', 'Paper', 'Fabric'],
        links: [{ label: 'github', href: 'https://modrinth.com/plugin/markolino-chaos' }],
        accent: '255, 122, 122'
    },
    {
        slug: 'web-scraper',
        title: 'Simple Web Scraper',
        tagline: 'Modular Python web scraper.',
        description: 'Automatic content extraction. Supports batch scraping, extracts articles with full metadata, media and structure. Structured JSON output.',
        image: '/projects/scraper.webp',
        status: 'beta / 2025',
        stack: ['Python', 'BeautifulSoup', 'Requests'],
        links: [{ label: 'github', href: 'https://github.com/emqnuele/webscraper' }],
        accent: '125, 255, 199'
    },
    {
        slug: 'quick-resource-pack',
        title: 'Quick ResourcePack Mod',
        tagline: 'Fabric mod for Minecraft.',
        description: 'Keybind to switch texture packs on/off ingame.',
        image: '/projects/quick-resource-pack.png',
        status: 'live on modrinth',
        stack: ['Java', 'Minecraft', 'Fabric'],
        links: [
            { label: 'github', href: 'https://github.com/emqnuele/quick-resource-pack' },
            { label: 'live', href: 'https://modrinth.com/mod/quick-resource-pack' }
        ],
        accent: '255, 122, 122'
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
        details: ['Landing pages & design systems', 'Telegram bots, chatbots, automations', 'AI finetuning & agents']
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
