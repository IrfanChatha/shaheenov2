"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  LayoutDashboard, Link2, Video, UploadCloud, Sparkles, BarChart3, Bell, Settings,
  Search, Zap, ChevronDown, ChevronLeft, ChevronRight, Plus, Upload, Users, Eye,
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight,
  Music2, Pin, Ghost, RefreshCw, Unlink, CheckCircle2, XCircle,
  Calendar, Play, Clock, Heart, MessageCircle, Share2, Edit3, Trash2, LayoutGrid,
  List, SlidersHorizontal, ArrowUpDown, Check, Copy, Star, Wand2, Hash, Tag, Type,
  ListOrdered, FileText, AlignLeft, Film, Image as ImageIcon, Layers, Gauge, Cpu,
  ScanLine, Activity, ListChecks, Lightbulb, Rocket, Crown, X, Menu, Send,
  MoreVertical, Globe, Languages, Bookmark, Flame, Mic, Award, Target, Clapperboard,
  Coins, BadgeCheck, Quote, CornerDownRight, MoreHorizontal,
  Sun, Moon, Command, Inbox, Smile, Meh, Frown, Ban, CreditCard, Shield,
  KeyRound, Plug, MapPin, Trophy, Download, ArrowRight, Repeat2, Smartphone, Monitor
} from "lucide-react";
import {
  FaYoutube as Youtube,
  FaInstagram as Instagram,
  FaFacebook as Facebook,
  FaLinkedin as Linkedin,
  FaXTwitter as Twitter
} from "react-icons/fa6";
import {
  AreaChart, Area, ResponsiveContainer, LineChart, Line, BarChart, Bar,
  RadialBarChart, RadialBar, PieChart, Pie, Cell
} from "recharts";
import { signInProvider, signOutAll } from "./actions";

const PLATFORM_TO_PROVIDER = {
  youtube: "google",
  tiktok: "tiktok",
  instagram: "instagram",
  facebook: "facebook",
};
const PROVIDER_TO_PLATFORM = {
  google: "youtube",
  tiktok: "tiktok",
  instagram: "instagram",
  facebook: "facebook",
};

const APP_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; }
.cs-root, .cs-root * { margin: 0; }

.cs-root {
  --bg: #07070b;
  --bg-2: #0a0a10;
  --surface: #101017;
  --surface-2: #15151f;
  --surface-3: #1b1b27;
  --hover: rgba(255,255,255,0.04);
  --glass: rgba(17,17,24,0.72);
  --border: rgba(255,255,255,0.07);
  --border-2: rgba(255,255,255,0.11);
  --ink: #f5f5f8;
  --ink-2: #b6b6c2;
  --ink-3: #79798a;
  --ink-4: #55555f;
  --accent: #8b5cf6;
  --accent-2: #6366f1;
  --accent-soft: rgba(139,92,246,0.14);
  --accent-glow: rgba(139,92,246,0.45);
  --ai-1: #a855f7;
  --ai-2: #6366f1;
  --ai-3: #ec4899;
  --ok: #34d399;
  --ok-bg: rgba(52,211,153,0.13);
  --warn: #fbbf24;
  --warn-bg: rgba(251,191,36,0.13);
  --danger: #f87171;
  --danger-bg: rgba(248,113,113,0.13);
  --info: #60a5fa;
  --info-bg: rgba(96,165,250,0.13);
  --r-xs: 8px; --r-sm: 11px; --r: 14px; --r-lg: 18px; --r-xl: 22px; --r-2xl: 28px;
  --sb-w: 264px;
  --rb-w: 312px;
  --shadow: 0 1px 2px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.36);
  --shadow-lg: 0 24px 60px -12px rgba(0,0,0,0.6);

  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(1100px 620px at 78% -8%, rgba(139,92,246,0.13), transparent 60%),
    radial-gradient(900px 560px at -6% 4%, rgba(99,102,241,0.10), transparent 58%),
    var(--bg);
  min-height: 100vh;
  display: flex;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: -0.011em;
  -webkit-font-smoothing: antialiased;
}

.cs-root ::selection { background: rgba(139,92,246,0.32); color: #fff; }
.cs-root ::-webkit-scrollbar { width: 9px; height: 9px; }
.cs-root ::-webkit-scrollbar-track { background: transparent; }
.cs-root ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.09); border-radius: 99px; border: 2px solid transparent; background-clip: padding-box; }
.cs-root ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.18); background-clip: padding-box; }
.cs-mono { font-family: 'JetBrains Mono', monospace; font-feature-settings: "tnum"; }

.cs-sidebar {
  width: var(--sb-w); flex-shrink: 0; position: sticky; top: 0; height: 100vh;
  display: flex; flex-direction: column; padding: 18px 14px;
  border-right: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(16,16,23,0.6), rgba(10,10,16,0.4));
  backdrop-filter: blur(12px); z-index: 40;
}
.cs-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.cs-content { flex: 1; min-width: 0; padding: 26px 30px 60px; max-width: 1280px; width: 100%; margin: 0 auto; }
.cs-rightbar {
  width: var(--rb-w); flex-shrink: 0; position: sticky; top: 0; height: 100vh; overflow-y: auto;
  padding: 22px 18px 40px; border-left: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(14,14,20,0.5), rgba(9,9,14,0.3));
}

.cs-brand { display: flex; align-items: center; gap: 11px; padding: 6px 10px 16px; }
.cs-brand-mark {
  width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0; display: grid; place-items: center;
  background: linear-gradient(135deg, var(--ai-1), var(--ai-2)); color: #fff;
  box-shadow: 0 6px 18px -4px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.35);
}
.cs-brand-name { font-weight: 700; font-size: 15px; letter-spacing: -0.02em; }
.cs-brand-sub { font-size: 11px; color: var(--ink-3); font-weight: 500; margin-top: -1px; }

.cs-navlabel { font-size: 10.5px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--ink-4); padding: 14px 12px 7px; }
.cs-nav { display: flex; flex-direction: column; gap: 2px; }
.cs-navitem {
  display: flex; align-items: center; gap: 11px; padding: 9px 12px; border-radius: var(--r-sm);
  color: var(--ink-2); font-weight: 500; font-size: 13.5px; cursor: pointer; border: none; background: none;
  width: 100%; text-align: left; position: relative; transition: color .15s, background .15s; font-family: inherit;
}
.cs-navitem svg { width: 18px; height: 18px; flex-shrink: 0; stroke-width: 2; }
.cs-navitem:hover { background: var(--hover); color: var(--ink); }
.cs-navitem.active { background: var(--accent-soft); color: #fff; }
.cs-navitem.active::before { content: ""; position: absolute; left: -14px; top: 50%; transform: translateY(-50%); width: 3px; height: 18px; border-radius: 0 3px 3px 0; background: linear-gradient(var(--ai-1), var(--ai-2)); }
.cs-navitem .cs-dot { margin-left: auto; background: var(--accent); color: #fff; font-size: 10px; font-weight: 700; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 99px; display: grid; place-items: center; }

.cs-side-bottom { margin-top: auto; display: flex; flex-direction: column; gap: 12px; }
.cs-profile { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: var(--r); border: 1px solid var(--border); background: var(--surface); cursor: pointer; transition: border-color .15s, background .15s; }
.cs-profile:hover { border-color: var(--border-2); background: var(--surface-2); }
.cs-profile-name { font-weight: 600; font-size: 13px; }
.cs-profile-mail { font-size: 11px; color: var(--ink-3); }

.cs-av { border-radius: 50%; flex-shrink: 0; display: grid; place-items: center; color: #fff; font-weight: 700; position: relative; box-shadow: inset 0 1px 0 rgba(255,255,255,0.25); }
.cs-av-ring { box-shadow: 0 0 0 2px var(--bg), 0 0 0 3.5px var(--accent); }

.cs-topbar {
  position: sticky; top: 0; z-index: 35; display: flex; align-items: center; gap: 14px;
  padding: 13px 30px; border-bottom: 1px solid var(--border);
  background: var(--glass); backdrop-filter: blur(18px) saturate(140%);
}
.cs-search { flex: 1; max-width: 460px; position: relative; display: flex; align-items: center; }
.cs-search svg.lead { position: absolute; left: 13px; width: 16px; height: 16px; color: var(--ink-3); pointer-events: none; }
.cs-search input {
  width: 100%; background: var(--surface); border: 1px solid var(--border); color: var(--ink);
  border-radius: var(--r-sm); padding: 9px 12px 9px 38px; font-size: 13px; font-family: inherit; outline: none; transition: border-color .15s, box-shadow .15s;
}
.cs-search input::placeholder { color: var(--ink-4); }
.cs-search input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.cs-kbd { position: absolute; right: 10px; font-size: 11px; color: var(--ink-4); border: 1px solid var(--border-2); border-radius: 6px; padding: 1px 6px; }
.cs-topbar-actions { margin-left: auto; display: flex; align-items: center; gap: 9px; }

.cs-btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: inherit; font-weight: 600; font-size: 13px; padding: 9px 15px; border-radius: var(--r-sm); cursor: pointer; border: 1px solid transparent; transition: transform .12s, background .15s, border-color .15s, box-shadow .15s; white-space: nowrap; letter-spacing: -0.01em; }
.cs-btn svg { width: 16px; height: 16px; stroke-width: 2.2; }
.cs-btn:active { transform: translateY(1px) scale(0.99); }
.cs-btn-primary { background: linear-gradient(135deg, var(--ai-1), var(--ai-2)); color: #fff; box-shadow: 0 6px 18px -6px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.3); }
.cs-btn-primary:hover { box-shadow: 0 10px 26px -6px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.3); transform: translateY(-1px); }
.cs-btn-ghost { background: var(--surface-2); color: var(--ink); border-color: var(--border-2); }
.cs-btn-ghost:hover { background: var(--surface-3); border-color: rgba(255,255,255,0.18); }
.cs-btn-sm { padding: 6px 10px; font-size: 12px; border-radius: var(--r-xs); }
.cs-btn-sm svg { width: 14px; height: 14px; }
.cs-btn-block { width: 100%; }
.cs-btn-danger { background: var(--danger-bg); color: var(--danger); border-color: rgba(248,113,113,0.25); }
.cs-btn-danger:hover { background: rgba(248,113,113,0.2); }

.cs-ico { display: inline-grid; place-items: center; width: 36px; height: 36px; border-radius: var(--r-sm); background: var(--surface); border: 1px solid var(--border); color: var(--ink-2); cursor: pointer; position: relative; transition: background .15s, color .15s, border-color .15s, transform .12s; }
.cs-ico svg { width: 17px; height: 17px; }
.cs-ico:hover { background: var(--surface-2); color: var(--ink); border-color: var(--border-2); }
.cs-ico:active { transform: scale(0.94); }
.cs-ico-sm { width: 30px; height: 30px; border-radius: var(--r-xs); }
.cs-ico-sm svg { width: 15px; height: 15px; }
.cs-ico .cs-bdot { position: absolute; top: 7px; right: 8px; width: 7px; height: 7px; border-radius: 50%; background: var(--danger); box-shadow: 0 0 0 2px var(--surface); }

.cs-credits { display: flex; align-items: center; gap: 8px; padding: 7px 12px 7px 10px; border-radius: var(--r-sm); border: 1px solid rgba(251,191,36,0.22); background: rgba(251,191,36,0.08); }
.cs-credits svg { width: 16px; height: 16px; color: var(--warn); }
.cs-credits b { font-weight: 700; font-size: 13px; }
.cs-credits span { font-size: 11px; color: var(--ink-3); }

.cs-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-lg); box-shadow: var(--shadow); }
.cs-card-pad { padding: 18px; }
.cs-glass { background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012)); backdrop-filter: blur(8px); border: 1px solid var(--border); border-radius: var(--r-lg); }
.cs-hoverable { transition: transform .18s cubic-bezier(.2,.7,.3,1), border-color .18s, box-shadow .18s; }
.cs-hoverable:hover { transform: translateY(-3px); border-color: var(--border-2); box-shadow: var(--shadow-lg); }

.cs-sec-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin: 34px 0 16px; }
.cs-sec-head.first { margin-top: 8px; }
.cs-sec-title { font-size: 17px; font-weight: 700; letter-spacing: -0.02em; display: flex; align-items: center; gap: 9px; }
.cs-sec-title .cs-tico { width: 28px; height: 28px; border-radius: 9px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }
.cs-sec-title .cs-tico svg { width: 16px; height: 16px; }
.cs-sec-sub { font-size: 12.5px; color: var(--ink-3); margin-top: 2px; font-weight: 450; }

.cs-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 99px; letter-spacing: -0.01em; border: 1px solid transparent; }
.cs-badge svg { width: 12px; height: 12px; }
.cs-b-ok { background: var(--ok-bg); color: var(--ok); border-color: rgba(52,211,153,0.22); }
.cs-b-warn { background: var(--warn-bg); color: var(--warn); border-color: rgba(251,191,36,0.22); }
.cs-b-danger { background: var(--danger-bg); color: var(--danger); border-color: rgba(248,113,113,0.22); }
.cs-b-info { background: var(--info-bg); color: var(--info); border-color: rgba(96,165,250,0.22); }
.cs-b-muted { background: var(--surface-3); color: var(--ink-2); border-color: var(--border-2); }
.cs-b-accent { background: var(--accent-soft); color: var(--accent); border-color: rgba(139,92,246,0.25); }
.cs-hero { position: relative; overflow: hidden; border-radius: var(--r-2xl); padding: 32px 34px; border: 1px solid var(--border-2);
  background:
    radial-gradient(700px 320px at 88% -30%, rgba(168,85,247,0.32), transparent 62%),
    radial-gradient(560px 300px at 8% 130%, rgba(99,102,241,0.26), transparent 60%),
    linear-gradient(120deg, #14101f, #0d0d16); }
.cs-hero::before { content:""; position:absolute; inset:0; background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 34px 34px; mask-image: radial-gradient(60% 100% at 80% 0%, #000, transparent 75%); pointer-events:none; }
.cs-hero-eyebrow { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; color: #e9d5ff; background: rgba(168,85,247,0.16); border: 1px solid rgba(168,85,247,0.3); padding: 5px 11px; border-radius: 99px; position: relative; }
.cs-hero h1 { font-size: 30px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.12; margin: 16px 0 10px; position: relative; }
.cs-hero h1 .wave { display: inline-block; animation: cs-wave 2.6s ease-in-out infinite; transform-origin: 70% 70%; }
.cs-hero p { color: var(--ink-2); font-size: 14.5px; max-width: 600px; line-height: 1.6; position: relative; }
.cs-hero-actions { display: flex; gap: 11px; margin-top: 22px; position: relative; flex-wrap: wrap; }
.cs-hero-stats { position: absolute; right: 34px; bottom: 30px; display: flex; gap: 26px; }
.cs-hero-stat .v { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
.cs-hero-stat .l { font-size: 11.5px; color: var(--ink-3); }

.cs-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.cs-stat { padding: 17px; position: relative; overflow: hidden; }
.cs-stat-top { display: flex; align-items: flex-start; justify-content: space-between; }
.cs-stat-ico { width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center; }
.cs-stat-ico svg { width: 19px; height: 19px; }
.cs-stat-label { font-size: 12.5px; color: var(--ink-3); font-weight: 500; margin-top: 14px; }
.cs-stat-value { font-size: 26px; font-weight: 800; letter-spacing: -0.025em; margin-top: 3px; line-height: 1; }
.cs-stat-foot { display: flex; align-items: center; gap: 6px; margin-top: 9px; font-size: 12px; }
.cs-trend { display: inline-flex; align-items: center; gap: 2px; font-weight: 700; padding: 1px 6px; border-radius: 6px; }
.cs-trend svg { width: 13px; height: 13px; }
.cs-trend.up { color: var(--ok); background: var(--ok-bg); }
.cs-trend.down { color: var(--danger); background: var(--danger-bg); }
.cs-stat-spark { position: absolute; right: 0; bottom: 0; width: 92px; height: 46px; opacity: 0.85; }

.cs-plat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.cs-plat { padding: 16px; position: relative; overflow: hidden; }
.cs-plat-glow { position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; border-radius: 50%; filter: blur(34px); opacity: 0.4; pointer-events: none; }
.cs-plat-top { display: flex; align-items: center; gap: 11px; position: relative; }
.cs-plat-logo { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; color: #fff; flex-shrink: 0; box-shadow: inset 0 1px 0 rgba(255,255,255,0.25); }
.cs-plat-logo svg { width: 22px; height: 22px; }
.cs-plat-name { font-weight: 700; font-size: 14px; }
.cs-plat-user { font-size: 12px; color: var(--ink-3); }
.cs-plat-meta { display: flex; gap: 18px; margin: 15px 0 14px; position: relative; }
.cs-plat-meta .k { font-size: 11px; color: var(--ink-4); display: flex; align-items: center; gap: 4px; }
.cs-plat-meta .k svg { width: 12px; height: 12px; }
.cs-plat-meta .v { font-weight: 700; font-size: 14px; margin-top: 3px; }
.cs-plat-actions { display: flex; gap: 7px; position: relative; }
.cs-plat-add { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 11px; text-align: center; border: 1.5px dashed var(--border-2); border-radius: var(--r-lg); padding: 20px; cursor: pointer; transition: border-color .18s, background .18s, transform .18s; min-height: 100%; }
.cs-plat-add:hover { border-color: var(--accent); background: var(--accent-soft); transform: translateY(-3px); }
.cs-plat-add-ico { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }

.cs-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; }
.cs-select { display: inline-flex; align-items: center; gap: 7px; background: var(--surface); border: 1px solid var(--border); color: var(--ink-2); border-radius: var(--r-sm); padding: 8px 11px; font-size: 12.5px; font-weight: 500; font-family: inherit; cursor: pointer; transition: border-color .15s, background .15s, color .15s; }
.cs-select:hover { border-color: var(--border-2); color: var(--ink); }
.cs-select svg { width: 14px; height: 14px; opacity: 0.7; }
.cs-seg { display: inline-flex; background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-sm); padding: 3px; gap: 2px; }
.cs-seg button { display: grid; place-items: center; width: 32px; height: 28px; border-radius: 8px; border: none; background: none; color: var(--ink-3); cursor: pointer; transition: background .15s, color .15s; }
.cs-seg button svg { width: 16px; height: 16px; }
.cs-seg button.on { background: var(--accent-soft); color: #fff; }
.cs-chip-tab { padding: 7px 13px; border-radius: 99px; border: 1px solid var(--border); background: var(--surface); color: var(--ink-2); font-size: 12.5px; font-weight: 600; cursor: pointer; transition: all .15s; font-family: inherit; }
.cs-chip-tab:hover { color: var(--ink); border-color: var(--border-2); }
.cs-chip-tab.on { background: var(--accent-soft); color: #fff; border-color: rgba(139,92,246,0.3); }

.cs-vid-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cs-vid { overflow: hidden; }
.cs-vid-thumb { aspect-ratio: 16/9; position: relative; display: grid; place-items: center; overflow: hidden; }
.cs-vid-thumb .ov { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.55)); }
.cs-vid-play { width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.16); backdrop-filter: blur(6px); display: grid; place-items: center; border: 1px solid rgba(255,255,255,0.3); position: relative; transition: transform .2s, background .2s; }
.cs-vid:hover .cs-vid-play { transform: scale(1.12); background: rgba(255,255,255,0.26); }
.cs-vid-play svg { width: 20px; height: 20px; color: #fff; margin-left: 2px; }
.cs-vid-dur { position: absolute; bottom: 9px; right: 9px; background: rgba(0,0,0,0.72); color: #fff; font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 6px; z-index: 2; }
.cs-vid-plat { position: absolute; top: 9px; left: 9px; z-index: 2; display: flex; align-items: center; gap: 5px; background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); padding: 3px 8px 3px 6px; border-radius: 99px; font-size: 11px; font-weight: 600; color: #fff; }
.cs-vid-plat .pdot { width: 14px; height: 14px; border-radius: 4px; display: grid; place-items: center; }
.cs-vid-plat .pdot svg { width: 9px; height: 9px; color: #fff; }
.cs-vid-status { position: absolute; top: 9px; right: 9px; z-index: 2; }
.cs-vid-body { padding: 13px 14px 14px; }
.cs-vid-title { font-weight: 600; font-size: 13.5px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 38px; }
.cs-vid-date { font-size: 11.5px; color: var(--ink-4); margin-top: 5px; display: flex; align-items: center; gap: 5px; }
.cs-vid-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin: 13px 0; padding: 11px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.cs-vid-stat { text-align: center; }
.cs-vid-stat svg { width: 14px; height: 14px; color: var(--ink-4); margin-bottom: 4px; }
.cs-vid-stat .n { font-size: 12px; font-weight: 700; }
.cs-vid-rev { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.cs-vid-rev .lbl { font-size: 11.5px; color: var(--ink-3); display: flex; align-items: center; gap: 5px; }
.cs-vid-rev .amt { font-weight: 700; font-size: 14px; color: var(--ok); }
.cs-vid-actions { display: flex; gap: 6px; flex-wrap: wrap; }
.cs-vid-actions .cs-btn { flex: 1; min-width: 0; }

.cs-vid-list { display: flex; flex-direction: column; gap: 11px; }
.cs-vrow { display: flex; gap: 15px; padding: 12px; align-items: center; }
.cs-vrow-thumb { width: 158px; aspect-ratio: 16/9; border-radius: var(--r); flex-shrink: 0; position: relative; overflow: hidden; display: grid; place-items: center; }
.cs-vrow-main { flex: 1; min-width: 0; }
.cs-vrow-stats { display: flex; gap: 22px; flex-shrink: 0; }
.cs-vrow-stats .k { font-size: 11px; color: var(--ink-4); }
.cs-vrow-stats .v { font-weight: 700; font-size: 13px; margin-top: 2px; }

.cs-pagination { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 26px; }
.cs-page { min-width: 34px; height: 34px; border-radius: var(--r-xs); border: 1px solid var(--border); background: var(--surface); color: var(--ink-2); font-weight: 600; font-size: 13px; cursor: pointer; display: grid; place-items: center; transition: all .15s; font-family: inherit; }
.cs-page:hover { border-color: var(--border-2); color: var(--ink); }
.cs-page.on { background: linear-gradient(135deg, var(--ai-1), var(--ai-2)); color: #fff; border-color: transparent; }
.cs-page:disabled { opacity: 0.4; cursor: default; }

.cs-drop { border: 1.8px dashed var(--border-2); border-radius: var(--r-xl); padding: 46px 30px; text-align: center; position: relative; overflow: hidden; transition: border-color .2s, background .2s; cursor: pointer; background: radial-gradient(500px 200px at 50% -10%, rgba(139,92,246,0.1), transparent 70%); }
.cs-drop:hover, .cs-drop.drag { border-color: var(--accent); background: radial-gradient(500px 240px at 50% -10%, rgba(139,92,246,0.2), transparent 70%); }
.cs-drop-ico { width: 70px; height: 70px; border-radius: 20px; margin: 0 auto 18px; display: grid; place-items: center; background: linear-gradient(135deg, rgba(168,85,247,0.22), rgba(99,102,241,0.16)); border: 1px solid rgba(168,85,247,0.3); color: var(--accent); position: relative; }
.cs-drop-ico svg { width: 32px; height: 32px; }
.cs-drop h3 { font-size: 17px; font-weight: 700; letter-spacing: -0.02em; }
.cs-drop p { color: var(--ink-3); font-size: 13px; margin-top: 7px; }
.cs-format-row { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 18px; }
.cs-format { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: var(--ink-2); background: var(--surface-2); border: 1px solid var(--border); padding: 6px 11px; border-radius: 99px; }
.cs-format svg { width: 14px; height: 14px; color: var(--accent); }

.cs-progress { height: 8px; border-radius: 99px; background: var(--surface-3); overflow: hidden; position: relative; }
.cs-progress-bar { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--ai-1), var(--ai-2), var(--ai-3)); background-size: 200% 100%; animation: cs-flow 2s linear infinite; transition: width .3s ease; box-shadow: 0 0 12px var(--accent-glow); }
.cs-meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 11px; }
.cs-meta-item { background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--r); padding: 13px; }
.cs-meta-item .k { font-size: 11px; color: var(--ink-3); display: flex; align-items: center; gap: 6px; }
.cs-meta-item .k svg { width: 13px; height: 13px; color: var(--ink-4); }
.cs-meta-item .v { font-weight: 700; font-size: 14px; margin-top: 6px; }
.cs-ai-detect { border: 1px solid rgba(139,92,246,0.25); border-radius: var(--r-lg); padding: 17px; background: linear-gradient(180deg, rgba(139,92,246,0.07), transparent); }
.cs-detect-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed var(--border); }
.cs-detect-row:last-child { border-bottom: none; }
.cs-detect-row .k { font-size: 13px; color: var(--ink-2); display: flex; align-items: center; gap: 8px; }
.cs-detect-row .k svg { width: 15px; height: 15px; color: var(--accent); }
.cs-detect-row .v { font-weight: 600; font-size: 13px; }

.cs-quality-ring { width: 120px; height: 120px; position: relative; }
.cs-quality-ring .lbl { position: absolute; inset: 0; display: grid; place-items: center; flex-direction: column; text-align: center; }
.cs-ai-grid { display: grid; grid-template-columns: 360px 1fr; gap: 20px; align-items: start; }
.cs-ai-preview { position: sticky; top: 84px; }
.cs-ai-vid { aspect-ratio: 16/9; border-radius: var(--r-lg); overflow: hidden; position: relative; display: grid; place-items: center; border: 1px solid var(--border); }
.cs-ai-cards { display: flex; flex-direction: column; gap: 16px; }
.cs-aicard { position: relative; padding: 17px; border-radius: var(--r-lg); border: 1px solid var(--border); background: var(--surface); overflow: hidden; }
.cs-aicard.aura::before { content:""; position:absolute; inset:0; border-radius: inherit; padding:1px; background: linear-gradient(120deg, rgba(168,85,247,0.5), rgba(99,102,241,0.2), rgba(236,72,153,0.4)); background-size: 200% 200%; animation: cs-aura 6s linear infinite; -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events:none; }
.cs-aicard-head { display: flex; align-items: center; gap: 9px; margin-bottom: 15px; position: relative; }
.cs-aicard-head .ico { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); flex-shrink: 0; }
.cs-aicard-head .ico svg { width: 16px; height: 16px; }
.cs-aicard-head h4 { font-size: 14px; font-weight: 700; letter-spacing: -0.01em; }
.cs-aicard-head .sub { font-size: 11px; color: var(--ink-4); }
.cs-aicard-head .tools { margin-left: auto; display: flex; gap: 5px; }

.cs-title-item { display: flex; align-items: center; gap: 10px; padding: 11px 12px; border-radius: var(--r); border: 1px solid var(--border); background: var(--surface-2); transition: border-color .15s, background .15s; }
.cs-title-item:hover { border-color: var(--border-2); background: var(--surface-3); }
.cs-title-item .num { width: 22px; height: 22px; border-radius: 6px; background: var(--accent-soft); color: var(--accent); font-size: 11px; font-weight: 700; display: grid; place-items: center; flex-shrink: 0; }
.cs-title-item .txt { flex: 1; font-size: 13px; font-weight: 500; min-width: 0; }
.cs-title-item .acts { display: flex; gap: 3px; opacity: 0.55; transition: opacity .15s; }
.cs-title-item:hover .acts { opacity: 1; }
.cs-mini-ico { width: 28px; height: 28px; border-radius: 7px; display: grid; place-items: center; border: none; background: none; color: var(--ink-3); cursor: pointer; transition: background .15s, color .15s; }
.cs-mini-ico svg { width: 15px; height: 15px; }
.cs-mini-ico:hover { background: var(--hover); color: var(--ink); }
.cs-mini-ico.fav { color: var(--warn); }

.cs-textarea { width: 100%; background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--r); padding: 13px; color: var(--ink); font-family: inherit; font-size: 13px; line-height: 1.65; resize: vertical; min-height: 120px; outline: none; transition: border-color .15s, box-shadow .15s; }
.cs-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }

.cs-chips { display: flex; flex-wrap: wrap; gap: 7px; }
.cs-tag { font-size: 12.5px; font-weight: 600; padding: 5px 11px; border-radius: 99px; cursor: pointer; transition: transform .12s, background .15s; background: var(--accent-soft); color: #d6bcfa; border: 1px solid rgba(139,92,246,0.25); }
.cs-tag:hover { transform: translateY(-1px); background: rgba(139,92,246,0.22); }
.cs-kw { font-size: 12.5px; font-weight: 600; padding: 6px 12px; border-radius: var(--r-xs); background: var(--surface-2); border: 1px solid var(--border-2); color: var(--ink); display: inline-flex; align-items: center; gap: 6px; }
.cs-kw svg { width: 12px; height: 12px; color: var(--accent); }

.cs-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.cs-suggest { padding: 12px 13px; border-radius: var(--r); border: 1px solid var(--border); background: var(--surface-2); font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: space-between; gap: 8px; transition: border-color .15s, background .15s; }
.cs-suggest:hover { border-color: var(--border-2); background: var(--surface-3); }
.cs-hook { padding: 12px 13px; border-radius: var(--r); border: 1px solid var(--border); background: var(--surface-2); display: flex; gap: 10px; align-items: flex-start; transition: border-color .15s; }
.cs-hook:hover { border-color: rgba(236,72,153,0.3); }
.cs-hook .qi { color: var(--ai-3); flex-shrink: 0; margin-top: 1px; }
.cs-hook .qi svg { width: 15px; height: 15px; }
.cs-hook .txt { font-size: 13px; font-weight: 500; font-style: italic; color: var(--ink); }

.cs-chapters { display: flex; flex-direction: column; }
.cs-chap { display: flex; align-items: center; gap: 13px; padding: 10px 0; position: relative; }
.cs-chap .time { font-size: 12px; font-weight: 700; color: var(--accent); width: 46px; flex-shrink: 0; }
.cs-chap .node { width: 11px; height: 11px; border-radius: 50%; border: 2px solid var(--accent); background: var(--surface); flex-shrink: 0; z-index: 2; }
.cs-chap .label { font-size: 13px; font-weight: 500; }
.cs-chap::after { content:""; position: absolute; left: 51px; top: 22px; bottom: -6px; width: 2px; background: var(--border-2); }
.cs-chap:last-child::after { display: none; }

.cs-transcript { max-height: 240px; overflow-y: auto; padding-right: 8px; display: flex; flex-direction: column; gap: 13px; }
.cs-tline { display: flex; gap: 12px; }
.cs-tline .ts { font-size: 11px; font-weight: 600; color: var(--ink-4); width: 42px; flex-shrink: 0; padding-top: 1px; }
.cs-tline .tt { font-size: 13px; color: var(--ink-2); line-height: 1.6; }
.cs-summary { font-size: 13.5px; line-height: 1.7; color: var(--ink-2); }
.cs-summary b { color: var(--ink); font-weight: 600; }

.cs-widget { margin-bottom: 22px; }
.cs-widget-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.cs-widget-title { font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 8px; letter-spacing: -0.01em; }
.cs-widget-title svg { width: 15px; height: 15px; color: var(--accent); }
.cs-widget-more { font-size: 11.5px; color: var(--ink-3); font-weight: 600; cursor: pointer; }
.cs-widget-more:hover { color: var(--accent); }

.cs-act { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
.cs-act:last-child { border-bottom: none; }
.cs-act-ico { width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; flex-shrink: 0; }
.cs-act-ico svg { width: 15px; height: 15px; }
.cs-act .t { font-size: 12.5px; font-weight: 500; line-height: 1.4; }
.cs-act .ti { font-size: 11px; color: var(--ink-4); margin-top: 2px; }

.cs-credit-card { border-radius: var(--r-lg); padding: 16px; background: linear-gradient(150deg, rgba(251,191,36,0.12), rgba(168,85,247,0.08)); border: 1px solid rgba(251,191,36,0.2); }
.cs-credit-bar { height: 7px; border-radius: 99px; background: rgba(255,255,255,0.08); overflow: hidden; margin: 12px 0 8px; }
.cs-credit-bar i { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--warn), var(--ai-3)); }

.cs-queue { display: flex; gap: 10px; padding: 9px 0; align-items: center; }
.cs-queue-thumb { width: 44px; height: 30px; border-radius: 7px; flex-shrink: 0; position: relative; overflow: hidden; display: grid; place-items: center; }
.cs-queue .t { font-size: 12px; font-weight: 500; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.cs-queue .m { font-size: 10.5px; color: var(--ink-4); margin-top: 2px; }

.cs-tip { background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--r); padding: 12px; display: flex; gap: 10px; }
.cs-tip svg { width: 16px; height: 16px; color: var(--warn); flex-shrink: 0; margin-top: 1px; }
.cs-tip p { font-size: 12px; color: var(--ink-2); line-height: 1.5; }

.cs-trend-row { display: flex; align-items: center; gap: 11px; padding: 9px 0; cursor: pointer; }
.cs-trend-row:hover .tt { color: var(--accent); }
.cs-trend-rank { font-size: 13px; font-weight: 800; color: var(--ink-4); width: 18px; }
.cs-trend-row .tt { font-size: 12.5px; font-weight: 600; transition: color .15s; }
.cs-trend-row .tm { font-size: 11px; color: var(--ink-4); margin-top: 1px; }

.cs-suggest-card { border-radius: var(--r); padding: 13px; border: 1px solid rgba(139,92,246,0.22); background: linear-gradient(180deg, rgba(139,92,246,0.08), transparent); }
.cs-suggest-card .h { display: flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 700; }
.cs-suggest-card .h svg { width: 15px; height: 15px; color: var(--accent); }
.cs-suggest-card p { font-size: 12px; color: var(--ink-2); margin: 8px 0 11px; line-height: 1.5; }

.cs-sk { background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 37%, rgba(255,255,255,0.04) 63%); background-size: 400% 100%; animation: cs-shimmer 1.4s ease infinite; border-radius: 8px; }

