# OpenClaw on Alibaba Cloud: A Step-by-Step Deployment Guide

Deploying OpenClaw on Alibaba Cloud is straightforward and takes less than 30 minutes. In this guide, I'll walk you through every step from creating your instance to having your AI agent up and running.

## Prerequisites
- An Alibaba Cloud account (if you don't have one, [sign up here](https://www.aliyun.com/activity/new?userCode=xxxxxx) for free)
- Basic familiarity with Linux command line
- SSH client for connecting to your server

## Step 1: Create Your ECS Instance

1. Log in to your Alibaba Cloud console and go to Elastic Compute Service (ECS)
2. Click "Create Instance"
3. Choose your preferred region (pick one closest to your location for best latency)
4. Select the instance type: **2 vCPUs 2GiB Memory** (this is the perfect size for OpenClaw)
5. Choose Ubuntu Server 22.04 LTS as your operating system
6. Set your storage: 40GB is enough for OpenClaw and all your data
7. Configure security groups: allow inbound SSH (port 22) and any other ports you need
8. Complete the purchase and wait for your instance to be created

It usually takes less than 5 minutes for your instance to be ready.

## Step 2: Connect to Your Instance via SSH

Once your instance is ready, get its public IP address from the ECS console. Then connect using SSH:

```bash
ssh root@<your-public-ip>
```

Accept the host key when prompted, and you're in.

## Step 3: Install Dependencies

Update your system packages first:

```bash
apt update && apt upgrade -y
```

Install the required dependencies:

```bash
apt install -y nodejs npm git curl wget
```

Verify the installations:
```bash
node --version
npm --version
git --version
```

## Step 4: Clone and Install OpenClaw

Clone the OpenClaw repository:

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
```

Install the dependencies:

```bash
npm install
```

## Step 5: Configure OpenClaw

Copy the example configuration file:

```bash
cp config.example.json config.json
```

Edit `config.json` with your preferred settings:

```bash
nano config.json
```

Set your API keys for the AI models you want to use. OpenClaw supports multiple providers, so you can use whichever you prefer.

## Step 6: Start OpenClaw

You can start OpenClaw directly:

```bash
npm start
```

Or run it in the background using PM2 for persistence:

```bash
npm install -g pm2
pm2 start npm --name openclaw -- start
pm2 startup
```

This way, OpenClaw will automatically restart if your server reboots.

## Step 7: Verify Installation

Check that OpenClaw is running:

```bash
pm2 status
```

You should see `openclaw` in the list with status `online`.

## Why This Works Great on Alibaba Cloud

- **Cost**: A 2C2G instance costs just a few dollars per month, perfect for continuous OpenClaw operation
- **Stability**: I've been running my instance for months without any issues
- **Speed**: The network is fast enough for all your AI agent API calls
- **Scalability**: If you need more resources later, you can easily upgrade your instance

## Troubleshooting

- If you can't connect via SSH: Check your security group settings in Alibaba Cloud console
- If npm install fails: Make sure you have enough memory (2GB should be enough for OpenClaw)
- If OpenClaw won't start: Double-check your API keys in the configuration file

## Wrapping Up

That's it! You should now have OpenClaw running on Alibaba Cloud. This setup is reliable, cost-effective, and perfect for experimenting with AI agents.

If you haven't created your Alibaba Cloud account yet, [sign up here](https://www.aliyun.com/activity/new?userCode=xxxxxx) to get started.
