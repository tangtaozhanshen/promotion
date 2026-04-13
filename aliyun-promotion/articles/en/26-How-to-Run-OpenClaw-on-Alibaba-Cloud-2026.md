# How to Run OpenClaw on Alibaba Cloud: Step-by-Step Guide

OpenClaw is an open-source personal AI assistant framework that runs on your own server. If you want to self-host OpenClaw, Alibaba Cloud is a great place to do it. In this guide, I'll show you step-by-step how to get it running on a 2-core 2GB instance — which is all you need.

## Prerequisites

All you need is:
1. A domain name (optional, but recommended)
2. An Alibaba Cloud account
3. Basic knowledge of Linux commands

## Step 1: Get Your Server

First, you need a cloud server. For OpenClaw, a **2-core 2GB** instance is perfect. It's enough memory to run the whole system with room to spare, and it's very cheap.

Get your new user discount here: [https://www.aliyun.com/minisite/goods?userCode=hkr9xdyb](https://www.aliyun.com/minisite/goods?userCode=hkr9xdyb)

I recommend:
- Ubuntu 22.04 LTS as your operating system
- Choose a region close to your users for lower latency
- Enable auto-backup so you don't lose anything

## Step 2: Initial Server Setup

After your server is created, log in via SSH:

```bash
ssh root@your-server-ip
```

Update your system:
```bash
apt update && apt upgrade -y
```

Create a non-root user for security:
```bash
adduser your-username
usermod -aG sudo your-username
```

## Step 3: Install Dependencies

OpenClaw needs Node.js and git:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
apt install -y nodejs git
```

Verify installation:
```bash
node -v
npm -v
```

## Step 4: Clone and Install OpenClaw

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
npm install
```

## Step 5: Configure and Run

Copy the example config:
```bash
cp config.example.json config.json
nano config.json
```

Edit your config according to the docs, add your API keys, then start:

```bash
npm start
```

## Step 6: (Optional) Add Reverse Proxy with Nginx

If you want to access the web interface from your domain, install Nginx and set up a reverse proxy. This is pretty straightforward and there are lots of guides online.

## Why Alibaba Cloud for OpenClaw?

1. **Price** — 2C2G instance is very affordable for personal use
2. **Stability** — I've been running my instance for months without issues
3. **Network** — good connectivity both domestic and international
4. **Easy to manage** — their web console is simple and easy to use

## Cost Considerations

For a 2-core 2GB instance, you're looking at around $10-15 per month depending on your region. That's very reasonable for personal self-hosted AI assistant.

Get your new user discount here: [https://www.aliyun.com/minisite/goods?userCode=hkr9xdyb](https://www.aliyun.com/minisite/goods?userCode=hkr9xdyb)

## Troubleshooting

- **Out of memory** — make sure you got 2GB, swap can help if you need more
- **Port not opening** — check Alibaba Cloud security group settings
- **Slow install** — just be patient, it depends on your network speed

## Final Words

Running OpenClaw on Alibaba Cloud works great. It's cheap, stable, and gives you full control over your personal AI assistant. If you're looking to self-host, give it a try.

👉 Get your server starting here: [https://www.aliyun.com/minisite/goods?userCode=hkr9xdyb](https://www.aliyun.com/minisite/goods?userCode=hkr9xdyb)