.cs-empty { text-align: center; padding: 50px 20px; }
.cs-empty-ico { width: 64px; height: 64px; border-radius: 18px; margin: 0 auto 16px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }
.cs-empty-ico svg { width: 30px; height: 30px; }
.cs-divider { height: 1px; background: var(--border); margin: 18px 0; }
.cs-mobile-only { display: none; }
.cs-row { display: flex; align-items: center; gap: 10px; }
.cs-spread { display: flex; align-items: center; justify-content: space-between; gap: 12px; }

.cs-toast { position: fixed; bottom: 26px; left: 50%; transform: translateX(-50%); z-index: 100; background: var(--surface-3); border: 1px solid var(--border-2); border-radius: 99px; padding: 10px 18px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 9px; box-shadow: var(--shadow-lg); animation: cs-toast-in .25s ease; }
.cs-toast svg { width: 16px; height: 16px; color: var(--ok); }

.cs-settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.cs-setting-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--border); }
.cs-setting-row:last-child { border-bottom: none; }
.cs-setting-row .st { font-size: 13.5px; font-weight: 600; }
.cs-setting-row .ss { font-size: 12px; color: var(--ink-3); margin-top: 2px; }
.cs-switch { width: 42px; height: 24px; border-radius: 99px; background: var(--surface-3); border: 1px solid var(--border-2); position: relative; cursor: pointer; transition: background .2s, border-color .2s; flex-shrink: 0; }
.cs-switch i { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: var(--ink-3); transition: transform .2s, background .2s; }
.cs-switch.on { background: var(--accent-soft); border-color: var(--accent); }
.cs-switch.on i { transform: translateX(18px); background: var(--accent); }

.cs-notif-row { display: flex; gap: 13px; padding: 15px; border-radius: var(--r); transition: background .15s; cursor: pointer; }
.cs-notif-row:hover { background: var(--hover); }
.cs-notif-row.unread { background: var(--accent-soft); }
.cs-notif-ico { width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center; flex-shrink: 0; }
.cs-notif-ico svg { width: 18px; height: 18px; }
.cs-notif .nt { font-size: 13.5px; font-weight: 500; line-height: 1.45; }
.cs-notif .nm { font-size: 11.5px; color: var(--ink-4); margin-top: 4px; }

@keyframes cs-shimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }
@keyframes cs-flow { 0% { background-position: 0 0; } 100% { background-position: 200% 0; } }
@keyframes cs-aura { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
@keyframes cs-wave { 0%,60%,100% { transform: rotate(0deg); } 20% { transform: rotate(16deg); } 40% { transform: rotate(-8deg); } }
@keyframes cs-ping { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.5); opacity: 0; } }
@keyframes cs-pop { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes cs-toast-in { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
@keyframes cs-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cs-spin { to { transform: rotate(360deg); } }
.cs-fade { animation: cs-fade-up .5s cubic-bezier(.2,.7,.3,1) both; }
.cs-spin { animation: cs-spin .8s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .cs-root *, .cs-root *::before, .cs-root *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}

@media (max-width: 1320px) {
  .cs-rightbar { display: none; }
}
@media (max-width: 1080px) {
  .cs-stat-grid { grid-template-columns: repeat(2, 1fr); }
  .cs-plat-grid { grid-template-columns: repeat(2, 1fr); }
  .cs-vid-grid { grid-template-columns: repeat(2, 1fr); }
  .cs-ai-grid { grid-template-columns: 1fr; }
  .cs-ai-preview { position: static; }
  .cs-hero-stats { display: none; }
}
@media (max-width: 860px) {
  .cs-sidebar { position: fixed; left: 0; top: 0; transform: translateX(-100%); transition: transform .25s ease; box-shadow: var(--shadow-lg); }
  .cs-sidebar.open { transform: translateX(0); }
  .cs-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 38; backdrop-filter: blur(2px); }
  .cs-overlay.show { display: block; }
  .cs-mobile-only { display: inline-grid; }
  .cs-content { padding: 18px 16px 80px; }
  .cs-topbar { padding: 12px 16px; }
  .cs-search .cs-kbd { display: none; }
  .cs-hero { padding: 24px 20px; }
  .cs-hero h1 { font-size: 23px; }
  .cs-settings-grid { grid-template-columns: 1fr; }
  .cs-meta-grid { grid-template-columns: repeat(2, 1fr); }
  .cs-vrow-stats { display: none; }
  .cs-vrow-thumb { width: 110px; }
}
@media (max-width: 560px) {
  .cs-stat-grid, .cs-plat-grid, .cs-vid-grid { grid-template-columns: 1fr; }
  .cs-credits span { display: none; }
  .cs-grid2 { grid-template-columns: 1fr; }
}
`;

const spark = (s) => s.map((v, i) => ({ i, v }));

const PLATFORMS = [
  { id: "youtube", name: "YouTube", Icon: Youtube, color: "#FF3D3D", grad: "linear-gradient(135deg,#FF4747,#CC0000)", connected: true, user: "@creatorstudio", followers: "847K", expiry: "Mar 14, 2026" },
  { id: "tiktok", name: "TikTok", Icon: Music2, color: "#26E0E5", grad: "linear-gradient(135deg,#00F2EA,#FF0050)", connected: true, user: "@creator.studio", followers: "1.2M", expiry: "Feb 02, 2026" },
  { id: "instagram", name: "Instagram", Icon: Instagram, color: "#E1306C", grad: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)", connected: true, user: "@creator.studio", followers: "523K", expiry: "Apr 22, 2026" },
  { id: "x", name: "X (Twitter)", Icon: Twitter, color: "#888", grad: "linear-gradient(135deg,#2b2b2b,#000)", connected: true, user: "@creatorhq", followers: "284K", expiry: "Jan 30, 2026" },
  { id: "facebook", name: "Facebook", Icon: Facebook, color: "#1877F2", grad: "linear-gradient(135deg,#3B82F6,#1877F2)", connected: false, user: "—", followers: "—", expiry: "—" },
  { id: "linkedin", name: "LinkedIn", Icon: Linkedin, color: "#0A66C2", grad: "linear-gradient(135deg,#2E8BD8,#0A66C2)", connected: false, user: "—", followers: "—", expiry: "—" },
  { id: "pinterest", name: "Pinterest", Icon: Pin, color: "#E60023", grad: "linear-gradient(135deg,#FF4458,#E60023)", connected: false, user: "—", followers: "—", expiry: "—" },
  { id: "snapchat", name: "Snapchat", Icon: Ghost, color: "#F5C400", grad: "linear-gradient(135deg,#FFFC00,#F5C400)", connected: false, user: "—", followers: "—", expiry: "—" },
];

const STATS = [
  { id: "accounts", label: "Connected Accounts", value: 4, suffix: "", trend: 33.3, up: true, Icon: Link2, color: "#a855f7", bg: "rgba(168,85,247,0.14)", data: spark([2,2,3,3,4,4,4]) },
  { id: "followers", label: "Total Followers", value: 2854000, display: "2.85M", trend: 12.4, up: true, Icon: Users, color: "#34d399", bg: "rgba(52,211,153,0.14)", data: spark([12,18,15,26,24,32,40]) },
  { id: "views", label: "Monthly Views", value: 18400000, display: "18.4M", trend: 8.7, up: true, Icon: Eye, color: "#60a5fa", bg: "rgba(96,165,250,0.14)", data: spark([30,28,42,38,52,48,64]) },
  { id: "revenue", label: "Revenue (MTD)", value: 47280, prefix: "$", display: "$47,280", trend: 5.2, up: true, Icon: DollarSign, color: "#fbbf24", bg: "rgba(251,191,36,0.14)", data: spark([20,32,28,40,44,38,54]) },
  { id: "uploads", label: "Recent Uploads", value: 28, suffix: "", trend: 3.1, up: false, Icon: Video, color: "#f472b6", bg: "rgba(244,114,182,0.14)", data: spark([8,6,9,7,5,6,4]) },
  { id: "notifs", label: "Notifications", value: 12, suffix: "", trend: 18.0, up: true, Icon: Bell, color: "#22d3ee", bg: "rgba(34,211,238,0.14)", data: spark([2,4,3,5,4,6,5]) },
];

const VID_GRADS = [
  "linear-gradient(135deg,#7c3aed,#db2777)", "linear-gradient(135deg,#0ea5e9,#6366f1)",
  "linear-gradient(135deg,#f59e0b,#ef4444)", "linear-gradient(135deg,#10b981,#06b6d4)",
  "linear-gradient(135deg,#8b5cf6,#3b82f6)", "linear-gradient(135deg,#ec4899,#8b5cf6)",
  "linear-gradient(135deg,#14b8a6,#3b82f6)", "linear-gradient(135deg,#f43f5e,#f59e0b)",
  "linear-gradient(135deg,#6366f1,#a855f7)",
];
const platById = (id) => PLATFORMS.find((p) => p.id === id);

const VIDEOS = [
  { id: 1, title: "10 SEO Tricks That Actually Work in 2026", plat: "youtube", date: "2 days ago", dur: "12:48", views: "342K", likes: "28.4K", comments: "1.2K", shares: "4.3K", revenue: "$2,840", status: "published", g: 0 },
  { id: 2, title: "How I Grew to 1M Followers (Full Strategy)", plat: "tiktok", date: "4 days ago", dur: "0:58", views: "1.8M", likes: "214K", comments: "8.9K", shares: "42K", revenue: "$5,120", status: "published", g: 1 },
  { id: 3, title: "5 AI Tools Every Creator Should Use", plat: "instagram", date: "1 week ago", dur: "1:24", views: "523K", likes: "67K", comments: "3.1K", shares: "12K", revenue: "$1,680", status: "published", g: 2 },
  { id: 4, title: "Why Your Videos Aren't Growing (Honest Take)", plat: "youtube", date: "Scheduled · Tomorrow", dur: "15:32", views: "—", likes: "—", comments: "—", shares: "—", revenue: "$0", status: "scheduled", g: 3 },
  { id: 5, title: "The Secret Behind Every Viral Short", plat: "tiktok", date: "Draft", dur: "0:42", views: "—", likes: "—", comments: "—", shares: "—", revenue: "$0", status: "draft", g: 4 },
  { id: 6, title: "Building a Personal Brand From Zero", plat: "x", date: "3 days ago", dur: "8:15", views: "186K", likes: "19K", comments: "2.4K", shares: "6.8K", revenue: "$940", status: "published", g: 5 },
  { id: 7, title: "My Honest Camera & Gear Setup Tour", plat: "youtube", date: "5 days ago", dur: "18:04", views: "274K", likes: "31K", comments: "1.9K", shares: "3.2K", revenue: "$3,210", status: "published", g: 6 },
  { id: 8, title: "Posting Every Day for 30 Days — Results", plat: "instagram", date: "Scheduled · Fri", dur: "2:10", views: "—", likes: "—", comments: "—", shares: "—", revenue: "$0", status: "scheduled", g: 7 },
  { id: 9, title: "Content Calendar That Saved My Sanity", plat: "tiktok", date: "Draft", dur: "1:05", views: "—", likes: "—", comments: "—", shares: "—", revenue: "$0", status: "draft", g: 8 },
];

const AI_TITLES_POOL = [
  "10 SEO Tricks That Actually Work in 2026",
  "How I Grew to 100K Followers in 90 Days",
  "5 AI Tools Every Creator Should Be Using",
  "Why Your Videos Aren't Growing (The Truth)",
  "The Secret Behind Every Viral Short",
  "Stop Doing This If You Want to Grow Faster",
  "I Tested 50 Hooks — Here's What Worked",
  "The Algorithm Update Nobody Is Talking About",
  "Watch This Before You Post Again",
  "How Top Creators Edit in Half the Time",
];
const AI_HASHTAGS = ["#SEO", "#AI", "#Marketing", "#NextJS", "#Programming", "#ContentCreator", "#Growth", "#Shorts", "#CreatorTips", "#ViralVideo"];
const AI_KEYWORDS = ["SEO Strategy", "AI Tools", "Digital Marketing", "Content Creation", "YouTube SEO", "Social Media Growth", "Video Optimization", "Audience Retention"];
const AI_THUMB_TEXT = ["Don't Make This Mistake", "Top 5 AI Hacks", "You Need This Tool", "Watch Before Uploading", "Grow Faster Today"];
const AI_HOOKS = [
  "Most creators make this one mistake...",
  "Stop scrolling — this changes everything.",
  "Nobody talks about this growth tactic...",
  "You won't believe what happened next...",
  "This single change tripled my views.",
];
const AI_CHAPTERS = [
  { t: "00:00", l: "Introduction" }, { t: "00:45", l: "The Core Problem" },
  { t: "02:20", l: "The Solution Framework" }, { t: "05:50", l: "Real Results & Data" },
  { t: "08:30", l: "Final Tips & Takeaways" },
];
const AI_TRANSCRIPT = [
  { ts: "0:00", tt: "Hey everyone, welcome back to the channel. Today we're diving into something that completely changed how I approach content." },
  { ts: "0:18", tt: "If you've been struggling to grow, you're probably making one of these five mistakes — and I made all of them." },
  { ts: "0:41", tt: "So let's start with the first one, because honestly this is the biggest needle-mover I've found." },
  { ts: "1:09", tt: "The data here is wild. When I switched my hook structure, retention jumped from 31% to over 58%." },
  { ts: "1:38", tt: "And that's the thing nobody tells you — the first three seconds decide everything about the video." },
];
const AI_DESCRIPTION = "In this video, I break down the exact SEO and growth strategies that took my channel from zero to 100K subscribers in under three months. We cover the hook formulas that actually retain viewers, the AI tools I use to script and edit faster, and the metadata tweaks most creators completely ignore. Whether you're just starting out or stuck at a plateau, these tactics are proven, repeatable, and work across every platform.\n\nTimestamps and free resources are linked below. Drop a comment with your biggest growth challenge — I read every one.";
const AI_SUMMARY = "This video delivers a practical, no-fluff playbook for creators who want faster, more reliable growth. It centers on three pillars: writing hooks that hold attention in the first three seconds, using AI to compress scripting and editing time, and optimizing the metadata most people overlook. Real retention data backs each claim, showing how a single hook change lifted watch-through from 31% to 58%. The framework is platform-agnostic and repeatable, making it equally useful for beginners and creators stuck at a plateau. The closing section distills everything into five actionable takeaways you can apply to your very next upload.";

const RECENT_AI = [
  { t: "Generated 5 titles for 'SEO Tricks'", ti: "2 min ago", Icon: Type, color: "#a855f7", bg: "rgba(168,85,247,0.14)" },
  { t: "Created hashtag set · 10 tags", ti: "14 min ago", Icon: Hash, color: "#34d399", bg: "rgba(52,211,153,0.14)" },
  { t: "Improved description draft", ti: "38 min ago", Icon: AlignLeft, color: "#60a5fa", bg: "rgba(96,165,250,0.14)" },
  { t: "Transcribed 'Brand Building'", ti: "1 hr ago", Icon: Mic, color: "#fbbf24", bg: "rgba(251,191,36,0.14)" },
];
const PUB_QUEUE = [
  { t: "Why Your Videos Aren't Growing", m: "YouTube · Tomorrow 9:00 AM", g: 3 },
  { t: "Posting Every Day for 30 Days", m: "Instagram · Fri 12:00 PM", g: 7 },
  { t: "Content Calendar Hacks", m: "TikTok · Sat 6:00 PM", g: 8 },
];
const QUICK_TIPS = [
  "Videos with custom thumbnails get 38% more clicks on average.",
  "Posting between 6–9 PM boosts first-hour reach on Shorts.",
  "Replying to comments in the first hour lifts retention signals.",
];
const TRENDING = [
  { t: "AI Content Tools", m: "+248% this week" },
  { t: "Faceless Channels", m: "+186% searches" },
  { t: "Short-Form Hooks", m: "+142% engagement" },
  { t: "Creator Monetization", m: "+97% interest" },
];
const NOTIFS_DATA = [
  { t: "Your video 'SEO Tricks' hit 300K views 🚀", nm: "12 minutes ago", Icon: TrendingUp, color: "#34d399", bg: "rgba(52,211,153,0.14)", unread: true },
  { t: "TikTok token expires in 4 days — refresh now", nm: "1 hour ago", Icon: Clock, color: "#fbbf24", bg: "rgba(251,191,36,0.14)", unread: true },
  { t: "AI finished generating content for 2 drafts", nm: "3 hours ago", Icon: Sparkles, color: "#a855f7", bg: "rgba(168,85,247,0.14)", unread: true },
  { t: "Scheduled post published to Instagram", nm: "Yesterday", Icon: CheckCircle2, color: "#60a5fa", bg: "rgba(96,165,250,0.14)", unread: false },
  { t: "New brand deal request from TechFlow", nm: "Yesterday", Icon: DollarSign, color: "#34d399", bg: "rgba(52,211,153,0.14)", unread: false },
  { t: "Weekly analytics report is ready to view", nm: "2 days ago", Icon: BarChart3, color: "#22d3ee", bg: "rgba(34,211,238,0.14)", unread: false },
];
const ANALYTICS_AREA = [
  { d: "Mon", views: 240, eng: 140 }, { d: "Tue", views: 318, eng: 180 }, { d: "Wed", views: 286, eng: 165 },
  { d: "Thu", views: 402, eng: 240 }, { d: "Fri", views: 478, eng: 290 }, { d: "Sat", views: 521, eng: 340 }, { d: "Sun", views: 612, eng: 410 },
];
const PLAT_SPLIT = [
  { name: "YouTube", value: 42, color: "#FF3D3D" }, { name: "TikTok", value: 31, color: "#26E0E5" },
  { name: "Instagram", value: 18, color: "#E1306C" }, { name: "X", value: 9, color: "#8b8b8b" },
];

function useCountUp(target, run, dur = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, dur]);
  return val;
}

function fmtStat(n, s) {
  if (s.display) {
    if (s.value >= 1000000) return (s.prefix || "") + (n / 1000000).toFixed(2) + "M";
    if (s.value >= 1000) return (s.prefix || "") + Math.round(n).toLocaleString();
    return (s.prefix || "") + Math.round(n).toLocaleString();
  }
  return (s.prefix || "") + Math.round(n).toLocaleString() + (s.suffix || "");
}

function Avatar({ size = 36, grad = "linear-gradient(135deg,#8b5cf6,#6366f1)", text = "MC", ring, img }) {
  return (
    <div className={"cs-av" + (ring ? " cs-av-ring" : "")} style={{ width: size, height: size, background: grad, fontSize: size * 0.36 }}>
      {img ? null : text}
    </div>
  );
}

function Sk({ w, h = 14, r = 8, style }) {
  return <div className="cs-sk" style={{ width: w, height: h, borderRadius: r, ...style }} />;
}

function StatusBadge({ status }) {
  const map = {
    published: { c: "cs-b-ok", t: "Published", I: CheckCircle2 },
    scheduled: { c: "cs-b-info", t: "Scheduled", I: Clock },
    draft: { c: "cs-b-warn", t: "Draft", I: Edit3 },
  };
  const m = map[status] || map.draft;
  return <span className={"cs-badge " + m.c}><m.I /> {m.t}</span>;
}

function Spark({ data, color }) {
  const id = "g" + color.replace(/[^a-z0-9]/gi, "");
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={"url(#" + id + ")"} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const NAV = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard, group: "Main" },
  { id: "ai", label: "AI Generator", Icon: Sparkles, badge: "AI", group: "Create" },
  { id: "upload", label: "Upload Center", Icon: UploadCloud, group: "Create" },
  { id: "library", label: "Video Library", Icon: Video, group: "Create" },
  { id: "accounts", label: "Connected Accounts", Icon: Link2, group: "Manage" },
  { id: "calendar", label: "Content Calendar", Icon: Calendar, group: "Manage" },
  { id: "inbox", label: "Engagement Inbox", Icon: Inbox, count: 3, group: "Manage" },
  { id: "analytics", label: "Analytics", Icon: BarChart3, group: "Grow" },
  { id: "trends", label: "Trends & Rivals", Icon: Flame, group: "Grow" },
  { id: "notifications", label: "Notifications", Icon: Bell, count: 3, group: "Account" },
  { id: "settings", label: "Settings", Icon: Settings, group: "Account" },
];
const NAV_GROUPS = ["Main", "Create", "Manage", "Grow", "Account"];

function Sidebar({ view, setView, open, onClose }) {
  return (
    <aside className={"cs-sidebar" + (open ? " open" : "")}>
      <div className="cs-brand">
        <div className="cs-brand-mark"><Clapperboard size={20} strokeWidth={2.2} /></div>
        <div>
          <div className="cs-brand-name">Influencers Studio</div>
          <div className="cs-brand-sub">AI Content Suite</div>
        </div>
      </div>

      <div className="cs-nav" style={{ overflowY: "auto", flex: "0 1 auto" }}>
        {NAV_GROUPS.map((g) => (
          <div key={g}>
            {g !== "Main" && <div className="cs-navlabel">{g}</div>}
            {NAV.filter((n) => n.group === g).map((n) => (
              <button key={n.id} className={"cs-navitem" + (view === n.id ? " active" : "")} onClick={() => { setView(n.id); onClose(); }}>
                <n.Icon /> {n.label}
                {n.badge && <span className="cs-badge cs-b-accent" style={{ marginLeft: "auto", fontSize: 9.5, padding: "1px 6px" }}>{n.badge}</span>}
                {n.count && <span className="cs-dot">{n.count}</span>}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="cs-side-bottom">
        <div className="cs-profile">
          <Avatar size={36} grad="linear-gradient(135deg,#f472b6,#8b5cf6)" text="MC" />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="cs-profile-name">Muhammad Creator</div>
            <div className="cs-profile-mail">hello@influencersstudio.io</div>
          </div>
          <ChevronDown size={15} style={{ color: "var(--ink-3)" }} />
        </div>
      </div>
    </aside>
  );
}

function Topbar({ onMenu, query, setQuery, onOpenPalette, theme, toggleTheme, credits }) {
  return (
    <header className="cs-topbar">
      <button className="cs-ico cs-mobile-only" onClick={onMenu}><Menu /></button>
      <div className="cs-search">
        <Search className="lead" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search videos, accounts, anything..." />
        <span className="cs-kbd cs-mono" onClick={onOpenPalette} style={{ cursor: "pointer" }}>⌘K</span>
      </div>
      <div className="cs-topbar-actions">
        <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={onOpenPalette} style={{ borderColor: "rgba(139,92,246,0.3)", color: "var(--accent)" }}>
          <Sparkles style={{ color: "var(--accent)" }} /> AI Search
        </button>
        <button className="cs-ico" onClick={toggleTheme} title={theme === "light" ? "Switch to dark" : "Switch to light"}>
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
        <div className="cs-credits">
          <Zap /> <b className="cs-mono">{credits.toLocaleString()}</b> <span>credits</span>
        </div>
        <button className="cs-ico"><Bell /><span className="cs-bdot" /></button>
        <Avatar size={36} grad="linear-gradient(135deg,#f472b6,#8b5cf6)" text="MC" ring />
      </div>
    </header>
  );
}

function StatCard({ s, run, delay }) {
  const v = useCountUp(s.value, run);
  return (
    <div className="cs-card cs-stat cs-hoverable cs-fade" style={{ animationDelay: delay + "ms" }}>
      <div className="cs-stat-top">
        <div className="cs-stat-ico" style={{ background: s.bg, color: s.color }}><s.Icon /></div>
        <span className={"cs-trend " + (s.up ? "up" : "down")}>
          {s.up ? <TrendingUp /> : <TrendingDown />}{s.trend}%
        </span>
      </div>
      <div className="cs-stat-label">{s.label}</div>
      <div className="cs-stat-value cs-mono">{fmtStat(v, s)}</div>
      <div className="cs-stat-foot" style={{ color: "var(--ink-4)" }}>vs. last month</div>
      <div className="cs-stat-spark"><Spark data={s.data} color={s.color} /></div>
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="cs-card cs-stat">
      <div className="cs-stat-top"><Sk w={38} h={38} r={11} /><Sk w={48} h={20} r={6} /></div>
      <Sk w={110} h={12} style={{ marginTop: 16 }} />
      <Sk w={130} h={26} style={{ marginTop: 8 }} />
      <Sk w={80} h={11} style={{ marginTop: 10 }} />
    </div>
  );
}

function PlatformCard({ p, onToggle, delay }) {
  return (
    <div className="cs-card cs-plat cs-hoverable cs-fade" style={{ animationDelay: delay + "ms" }}>
      <div className="cs-plat-glow" style={{ background: p.color }} />
      <div className="cs-plat-top">
        <div className="cs-plat-logo" style={{ background: p.grad }}><p.Icon /></div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="cs-plat-name">{p.name}</div>
          <div className="cs-plat-user">{p.user}</div>
        </div>
        {p.connected
          ? <span className="cs-badge cs-b-ok"><span style={{ width: 6, height: 6, borderRadius: 9, background: "var(--ok)", boxShadow: "0 0 6px var(--ok)" }} /> Connected</span>
          : <span className="cs-badge cs-b-muted">Not Connected</span>}
      </div>
      <div className="cs-plat-meta">
        <div>
          <div className="k"><Users /> Followers</div>
          <div className="v cs-mono">{p.followers}</div>
        </div>
        <div>
          <div className="k"><Calendar /> Token expiry</div>
          <div className="v" style={{ fontSize: 12.5, color: p.connected ? "var(--ink)" : "var(--ink-4)" }}>{p.expiry}</div>
        </div>
      </div>
      <div className="cs-plat-actions">
        {p.connected ? (
          <>
            <button className="cs-btn cs-btn-ghost cs-btn-sm" style={{ flex: 1 }}><RefreshCw /> Refresh</button>
            <button className="cs-btn cs-btn-danger cs-btn-sm" onClick={() => onToggle(p.id)} style={{ flex: 1 }}><Unlink /> Disconnect</button>
          </>
        ) : (
          <button className="cs-btn cs-btn-primary cs-btn-sm cs-btn-block" onClick={() => onToggle(p.id)}><Link2 /> Connect {p.name}</button>
        )}
      </div>
    </div>
  );
}

function Hero({ setView }) {
  return (
    <div className="cs-hero cs-fade">
      <span className="cs-hero-eyebrow"><Sparkles size={13} /> Your content command center</span>
      <h1>Welcome back, Creator <span className="wave">👋</span></h1>
      <p>Manage all your social media content from one place. Generate AI-powered titles, descriptions, hashtags, and optimize every upload — across every platform you run.</p>
      <div className="cs-hero-actions">
        <button className="cs-btn cs-btn-primary" onClick={() => setView("upload")}><Upload /> Upload New Video</button>
        <button className="cs-btn cs-btn-ghost" onClick={() => setView("accounts")} style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.16)" }}><Link2 /> Connect Platform</button>
      </div>
      <div className="cs-hero-stats">
        <div className="cs-hero-stat"><div className="v cs-mono">2.85M</div><div className="l">Total reach</div></div>
        <div className="cs-hero-stat"><div className="v cs-mono">+12.4%</div><div className="l">Growth · 30d</div></div>
        <div className="cs-hero-stat"><div className="v cs-mono">98</div><div className="l">Content score</div></div>
      </div>
    </div>
  );
}

function DashboardView({ loading, platforms, onToggle, setView, onOpen, videos = VIDEOS }) {
  const connected = platforms.filter((p) => p.connected);
  return (
    <div>
      <Hero setView={setView} />

      {!loading && <TokenReminder platforms={platforms} />}
      {!loading && <OnboardingChecklist setView={setView} />}

      <div className="cs-sec-head">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><BarChart3 /></span> Overview</div>
          <div className="cs-sec-sub">Your performance at a glance, updated in real time.</div>
        </div>
        <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => setView("analytics")}><BarChart3 /> Full analytics</button>
      </div>
      <div className="cs-stat-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)
          : STATS.map((s, i) => <StatCard key={s.id} s={s} run={!loading} delay={i * 60} />)}
      </div>

      <div className="cs-sec-head">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Link2 /></span> Connected Accounts</div>
          <div className="cs-sec-sub">{connected.length} of {platforms.length} platforms linked.</div>
        </div>
        <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => setView("accounts")}>Manage all <ChevronRight size={14} /></button>
      </div>
      <div className="cs-plat-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="cs-card cs-plat"><div className="cs-plat-top"><Sk w={42} h={42} r={12} /><div style={{ flex: 1 }}><Sk w={90} h={13} /><Sk w={70} h={11} style={{ marginTop: 7 }} /></div></div><Sk w="100%" h={36} style={{ marginTop: 18 }} /><Sk w="100%" h={30} style={{ marginTop: 12 }} /></div>)
          : (connected.length > 0 ? connected : platforms).slice(0, 4).map((p, i) => <PlatformCard key={p.id} p={p} onToggle={onToggle} delay={i * 60} />)}
      </div>

      <div className="cs-sec-head">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Video /></span> Recent Uploads</div>
          <div className="cs-sec-sub">Your latest content across all platforms.</div>
        </div>
        <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => setView("library")}>View library <ChevronRight size={14} /></button>
      </div>
      <div className="cs-vid-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <VideoSkeleton key={i} />)
          : videos.slice(0, 3).map((v, i) => <VideoCard key={v.id} v={v} setView={setView} delay={i * 60} onOpen={onOpen} />)}
      </div>
    </div>
  );
}

function AccountsView({ platforms, onToggle }) {
  const connected = platforms.filter((p) => p.connected).length;
  return (
    <div>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Link2 /></span> Connected Social Accounts</div>
          <div className="cs-sec-sub">{connected} connected · {platforms.length - connected} available to link.</div>
        </div>
        <button className="cs-btn cs-btn-primary cs-btn-sm"><Plus /> Connect New Platform</button>
      </div>
      <div className="cs-plat-grid">
        {platforms.map((p, i) => <PlatformCard key={p.id} p={p} onToggle={onToggle} delay={i * 40} />)}
        <div className="cs-plat-add cs-fade" style={{ animationDelay: platforms.length * 40 + "ms" }}>
          <div className="cs-plat-add-ico"><Plus size={24} /></div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Connect New Platform</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>Link another account to manage it here</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatChip({ id }) {
  const p = platById(id);
  if (!p) return null;
  return (
    <div className="cs-vid-plat">
      <span className="pdot" style={{ background: p.grad }}><p.Icon /></span>{p.name.split(" ")[0]}
    </div>
  );
}

function VideoCard({ v, setView, delay = 0, onOpen }) {
  return (
    <div className="cs-card cs-vid cs-hoverable cs-fade" style={{ animationDelay: delay + "ms" }}>
      <div className="cs-vid-thumb" style={{ background: VID_GRADS[v.g], cursor: "pointer" }} onClick={() => onOpen && onOpen(v)}>
        <div className="ov" />
        <PlatChip id={v.plat} />
        <div className="cs-vid-status"><StatusBadge status={v.status} /></div>
        <div className="cs-vid-play"><Play fill="#fff" /></div>
        <div className="cs-vid-dur cs-mono">{v.dur}</div>
      </div>
      <div className="cs-vid-body">
        <div className="cs-vid-title">{v.title}</div>
        <div className="cs-vid-date"><Calendar size={12} /> {v.date}</div>
        <div className="cs-vid-stats">
          <div className="cs-vid-stat"><Eye /><div className="n cs-mono">{v.views}</div></div>
          <div className="cs-vid-stat"><Heart /><div className="n cs-mono">{v.likes}</div></div>
          <div className="cs-vid-stat"><MessageCircle /><div className="n cs-mono">{v.comments}</div></div>
          <div className="cs-vid-stat"><Share2 /><div className="n cs-mono">{v.shares}</div></div>
        </div>
        <div className="cs-vid-rev">
          <span className="lbl"><DollarSign size={13} /> Revenue</span>
          <span className="amt cs-mono">{v.revenue}</span>
        </div>
        <div className="cs-vid-actions">
          <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => onOpen && onOpen(v)}><Eye /> View</button>
          <button className="cs-btn cs-btn-ghost cs-btn-sm"><Edit3 /> Edit</button>
          <button className="cs-btn cs-btn-primary cs-btn-sm" onClick={() => setView("ai")}><Sparkles /> AI</button>
          <button className="cs-ico cs-ico-sm"><MoreVertical /></button>
        </div>
      </div>
    </div>
  );
}

function VideoRow({ v, setView, onOpen }) {
  return (
    <div className="cs-card cs-vrow cs-hoverable cs-fade">
      <div className="cs-vrow-thumb" style={{ background: VID_GRADS[v.g], cursor: "pointer" }} onClick={() => onOpen && onOpen(v)}>
        <div className="ov" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
        <Play size={18} fill="#fff" color="#fff" style={{ position: "relative" }} />
        <div className="cs-vid-dur cs-mono">{v.dur}</div>
      </div>
      <div className="cs-vrow-main">
        <div className="cs-row" style={{ marginBottom: 6, flexWrap: "wrap" }}>
          <StatusBadge status={v.status} />
          <span className="cs-badge cs-b-muted">{platById(v.plat)?.name}</span>
          <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{v.date}</span>
        </div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{v.title}</div>
        <div className="cs-row" style={{ gap: 16, marginTop: 8, color: "var(--ink-3)", fontSize: 12 }}>
          <span className="cs-row" style={{ gap: 5 }}><Eye size={13} /> {v.views}</span>
          <span className="cs-row" style={{ gap: 5 }}><Heart size={13} /> {v.likes}</span>
          <span className="cs-row" style={{ gap: 5 }}><MessageCircle size={13} /> {v.comments}</span>
          <span className="cs-row" style={{ gap: 5, color: "var(--ok)", fontWeight: 700 }}><DollarSign size={13} /> {v.revenue}</span>
        </div>
      </div>
      <div className="cs-row" style={{ gap: 7 }}>
        <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => onOpen && onOpen(v)}><Eye /> View</button>
        <button className="cs-btn cs-btn-primary cs-btn-sm" onClick={() => setView("ai")}><Sparkles /> Generate AI</button>
        <button className="cs-ico cs-ico-sm"><Edit3 /></button>
      </div>
    </div>
  );
}

function VideoSkeleton() {
  return (
    <div className="cs-card cs-vid">
      <Sk w="100%" h={0} r={0} style={{ aspectRatio: "16/9", borderRadius: 0 }} />
      <div className="cs-vid-body">
        <Sk w="90%" h={14} /><Sk w="60%" h={14} style={{ marginTop: 8 }} />
        <Sk w="100%" h={48} style={{ marginTop: 16 }} />
        <Sk w="100%" h={32} style={{ marginTop: 14 }} />
      </div>
    </div>
  );
}

function LibraryView({ setView, query, videos = VIDEOS, onOpen }) {
  const [grid, setGrid] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return videos.filter((v) => {
      const okStatus = statusFilter === "all" || v.status === statusFilter;
      const okQuery = !query || v.title.toLowerCase().includes(query.toLowerCase());
      return okStatus && okQuery;
    });
  }, [statusFilter, query, videos]);

  const tabs = [
    { id: "all", label: "All", n: videos.length },
    { id: "published", label: "Published", n: videos.filter((v) => v.status === "published").length },
    { id: "scheduled", label: "Scheduled", n: videos.filter((v) => v.status === "scheduled").length },
    { id: "draft", label: "Drafts", n: videos.filter((v) => v.status === "draft").length },
  ];

  return (
    <div>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Video /></span> Video Library</div>
          <div className="cs-sec-sub">{filtered.length} {filtered.length === 1 ? "video" : "videos"} across all platforms.</div>
        </div>
        <button className="cs-btn cs-btn-primary cs-btn-sm" onClick={() => setView("upload")}><Plus /> New Upload</button>
      </div>

      <div className="cs-filters">
        {tabs.map((t) => (
          <button key={t.id} className={"cs-chip-tab" + (statusFilter === t.id ? " on" : "")} onClick={() => { setStatusFilter(t.id); setPage(1); }}>
            {t.label} <span style={{ opacity: 0.6 }}>{t.n}</span>
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button className="cs-select"><Globe /> All Platforms <ChevronDown /></button>
        <button className="cs-select"><Calendar /> This Month <ChevronDown /></button>
        <button className="cs-select"><ArrowUpDown /> Most Recent <ChevronDown /></button>
        <div className="cs-seg">
          <button className={grid ? "on" : ""} onClick={() => setGrid(true)}><LayoutGrid /></button>
          <button className={!grid ? "on" : ""} onClick={() => setGrid(false)}><List /></button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="cs-card cs-card-pad cs-empty">
          <div className="cs-empty-ico"><Video /></div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>No videos match your filters</div>
          <div style={{ color: "var(--ink-3)", fontSize: 13, marginTop: 6 }}>Try a different status, or upload something new to get started.</div>
          <button className="cs-btn cs-btn-primary cs-btn-sm" style={{ marginTop: 16 }} onClick={() => setView("upload")}><Upload /> Upload Video</button>
        </div>
      ) : grid ? (
        <div className="cs-vid-grid">
          {filtered.map((v, i) => <VideoCard key={v.id} v={v} setView={setView} delay={i * 50} onOpen={onOpen} />)}
        </div>
      ) : (
        <div className="cs-vid-list">
          {filtered.map((v) => <VideoRow key={v.id} v={v} setView={setView} onOpen={onOpen} />)}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="cs-pagination">
          <button className="cs-page" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}><ChevronLeft size={16} /></button>
          {[1, 2, 3].map((n) => <button key={n} className={"cs-page" + (page === n ? " on" : "")} onClick={() => setPage(n)}>{n}</button>)}
          <span style={{ color: "var(--ink-4)", padding: "0 4px" }}>…</span>
          <button className="cs-page" onClick={() => setPage(8)}>8</button>
          <button className="cs-page" disabled={page === 8} onClick={() => setPage((p) => Math.min(8, p + 1))}><ChevronRight size={16} /></button>
        </div>
      )}
    </div>
  );
}

function QualityRing({ score = 92, run }) {
  const v = useCountUp(score, run, 1400);
  const data = [{ name: "q", value: score, fill: "url(#qgrad)" }];
  return (
    <div className="cs-quality-ring">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="74%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
          <defs>
            <linearGradient id="qgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <RadialBar background={{ fill: "rgba(255,255,255,0.06)" }} dataKey="value" cornerRadius={20} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="lbl" style={{ flexDirection: "column" }}>
        <div className="cs-mono" style={{ fontSize: 26, fontWeight: 800 }}>{Math.round(v)}</div>
        <div style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.04em" }}>QUALITY</div>
      </div>
    </div>
  );
}

const UP_FORMATS = [
  { I: Film, t: "Video" }, { I: Clapperboard, t: "Shorts" }, { I: Video, t: "Reels" },
  { I: ImageIcon, t: "Images" }, { I: Layers, t: "Carousel" }, { I: Clock, t: "Stories" },
];
const META = [
  { I: FileText, k: "File size", v: "284 MB" }, { I: Gauge, k: "Resolution", v: "3840 × 2160" },
  { I: LayoutGrid, k: "Aspect ratio", v: "16 : 9" }, { I: Clock, k: "Duration", v: "12:48" },
  { I: Languages, k: "Language", v: "English (US)" }, { I: Tag, k: "Category", v: "Education" },
];
const AI_DETECT = [
  { I: Clock, k: "Video length", v: "12 min 48 sec" }, { I: Gauge, k: "Resolution", v: "4K UHD · 2160p" },
  { I: LayoutGrid, k: "Aspect ratio", v: "16:9 Landscape" }, { I: Languages, k: "Language", v: "English (US)" },
  { I: Tag, k: "Category", v: "Education / Tech" }, { I: Film, k: "Content type", v: "Tutorial / Talking head" },
];

function UploadView({ setView }) {
  const [stage, setStage] = useState("idle");
  const [pct, setPct] = useState(0);
  const [drag, setDrag] = useState(false);

  const start = () => {
    if (stage === "uploading") return;
    setStage("uploading"); setPct(0);
    const iv = setInterval(() => {
      setPct((p) => {
        if (p >= 100) { clearInterval(iv); setStage("done"); return 100; }
        return Math.min(100, p + Math.random() * 9 + 4);
      });
    }, 220);
  };

  const eta = Math.max(0, Math.ceil((100 - pct) / 12));

  return (
    <div>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><UploadCloud /></span> Upload Center</div>
          <div className="cs-sec-sub">Drop your content and let AI handle the optimization.</div>
        </div>
      </div>

      {stage === "idle" && (
        <div className={"cs-drop" + (drag ? " drag" : "")} onClick={start}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); start(); }}>
          <div className="cs-drop-ico"><UploadCloud /></div>
          <h3>Drag &amp; drop your video here</h3>
          <p>or <span style={{ color: "var(--accent)", fontWeight: 600 }}>browse files</span> · MP4, MOV, WebM up to 5 GB</p>
          <div className="cs-format-row">
            {UP_FORMATS.map((f) => <span key={f.t} className="cs-format"><f.I /> {f.t}</span>)}
          </div>
        </div>
      )}

      {stage === "uploading" && (
        <div className="cs-card cs-card-pad cs-fade">
          <div className="cs-spread" style={{ marginBottom: 16 }}>
            <div className="cs-row" style={{ gap: 13 }}>
              <div className="cs-stat-ico" style={{ background: "var(--accent-soft)", color: "var(--accent)", width: 44, height: 44 }}><FileText size={20} /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>seo-tricks-final-4k.mp4</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>284 MB · Uploading &amp; processing…</div>
              </div>
            </div>
            <span className="cs-badge cs-b-accent"><RefreshCw size={12} className="cs-spin" /> Processing</span>
          </div>
          <div className="cs-progress"><div className="cs-progress-bar" style={{ width: pct + "%" }} /></div>
          <div className="cs-spread" style={{ marginTop: 11, fontSize: 12.5 }}>
            <span className="cs-mono" style={{ fontWeight: 700 }}>{Math.round(pct)}%</span>
            <span style={{ color: "var(--ink-3)" }}><Clock size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />~{eta}s remaining</span>
          </div>
        </div>
      )}

      {stage === "done" && (
        <>
          <div className="cs-card cs-card-pad cs-fade" style={{ borderColor: "rgba(52,211,153,0.3)", background: "linear-gradient(180deg,rgba(52,211,153,0.07),transparent)" }}>
            <div className="cs-spread">
              <div className="cs-row" style={{ gap: 13 }}>
                <div className="cs-stat-ico" style={{ background: "var(--ok-bg)", color: "var(--ok)", width: 44, height: 44 }}><CheckCircle2 size={22} /></div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Upload complete &amp; ready</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>seo-tricks-final-4k.mp4 · processed in 8s</div>
                </div>
              </div>
              <button className="cs-btn cs-btn-primary" onClick={() => setView("ai")}><Sparkles /> Generate AI Content</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginTop: 16, alignItems: "start" }} className="cs-up-cols">
            <div className="cs-card cs-card-pad cs-fade">
              <div className="cs-row" style={{ gap: 9, marginBottom: 16 }}>
                <div className="cs-aicard-head" style={{ margin: 0 }}>
                  <div className="ico"><FileText /></div>
                  <div><h4 style={{ fontSize: 14, fontWeight: 700 }}>File Metadata</h4><div className="sub" style={{ fontSize: 11, color: "var(--ink-4)" }}>Extracted automatically</div></div>
                </div>
              </div>
              <div className="cs-meta-grid">
                {META.map((m) => (
                  <div key={m.k} className="cs-meta-item">
                    <div className="k"><m.I /> {m.k}</div>
                    <div className="v cs-mono" style={{ fontSize: 13 }}>{m.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cs-ai-detect cs-fade">
              <div className="cs-spread" style={{ marginBottom: 14 }}>
                <div className="cs-row" style={{ gap: 8 }}>
                  <div className="cs-stat-ico" style={{ background: "var(--accent-soft)", color: "var(--accent)", width: 32, height: 32 }}><ScanLine size={17} /></div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>AI Detection</div>
                </div>
                <QualityRing score={92} run={true} />
              </div>
              {AI_DETECT.map((d) => (
                <div key={d.k} className="cs-detect-row">
                  <span className="k"><d.I /> {d.k}</span>
                  <span className="v">{d.v}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AiCardHead({ Icon, title, sub, tools }) {
  return (
    <div className="cs-aicard-head">
      <div className="ico"><Icon /></div>
      <div><h4>{title}</h4>{sub && <div className="sub">{sub}</div>}</div>
      {tools && <div className="tools">{tools}</div>}
    </div>
  );
}

function MiniIco({ Icon, on, onClick, title }) {
  return (
    <button className={"cs-mini-ico" + (on ? " fav" : "")} onClick={onClick} title={title}>
      <Icon fill={on ? "currentColor" : "none"} />
    </button>
  );
}

function NotificationsView() {
  const [items, setItems] = useState(NOTIFS_DATA);
  const [tab, setTab] = useState("all");
  const unread = items.filter((n) => n.unread).length;
  const shown = tab === "unread" ? items.filter((n) => n.unread) : items;
  const markAll = () => setItems((a) => a.map((n) => ({ ...n, unread: false })));
  const toggleOne = (idx) => setItems((a) => a.map((n, i) => (i === idx ? { ...n, unread: false } : n)));

  return (
    <div>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Bell /></span> Notifications</div>
          <div className="cs-sec-sub">{unread > 0 ? unread + " unread updates" : "You're all caught up."}</div>
        </div>
        <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={markAll} disabled={unread === 0}>
          <Check /> Mark all as read
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button className={"cs-chip-tab" + (tab === "all" ? " on" : "")} onClick={() => setTab("all")}>All <span>{items.length}</span></button>
        <button className={"cs-chip-tab" + (tab === "unread" ? " on" : "")} onClick={() => setTab("unread")}>Unread <span>{unread}</span></button>
      </div>

      <div className="cs-card" style={{ padding: 8 }}>
        {shown.length === 0 ? (
          <div className="cs-empty">
            <div className="cs-empty-ico"><BadgeCheck /></div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Nothing unread</div>
            <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 5 }}>New activity will show up right here.</div>
          </div>
        ) : (
          shown.map((n, i) => {
            const realIdx = items.indexOf(n);
            return (
              <div key={i} className={"cs-notif-row" + (n.unread ? " unread" : "")} onClick={() => toggleOne(realIdx)}>
                <div className="cs-notif-ico" style={{ background: n.bg, color: n.color }}><n.Icon /></div>
                <div className="cs-notif" style={{ flex: 1 }}>
                  <div className="nt">{n.t}</div>
                  <div className="nm">{n.nm}</div>
                </div>
                {n.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", marginTop: 7, flexShrink: 0 }} />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function Widget({ Icon, title, more, onMore, children }) {
  return (
    <div className="cs-widget">
      <div className="cs-widget-head">
        <div className="cs-widget-title"><Icon /> {title}</div>
        {more && <span className="cs-widget-more" onClick={onMore}>{more}</span>}
      </div>
      {children}
    </div>
  );
}

function RightSidebar({ setView }) {
  return (
    <aside className="cs-rightbar">
      <Widget Icon={Activity} title="Recent AI Activity" more="View all" onMore={() => setView("ai")}>
        <div>
          {RECENT_AI.map((a, i) => (
            <div key={i} className="cs-act">
              <div className="cs-act-ico" style={{ background: a.bg, color: a.color }}><a.Icon /></div>
              <div><div className="t">{a.t}</div><div className="ti">{a.ti}</div></div>
            </div>
          ))}
        </div>
      </Widget>

      <Widget Icon={Zap} title="Credits Remaining">
        <div className="cs-credit-card">
          <div className="cs-spread">
            <span style={{ fontSize: 12.5, color: "var(--ink-2)", fontWeight: 600 }}>Monthly credits</span>
            <Coins style={{ width: 16, height: 16, color: "var(--warn)" }} />
          </div>
          <div className="cs-mono" style={{ fontSize: 27, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 8 }}>2,480<span style={{ fontSize: 14, color: "var(--ink-4)", fontWeight: 600 }}> / 5,000</span></div>
          <div className="cs-credit-bar"><i style={{ width: "49.6%" }} /></div>
          <div className="cs-spread">
            <span style={{ fontSize: 11, color: "var(--ink-4)" }}>Resets in 12 days</span>
          </div>
        </div>
      </Widget>

      <Widget Icon={UploadCloud} title="Today's Uploads">
        <div className="cs-card cs-card-pad" style={{ padding: 14 }}>
          <div className="cs-spread">
            <div>
              <div className="cs-mono" style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>3</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>videos processed</div>
            </div>
            <div className="cs-stat-ico" style={{ background: "var(--ok-bg)", color: "var(--ok)" }}><Film /></div>
          </div>
          <div className="cs-divider" style={{ margin: "12px 0" }} />
          <div className="cs-spread" style={{ fontSize: 12 }}>
            <span className="cs-row" style={{ gap: 6, color: "var(--ink-2)" }}><CheckCircle2 style={{ width: 14, height: 14, color: "var(--ok)" }} /> 2 published</span>
            <span className="cs-row" style={{ gap: 6, color: "var(--ink-2)" }}><Clock style={{ width: 14, height: 14, color: "var(--warn)" }} /> 1 draft</span>
          </div>
        </div>
      </Widget>

      <Widget Icon={ListChecks} title="Publishing Queue" more="Open calendar" onMore={() => setView("calendar")}>
        <div>
          {PUB_QUEUE.map((q, i) => (
            <div key={i} className="cs-queue">
              <div className="cs-queue-thumb" style={{ background: VID_GRADS[q.g] }}><Play style={{ width: 13, height: 13, color: "rgba(255,255,255,0.9)" }} fill="currentColor" /></div>
              <div style={{ flex: 1, minWidth: 0 }}><div className="t">{q.t}</div><div className="m">{q.m}</div></div>
            </div>
          ))}
        </div>
      </Widget>

      <Widget Icon={Lightbulb} title="Quick Tips">
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {QUICK_TIPS.map((t, i) => (
            <div key={i} className="cs-tip"><Lightbulb /><p>{t}</p></div>
          ))}
        </div>
      </Widget>

      <Widget Icon={Flame} title="Trending Topics" more="Explore" onMore={() => setView("ai")}>
        <div>
          {TRENDING.map((t, i) => (
            <div key={i} className="cs-trend-row">
              <span className="cs-trend-rank cs-mono">{i + 1}</span>
              <div style={{ flex: 1 }}><div className="tt">{t.t}</div><div className="tm">{t.m}</div></div>
              <ArrowUpRight style={{ width: 15, height: 15, color: "var(--ok)" }} />
            </div>
          ))}
        </div>
      </Widget>

      <Widget Icon={Wand2} title="AI Suggestions">
        <div className="cs-suggest-card">
          <div className="h"><Sparkles /> Optimize your next post</div>
          <p>Your Shorts perform 2.3× better at 7 PM. Schedule "Viral Hooks" for tonight to maximize reach.</p>
          <button className="cs-btn cs-btn-primary cs-btn-sm" style={{ width: "100%" }} onClick={() => setView("ai")}><Sparkles /> Generate ideas</button>
        </div>
      </Widget>
    </aside>
  );
}

function initialPlatforms(session) {
  const connectedPlatformId = session?.provider ? PROVIDER_TO_PLATFORM[session.provider] : null;
  return PLATFORMS.map((p) => {
    const isAuthBacked = Object.prototype.hasOwnProperty.call(PLATFORM_TO_PROVIDER, p.id);
    if (!isAuthBacked) return { ...p };
    const connected = p.id === connectedPlatformId;
    if (connected) {
      return {
        ...p,
        connected: true,
        user: session?.user?.name || session?.user?.email || p.user,
      };
    }
    return { ...p, connected: false, user: "—", followers: "—", expiry: "—" };
  });
}

export default function InfluencersStudio({ session }) {
  const [view, setView] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [platforms, setPlatforms] = useState(() => initialPlatforms(session));
  const [videos, setVideos] = useState(() => VIDEOS.map((v) => ({ ...v })));
  const [theme, setTheme] = useState("dark");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [drawerVideo, setDrawerVideo] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [credits, setCredits] = useState(2480);
  const toastTimer = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 850);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); setPaletteOpen((o) => !o); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const notify = (msg, action) => {
    setToast({ msg, action });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), action ? 5000 : 1900);
  };
  const copy = (text) => {
    try { if (navigator.clipboard) navigator.clipboard.writeText(text); } catch (e) {}
    notify("Copied to clipboard");
  };
  const spend = (n) => setCredits((c) => Math.max(0, c - n));
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const onToggle = async (id) => {
    const providerId = PLATFORM_TO_PROVIDER[id];
    if (!providerId) {
      setPlatforms((ps) => ps.map((p) => (p.id === id ? { ...p, connected: !p.connected } : p)));
      return;
    }
    const platform = platforms.find((p) => p.id === id);
    if (platform?.connected) {
      await signOutAll();
    } else {
      await signInProvider(providerId);
    }
  };

  const openVideo = (v) => setDrawerVideo(v);
  const requestDeleteVideo = (v) => {
    if (!v) return;
    setConfirm({
      title: "Delete this video?",
      message: '"' + v.title + '" will be removed from your library. You can undo right after.',
      confirmLabel: "Delete", danger: true, Icon: Trash2,
      onConfirm: () => {
        const idx = videos.findIndex((x) => x.id === v.id);
        setVideos((arr) => arr.filter((x) => x.id !== v.id));
        setDrawerVideo(null);
        notify("Video deleted", { label: "Undo", run: () => setVideos((arr) => { if (arr.some((x) => x.id === v.id)) return arr; const next = [...arr]; next.splice(Math.max(0, idx), 0, v); return next; }) });
      },
    });
  };

  const renderView = () => {
    switch (view) {
      case "accounts": return <AccountsView platforms={platforms} onToggle={onToggle} />;
      case "library": return <LibraryView setView={setView} query={query} videos={videos} onOpen={openVideo} />;
      case "upload": return <UploadView setView={setView} />;
      case "ai": return <AIGeneratorView copy={copy} setView={setView} spend={spend} />;
      case "calendar": return <CalendarView setView={setView} />;
      case "inbox": return <InboxView notify={notify} />;
      case "trends": return <TrendsView setView={setView} spend={spend} />;
      case "analytics": return <AnalyticsView loading={loading} />;
      case "notifications": return <NotificationsView />;
      case "settings": return <SettingsView theme={theme} toggleTheme={toggleTheme} copy={copy} />;
      default: return <DashboardView loading={loading} platforms={platforms} onToggle={onToggle} setView={setView} onOpen={openVideo} videos={videos} />;
    }
  };

  return (
    <div className={"cs-root" + (theme === "light" ? " cs-light" : "")}>
      <style>{APP_CSS}</style>
      <style>{EXTRA_CSS}</style>

      <Sidebar view={view} setView={setView} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={"cs-overlay" + (sidebarOpen ? " show" : "")} onClick={() => setSidebarOpen(false)} />

      <main className="cs-main">
        <Topbar onMenu={() => setSidebarOpen(true)} query={query} setQuery={setQuery} onOpenPalette={() => setPaletteOpen(true)} theme={theme} toggleTheme={toggleTheme} credits={credits} />
        <div className="cs-content">{renderView()}</div>
      </main>

      <RightSidebar setView={setView} />
      <BottomNav view={view} setView={setView} />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} setView={setView} toggleTheme={toggleTheme} />

      <Drawer open={!!drawerVideo} onClose={() => setDrawerVideo(null)} title="Video performance"
        headRight={drawerVideo ? <span className="cs-badge cs-b-muted">{(platById(drawerVideo.plat) || {}).name}</span> : null}>
        <VideoDeepDive v={drawerVideo} setView={(x) => { setDrawerVideo(null); setView(x); }} onDelete={() => requestDeleteVideo(drawerVideo)} />
      </Drawer>

      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)}
        onConfirm={confirm ? confirm.onConfirm : () => {}}
        title={confirm ? confirm.title : ""} message={confirm ? confirm.message : ""}
        confirmLabel={confirm ? confirm.confirmLabel : "Confirm"} danger={confirm ? confirm.danger : false} Icon={confirm ? confirm.Icon : Trash2} />

      {toast && (
        <div className="cs-toast">
          <Check /> {toast.msg}
          {toast.action && <button className="cs-btn cs-btn-ghost cs-btn-sm" style={{ marginLeft: 10 }} onClick={() => { toast.action.run(); setToast(null); }}>{toast.action.label}</button>}
        </div>
      )}
    </div>
  );
}

const EXTRA_CSS = `
.cs-root.cs-light {
  --bg: #f5f6f8; --bg-2: #eceef2;
  --surface: #ffffff; --surface-2: #f5f6f8; --surface-3: #eceef1;
  --hover: rgba(15,18,30,0.045);
  --glass: rgba(255,255,255,0.78);
  --border: rgba(15,18,40,0.10); --border-2: rgba(15,18,40,0.16);
  --ink: #14151b; --ink-2: #43454e; --ink-3: #6a6d78; --ink-4: #9aa0ab;
  --accent-soft: rgba(139,92,246,0.10);
  --ok: #059669; --ok-bg: rgba(5,150,105,0.12);
  --warn: #b45309; --warn-bg: rgba(180,83,9,0.12);
  --danger: #dc2626; --danger-bg: rgba(220,38,38,0.11);
  --info: #2563eb; --info-bg: rgba(37,99,235,0.11);
  --shadow: 0 1px 2px rgba(20,22,40,0.06), 0 10px 26px rgba(20,22,40,0.08);
  --shadow-lg: 0 26px 60px -16px rgba(20,22,40,0.22);
  background:
    radial-gradient(1100px 600px at 80% -10%, rgba(139,92,246,0.10), transparent 60%),
    radial-gradient(820px 520px at -8% 2%, rgba(99,102,241,0.08), transparent 58%),
    var(--bg);
}
.cs-root.cs-light ::-webkit-scrollbar-thumb { background: rgba(20,22,40,0.16); background-clip: padding-box; }
.cs-root.cs-light .cs-navitem.active { color: #6d28d9; }
.cs-root.cs-light .cs-chip-tab.on, .cs-root.cs-light .cs-seg button.on { color: #6d28d9; }
.cs-root.cs-light .cs-tag { color: #6d28d9; }
.cs-root.cs-light .cs-sidebar { background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(248,249,251,0.5)); }
.cs-root.cs-light .cs-sk { background: linear-gradient(90deg, rgba(15,18,40,0.05) 25%, rgba(15,18,40,0.10) 37%, rgba(15,18,40,0.05) 63%); background-size: 400% 100%; }
.cs-root.cs-light .cs-kbd { background: var(--surface-2); }

.cs-input { width: 100%; background: var(--surface-2); border: 1px solid var(--border); color: var(--ink); border-radius: var(--r-sm); padding: 10px 13px; font-size: 13px; font-family: inherit; outline: none; transition: border-color .15s, box-shadow .15s; }
.cs-input::placeholder { color: var(--ink-4); }
.cs-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.cs-segbar { display: inline-flex; gap: 4px; padding: 3px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--r-sm); }
.cs-segbar button { border: none; background: none; font-family: inherit; font-size: 12.5px; font-weight: 600; color: var(--ink-3); padding: 6px 13px; border-radius: 8px; cursor: pointer; transition: all .15s; white-space: nowrap; }
.cs-segbar button.on { background: var(--accent-soft); color: var(--accent); }
.cs-loading { display: inline-flex; align-items: center; gap: 8px; color: var(--ink-3); font-size: 12.5px; font-weight: 500; }

.cs-cmdk-overlay { position: fixed; inset: 0; z-index: 120; background: rgba(0,0,0,0.5); backdrop-filter: blur(6px); display: flex; align-items: flex-start; justify-content: center; padding-top: 12vh; animation: cs-fade-in .15s ease; }
.cs-cmdk { width: min(620px, 92vw); background: var(--glass); backdrop-filter: blur(24px) saturate(140%); border: 1px solid var(--border-2); border-radius: var(--r-xl); box-shadow: var(--shadow-lg); overflow: hidden; animation: cs-pop .2s cubic-bezier(.2,.8,.3,1); }
.cs-cmdk-top { display: flex; align-items: center; gap: 11px; padding: 15px 18px; border-bottom: 1px solid var(--border); }
.cs-cmdk-top svg { width: 19px; height: 19px; color: var(--accent); flex-shrink: 0; }
.cs-cmdk-top input { flex: 1; background: none; border: none; outline: none; color: var(--ink); font-size: 16px; font-family: inherit; letter-spacing: -0.01em; }
.cs-cmdk-top input::placeholder { color: var(--ink-4); }
.cs-cmdk-list { max-height: 52vh; overflow-y: auto; padding: 8px; }
.cs-cmdk-group { font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-4); padding: 10px 12px 5px; }
.cs-cmdk-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-radius: var(--r-sm); cursor: pointer; color: var(--ink-2); font-size: 13.5px; font-weight: 500; }
.cs-cmdk-item .ci { width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; background: var(--surface-2); border: 1px solid var(--border); flex-shrink: 0; }
.cs-cmdk-item .ci svg { width: 16px; height: 16px; }
.cs-cmdk-item.sel, .cs-cmdk-item:hover { background: var(--accent-soft); color: var(--ink); }
.cs-cmdk-item .arrow { margin-left: auto; opacity: 0; }
.cs-cmdk-item.sel .arrow { opacity: 0.6; }
.cs-cmdk-foot { padding: 9px 16px; border-top: 1px solid var(--border); display: flex; gap: 14px; font-size: 11px; color: var(--ink-4); }
.cs-cmdk-foot kbd { font-family: 'JetBrains Mono', monospace; border: 1px solid var(--border-2); border-radius: 5px; padding: 1px 6px; font-size: 10px; }
.cs-cmdk-answer { padding: 16px 18px; font-size: 13.5px; line-height: 1.65; color: var(--ink-2); max-height: 44vh; overflow-y: auto; white-space: pre-wrap; }

.cs-drawer-overlay { position: fixed; inset: 0; z-index: 110; background: rgba(0,0,0,0.5); backdrop-filter: blur(3px); animation: cs-fade-in .18s ease; }
.cs-drawer { position: fixed; top: 0; right: 0; height: 100vh; width: min(560px, 94vw); background: var(--bg-2); border-left: 1px solid var(--border-2); box-shadow: var(--shadow-lg); z-index: 111; display: flex; flex-direction: column; animation: cs-slide-in .26s cubic-bezier(.2,.8,.25,1); }
.cs-drawer-head { padding: 18px 22px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; background: var(--glass); backdrop-filter: blur(12px); }
.cs-drawer-body { flex: 1; overflow-y: auto; padding: 22px; }

.cs-modal-overlay { position: fixed; inset: 0; z-index: 130; background: rgba(0,0,0,0.55); backdrop-filter: blur(5px); display: grid; place-items: center; padding: 20px; animation: cs-fade-in .15s ease; }
.cs-modal { width: min(420px, 94vw); background: var(--surface); border: 1px solid var(--border-2); border-radius: var(--r-xl); box-shadow: var(--shadow-lg); padding: 22px; animation: cs-pop .2s cubic-bezier(.2,.8,.3,1); }
.cs-modal-ico { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; margin-bottom: 14px; }
.cs-modal h3 { font-size: 17px; font-weight: 700; letter-spacing: -0.02em; }
.cs-modal p { font-size: 13.5px; color: var(--ink-2); line-height: 1.55; margin-top: 7px; }
.cs-modal-actions { display: flex; gap: 9px; margin-top: 20px; }
.cs-modal-actions .cs-btn { flex: 1; }

.cs-checklist { position: relative; overflow: hidden; border-radius: var(--r-xl); border: 1px solid rgba(168,85,247,0.28); background: linear-gradient(135deg, rgba(168,85,247,0.12), rgba(99,102,241,0.08)); padding: 20px 22px; margin-bottom: 22px; }
.cs-check-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 16px; }
.cs-check-item { display: flex; flex-direction: column; gap: 9px; padding: 13px; border-radius: var(--r); border: 1px solid var(--border); background: var(--surface); cursor: pointer; transition: transform .15s, border-color .15s; }
.cs-check-item:hover { transform: translateY(-2px); border-color: var(--border-2); }
.cs-check-item.done { opacity: 0.62; }
.cs-check-box { width: 26px; height: 26px; border-radius: 8px; display: grid; place-items: center; border: 1.5px solid var(--border-2); color: var(--ink-4); flex-shrink: 0; }
.cs-check-box.on { background: linear-gradient(135deg, var(--ai-1), var(--ai-2)); border-color: transparent; color: #fff; }
.cs-check-box svg { width: 15px; height: 15px; }
.cs-check-item .ct { font-size: 12.5px; font-weight: 600; line-height: 1.35; }
.cs-progbar { height: 6px; border-radius: 99px; background: rgba(255,255,255,0.14); overflow: hidden; }
.cs-progbar i { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--ai-1), var(--ai-3)); transition: width .4s ease; }

.cs-cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: 7px; }
.cs-cal-dow { font-size: 11px; font-weight: 700; color: var(--ink-4); text-transform: uppercase; letter-spacing: 0.05em; text-align: center; padding: 4px 0 8px; }
.cs-cal-cell { min-height: 96px; border-radius: var(--r); border: 1px solid var(--border); background: var(--surface); padding: 8px; display: flex; flex-direction: column; gap: 5px; transition: border-color .15s, background .15s; }
.cs-cal-cell.muted { opacity: 0.4; }
.cs-cal-cell.today { border-color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.cs-cal-cell .dn { font-size: 12px; font-weight: 700; color: var(--ink-2); }
.cs-cal-cell.today .dn { color: var(--accent); }
.cs-cal-ev { font-size: 10.5px; font-weight: 600; padding: 3px 6px; border-radius: 6px; color: #fff; display: flex; align-items: center; gap: 4px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.cs-cal-ev .ed { width: 6px; height: 6px; border-radius: 2px; flex-shrink: 0; background: rgba(255,255,255,0.85); }

.cs-heat { display: grid; grid-template-columns: auto repeat(7, 1fr); gap: 4px; }
.cs-heat-cell { aspect-ratio: 1.7; border-radius: 5px; }
.cs-heat-lbl { font-size: 10px; color: var(--ink-4); display: flex; align-items: center; justify-content: flex-end; padding-right: 6px; }
.cs-heat-top { font-size: 10px; color: var(--ink-4); text-align: center; }

.cs-kanban { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; align-items: start; }
.cs-kan-col { background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 11px; min-height: 120px; transition: border-color .15s, background .15s; }
.cs-kan-col.over { border-color: var(--accent); background: var(--accent-soft); }
.cs-kan-head { display: flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 700; margin-bottom: 11px; padding: 0 3px; }
.cs-kan-head .kc { min-width: 18px; height: 18px; padding: 0 5px; border-radius: 6px; background: var(--surface-3); color: var(--ink-3); font-size: 10.5px; font-weight: 700; display: grid; place-items: center; margin-left: auto; }
.cs-kan-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--r); padding: 11px; margin-bottom: 9px; cursor: grab; transition: border-color .15s, box-shadow .15s, transform .12s; }
.cs-kan-card:hover { border-color: var(--border-2); box-shadow: var(--shadow); }
.cs-kan-card:active { cursor: grabbing; }
.cs-kan-card.drag { opacity: 0.4; }
.cs-kan-card .kt { font-size: 12.5px; font-weight: 600; line-height: 1.4; }
.cs-kan-card .km { font-size: 11px; color: var(--ink-4); margin-top: 6px; display: flex; align-items: center; gap: 6px; }

.cs-inbox { display: grid; grid-template-columns: 340px 1fr; gap: 14px; height: calc(100vh - 188px); min-height: 480px; }
.cs-inbox-list { border: 1px solid var(--border); border-radius: var(--r-lg); background: var(--surface); overflow-y: auto; }
.cs-conv { display: flex; gap: 11px; padding: 13px 14px; border-bottom: 1px solid var(--border); cursor: pointer; transition: background .15s; }
.cs-conv:hover { background: var(--hover); }
.cs-conv.active { background: var(--accent-soft); }
.cs-conv.unread .cn { font-weight: 700; }
.cs-conv-main { flex: 1; min-width: 0; }
.cs-conv .cn { font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.cs-conv .cp { font-size: 12px; color: var(--ink-3); margin-top: 3px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.cs-conv .ct { font-size: 10.5px; color: var(--ink-4); flex-shrink: 0; }
.cs-sent { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.cs-thread { border: 1px solid var(--border); border-radius: var(--r-lg); background: var(--surface); display: flex; flex-direction: column; overflow: hidden; }
.cs-thread-head { padding: 15px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }
.cs-thread-body { flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.cs-tmsg { display: flex; gap: 10px; max-width: 80%; }
.cs-tmsg .tb { padding: 11px 14px; border-radius: 14px; font-size: 13px; line-height: 1.5; }
.cs-tmsg.them .tb { background: var(--surface-2); border: 1px solid var(--border); border-top-left-radius: 4px; }
.cs-tmsg.me { align-self: flex-end; flex-direction: row-reverse; }
.cs-tmsg.me .tb { background: linear-gradient(135deg, var(--ai-1), var(--ai-2)); color: #fff; border-top-right-radius: 4px; }
.cs-thread-foot { border-top: 1px solid var(--border); padding: 13px 16px; }
.cs-ai-chips { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 10px; }
.cs-ai-chip { font-size: 12px; font-weight: 600; padding: 6px 11px; border-radius: 99px; border: 1px solid rgba(139,92,246,0.3); background: var(--accent-soft); color: var(--accent); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: transform .12s, background .15s; }
.cs-ai-chip:hover { transform: translateY(-1px); background: rgba(139,92,246,0.18); }
.cs-ai-chip svg { width: 12px; height: 12px; }
.cs-reply-row { display: flex; gap: 9px; align-items: flex-end; }

.cs-vs-row { display: flex; align-items: center; gap: 13px; padding: 13px; border-radius: var(--r); border: 1px solid var(--border); background: var(--surface-2); margin-bottom: 9px; }
.cs-vs-row.you { border-color: rgba(139,92,246,0.35); background: var(--accent-soft); }
.cs-vs-stat { text-align: right; flex-shrink: 0; }
.cs-vs-stat .vv { font-size: 13.5px; font-weight: 700; }
.cs-vs-stat .vl { font-size: 10.5px; color: var(--ink-4); }
.cs-gap { padding: 14px; border-radius: var(--r); border: 1px dashed var(--border-2); background: var(--surface); display: flex; gap: 12px; align-items: flex-start; transition: border-color .15s; }
.cs-gap:hover { border-color: var(--accent); }
.cs-viral { border: 1px solid rgba(139,92,246,0.3); border-radius: var(--r-lg); padding: 18px; background: linear-gradient(180deg, rgba(139,92,246,0.08), transparent); }
.cs-score-big { font-size: 44px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; background: linear-gradient(135deg, var(--ai-1), var(--ai-3)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

.cs-demo-row { display: flex; align-items: center; gap: 11px; padding: 7px 0; }
.cs-demo-row .dl { font-size: 12px; color: var(--ink-2); width: 58px; flex-shrink: 0; }
.cs-demo-track { flex: 1; height: 9px; border-radius: 99px; background: var(--surface-3); overflow: hidden; }
.cs-demo-track i { display: block; height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--ai-2), var(--ai-1)); }
.cs-demo-row .dv { font-size: 11.5px; font-weight: 700; color: var(--ink-2); width: 40px; text-align: right; flex-shrink: 0; }
.cs-geo-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.cs-geo-row:last-child { border-bottom: none; }
.cs-geo-flag { font-size: 18px; }
.cs-insight { border-radius: var(--r-lg); padding: 17px; border: 1px solid rgba(139,92,246,0.28); background: linear-gradient(135deg, rgba(168,85,247,0.1), rgba(99,102,241,0.06)); }

.cs-botnav { display: none; }
@media (max-width: 760px) {
  .cs-botnav { display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 70; background: var(--glass); backdrop-filter: blur(18px); border-top: 1px solid var(--border); padding: 8px 6px calc(8px + env(safe-area-inset-bottom, 0px)); justify-content: space-around; }
  .cs-botnav-item { display: flex; flex-direction: column; align-items: center; gap: 3px; background: none; border: none; color: var(--ink-3); font-family: inherit; font-size: 9.5px; font-weight: 600; cursor: pointer; padding: 4px 10px; border-radius: 10px; }
  .cs-botnav-item svg { width: 20px; height: 20px; }
  .cs-botnav-item.on { color: var(--accent); }
  .cs-content { padding-bottom: 90px; }
  .cs-inbox { grid-template-columns: 1fr; height: auto; }
  .cs-check-grid { grid-template-columns: repeat(2, 1fr); }
  .cs-kanban { grid-template-columns: 1fr; }
  .cs-cal-cell { min-height: 64px; }
}
@media (max-width: 1080px) {
  .cs-check-grid { grid-template-columns: repeat(3, 1fr); }
  .cs-kanban { grid-template-columns: repeat(2, 1fr); }
}

@keyframes cs-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes cs-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
`;

async function callClaude(prompt, max = 1024) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: max, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error("api");
  const data = await res.json();
  return (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
}
function parseJSON(text) {
  if (!text) return null;
  let t = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  const c = t.indexOf("["), d = t.lastIndexOf("]");
  if (a >= 0 && b > a && (c < 0 || a < c)) t = t.slice(a, b + 1);
  else if (c >= 0 && d > c) t = t.slice(c, d + 1);
  try { return JSON.parse(t); } catch (e) { return null; }
}

const KANBAN_COLS = [
  { id: "idea", label: "Idea", color: "#a855f7" },
  { id: "script", label: "Scripting", color: "#60a5fa" },
  { id: "edit", label: "Editing", color: "#fbbf24" },
  { id: "sched", label: "Scheduled", color: "#34d399" },
  { id: "pub", label: "Published", color: "#22d3ee" },
];
const HEAT_DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const HEAT_ROWS = ["6a", "9a", "12p", "3p", "6p", "9p"];
const HEAT = [
  [0.1, 0.2, 0.2, 0.2, 0.2, 0.3, 0.2],
  [0.3, 0.5, 0.5, 0.4, 0.5, 0.6, 0.4],
  [0.4, 0.6, 0.6, 0.6, 0.6, 0.7, 0.5],
  [0.5, 0.7, 0.7, 0.7, 0.8, 0.8, 0.6],
  [0.7, 0.9, 0.9, 1.0, 1.0, 1.0, 0.9],
  [0.6, 0.8, 0.8, 0.9, 0.9, 0.8, 0.7],
];
const SENTIMENTS = {
  positive: { c: "#34d399", I: Smile, label: "Positive" },
  neutral: { c: "#fbbf24", I: Meh, label: "Neutral" },
  spam: { c: "#f87171", I: Ban, label: "Spam" },
};
const INBOX_CONV = [
  { id: 1, name: "Jenna Ruiz", plat: "instagram", grad: "linear-gradient(135deg,#F58529,#DD2A7B)", preview: "This is exactly what I needed, thank you!! 💜", time: "2m", unread: true, sentiment: "positive",
    thread: [{ who: "them", text: "Just watched your SEO video and tried tip #3 — my views literally doubled overnight." }, { who: "them", text: "This is exactly what I needed, thank you!! 💜" }] },
  { id: 2, name: "@techwithsam", plat: "youtube", grad: "linear-gradient(135deg,#FF4747,#CC0000)", preview: "Would you ever do a collab on a gear video?", time: "18m", unread: true, sentiment: "neutral",
    thread: [{ who: "them", text: "Big fan of your editing style. Would you ever do a collab on a gear video?" }] },
  { id: 3, name: "Marcus Lee", plat: "tiktok", grad: "linear-gradient(135deg,#00F2EA,#FF0050)", preview: "How do you keep retention so high on shorts?", time: "1h", unread: true, sentiment: "positive",
    thread: [{ who: "them", text: "How do you keep retention so high on shorts? Mine drop off after 3 seconds." }] },
  { id: 4, name: "growth_guru99", plat: "x", grad: "linear-gradient(135deg,#2b2b2b,#000)", preview: "Check out my page for free followers!!!", time: "3h", unread: false, sentiment: "spam",
    thread: [{ who: "them", text: "Check out my page for free followers!!! Link in bio 🔥🔥" }] },
  { id: 5, name: "Aisha Khan", plat: "instagram", grad: "linear-gradient(135deg,#8134AF,#DD2A7B)", preview: "Saving this for my next upload. Pure gold.", time: "5h", unread: false, sentiment: "positive",
    thread: [{ who: "them", text: "Saving this for my next upload. Pure gold. Do you script your hooks first?" }] },
];
const TREND_AUDIO = [
  { t: "Aesthetic Lo-Fi Beat", m: "412K videos · +88%", hot: true },
  { t: "Original — fast cuts", m: "286K videos · +64%" },
  { t: "Dramatic Cinematic Riser", m: "198K videos · +52%" },
  { t: "Slowed Phonk Loop", m: "167K videos · +41%" },
];
const TREND_FORMATS = [
  { t: "POV storytime", m: "Avg 2.3× reach" },
  { t: "Day-in-the-life", m: "Avg 1.9× saves" },
  { t: "Green-screen explainer", m: "Avg 1.7× shares" },
  { t: "Before / after reveal", m: "Avg 2.1× watch-time" },
];
const COMPETITORS = [
  { name: "You", handle: "@creator.studio", followers: "2.85M", growth: "+12.4%", eng: "7.8%", you: true },
  { name: "CreatorPro", handle: "@creatorpro", followers: "3.41M", growth: "+8.1%", eng: "6.2%" },
  { name: "GrowthLab", handle: "@growthlab", followers: "2.12M", growth: "+18.9%", eng: "9.1%" },
  { name: "VidWizard", handle: "@vidwizard", followers: "1.88M", growth: "+6.4%", eng: "5.4%" },
];
const CONTENT_GAPS = [
  { t: "You haven't posted a 'tutorial' in 3 weeks", m: "Your tutorials average 2.4× more saves than other formats." },
  { t: "Competitors are winning with 'tier list' videos", m: "GrowthLab's tier-list series drives their top engagement — you have none." },
  { t: "Untapped keyword: 'AI editing workflow'", m: "High search volume, low competition in your niche right now." },
];
const DEMO_AGE = [
  { label: "13–17", pct: 8 }, { label: "18–24", pct: 41 }, { label: "25–34", pct: 32 },
  { label: "35–44", pct: 13 }, { label: "45+", pct: 6 },
];
const DEMO_GENDER = [
  { name: "Male", value: 58, color: "#6366f1" }, { name: "Female", value: 39, color: "#ec4899" }, { name: "Other", value: 3, color: "#34d399" },
];
const DEMO_GEO = [
  { flag: "🇺🇸", country: "United States", pct: 34 }, { flag: "🇬🇧", country: "United Kingdom", pct: 14 },
  { flag: "🇮🇳", country: "India", pct: 11 }, { flag: "🇨🇦", country: "Canada", pct: 9 },
  { flag: "🇦🇺", country: "Australia", pct: 7 }, { flag: "🇵🇰", country: "Pakistan", pct: 6 },
];
const RETENTION = [
  { d: "W1", you: 100, avg: 100 }, { d: "W2", you: 86, avg: 74 }, { d: "W3", you: 78, avg: 61 },
  { d: "W4", you: 72, avg: 52 }, { d: "W5", you: 69, avg: 47 }, { d: "W6", you: 67, avg: 43 },
];

function Drawer({ open, onClose, title, headRight, children }) {
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <>
      <div className="cs-drawer-overlay" onClick={onClose} />
      <div className="cs-drawer" role="dialog">
        <div className="cs-drawer-head">
          <div style={{ flex: 1, fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}>{title}</div>
          {headRight}
          <button className="cs-ico cs-ico-sm" onClick={onClose}><X /></button>
        </div>
        <div className="cs-drawer-body">{children}</div>
      </div>
    </>
  );
}

function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = "Confirm", danger, Icon = Trash2 }) {
  if (!open) return null;
  return (
    <div className="cs-modal-overlay" onClick={onClose}>
      <div className="cs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cs-modal-ico" style={{ background: danger ? "var(--danger-bg)" : "var(--accent-soft)", color: danger ? "var(--danger)" : "var(--accent)" }}><Icon size={22} /></div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="cs-modal-actions">
          <button className="cs-btn cs-btn-ghost" onClick={onClose}>Cancel</button>
          <button className={"cs-btn " + (danger ? "cs-btn-danger" : "cs-btn-primary")} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function CommandPalette({ open, onClose, setView, toggleTheme }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [mode, setMode] = useState("list");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);

  const go = (v) => { setView(v); onClose(); };
  const COMMANDS = useMemo(() => [
    { id: "dashboard", label: "Go to Dashboard", group: "Navigate", Icon: LayoutDashboard, run: () => go("dashboard") },
    { id: "ai", label: "Open AI Generator", group: "Navigate", Icon: Sparkles, run: () => go("ai") },
    { id: "upload", label: "Open Upload Center", group: "Navigate", Icon: UploadCloud, run: () => go("upload") },
    { id: "library", label: "Open Video Library", group: "Navigate", Icon: Video, run: () => go("library") },
    { id: "calendar", label: "Open Content Calendar", group: "Navigate", Icon: Calendar, run: () => go("calendar") },
    { id: "inbox", label: "Open Engagement Inbox", group: "Navigate", Icon: Inbox, run: () => go("inbox") },
    { id: "trends", label: "Open Trends & Competitors", group: "Navigate", Icon: Flame, run: () => go("trends") },
    { id: "analytics", label: "Open Analytics", group: "Navigate", Icon: BarChart3, run: () => go("analytics") },
    { id: "accounts", label: "Connected Accounts", group: "Navigate", Icon: Link2, run: () => go("accounts") },
    { id: "settings", label: "Open Settings", group: "Navigate", Icon: Settings, run: () => go("settings") },
    { id: "newup", label: "Upload a new video", group: "Actions", Icon: Plus, run: () => go("upload") },
    { id: "gen", label: "Generate AI content", group: "Actions", Icon: Wand2, run: () => go("ai") },
    { id: "theme", label: "Toggle light / dark theme", group: "Actions", Icon: Sun, run: () => { toggleTheme(); onClose(); } },
  ], []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return COMMANDS;
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(s));
  }, [q, COMMANDS]);

  const hasAsk = q.trim().length > 0;
  const items = hasAsk ? [{ ask: true }, ...filtered] : filtered;

  useEffect(() => { setSel(0); }, [q]);
  useEffect(() => {
    if (open) { setQ(""); setMode("list"); setAnswer(""); setLoading(false); setTimeout(() => inputRef.current && inputRef.current.focus(), 40); }
  }, [open]);

  const runAsk = async (question) => {
    setMode("answer"); setLoading(true); setAnswer("");
    try {
      const txt = await callClaude("You are a helpful, concise assistant inside a social-media creator dashboard called Influencers Studio. Give a practical, specific answer in 2-4 short sentences. Question: " + question, 600);
      setAnswer(txt || "I couldn't generate a response just now — try rephrasing.");
    } catch (e) {
      setAnswer("Live AI isn't reachable in this preview. In the full app, I'd answer: focus on a strong 3-second hook, post at 7 PM, and reply to early comments to boost reach.");
    }
    setLoading(false);
  };

  const activate = (i) => {
    const it = items[i];
    if (!it) return;
    if (it.ask) return runAsk(q.trim());
    it.run();
  };
  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(items.length - 1, s + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); activate(sel); }
    else if (e.key === "Escape") { onClose(); }
  };

  if (!open) return null;
  let lastGroup = "";
  return (
    <div className="cs-cmdk-overlay" onClick={onClose}>
      <div className="cs-cmdk" onClick={(e) => e.stopPropagation()}>
        <div className="cs-cmdk-top">
          {mode === "answer" ? <Sparkles /> : <Search />}
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setMode("list"); }} onKeyDown={onKey}
            placeholder={mode === "answer" ? "Ask a follow-up…" : "Search or ask AI anything…"} />
          <span className="cs-kbd cs-mono">esc</span>
        </div>

        {mode === "answer" ? (
          <div className="cs-cmdk-answer">
            {loading ? <span className="cs-loading"><RefreshCw className="cs-spin" size={15} /> Thinking…</span> : answer}
          </div>
        ) : (
          <div className="cs-cmdk-list">
            {hasAsk && (
              <div className={"cs-cmdk-item" + (sel === 0 ? " sel" : "")} onMouseEnter={() => setSel(0)} onClick={() => runAsk(q.trim())}>
                <span className="ci" style={{ background: "var(--accent-soft)", borderColor: "rgba(139,92,246,0.3)", color: "var(--accent)" }}><Sparkles /></span>
                Ask AI: <span style={{ color: "var(--ink)", fontWeight: 600 }}>“{q.trim()}”</span>
                <ArrowRight className="arrow" size={15} />
              </div>
            )}
            {items.map((it, i) => {
              if (it.ask) return null;
              const showGroup = it.group !== lastGroup;
              lastGroup = it.group;
              return (
                <div key={it.id}>
                  {showGroup && <div className="cs-cmdk-group">{it.group}</div>}
                  <div className={"cs-cmdk-item" + (sel === i ? " sel" : "")} onMouseEnter={() => setSel(i)} onClick={() => activate(i)}>
                    <span className="ci"><it.Icon /></span>{it.label}
                    <ArrowRight className="arrow" size={15} />
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && !hasAsk && <div className="cs-cmdk-item" style={{ color: "var(--ink-4)" }}>No matches</div>}
          </div>
        )}

        <div className="cs-cmdk-foot">
          <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
          {mode === "answer" && <span style={{ marginLeft: "auto", cursor: "pointer", color: "var(--accent)" }} onClick={() => { setMode("list"); setQ(""); }}>← back to search</span>}
        </div>
      </div>
    </div>
  );
}

const EMPTY_REP = { youtube: "", tiktok: "", instagram: "", x: "" };
const REP_META = {
  youtube: { name: "YouTube", Icon: Youtube, grad: "linear-gradient(135deg,#FF4747,#CC0000)" },
  tiktok: { name: "TikTok", Icon: Music2, grad: "linear-gradient(135deg,#00F2EA,#FF0050)" },
  instagram: { name: "Instagram", Icon: Instagram, grad: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)" },
  x: { name: "X (Twitter)", Icon: Twitter, grad: "linear-gradient(135deg,#2b2b2b,#000)" },
};

function AIGeneratorView({ copy, setView, spend }) {
  const [topic, setTopic] = useState("10 SEO tricks that actually work in 2026");
  const [content, setContent] = useState({
    titles: AI_TITLES_POOL.slice(0, 5),
    description: AI_DESCRIPTION,
    hashtags: AI_HASHTAGS,
    keywords: AI_KEYWORDS,
    thumbnailText: AI_THUMB_TEXT,
    hooks: AI_HOOKS,
    chapters: AI_CHAPTERS,
    summary: AI_SUMMARY,
  });
  const [favs, setFavs] = useState({ 0: true });
  const [gen, setGen] = useState(false);
  const [note, setNote] = useState("");
  const [rep, setRep] = useState(EMPTY_REP);
  const [reping, setReping] = useState(false);

  const copyTool = (text) => () => copy(text);

  const generate = async () => {
    const t = topic.trim();
    if (!t || gen) return;
    setGen(true); setNote("");
    if (spend) spend(18);
    const prompt = `You are an expert social-media content strategist. For a video about: "${t}", generate optimized metadata. Respond with ONLY valid minified JSON (no markdown, no commentary) of the exact shape:
{"titles":["5 punchy SEO titles"],"description":"2 short paragraphs separated by \\n\\n","hashtags":["10 tags each starting with #"],"keywords":["8 SEO keyword phrases"],"thumbnailText":["5 very short high-CTR overlay phrases"],"hooks":["5 first-3-second opener lines"],"chapters":[{"t":"00:00","l":"label"}],"summary":"~80 word summary"}`;
    try {
      const txt = await callClaude(prompt, 1200);
      const j = parseJSON(txt);
      if (!j || !j.titles) throw new Error("parse");
      setContent({
        titles: (j.titles || []).slice(0, 5),
        description: j.description || content.description,
        hashtags: (j.hashtags || []).slice(0, 12),
        keywords: (j.keywords || []).slice(0, 10),
        thumbnailText: (j.thumbnailText || []).slice(0, 6),
        hooks: (j.hooks || []).slice(0, 6),
        chapters: (j.chapters || []).slice(0, 6),
        summary: j.summary || content.summary,
      });
      setFavs({});
    } catch (e) {
      const shuffled = [...AI_TITLES_POOL].sort(() => Math.random() - 0.5).slice(0, 5);
      setContent((c) => ({ ...c, titles: shuffled }));
      setNote("Showing a sample set — live AI isn't reachable in this preview.");
    }
    setGen(false);
  };

  const repurpose = async () => {
    if (reping) return;
    setReping(true);
    if (spend) spend(12);
    const prompt = `Repurpose a video about "${topic.trim()}" into platform-native captions. Match each platform's tone, length and emoji/hashtag conventions. Respond ONLY with minified JSON: {"youtube":"...","tiktok":"...","instagram":"...","x":"..."}. YouTube = descriptive 2 sentences; TikTok = punchy 1-2 lines with 2-3 hashtags; Instagram = warm with a CTA and 3-4 hashtags; X = witty single line under 200 chars.`;
    try {
      const txt = await callClaude(prompt, 700);
      const j = parseJSON(txt);
      if (!j) throw new Error("parse");
      setRep({ youtube: j.youtube || "", tiktok: j.tiktok || "", instagram: j.instagram || "", x: j.x || "" });
    } catch (e) {
      setRep({
        youtube: "The exact SEO tricks that took me from 0 to 100K. Full breakdown with timestamps below — try tip #3 first. 👇",
        tiktok: "POV: you finally understand the algorithm 🤯 save this before you post #creatortips #seo #growth",
        instagram: "Your videos aren't broken — your metadata is. Swipe through, then go fix your last upload. 💾 Save for later! #contentcreator #reels #growthtips #socialmedia",
        x: "Nobody's hiding the algorithm from you. You're just skipping the first 3 seconds. 🧵",
      });
      setNote("Showing sample captions — live AI isn't reachable in this preview.");
    }
    setReping(false);
  };

  const c = content;
  return (
    <div>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Sparkles /></span> AI Content Generator</div>
          <div className="cs-sec-sub">Type a topic or paste your script — AI writes everything you need to publish.</div>
        </div>
        <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => setView("upload")}><ChevronLeft size={14} /> Back to upload</button>
      </div>

      <div className="cs-card cs-card-pad cs-fade" style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)", marginBottom: 9 }}>What's your video about?</div>
        <div className="cs-row" style={{ gap: 10, alignItems: "stretch", flexWrap: "wrap" }}>
          <input className="cs-input" style={{ flex: 1, minWidth: 220 }} value={topic} onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") generate(); }} placeholder="e.g. 5 AI tools every creator should use" />
          <button className="cs-btn cs-btn-primary" onClick={generate} disabled={gen} style={{ opacity: gen ? 0.8 : 1 }}>
            {gen ? <><RefreshCw className="cs-spin" /> Generating…</> : <><Wand2 /> Generate all</>}
          </button>
        </div>
        {note && <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 9, display: "flex", alignItems: "center", gap: 6 }}><Cpu size={13} /> {note}</div>}
      </div>

      <div className="cs-ai-grid">
        <div className="cs-ai-preview">
          <div className="cs-card cs-card-pad cs-fade">
            <div className="cs-ai-vid" style={{ background: VID_GRADS[0] }}>
              <div className="ov" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
              <div className="cs-vid-play" style={{ position: "relative", width: 54, height: 54 }}><Play fill="#fff" /></div>
              <div className="cs-vid-dur cs-mono">12:48</div>
              <div className="cs-vid-plat"><span className="pdot" style={{ background: "linear-gradient(135deg,#FF4747,#CC0000)" }}><Youtube /></span>YouTube</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 14, lineHeight: 1.4 }}>{topic || "Untitled video"}</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 3 }}>4K UHD · Education · English</div>
            <div className="cs-row" style={{ gap: 7, marginTop: 12, flexWrap: "wrap" }}>
              <span className="cs-badge cs-b-accent"><Sparkles size={11} /> AI Optimized</span>
              <span className="cs-badge cs-b-ok"><Gauge size={11} /> 92 Quality</span>
            </div>
            <div className="cs-divider" />
            <button className="cs-btn cs-btn-primary cs-btn-block" onClick={() => setView("library")}><Upload /> Publish to platforms</button>
          </div>

          <div className="cs-aicard aura cs-fade" style={{ marginTop: 16 }}>
            <AiCardHead Icon={Repeat2} title="Repurpose" sub="One video → every platform"
              tools={<button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={repurpose} disabled={reping}>{reping ? <RefreshCw className="cs-spin" /> : <Wand2 />} {reping ? "Writing…" : "Generate"}</button>} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.keys(REP_META).map((k) => {
                const m = REP_META[k];
                return (
                  <div key={k} style={{ border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 11, background: "var(--surface-2)" }}>
                    <div className="cs-spread" style={{ marginBottom: rep[k] ? 8 : 0 }}>
                      <span className="cs-row" style={{ gap: 7, fontSize: 12.5, fontWeight: 700 }}>
                        <span style={{ width: 22, height: 22, borderRadius: 6, display: "grid", placeItems: "center", background: m.grad }}><m.Icon size={13} color="#fff" /></span>{m.name}
                      </span>
                      {rep[k] && <button className="cs-mini-ico" onClick={copyTool(rep[k])} title="Copy"><Copy /></button>}
                    </div>
                    {rep[k]
                      ? <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.55 }}>{rep[k]}</div>
                      : reping ? <Sk w="100%" h={32} r={8} /> : <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>Tap Generate to write a {m.name}-native caption.</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="cs-ai-cards">
          <div className="cs-aicard aura cs-fade">
            <AiCardHead Icon={Type} title="AI Titles" sub={c.titles.length + " SEO-optimized options"}
              tools={<button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={generate} disabled={gen}><RefreshCw className={gen ? "cs-spin" : ""} /> Regenerate</button>} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {gen
                ? Array.from({ length: 5 }).map((_, i) => <Sk key={i} w="100%" h={44} r={14} />)
                : c.titles.map((t, i) => (
                  <div key={i} className="cs-title-item">
                    <span className="num cs-mono">{i + 1}</span>
                    <span className="txt">{t}</span>
                    <div className="acts">
                      <MiniIco Icon={Star} on={favs[i]} onClick={() => setFavs((f) => ({ ...f, [i]: !f[i] }))} title="Favorite" />
                      <MiniIco Icon={Copy} onClick={copyTool(t)} title="Copy" />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="cs-aicard cs-fade">
            <AiCardHead Icon={AlignLeft} title="AI Description" sub="Editable · SEO-aware"
              tools={<><button className="cs-mini-ico" onClick={copyTool(c.description)} title="Copy"><Copy /></button><button className="cs-mini-ico" onClick={generate} title="Regenerate"><RefreshCw /></button></>} />
            {gen ? <Sk w="100%" h={120} r={12} /> : (
              <textarea className="cs-textarea" value={c.description} onChange={(e) => setContent((x) => ({ ...x, description: e.target.value }))} />
            )}
            <div className="cs-spread" style={{ marginTop: 10 }}>
              <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{c.description.length} chars · {c.description.split(/\s+/).filter(Boolean).length} words</span>
              <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={copyTool(c.description)}><Copy /> Copy</button>
            </div>
          </div>

          <div className="cs-grid2">
            <div className="cs-aicard cs-fade">
              <AiCardHead Icon={Hash} title="Hashtags" sub={c.hashtags.length + " tags"}
                tools={<button className="cs-mini-ico" onClick={copyTool(c.hashtags.join(" "))} title="Copy all"><Copy /></button>} />
              <div className="cs-chips">{c.hashtags.map((h, i) => <span key={i} className="cs-tag" onClick={copyTool(h)}>{h}</span>)}</div>
            </div>
            <div className="cs-aicard cs-fade">
              <AiCardHead Icon={Tag} title="Keywords" sub="SEO targets"
                tools={<button className="cs-mini-ico" onClick={copyTool(c.keywords.join(", "))} title="Copy all"><Copy /></button>} />
              <div className="cs-chips">{c.keywords.map((k, i) => <span key={i} className="cs-kw"><Tag /> {k}</span>)}</div>
            </div>
          </div>

          <div className="cs-aicard cs-fade">
            <AiCardHead Icon={ImageIcon} title="Thumbnail Text" sub="High-CTR overlays" />
            <div className="cs-grid2" style={{ gap: 9 }}>
              {c.thumbnailText.map((t, i) => (
                <div key={i} className="cs-suggest" onClick={copyTool(t)}><span>{t}</span><Copy size={14} style={{ color: "var(--ink-4)", flexShrink: 0 }} /></div>
              ))}
            </div>
          </div>

          <div className="cs-aicard cs-fade">
            <AiCardHead Icon={Flame} title="Hooks" sub="First-3-second openers"
              tools={<button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={generate} disabled={gen}><RefreshCw className={gen ? "cs-spin" : ""} /> New set</button>} />
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {c.hooks.map((h, i) => (
                <div key={i} className="cs-hook" onClick={copyTool(h)}><span className="qi"><Quote /></span><span className="txt">{h}</span></div>
              ))}
            </div>
          </div>

          <div className="cs-grid2">
            <div className="cs-aicard cs-fade">
              <AiCardHead Icon={ListOrdered} title="Chapters" sub="Auto timestamps" />
              <div className="cs-chapters">
                {c.chapters.map((ch, i) => (
                  <div key={i} className="cs-chap"><span className="time cs-mono">{ch.t}</span><span className="node" /><span className="label">{ch.l}</span></div>
                ))}
              </div>
            </div>
            <div className="cs-aicard cs-fade">
              <AiCardHead Icon={Mic} title="Transcript" sub="Speech-to-text"
                tools={<button className="cs-mini-ico" onClick={copyTool(AI_TRANSCRIPT.map((l) => l.tt).join(" "))} title="Copy"><Copy /></button>} />
              <div className="cs-transcript">
                {AI_TRANSCRIPT.map((l, i) => (<div key={i} className="cs-tline"><span className="ts cs-mono">{l.ts}</span><span className="tt">{l.tt}</span></div>))}
              </div>
            </div>
          </div>

          <div className="cs-aicard aura cs-fade">
            <AiCardHead Icon={FileText} title="AI Summary" sub="~80 words"
              tools={<button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={copyTool(c.summary)}><Copy /> Copy</button>} />
            {gen ? <Sk w="100%" h={70} r={10} /> : <p className="cs-summary"><b>The takeaway:</b> {c.summary}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

const CANNED = {
  positive: ["Thank you so much! 💜", "So glad it helped — good luck with it!", "Appreciate you watching! 🙏"],
  neutral: ["Great question! Let me explain…", "Thanks for reaching out — happy to chat.", "Good point — I'll cover that in an upcoming video!"],
  spam: ["Report & block", "Not interested, thanks"],
};

function InboxView({ notify }) {
  const [convs, setConvs] = useState(INBOX_CONV);
  const [activeId, setActiveId] = useState(INBOX_CONV[0].id);
  const [filter, setFilter] = useState("all");
  const [reply, setReply] = useState("");
  const [sugs, setSugs] = useState([]);
  const [aiLoad, setAiLoad] = useState(false);

  const active = convs.find((c) => c.id === activeId);
  const unread = convs.filter((c) => c.unread).length;

  useEffect(() => {
    if (active) setSugs(CANNED[active.sentiment] || CANNED.neutral);
  }, [activeId]);

  const open = (id) => {
    setActiveId(id);
    setConvs((cs) => cs.map((c) => (c.id === id ? { ...c, unread: false } : c)));
    setReply("");
  };
  const markAll = () => setConvs((cs) => cs.map((c) => ({ ...c, unread: false })));

  const send = () => {
    const t = reply.trim();
    if (!t || !active) return;
    setConvs((cs) => cs.map((c) => (c.id === active.id ? { ...c, thread: [...c.thread, { who: "me", text: t }], preview: t } : c)));
    setReply("");
  };

  const aiSuggest = async () => {
    if (!active || aiLoad) return;
    setAiLoad(true);
    const last = [...active.thread].reverse().find((m) => m.who === "them");
    const prompt = `A follower sent this message: "${last ? last.text : active.preview}". As a friendly, authentic creator, write 3 short reply options (under 18 words each). Respond ONLY with minified JSON: {"replies":["...","...","..."]}.`;
    try {
      const txt = await callClaude(prompt, 400);
      const j = parseJSON(txt);
      if (j && j.replies && j.replies.length) setSugs(j.replies.slice(0, 3));
      else throw new Error();
    } catch (e) {
      if (notify) notify("Live AI unavailable — showing sample replies");
      setSugs(CANNED[active.sentiment] || CANNED.neutral);
    }
    setAiLoad(false);
  };

  const filters = [
    { id: "all", label: "All", n: convs.length },
    { id: "unread", label: "Unread", n: unread },
    { id: "positive", label: "Positive", n: convs.filter((c) => c.sentiment === "positive").length },
    { id: "spam", label: "Spam", n: convs.filter((c) => c.sentiment === "spam").length },
  ];
  const shown = convs.filter((c) => filter === "all" || (filter === "unread" ? c.unread : c.sentiment === filter));

  return (
    <div>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Inbox /></span> Engagement Inbox</div>
          <div className="cs-sec-sub">{unread} unread · comments &amp; DMs from every platform in one place.</div>
        </div>
        <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={markAll} disabled={unread === 0}><Check /> Mark all read</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button key={f.id} className={"cs-chip-tab" + (filter === f.id ? " on" : "")} onClick={() => setFilter(f.id)}>{f.label} <span style={{ opacity: 0.6 }}>{f.n}</span></button>
        ))}
      </div>

      <div className="cs-inbox">
        <div className="cs-inbox-list">
          {shown.length === 0 ? (
            <div className="cs-empty" style={{ padding: "40px 20px" }}><div className="cs-empty-ico"><Inbox /></div><div style={{ fontWeight: 700 }}>Nothing here</div></div>
          ) : shown.map((c) => {
            const s = SENTIMENTS[c.sentiment];
            return (
              <div key={c.id} className={"cs-conv" + (c.id === activeId ? " active" : "") + (c.unread ? " unread" : "")} onClick={() => open(c.id)}>
                <Avatar size={40} grad={c.grad} text={c.name.replace(/[@.]/g, "").slice(0, 2).toUpperCase()} />
                <div className="cs-conv-main">
                  <div className="cn">{c.name} <span style={{ width: 14, height: 14, borderRadius: 4, background: platById(c.plat).grad, display: "inline-grid", placeItems: "center" }}>{(() => { const P = platById(c.plat).Icon; return <P size={9} color="#fff" />; })()}</span></div>
                  <div className="cp">{c.preview}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 7 }}>
                  <span className="ct">{c.time}</span>
                  <span className="cs-sent" style={{ background: s.c }} title={s.label} />
                </div>
              </div>
            );
          })}
        </div>

        {active ? (
          <div className="cs-thread">
            <div className="cs-thread-head">
              <Avatar size={38} grad={active.grad} text={active.name.replace(/[@.]/g, "").slice(0, 2).toUpperCase()} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{active.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)" }}>{platById(active.plat).name}</div>
              </div>
              {(() => { const s = SENTIMENTS[active.sentiment]; return <span className="cs-badge" style={{ background: s.c + "22", color: s.c, borderColor: s.c + "40" }}><s.I size={12} /> {s.label}</span>; })()}
            </div>
            <div className="cs-thread-body">
              {active.thread.map((m, i) => (
                <div key={i} className={"cs-tmsg " + (m.who === "me" ? "me" : "them")}>
                  {m.who === "them" && <Avatar size={28} grad={active.grad} text={active.name.slice(0, 1).toUpperCase()} />}
                  <div className="tb">{m.text}</div>
                </div>
              ))}
            </div>
            <div className="cs-thread-foot">
              <div className="cs-ai-chips">
                {sugs.map((s, i) => <span key={i} className="cs-ai-chip" onClick={() => setReply(s)}><Sparkles /> {s}</span>)}
                <span className="cs-ai-chip" onClick={aiSuggest} style={{ background: "var(--surface-2)", color: "var(--ink-2)", borderColor: "var(--border-2)" }}>
                  {aiLoad ? <RefreshCw className="cs-spin" /> : <Wand2 />} {aiLoad ? "Writing…" : "AI replies"}
                </span>
              </div>
              <div className="cs-reply-row">
                <input className="cs-input" value={reply} onChange={(e) => setReply(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} placeholder={"Reply to " + active.name + "…"} />
                <button className="cs-btn cs-btn-primary" onClick={send} style={{ padding: "10px 13px" }}><Send /></button>
              </div>
            </div>
          </div>
        ) : <div className="cs-thread" style={{ placeItems: "center", display: "grid" }}><div style={{ color: "var(--ink-4)" }}>Select a conversation</div></div>}
      </div>
    </div>
  );
}

function scoreFallback(text) {
  const t = text.toLowerCase();
  const len = text.trim().length;
  let h = 0; for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
  const power = ["secret", "nobody", "mistake", "stop", "truth", "why", "how", "proven", "fast", "hack", "instantly", "never"];
  let s = 52 + (/\d/.test(t) ? 8 : 0) + (power.some((p) => t.includes(p)) ? 12 : 0) + (len >= 30 && len <= 110 ? 9 : len > 180 ? -8 : 0) + (Math.abs(h) % 15);
  s = Math.max(28, Math.min(96, s));
  const verdict = s >= 80 ? "Strong viral potential" : s >= 65 ? "Solid — worth posting" : s >= 50 ? "Needs a sharper hook" : "Rethink the angle";
  return { score: s, verdict, reasons: ["Hook clarity drives the first-3-second retention", "Curiosity gap is " + (s >= 70 ? "strong" : "moderate"), "Matches a currently rising format"], fix: "Lead with the most surprising claim in the first 2 seconds." };
}

function TrendsView({ setView, spend }) {
  const [idea, setIdea] = useState("");
  const [scoring, setScoring] = useState(false);
  const [result, setResult] = useState(null);

  const score = async () => {
    const t = idea.trim();
    if (!t || scoring) return;
    setScoring(true); setResult(null);
    if (spend) spend(6);
    const prompt = `Rate this short-form video idea's viral potential from 0-100 and explain briefly. Idea: "${t}". Respond ONLY with minified JSON: {"score":<int 0-100>,"verdict":"<one short line>","reasons":["<3 short strings>"],"fix":"<one concrete improvement tip>"}`;
    try {
      const txt = await callClaude(prompt, 450);
      const j = parseJSON(txt);
      if (!j || typeof j.score === "undefined") throw new Error();
      setResult({ score: Math.max(0, Math.min(100, Math.round(j.score))), verdict: j.verdict || "", reasons: (j.reasons || []).slice(0, 3), fix: j.fix || "" });
    } catch (e) {
      setResult(scoreFallback(t));
    }
    setScoring(false);
  };

  const sColor = (s) => (s >= 75 ? "#34d399" : s >= 55 ? "#fbbf24" : "#f87171");

  return (
    <div>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Flame /></span> Trends &amp; Competitors</div>
          <div className="cs-sec-sub">Catch rising trends, benchmark rivals, and pressure-test ideas before you film.</div>
        </div>
        <button className="cs-btn cs-btn-primary cs-btn-sm" onClick={() => setView("ai")}><Sparkles /> Turn a trend into content</button>
      </div>

      <div className="cs-viral cs-fade" style={{ marginBottom: 18 }}>
        <div className="cs-row" style={{ gap: 9, marginBottom: 12 }}>
          <span className="cs-tico" style={{ width: 30, height: 30 }}><Gauge /></span>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>Viral Score Predictor</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>AI rates your idea and tells you how to sharpen it</div></div>
        </div>
        <div className="cs-row" style={{ gap: 10, alignItems: "stretch", flexWrap: "wrap" }}>
          <input className="cs-input" style={{ flex: 1, minWidth: 240 }} value={idea} onChange={(e) => setIdea(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") score(); }} placeholder="e.g. I tried posting daily for 30 days — here's what happened" />
          <button className="cs-btn cs-btn-primary" onClick={score} disabled={scoring}>{scoring ? <><RefreshCw className="cs-spin" /> Scoring…</> : <><Wand2 /> Score idea</>}</button>
        </div>

        {(scoring || result) && (
          <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 18, marginTop: 18, alignItems: "center" }} className="cs-viral-result">
            <div style={{ textAlign: "center" }}>
              {scoring ? <Sk w={120} h={56} r={12} style={{ margin: "0 auto" }} /> : <>
                <div className="cs-score-big" style={{ WebkitTextFillColor: "transparent", background: `linear-gradient(135deg, ${sColor(result.score)}, #a855f7)`, WebkitBackgroundClip: "text", backgroundClip: "text" }}>{result.score}</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>/ 100</div>
                <div className="cs-progbar" style={{ marginTop: 10, background: "var(--surface-3)" }}><i style={{ width: result.score + "%", background: sColor(result.score) }} /></div>
              </>}
            </div>
            <div>
              {scoring ? <><Sk w="60%" h={18} r={6} /><div style={{ height: 8 }} /><Sk w="100%" h={48} r={8} /></> : <>
                <div style={{ fontWeight: 700, fontSize: 15, color: sColor(result.score) }}>{result.verdict}</div>
                <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {result.reasons.map((r, i) => <li key={i} style={{ fontSize: 12.5, color: "var(--ink-2)", display: "flex", gap: 8 }}><CheckCircle2 size={14} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }} /> {r}</li>)}
                </ul>
                {result.fix && <div className="cs-tip" style={{ marginTop: 12 }}><Lightbulb /><p><b style={{ color: "var(--ink)" }}>Make it better:</b> {result.fix}</p></div>}
              </>}
            </div>
          </div>
        )}
      </div>

      <div className="cs-stat-grid" style={{ marginBottom: 18 }}>
        <div className="cs-card cs-card-pad cs-fade">
          <div className="cs-row" style={{ gap: 8, marginBottom: 12 }}><Music2 size={16} style={{ color: "var(--accent)" }} /><b style={{ fontSize: 13.5 }}>Trending Audio</b></div>
          {TREND_AUDIO.map((a, i) => (
            <div key={i} className="cs-spread" style={{ padding: "9px 0", borderBottom: i < TREND_AUDIO.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ minWidth: 0 }}><div style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.t}</div><div style={{ fontSize: 11, color: "var(--ink-4)" }}>{a.m}</div></div>
              {a.hot && <span className="cs-badge cs-b-danger" style={{ flexShrink: 0 }}><Flame size={10} /> Hot</span>}
            </div>
          ))}
        </div>
        <div className="cs-card cs-card-pad cs-fade">
          <div className="cs-row" style={{ gap: 8, marginBottom: 12 }}><Film size={16} style={{ color: "var(--accent)" }} /><b style={{ fontSize: 13.5 }}>Winning Formats</b></div>
          {TREND_FORMATS.map((f, i) => (
            <div key={i} className="cs-spread" style={{ padding: "9px 0", borderBottom: i < TREND_FORMATS.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{f.t}</div><div style={{ fontSize: 11, color: "var(--ok)", fontWeight: 600 }}>{f.m}</div>
            </div>
          ))}
        </div>
        <div className="cs-card cs-card-pad cs-fade">
          <div className="cs-row" style={{ gap: 8, marginBottom: 12 }}><TrendingUp size={16} style={{ color: "var(--accent)" }} /><b style={{ fontSize: 13.5 }}>Trending Topics</b></div>
          {TRENDING.map((t, i) => (
            <div key={i} className="cs-spread" style={{ padding: "9px 0", borderBottom: i < TRENDING.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{t.t}</div><div style={{ fontSize: 11, color: "var(--ink-4)" }}>{t.m}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cs-grid2">
        <div className="cs-card cs-card-pad cs-fade">
          <div className="cs-spread" style={{ marginBottom: 14 }}>
            <div className="cs-row" style={{ gap: 8 }}><Trophy size={16} style={{ color: "var(--warn)" }} /><b style={{ fontSize: 14 }}>Competitor Benchmark</b></div>
            <span className="cs-badge cs-b-muted">Your niche</span>
          </div>
          {COMPETITORS.map((c, i) => (
            <div key={i} className={"cs-vs-row" + (c.you ? " you" : "")}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "var(--ink-4)", width: 18 }}>{i + 1}</span>
              <Avatar size={34} grad={c.you ? "linear-gradient(135deg,#a855f7,#6366f1)" : VID_GRADS[(i + 2) % VID_GRADS.length]} text={c.name.slice(0, 2).toUpperCase()} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{c.name} {c.you && <span className="cs-badge cs-b-accent" style={{ marginLeft: 4 }}>You</span>}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-4)" }}>{c.handle}</div>
              </div>
              <div className="cs-vs-stat"><div className="vv">{c.followers}</div><div className="vl">followers</div></div>
              <div className="cs-vs-stat"><div className="vv" style={{ color: "var(--ok)" }}>{c.growth}</div><div className="vl">growth</div></div>
              <div className="cs-vs-stat"><div className="vv">{c.eng}</div><div className="vl">engage</div></div>
            </div>
          ))}
        </div>

        <div className="cs-card cs-card-pad cs-fade">
          <div className="cs-row" style={{ gap: 8, marginBottom: 14 }}><ScanLine size={16} style={{ color: "var(--accent)" }} /><b style={{ fontSize: 14 }}>Content Gap Finder</b></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {CONTENT_GAPS.map((g, i) => (
              <div key={i} className="cs-gap">
                <span style={{ width: 30, height: 30, borderRadius: 9, display: "grid", placeItems: "center", background: "var(--accent-soft)", color: "var(--accent)", flexShrink: 0 }}><Lightbulb size={15} /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{g.t}</div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 4, lineHeight: 1.5 }}>{g.m}</div>
                </div>
                <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => setView("ai")} style={{ flexShrink: 0 }}><ArrowRight size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsKpi({ label, value, delta, up, Icon, color, bg, data, delay = 0 }) {
  return (
    <div className="cs-card cs-card-pad cs-hoverable cs-fade" style={{ animationDelay: delay + "ms" }}>
      <div className="cs-spread">
        <span style={{ width: 34, height: 34, borderRadius: 10, display: "grid", placeItems: "center", background: bg, color }}><Icon size={17} /></span>
        <span className={"cs-trend " + (up ? "up" : "down")}>{up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {delta}</span>
      </div>
      <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 12 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{label}</div>
      <div style={{ marginTop: 10 }}><Spark data={data} color={color} /></div>
    </div>
  );
}

function AnalyticsView({ loading }) {
  const [insight, setInsight] = useState("");
  const [insLoad, setInsLoad] = useState(false);
  const ranOnce = useRef(false);

  const genInsight = async () => {
    setInsLoad(true);
    const prompt = `You are an analytics co-pilot for a social-media creator. This week: views 2.96M (+8.7%), engagement rate 7.8% (+1.2pts), best day Sunday, top format short-form, watch-time up 14%, audience mostly 18-34 in the US. In 3 short sentences, plainly summarise what's working and give 2 specific recommendations. No preamble.`;
    try {
      const txt = await callClaude(prompt, 350);
      setInsight(txt || "");
      if (!txt) throw new Error();
    } catch (e) {
      setInsight("Your short-form posts are carrying growth this week — Sunday uploads hit 2.3× your average reach. Double down on the under-60-second format and post your next two videos Sunday evening. Engagement is climbing fastest with your 18–24 audience, so lead hooks with fast cuts and on-screen text.");
    }
    setInsLoad(false);
  };
  useEffect(() => { if (!ranOnce.current) { ranOnce.current = true; genInsight(); } }, []);

  if (loading) {
    return (
      <div>
        <div className="cs-sec-head first"><div><Sk w={220} h={26} r={8} /><div style={{ height: 6 }} /><Sk w={320} h={14} r={6} /></div></div>
        <div className="cs-stat-grid">{Array.from({ length: 4 }).map((_, i) => <Sk key={i} w="100%" h={150} r={18} />)}</div>
        <div style={{ height: 16 }} /><Sk w="100%" h={320} r={18} />
      </div>
    );
  }

  const kpis = [
    { label: "Total Views", value: "2.96M", delta: "8.7%", up: true, Icon: Eye, color: "#60a5fa", bg: "rgba(96,165,250,0.14)", data: spark([30, 28, 42, 38, 52, 48, 64]) },
    { label: "Engagement Rate", value: "7.8%", delta: "1.2%", up: true, Icon: Heart, color: "#f472b6", bg: "rgba(244,114,182,0.14)", data: spark([5, 6, 5.5, 6.5, 7, 7.4, 7.8]) },
    { label: "Watch Time (hrs)", value: "184K", delta: "14.0%", up: true, Icon: Clock, color: "#a855f7", bg: "rgba(168,85,247,0.14)", data: spark([20, 26, 24, 32, 36, 40, 48]) },
    { label: "New Followers", value: "+48.2K", delta: "5.9%", up: true, Icon: Users, color: "#34d399", bg: "rgba(52,211,153,0.14)", data: spark([12, 18, 15, 26, 24, 32, 40]) },
  ];

  return (
    <div>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><BarChart3 /></span> Analytics</div>
          <div className="cs-sec-sub">Performance, audience and retention across every platform.</div>
        </div>
        <div className="cs-segbar"><button>7d</button><button className="on">30d</button><button>90d</button></div>
      </div>

      <div className="cs-stat-grid">
        {kpis.map((k, i) => <AnalyticsKpi key={i} {...k} delay={i * 60} />)}
      </div>

      <div className="cs-insight cs-fade" style={{ marginTop: 16 }}>
        <div className="cs-spread" style={{ marginBottom: 10 }}>
          <div className="cs-row" style={{ gap: 9 }}><span className="cs-tico" style={{ width: 30, height: 30 }}><Sparkles /></span><div style={{ fontWeight: 700, fontSize: 14.5 }}>What's working this week</div></div>
          <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={genInsight} disabled={insLoad}><RefreshCw className={insLoad ? "cs-spin" : ""} /> Refresh</button>
        </div>
        {insLoad && !insight ? <><Sk w="100%" h={14} r={6} /><div style={{ height: 7 }} /><Sk w="92%" h={14} r={6} /><div style={{ height: 7 }} /><Sk w="80%" h={14} r={6} /></>
          : <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "var(--ink-2)" }}>{insight}</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginTop: 16 }} className="cs-an-row">
        <div className="cs-card cs-card-pad cs-fade">
          <div className="cs-spread" style={{ marginBottom: 6 }}>
            <div><div style={{ fontSize: 14.5, fontWeight: 700 }}>Views & Engagement</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>Last 7 days</div></div>
            <div className="cs-row" style={{ gap: 14, fontSize: 11.5 }}>
              <span className="cs-row" style={{ gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: "#8b5cf6" }} /> Views</span>
              <span className="cs-row" style={{ gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: "#ec4899" }} /> Engagement</span>
            </div>
          </div>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_AREA} margin={{ top: 14, right: 6, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} /><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
                  <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ec4899" stopOpacity={0.4} /><stop offset="100%" stopColor="#ec4899" stopOpacity={0} /></linearGradient>
                </defs>
                <Area type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#gv)" />
                <Area type="monotone" dataKey="eng" stroke="#ec4899" strokeWidth={2.5} fill="url(#ge)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="cs-row" style={{ justifyContent: "space-between", marginTop: 4, padding: "0 4px" }}>
            {ANALYTICS_AREA.map((d) => <span key={d.d} style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{d.d}</span>)}
          </div>
        </div>

        <div className="cs-card cs-card-pad cs-fade">
          <div style={{ fontSize: 14.5, fontWeight: 700 }}>Views by Platform</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 6 }}>Share of total reach</div>
          <div style={{ height: 184, position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PLAT_SPLIT} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={56} outerRadius={82} paddingAngle={2} stroke="none">
                  {PLAT_SPLIT.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 20, fontWeight: 800 }}>2.96M</div><div style={{ fontSize: 10.5, color: "var(--ink-4)" }}>total views</div></div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {PLAT_SPLIT.map((p) => (
              <div key={p.name} className="cs-spread"><span className="cs-row" style={{ gap: 8, fontSize: 12.5 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: p.color }} /> {p.name}</span><b style={{ fontSize: 12.5 }}>{p.value}%</b></div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: 16, marginTop: 16 }} className="cs-an-row3">
        <div className="cs-card cs-card-pad cs-fade">
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Age</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 12 }}>Audience by age group</div>
          {DEMO_AGE.map((a) => (
            <div key={a.label} className="cs-demo-row">
              <span className="dl">{a.label}</span><span className="cs-demo-track"><i style={{ width: a.pct + "%" }} /></span><span className="dv">{a.pct}%</span>
            </div>
          ))}
        </div>

        <div className="cs-card cs-card-pad cs-fade">
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Gender</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 6 }}>Audience split</div>
          <div style={{ height: 130 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={DEMO_GENDER} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={2} stroke="none">{DEMO_GENDER.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie></PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 6 }}>
            {DEMO_GENDER.map((g) => <div key={g.name} className="cs-spread"><span className="cs-row" style={{ gap: 8, fontSize: 12.5 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: g.color }} /> {g.name}</span><b style={{ fontSize: 12.5 }}>{g.value}%</b></div>)}
          </div>
        </div>

        <div className="cs-card cs-card-pad cs-fade">
          <div className="cs-row" style={{ gap: 7, marginBottom: 4 }}><MapPin size={15} style={{ color: "var(--accent)" }} /><div style={{ fontSize: 14, fontWeight: 700 }}>Top Locations</div></div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 6 }}>Where your audience watches from</div>
          {DEMO_GEO.map((g) => (
            <div key={g.country} className="cs-geo-row">
              <span className="cs-geo-flag">{g.flag}</span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 12.5, fontWeight: 600 }}>{g.country}</div><div className="cs-demo-track" style={{ marginTop: 5 }}><i style={{ width: g.pct * 2.8 + "%" }} /></div></div>
              <b style={{ fontSize: 12.5 }}>{g.pct}%</b>
            </div>
          ))}
        </div>
      </div>

      <div className="cs-card cs-card-pad cs-fade" style={{ marginTop: 16 }}>
        <div className="cs-spread" style={{ marginBottom: 6 }}>
          <div><div style={{ fontSize: 14.5, fontWeight: 700 }}>Audience Retention</div><div style={{ fontSize: 12, color: "var(--ink-3)" }}>You vs. niche average — % still watching</div></div>
          <div className="cs-row" style={{ gap: 14, fontSize: 11.5 }}>
            <span className="cs-row" style={{ gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: "#a855f7" }} /> You</span>
            <span className="cs-row" style={{ gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: "var(--ink-4)" }} /> Avg</span>
          </div>
        </div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={RETENTION} margin={{ top: 14, right: 8, left: 0, bottom: 0 }}>
              <Line type="monotone" dataKey="avg" stroke="#9aa0ab" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="you" stroke="#a855f7" strokeWidth={2.6} dot={{ r: 3, fill: "#a855f7" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="cs-row" style={{ justifyContent: "space-between", marginTop: 4, padding: "0 4px" }}>
          {RETENTION.map((d) => <span key={d.d} style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{d.d}</span>)}
        </div>
      </div>
    </div>
  );
}

function Toggle({ on, onClick }) {
  return <div className={"cs-switch" + (on ? " on" : "")} onClick={onClick} role="switch" aria-checked={on}><i /></div>;
}
function SettingsCard({ Icon, title, sub, children, right }) {
  return (
    <div className="cs-card cs-card-pad cs-fade">
      <div className="cs-spread" style={{ marginBottom: 16 }}>
        <div className="cs-row" style={{ gap: 11 }}>
          <span style={{ width: 34, height: 34, borderRadius: 10, display: "grid", placeItems: "center", background: "var(--accent-soft)", color: "var(--accent)" }}><Icon size={17} /></span>
          <div><div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>{sub && <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 1 }}>{sub}</div>}</div>
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}
function SettingRow({ label, desc, children, last }) {
  return (
    <div className="cs-spread" style={{ padding: "12px 0", borderBottom: last ? "none" : "1px solid var(--border)" }}>
      <div style={{ minWidth: 0, paddingRight: 12 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>{desc && <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 2 }}>{desc}</div>}</div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

const INVOICES = [
  { date: "Jun 1, 2026", amt: "$49.00", id: "INV-2026-006" },
  { date: "May 1, 2026", amt: "$49.00", id: "INV-2026-005" },
  { date: "Apr 1, 2026", amt: "$49.00", id: "INV-2026-004" },
];
const INTEGRATIONS = [
  { name: "Zapier", desc: "Automate workflows", on: true, Icon: Plug, c: "#FF4A00" },
  { name: "Notion", desc: "Sync your content plan", on: true, Icon: FileText, c: "#999" },
  { name: "Google Drive", desc: "Import raw footage", on: false, Icon: Film, c: "#1FA463" },
  { name: "Slack", desc: "Team notifications", on: false, Icon: MessageCircle, c: "#E01E5A" },
];

function SettingsView({ theme, toggleTheme, copy }) {
  const [tg, setTg] = useState({ comments: true, deals: true, milestones: true, weekly: false, autopost: true, voice: true, captions: true, twofa: true });
  const flip = (k) => () => setTg((s) => ({ ...s, [k]: !s[k] }));
  const [integ, setInteg] = useState(INTEGRATIONS);
  const [apiKey, setApiKey] = useState("studio_live_9f2a7c4e8b1d6035a9e7f1c2");
  const [sessions, setSessions] = useState([
    { id: 1, dev: "MacBook Pro · Chrome", loc: "Lahore, PK", current: true, Icon: Monitor },
    { id: 2, dev: "iPhone 15 · Studio App", loc: "Lahore, PK", current: false, Icon: Smartphone },
    { id: 3, dev: "Windows PC · Edge", loc: "Dubai, AE", current: false, Icon: Monitor },
  ]);
  const regen = () => { const r = "studio_live_" + Array.from({ length: 24 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""); setApiKey(r); };
  const mask = (k) => k.slice(0, 11) + "•".repeat(13) + k.slice(-4);

  return (
    <div>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Settings /></span> Settings</div>
          <div className="cs-sec-sub">Manage your profile, billing, integrations and security.</div>
        </div>
      </div>

      <SettingsCard Icon={Users} title="Profile" sub="How you appear across the studio"
        right={<button className="cs-btn cs-btn-primary cs-btn-sm"><Check /> Save changes</button>}>
        <div className="cs-row" style={{ gap: 16, flexWrap: "wrap" }}>
          <Avatar size={64} grad="linear-gradient(135deg,#f472b6,#8b5cf6)" text="MC" ring />
          <div style={{ flex: 1, minWidth: 220 }}>
            <div className="cs-grid2" style={{ gap: 12 }}>
              <div><div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-3)", marginBottom: 5 }}>Display name</div><input className="cs-input" defaultValue="Muhammad Creator" /></div>
              <div><div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-3)", marginBottom: 5 }}>Email</div><input className="cs-input" defaultValue="hello@influencersstudio.io" /></div>
            </div>
            <div style={{ marginTop: 12 }}><div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-3)", marginBottom: 5 }}>Bio</div><input className="cs-input" defaultValue="Creator · teaching 2.8M people how to grow online." /></div>
          </div>
        </div>
      </SettingsCard>

      <div className="cs-grid2" style={{ marginTop: 16 }}>
        <SettingsCard Icon={Bell} title="Notifications" sub="What we ping you about">
          <SettingRow label="New comments & DMs" desc="When someone engages"><Toggle on={tg.comments} onClick={flip("comments")} /></SettingRow>
          <SettingRow label="Deal & collab offers" desc="Inbound partnership requests"><Toggle on={tg.deals} onClick={flip("deals")} /></SettingRow>
          <SettingRow label="Milestones" desc="Follower and view goals"><Toggle on={tg.milestones} onClick={flip("milestones")} /></SettingRow>
          <SettingRow label="Weekly digest email" desc="Sunday performance recap" last><Toggle on={tg.weekly} onClick={flip("weekly")} /></SettingRow>
        </SettingsCard>
        <SettingsCard Icon={Sparkles} title="AI Preferences" sub="How the assistant behaves">
          <SettingRow label="Auto-post optimal time" desc="Schedule to your peak window"><Toggle on={tg.autopost} onClick={flip("autopost")} /></SettingRow>
          <SettingRow label="Brand voice matching" desc="Write in your tone"><Toggle on={tg.voice} onClick={flip("voice")} /></SettingRow>
          <SettingRow label="Auto-generate captions" desc="On every upload" last><Toggle on={tg.captions} onClick={flip("captions")} /></SettingRow>
        </SettingsCard>
      </div>

      <div className="cs-grid2" style={{ marginTop: 16 }}>
        <SettingsCard Icon={theme === "light" ? Sun : Moon} title="Appearance" sub="Theme for the studio">
          <SettingRow label="Theme" desc="Switch between light and dark" last>
            <div className="cs-segbar">
              <button className={theme !== "light" ? "on" : ""} onClick={() => { if (theme === "light") toggleTheme(); }}><Moon size={13} style={{ verticalAlign: "-2px", marginRight: 5 }} />Dark</button>
              <button className={theme === "light" ? "on" : ""} onClick={() => { if (theme !== "light") toggleTheme(); }}><Sun size={13} style={{ verticalAlign: "-2px", marginRight: 5 }} />Light</button>
            </div>
          </SettingRow>
        </SettingsCard>
        <SettingsCard Icon={SlidersHorizontal} title="Defaults" sub="Applied to new uploads">
          <SettingRow label="Default visibility" desc="Public / Unlisted / Private">
            <div className="cs-segbar"><button className="on">Public</button><button>Unlisted</button></div>
          </SettingRow>
          <SettingRow label="Primary platform" desc="Where you publish first" last>
            <div className="cs-row" style={{ gap: 6, fontSize: 13, fontWeight: 600 }}><span style={{ width: 20, height: 20, borderRadius: 6, display: "grid", placeItems: "center", background: "linear-gradient(135deg,#FF4747,#CC0000)" }}><Youtube size={11} color="#fff" /></span>YouTube</div>
          </SettingRow>
        </SettingsCard>
      </div>

      <div style={{ marginTop: 16 }}>
        <SettingsCard Icon={CreditCard} title="Billing & Plan" sub="Your subscription and invoices"
          right={<button className="cs-btn cs-btn-ghost cs-btn-sm">View plans</button>}>
          <div className="cs-grid2" style={{ gap: 16, alignItems: "stretch" }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 15, background: "var(--surface-2)" }}>
              <div className="cs-spread"><span style={{ fontSize: 13.5, fontWeight: 700 }}>Creator Pro</span><span className="cs-badge cs-b-ok">Active</span></div>
              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>$49<span style={{ fontSize: 13, color: "var(--ink-4)", fontWeight: 600 }}>/mo</span></div>
              <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 2 }}>Renews Jul 1, 2026</div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-3)", margin: "14px 0 6px" }}>AI credits used this cycle</div>
              <div className="cs-progbar" style={{ background: "var(--surface-3)" }}><i style={{ width: "62%" }} /></div>
              <div className="cs-spread" style={{ marginTop: 6, fontSize: 11, color: "var(--ink-4)" }}><span>1,520 used</span><span>2,480 left</span></div>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 15 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)", marginBottom: 10 }}>Payment method</div>
              <div className="cs-row" style={{ gap: 11 }}>
                <span style={{ width: 42, height: 30, borderRadius: 7, background: "linear-gradient(135deg,#1a1f71,#3b4ba8)", display: "grid", placeItems: "center", color: "#fff", fontSize: 10, fontWeight: 800, letterSpacing: 0.5 }}>VISA</span>
                <div><div style={{ fontSize: 13, fontWeight: 600 }}>•••• •••• •••• 4242</div><div style={{ fontSize: 11, color: "var(--ink-4)" }}>Expires 08 / 28</div></div>
                <button className="cs-btn cs-btn-ghost cs-btn-sm" style={{ marginLeft: "auto" }}>Update</button>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)", margin: "16px 0 8px" }}>Recent invoices</div>
              {INVOICES.map((iv) => (
                <div key={iv.id} className="cs-spread" style={{ padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <div><div style={{ fontSize: 12.5, fontWeight: 600 }}>{iv.amt}</div><div style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{iv.date}</div></div>
                  <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => copy && copy(iv.id)}><Download size={13} /> PDF</button>
                </div>
              ))}
            </div>
          </div>
        </SettingsCard>
      </div>

      <div style={{ marginTop: 16 }}>
        <SettingsCard Icon={Plug} title="Integrations & API" sub="Connect your tools and automate">
          <div className="cs-grid2" style={{ gap: 10 }}>
            {integ.map((it, i) => (
              <div key={it.name} className="cs-spread" style={{ border: "1px solid var(--border)", borderRadius: "var(--r)", padding: "12px 14px" }}>
                <div className="cs-row" style={{ gap: 11 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 9, display: "grid", placeItems: "center", background: it.c + "1f", color: it.c }}><it.Icon size={16} /></span>
                  <div><div style={{ fontSize: 13, fontWeight: 600 }}>{it.name}</div><div style={{ fontSize: 11, color: "var(--ink-4)" }}>{it.desc}</div></div>
                </div>
                <Toggle on={it.on} onClick={() => setInteg((arr) => arr.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 15, background: "var(--surface-2)" }}>
            <div className="cs-spread" style={{ marginBottom: 9 }}><span className="cs-row" style={{ gap: 8, fontSize: 13, fontWeight: 700 }}><KeyRound size={15} style={{ color: "var(--accent)" }} /> API key</span><span className="cs-badge cs-b-muted">Live</span></div>
            <div className="cs-row" style={{ gap: 9, flexWrap: "wrap" }}>
              <code style={{ flex: 1, minWidth: 200, fontFamily: "'JetBrains Mono',monospace", fontSize: 12.5, background: "var(--surface-3)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 12px", color: "var(--ink-2)" }}>{mask(apiKey)}</code>
              <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => copy && copy(apiKey)}><Copy /> Copy</button>
              <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={regen}><RefreshCw /> Regenerate</button>
            </div>
          </div>
        </SettingsCard>
      </div>

      <div style={{ marginTop: 16 }}>
        <SettingsCard Icon={Shield} title="Security" sub="Protect your account">
          <SettingRow label="Two-factor authentication" desc={tg.twofa ? "Enabled · authenticator app" : "Add an extra layer of protection"}>
            <Toggle on={tg.twofa} onClick={flip("twofa")} />
          </SettingRow>
          <SettingRow label="Password" desc="Last changed 3 months ago"><button className="cs-btn cs-btn-ghost cs-btn-sm">Change</button></SettingRow>
          <div style={{ paddingTop: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)", marginBottom: 8 }}>Active sessions</div>
            {sessions.map((s) => (
              <div key={s.id} className="cs-spread" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div className="cs-row" style={{ gap: 11 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 9, display: "grid", placeItems: "center", background: "var(--surface-3)", color: "var(--ink-2)" }}><s.Icon size={16} /></span>
                  <div><div style={{ fontSize: 12.5, fontWeight: 600 }}>{s.dev}</div><div style={{ fontSize: 11, color: "var(--ink-4)" }}>{s.loc}</div></div>
                </div>
                {s.current ? <span className="cs-badge cs-b-ok">This device</span>
                  : <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={() => setSessions((a) => a.filter((x) => x.id !== s.id))}>Revoke</button>}
              </div>
            ))}
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}

function OnboardingChecklist({ setView }) {
  const [dismissed, setDismissed] = useState(false);
  const [steps, setSteps] = useState([
    { id: "connect", label: "Connect a platform", Icon: Link2, done: true, view: "accounts" },
    { id: "upload", label: "Upload your first video", Icon: UploadCloud, done: true, view: "upload" },
    { id: "generate", label: "Generate AI content", Icon: Sparkles, done: false, view: "ai" },
    { id: "schedule", label: "Schedule a post", Icon: Calendar, done: false, view: "calendar" },
    { id: "voice", label: "Set your brand voice", Icon: Mic, done: false, view: "settings" },
  ]);
  if (dismissed) return null;
  const done = steps.filter((s) => s.done).length;
  const pct = Math.round((done / steps.length) * 100);

  return (
    <div className="cs-checklist cs-fade">
      <div className="cs-spread">
        <div className="cs-row" style={{ gap: 11 }}>
          <span className="cs-tico" style={{ width: 34, height: 34 }}><Rocket /></span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>Finish setting up your studio</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginTop: 2 }}>{done} of {steps.length} done · {pct}% complete</div>
          </div>
        </div>
        <button className="cs-ico cs-ico-sm" onClick={() => setDismissed(true)} title="Dismiss"><X /></button>
      </div>
      <div className="cs-progbar" style={{ marginTop: 14 }}><i style={{ width: pct + "%" }} /></div>
      <div className="cs-check-grid">
        {steps.map((s) => (
          <div key={s.id} className={"cs-check-item" + (s.done ? " done" : "")}
            onClick={() => { if (!s.done) { setSteps((arr) => arr.map((x) => (x.id === s.id ? { ...x, done: true } : x))); } setView(s.view); }}>
            <div className={"cs-check-box" + (s.done ? " on" : "")}>{s.done ? <Check /> : <s.Icon />}</div>
            <div className="ct">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const BOTTOM_NAV = [
  { id: "dashboard", label: "Home", Icon: LayoutDashboard },
  { id: "library", label: "Library", Icon: Video },
  { id: "upload", label: "Upload", Icon: UploadCloud },
  { id: "calendar", label: "Calendar", Icon: Calendar },
  { id: "inbox", label: "Inbox", Icon: Inbox },
];
function BottomNav({ view, setView }) {
  return (
    <nav className="cs-botnav">
      {BOTTOM_NAV.map((n) => (
        <button key={n.id} className={"cs-botnav-item" + (view === n.id ? " on" : "")} onClick={() => setView(n.id)}>
          <n.Icon /> {n.label}
        </button>
      ))}
    </nav>
  );
}

function TokenReminder({ platforms }) {
  const [dismissed, setDismissed] = useState(false);
  const now = new Date();
  const soon = (platforms || []).filter((p) => {
    if (!p.connected || !p.expiry || p.expiry === "—") return false;
    const d = new Date(p.expiry);
    if (isNaN(d)) return false;
    const days = (d - now) / 86400000;
    return days <= 60;
  });
  if (dismissed || soon.length === 0) return null;
  return (
    <div className="cs-fade" style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderRadius: "var(--r-lg)", border: "1px solid var(--warn-bg)", background: "var(--warn-bg)", marginBottom: 18 }}>
      <span style={{ width: 32, height: 32, borderRadius: 9, display: "grid", placeItems: "center", background: "rgba(251,191,36,0.2)", color: "var(--warn)", flexShrink: 0 }}><Clock size={16} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{soon.length} connection{soon.length > 1 ? "s" : ""} need{soon.length > 1 ? "" : "s"} reauthorizing soon</div>
        <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 2 }}>{soon.map((p) => p.name + " (" + p.expiry + ")").join(" · ")}</div>
      </div>
      <button className="cs-btn cs-btn-primary cs-btn-sm" style={{ flexShrink: 0 }}><RefreshCw /> Refresh tokens</button>
      <button className="cs-ico cs-ico-sm" onClick={() => setDismissed(true)}><X /></button>
    </div>
  );
}

function VideoDeepDive({ v, setView, onDelete }) {
  if (!v) return null;
  const P = platById(v.plat);
  const stats = [
    { label: "Views", val: v.views, Icon: Eye, c: "#60a5fa" },
    { label: "Likes", val: v.likes, Icon: Heart, c: "#f472b6" },
    { label: "Comments", val: v.comments, Icon: MessageCircle, c: "#a855f7" },
    { label: "Shares", val: v.shares, Icon: Share2, c: "#34d399" },
  ];
  return (
    <div>
      <div className="cs-vid-thumb" style={{ background: VID_GRADS[v.g], height: 190, borderRadius: "var(--r-lg)", position: "relative", overflow: "hidden" }}>
        <div className="ov" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent,rgba(0,0,0,0.45))" }} />
        <div className="cs-vid-play" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 56, height: 56 }}><Play fill="#fff" /></div>
        <div className="cs-vid-dur cs-mono" style={{ position: "absolute", right: 12, bottom: 12 }}>{v.dur}</div>
        <div style={{ position: "absolute", left: 12, top: 12 }}><span className="cs-row" style={{ gap: 6, fontSize: 12, fontWeight: 700, color: "#fff" }}><span style={{ width: 22, height: 22, borderRadius: 6, display: "grid", placeItems: "center", background: P.grad }}><P.Icon size={12} color="#fff" /></span>{P.name}</span></div>
      </div>

      <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.35, marginTop: 16 }}>{v.title}</div>
      <div className="cs-row" style={{ gap: 10, marginTop: 8, flexWrap: "wrap" }}>
        <span className="cs-vid-date"><Calendar size={12} /> {v.date}</span>
        <StatusBadge status={v.status} />
      </div>

      <div className="cs-stat-grid" style={{ gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginTop: 18 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 13, background: "var(--surface-2)" }}>
            <div className="cs-row" style={{ gap: 7, color: s.c }}><s.Icon size={14} /><span style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 600 }}>{s.label}</span></div>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div className="cs-vid-rev" style={{ marginTop: 12 }}>
        <span className="lbl"><DollarSign size={13} /> Revenue generated</span>
        <span className="amt cs-mono">{v.revenue}</span>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8 }}>Performance (last 7 days)</div>
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 14 }}>
          <Spark data={spark([20, 34, 28, 46, 52, 60, 72])} color="#8b5cf6" />
          <div className="cs-spread" style={{ marginTop: 10, fontSize: 11.5, color: "var(--ink-4)" }}><span>7 days ago</span><span style={{ color: "var(--ok)", fontWeight: 600 }}><TrendingUp size={12} style={{ verticalAlign: "-2px" }} /> +18% vs last week</span></div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginTop: 20 }}>
        <button className="cs-btn cs-btn-ghost"><Edit3 /> Edit details</button>
        <button className="cs-btn cs-btn-primary" onClick={() => setView("ai")}><Sparkles /> Generate AI</button>
        <button className="cs-btn cs-btn-ghost"><Upload /> {v.status === "scheduled" ? "Publish now" : "Repromote"}</button>
        <button className="cs-btn cs-btn-danger" onClick={onDelete}><Trash2 /> Delete</button>
      </div>
    </div>
  );
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const heatColor = (v) => `rgba(139,92,246,${(0.12 + v * 0.85).toFixed(2)})`;

const WEEK_SLOTS = [
  { h: 6, label: "6 AM" }, { h: 9, label: "9 AM" }, { h: 12, label: "12 PM" },
  { h: 15, label: "3 PM" }, { h: 18, label: "6 PM" }, { h: 21, label: "9 PM" },
];
const SHORT_MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad2 = (n) => (n < 10 ? "0" + n : "" + n);
const dateKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const fmtMD = (d) => `${SHORT_MON[d.getMonth()]} ${d.getDate()}`;
const fmtTime = (t) => { if (!t) return ""; const h = parseInt(t.split(":")[0], 10); const s = h < 12 ? "a" : "p"; const hr = h % 12 || 12; return hr + s; };
const bucketSlot = (t) => { if (!t) return -1; const h = parseInt(t.split(":")[0], 10); let bi = 0, bd = 99; WEEK_SLOTS.forEach((s, i) => { const d = Math.abs(s.h - h); if (d < bd) { bd = d; bi = i; } }); return bi; };

function buildCalItems() {
  const t = new Date();
  const base = new Date(t.getFullYear(), t.getMonth(), t.getDate());
  const off = (n) => { const d = new Date(base); d.setDate(d.getDate() + n); return dateKey(d); };
  return [
    { id: "c1", title: "10 SEO tricks that work", plat: "youtube", g: 0, stage: "pub", date: off(-2), time: "18:00" },
    { id: "c2", title: "Reacting to my first video", plat: "tiktok", g: 1, stage: "sched", date: off(1), time: "19:00" },
    { id: "c3", title: "5 editing tricks in 60s", plat: "instagram", g: 2, stage: "sched", date: off(2), time: "12:00" },
    { id: "c4", title: "Behind the scenes", plat: "instagram", g: 5, stage: "sched", date: off(2), time: "09:00" },
    { id: "c5", title: "Gear tour 2026", plat: "youtube", g: 3, stage: "sched", date: off(4), time: "18:00" },
    { id: "c6", title: "30-day results", plat: "tiktok", g: 4, stage: "sched", date: off(6), time: "21:00" },
    { id: "c7", title: "Hot take thread", plat: "x", g: 1, stage: "sched", date: off(3), time: null },
    { id: "c8", title: "Why niching down 10x'd growth", plat: "youtube", g: 6, stage: "idea", date: null, time: null },
    { id: "c9", title: "The truth about the algorithm", plat: "youtube", g: 3, stage: "script", date: null, time: null },
    { id: "c10", title: "Posting daily for 30 days", plat: "instagram", g: 5, stage: "edit", date: null, time: null },
    { id: "c11", title: "AI tools rundown", plat: "youtube", g: 0, stage: "idea", date: null, time: null },
  ];
}

const CAL_CSS = `
.cs-backlog-wrap { border:1px solid var(--border); border-radius:var(--r-lg); background:var(--surface); padding:13px 15px; margin-bottom:16px; transition:border-color .15s, background .15s; }
.cs-backlog-wrap.over { border-color:var(--accent); background:var(--accent-soft); }
.cs-backlog { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; }
.cs-bchip { flex:0 0 auto; display:flex; align-items:center; gap:9px; padding:8px 11px 8px 9px; border-radius:10px; border:1px solid var(--border); background:var(--surface-2); cursor:grab; transition:transform .12s, box-shadow .15s, border-color .15s; }
.cs-bchip:hover { transform:translateY(-1px); box-shadow:var(--shadow); border-color:var(--border-2); }
.cs-bchip:active { cursor:grabbing; }
.cs-bchip.drag { opacity:.4; }
.cs-bchip .bar { width:4px; height:30px; border-radius:3px; flex-shrink:0; }
.cs-bchip .bt { font-size:12px; font-weight:600; white-space:nowrap; max-width:200px; overflow:hidden; text-overflow:ellipsis; }
.cs-bchip .bm { font-size:10.5px; color:var(--ink-4); margin-top:1px; }
.cs-cal-cell.over { border-color:var(--accent) !important; background:var(--accent-soft) !important; }
.cs-cal-ev { cursor:grab; }
.cs-cal-ev:active { cursor:grabbing; }
.cs-cal-ev.drag { opacity:.4; }
.cs-cal-ev .et { font-weight:800; opacity:.95; margin-right:3px; }
.cs-week { display:grid; grid-template-columns:54px repeat(7,1fr); gap:5px; }
.cs-week-h { text-align:center; padding:0 0 6px; }
.cs-week-h .wd { display:block; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--ink-4); }
.cs-week-h .dn { font-size:14px; font-weight:700; color:var(--ink-2); margin-top:2px; }
.cs-week-h.today .dn { color:#fff; background:var(--accent); width:26px; height:26px; line-height:26px; border-radius:50%; margin:2px auto 0; }
.cs-week-tl { font-size:9.5px; color:var(--ink-4); text-align:right; padding:7px 7px 0 0; }
.cs-week-tl.allday { font-weight:700; color:var(--ink-3); }
.cs-week-cell { position:relative; min-height:50px; border-radius:8px; border:1px solid var(--border); background:var(--surface); padding:4px; display:flex; flex-direction:column; gap:3px; }
.cs-week-cell.allday { min-height:34px; }
.cs-week-heat { position:absolute; inset:0; border-radius:8px; pointer-events:none; background:var(--accent); }
.cs-week-cell.over { border-color:var(--accent) !important; }
.cs-week-cell.over .cs-week-heat { background:var(--accent); opacity:.16 !important; }
.cs-week-ev { position:relative; z-index:1; font-size:10px; font-weight:600; color:#fff; padding:3px 6px; border-radius:5px; cursor:grab; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.cs-week-ev:active { cursor:grabbing; }
.cs-week-ev.drag { opacity:.4; }
.cs-week-best { position:absolute; right:4px; top:3px; z-index:1; font-size:8px; }
.cs-kan-when { display:inline-flex; align-items:center; gap:4px; font-size:9.5px; font-weight:700; padding:2px 6px; border-radius:5px; background:var(--accent-soft); color:var(--accent); margin-top:7px; }
@media (max-width:900px){ .cs-week { grid-template-columns:42px repeat(7,1fr); } .cs-week-h .dn{ font-size:12px; } }
`;

function CalendarView({ setView }) {
  const today = new Date();
  const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayKey = dateKey(todayMid);
  const [mode, setMode] = useState("month");
  const [mOff, setMOff] = useState(0);
  const [wOff, setWOff] = useState(0);
  const [items, setItems] = useState(buildCalItems);
  const [dragId, setDragId] = useState(null);
  const [over, setOver] = useState("");

  const colOf = (stage) => KANBAN_COLS.find((c) => c.id === stage) || KANBAN_COLS[0];
  const scheduled = items.filter((it) => it.date);
  const backlog = items.filter((it) => !it.date);

  const scheduleTo = (id, dKey, time) => setItems((arr) => arr.map((it) => (it.id === id ? { ...it, date: dKey, time: time !== undefined ? time : it.time, stage: it.stage === "pub" ? "pub" : "sched" } : it)));
  const setStage = (id, stage) => setItems((arr) => arr.map((it) => {
    if (it.id !== id) return it;
    let date = it.date, time = it.time;
    if (stage === "sched" || stage === "pub") { if (!date) date = todayKey; }
    else { date = null; time = null; }
    return { ...it, stage, date, time };
  }));
  const unschedule = (id) => setItems((arr) => arr.map((it) => (it.id === id ? { ...it, date: null, time: null, stage: "idea" } : it)));
  const startDrag = (id) => (e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", id); setDragId(id); };
  const endDrag = () => { setDragId(null); setOver(""); };

  const mBase = new Date(today.getFullYear(), today.getMonth() + mOff, 1);
  const mYear = mBase.getFullYear(), mMonth = mBase.getMonth();
  const firstDow = mBase.getDay();
  const daysInMonth = new Date(mYear, mMonth + 1, 0).getDate();
  const mCells = [];
  for (let i = 0; i < firstDow; i++) mCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) mCells.push(d);
  while (mCells.length % 7 !== 0) mCells.push(null);
  const evOn = (key) => scheduled.filter((it) => it.date === key).sort((a, b) => (a.time || "99").localeCompare(b.time || "99"));

  const wStart = new Date(todayMid); wStart.setDate(wStart.getDate() - wStart.getDay() + wOff * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => { const d = new Date(wStart); d.setDate(d.getDate() + i); return { d, key: dateKey(d), dow: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][i], num: d.getDate(), isToday: dateKey(d) === todayKey, heatCol: i }; });
  const wEnd = weekDays[6].d;
  const evAt = (key, slotIdx) => scheduled.filter((it) => it.date === key && bucketSlot(it.time) === slotIdx);
  const evAllDay = (key) => scheduled.filter((it) => it.date === key && !it.time);

  const navLabel = mode === "month" ? `${MONTHS[mMonth]} ${mYear}` : `${fmtMD(wStart)} — ${fmtMD(wEnd)}${wEnd.getFullYear() !== wStart.getFullYear() ? ", " + wEnd.getFullYear() : ""}`;
  const navPrev = () => (mode === "month" ? setMOff((o) => o - 1) : setWOff((o) => o - 1));
  const navNext = () => (mode === "month" ? setMOff((o) => o + 1) : setWOff((o) => o + 1));
  const navToday = () => { setMOff(0); setWOff(0); };

  return (
    <div>
      <style>{CAL_CSS}</style>
      <div className="cs-sec-head first">
        <div>
          <div className="cs-sec-title"><span className="cs-tico"><Calendar /></span> Content Calendar</div>
          <div className="cs-sec-sub">{scheduled.length} scheduled · {backlog.length} in backlog · drag a post onto a {mode === "week" ? "time slot" : "day"} to schedule it.</div>
        </div>
        <div className="cs-row" style={{ gap: 8 }}>
          <div className="cs-segbar">
            <button className={mode === "month" ? "on" : ""} onClick={() => setMode("month")}>Month</button>
            <button className={mode === "week" ? "on" : ""} onClick={() => setMode("week")}>Week</button>
          </div>
          <button className="cs-btn cs-btn-primary cs-btn-sm" onClick={() => setView("upload")}><Plus /> New post</button>
        </div>
      </div>

      <div className={"cs-backlog-wrap" + (over === "backlog" ? " over" : "")}
        onDragOver={(e) => { if (dragId) { e.preventDefault(); setOver("backlog"); } }}
        onDragLeave={() => setOver((o) => (o === "backlog" ? "" : o))}
        onDrop={(e) => { e.preventDefault(); if (dragId) unschedule(dragId); endDrag(); }}>
        <div className="cs-spread" style={{ marginBottom: backlog.length ? 11 : 0 }}>
          <span className="cs-row" style={{ gap: 8, fontSize: 12.5, fontWeight: 700 }}><Layers size={15} style={{ color: "var(--accent)" }} /> Backlog <span className="cs-badge cs-b-muted">{backlog.length}</span></span>
          <span style={{ fontSize: 11, color: "var(--ink-4)" }}>Drag a card onto the calendar — it moves to <b style={{ color: "var(--ink-3)" }}>Scheduled</b>. Drop here to unschedule.</span>
        </div>
        {backlog.length === 0 ? (
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", padding: "4px 0" }}><CheckCircle2 size={14} style={{ verticalAlign: "-2px", color: "var(--ok)" }} /> All caught up — every idea is on the calendar.</div>
        ) : (
          <div className="cs-backlog">
            {backlog.map((it) => (
              <div key={it.id} className={"cs-bchip" + (dragId === it.id ? " drag" : "")} draggable onDragStart={startDrag(it.id)} onDragEnd={endDrag}>
                <span className="bar" style={{ background: colOf(it.stage).color }} />
                <div style={{ minWidth: 0 }}>
                  <div className="bt">{it.title}</div>
                  <div className="bm">{colOf(it.stage).label} · {(platById(it.plat) || {}).name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cs-card cs-card-pad cs-fade">
        <div className="cs-spread" style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>{navLabel}</div>
          <div className="cs-row" style={{ gap: 6 }}>
            <button className="cs-ico cs-ico-sm" onClick={navPrev}><ChevronLeft /></button>
            <button className="cs-btn cs-btn-ghost cs-btn-sm" onClick={navToday}>Today</button>
            <button className="cs-ico cs-ico-sm" onClick={navNext}><ChevronRight /></button>
          </div>
        </div>

        {mode === "month" ? (
          <div className="cs-cal">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="cs-cal-dow">{d}</div>)}
            {mCells.map((d, i) => {
              if (!d) return <div key={i} className="cs-cal-cell muted" />;
              const key = dateKey(new Date(mYear, mMonth, d));
              const isToday = key === todayKey;
              return (
                <div key={i} className={"cs-cal-cell" + (isToday ? " today" : "") + (over === "cell:" + key ? " over" : "")}
                  onDragOver={(e) => { if (dragId) { e.preventDefault(); setOver("cell:" + key); } }}
                  onDragLeave={() => setOver((o) => (o === "cell:" + key ? "" : o))}
                  onDrop={(e) => { e.preventDefault(); if (dragId) scheduleTo(dragId, key); endDrag(); }}>
                  <div className="dn">{d}</div>
                  {evOn(key).map((it) => (
                    <div key={it.id} className={"cs-cal-ev" + (dragId === it.id ? " drag" : "")} draggable onDragStart={startDrag(it.id)} onDragEnd={endDrag}
                      style={{ background: VID_GRADS[it.g], opacity: it.stage === "pub" ? 0.72 : 1 }} title={it.title + (it.time ? " · " + fmtTime(it.time) : "")}>
                      {it.time && <span className="et">{fmtTime(it.time)}</span>}{it.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cs-week">
            <div />
            {weekDays.map((wd) => (
              <div key={wd.key} className={"cs-week-h" + (wd.isToday ? " today" : "")}>
                <span className="wd">{wd.dow}</span><div className="dn">{wd.num}</div>
              </div>
            ))}
            <div className="cs-week-tl allday">All-day</div>
            {weekDays.map((wd) => (
              <div key={"ad" + wd.key} className={"cs-week-cell allday" + (over === "wk:" + wd.key + ":ad" ? " over" : "")}
                onDragOver={(e) => { if (dragId) { e.preventDefault(); setOver("wk:" + wd.key + ":ad"); } }}
                onDragLeave={() => setOver((o) => (o === "wk:" + wd.key + ":ad" ? "" : o))}
                onDrop={(e) => { e.preventDefault(); if (dragId) scheduleTo(dragId, wd.key, null); endDrag(); }}>
                {evAllDay(wd.key).map((it) => (
                  <div key={it.id} className={"cs-week-ev" + (dragId === it.id ? " drag" : "")} draggable onDragStart={startDrag(it.id)} onDragEnd={endDrag} style={{ background: VID_GRADS[it.g] }} title={it.title}>{it.title}</div>
                ))}
              </div>
            ))}
            {WEEK_SLOTS.map((slot, si) => (
              <div key={slot.label} style={{ display: "contents" }}>
                <div className="cs-week-tl">{slot.label}</div>
                {weekDays.map((wd) => {
                  const heat = HEAT[si][wd.heatCol];
                  const tok = "wk:" + wd.key + ":" + si;
                  const best = heat >= 0.9;
                  return (
                    <div key={tok} className={"cs-week-cell" + (over === tok ? " over" : "")}
                      onDragOver={(e) => { if (dragId) { e.preventDefault(); setOver(tok); } }}
                      onDragLeave={() => setOver((o) => (o === tok ? "" : o))}
                      onDrop={(e) => { e.preventDefault(); if (dragId) scheduleTo(dragId, wd.key, pad2(slot.h) + ":00"); endDrag(); }}>
                      <div className="cs-week-heat" style={{ opacity: (0.04 + heat * 0.16).toFixed(3) }} />
                      {best && <Flame className="cs-week-best" size={9} style={{ color: "var(--accent)" }} />}
                      {evAt(wd.key, si).map((it) => (
                        <div key={it.id} className={"cs-week-ev" + (dragId === it.id ? " drag" : "")} draggable onDragStart={startDrag(it.id)} onDragEnd={endDrag} style={{ background: VID_GRADS[it.g], opacity: it.stage === "pub" ? 0.72 : 1 }} title={it.title + " · " + fmtTime(it.time)}>{it.title}</div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
        {mode === "week" && <div className="cs-row" style={{ gap: 7, marginTop: 13, fontSize: 11, color: "var(--ink-4)" }}><Flame size={12} style={{ color: "var(--accent)" }} /> Shaded cells show when your audience is most active — drop posts on the hottest slots.</div>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginTop: 16 }} className="cs-cal-lower">
        <div className="cs-card cs-card-pad cs-fade">
          <div className="cs-spread" style={{ marginBottom: 14 }}>
            <div><div style={{ fontSize: 14.5, fontWeight: 700 }}>Content Pipeline</div><div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>Drag between stages — scheduling a card moves it here automatically</div></div>
          </div>
          <div className="cs-kanban">
            {KANBAN_COLS.map((col) => {
              const list = items.filter((it) => it.stage === col.id);
              return (
                <div key={col.id} className={"cs-kan-col" + (over === "kan:" + col.id ? " over" : "")}
                  onDragOver={(e) => { if (dragId) { e.preventDefault(); setOver("kan:" + col.id); } }}
                  onDragLeave={() => setOver((o) => (o === "kan:" + col.id ? "" : o))}
                  onDrop={(e) => { e.preventDefault(); if (dragId) setStage(dragId, col.id); endDrag(); }}>
                  <div className="cs-kan-head"><span style={{ width: 8, height: 8, borderRadius: 3, background: col.color }} />{col.label}<span className="kc">{list.length}</span></div>
                  {list.map((it) => (
                    <div key={it.id} className={"cs-kan-card" + (dragId === it.id ? " drag" : "")} draggable onDragStart={startDrag(it.id)} onDragEnd={endDrag}>
                      <div className="kt">{it.title}</div>
                      <div className="km"><span style={{ width: 6, height: 6, borderRadius: 2, background: col.color }} />{(platById(it.plat) || {}).name}</div>
                      {it.date && <div className="cs-kan-when"><Clock size={9} /> {SHORT_MON[parseInt(it.date.slice(5, 7), 10) - 1]} {parseInt(it.date.slice(8, 10), 10)}{it.time ? " · " + fmtTime(it.time) : ""}</div>}
                    </div>
                  ))}
                  {list.length === 0 && <div style={{ fontSize: 11, color: "var(--ink-4)", textAlign: "center", padding: "10px 0" }}>Drop here</div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="cs-card cs-card-pad cs-fade">
          <div style={{ fontSize: 14.5, fontWeight: 700 }}>Best Time to Post</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", margin: "2px 0 16px" }}>When your audience is most active</div>
          <div className="cs-heat">
            <div />
            {HEAT_DAYS.map((d, i) => <div key={i} className="cs-heat-top">{d}</div>)}
            {HEAT.map((row, r) => (
              <div key={r} style={{ display: "contents" }}>
                <div className="cs-heat-lbl">{HEAT_ROWS[r]}</div>
                {row.map((v, ci) => <div key={r + "-" + ci} className="cs-heat-cell" style={{ background: heatColor(v) }} title={Math.round(v * 100) + "% active"} />)}
              </div>
            ))}
          </div>
          <div className="cs-row" style={{ gap: 8, marginTop: 16, fontSize: 11, color: "var(--ink-4)" }}>
            Less<div className="cs-row" style={{ gap: 3 }}>{[0.1, 0.35, 0.6, 0.85, 1].map((v) => <span key={v} style={{ width: 13, height: 13, borderRadius: 3, background: heatColor(v) }} />)}</div>More
          </div>
          <div className="cs-tip" style={{ marginTop: 16 }}><Lightbulb /><p><b style={{ color: "var(--ink)" }}>Peak window:</b> Fridays 6–9 PM. Switch to <b style={{ color: "var(--ink)" }}>Week</b> view to drop posts straight onto the hottest slots.</p></div>
        </div>
      </div>
    </div>
  );
}
