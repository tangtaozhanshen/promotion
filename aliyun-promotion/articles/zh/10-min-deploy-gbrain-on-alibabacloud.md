# 10分钟在阿里云部署GBrain完整教程

GBrain开源三天就斩获了6500+ GitHub Star，它能让你的AI Agent拥有真正的第二大脑，自动整理你所有的人脉、会议、笔记知识，每次回答先查知识库再回复，越用越聪明。

本文教你如何在阿里云上10分钟快速部署GBrain，完美适配推荐配置。

## 为什么选择阿里云部署GBrain

GBrain推荐的最低配置是 **2核2GB** 内存，正好阿里云的入门级ECS实例就能完美满足，而且价格非常便宜，每月只需要不到10元钱，比其他厂商便宜30%以上。

对于个人部署GBrain来说，阿里云的优势：
- 价格便宜，2C2G适合24/7不间断运行
- 稳定可靠，99.9%可用性，你的大脑随时可用
- 支持Ubuntu 22.04，完美匹配GBrain安装要求
- 如果你后续需要升级到Supabase云端数据库，阿里云也能一起部署

## 第一步：购买阿里云ECS实例

如果你还没有阿里云账号，可以[点击这里注册](https://www.aliyun.com/activity/new?userCode=xxxxxx)，新用户还有优惠。

注册完成后，登录阿里云控制台，创建ECS实例：
1. 选择离你最近的地域（比如上海、新加坡）
2. 选择实例规格：**2 vCPU 2GiB 内存**（这是运行GBrain的完美配置）
3. 选择操作系统：**Ubuntu 22.04 LTS**
4. 存储：40GB系统盘足够使用
5. 配置安全组：开放SSH（22端口）入方向
6. 购买并启动实例

大约2-3分钟，你的实例就准备好了。

## 第二步：连接服务器

获取你的实例公网IP，然后通过SSH连接：

```bash
ssh root@<你的公网IP>
```

输入密码或者使用密钥登录，成功连接后继续。

## 第三步：安装依赖

首先更新系统包：

```bash
apt update && apt upgrade -y
apt install -y git curl unzip
```

安装Bun（GBrain要求使用Bun）：

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
```

验证安装：

```bash
bun --version
```

应该能输出版本号，说明安装成功。

## 第四步：安装GBrain

克隆GBrain仓库：

```bash
git clone https://github.com/garrytan/gbrain.git ~/gbrain
cd ~/gbrain
```

安装依赖：

```bash
bun install
bun link
```

验证安装：

```bash
gbrain --version
```

如果输出版本号，说明GBrain安装成功！

## 第五步：初始化GBrain

GBrain默认使用PGLite嵌入式数据库，不需要额外安装Postgres，零配置直接可用：

```bash
gbrain init
```

这个过程大约只需要2秒钟，就完成初始化了。

运行健康检查：

```bash
gbrain doctor --json
```

如果所有检查都通过，说明你的GBrain已经正常工作。

## 第六步：创建你的知识库

GBrain要求知识库和GBrain工具分开，我们创建一个独立的目录：

```bash
mkdir -p ~/brain && cd ~/brain
git init
```

按照推荐的schema创建基础目录结构：

```bash
mkdir -p ~/brain/people ~/brain/companies ~/brain/concepts ~/brain/deals ~/brain/meetings
```

现在你的目录结构就准备好了，接下来导入你的笔记：

```bash
gbrain import ~/brain/ --no-embed
```

如果你还没有笔记，可以先创建一个测试页面试试。

## 第七步：配置API密钥（可选但推荐）

如果要使用向量搜索和LLM功能，需要配置OpenAI API密钥（可选，纯关键词搜索不需要）：

```bash
export OPENAI_API_KEY=sk-xxx
```

如果你有Anthropic API密钥，也可以配置，提升搜索质量：

```bash
export ANTHROPIC_API_KEY=sk-ant-xxx
```

把这些配置加到你的 `~/.bashrc` 文件中，这样下次登录就不用重新输入了。

生成向量嵌入：

```bash
gbrain embed --stale
```

## 第八步：测试搜索

现在可以测试搜索了：

```bash
gbrain query "your question here"
```

GBrain会混合关键词搜索和向量搜索，返回最相关的结果。

## 第九步：配置定时任务（dream cycle）

GBrain的核心魔法是每日自动整理的dream cycle，配置crontab定期执行：

```bash
crontab -e
```

添加以下内容：

```
# 每15分钟同步一次
*/15 * * * * /root/.bun/bin/gbrain sync --repo /root/brain && /root/.bun/bin/gbrain embed --stale

# 每日夜间dream cycle
0 23 * * * /root/.bun/bin/gbrain sync --repo /root/brain && /root/.bun/bin/gbrain embed --stale
```

保存退出，定时任务就配置好了。每天夜间GBrain会自动整理你的记忆，越用越聪明。

## 为什么选择阿里云部署

| 配置 | 价格 | 性价比 |
|------|------|--------|
| 2C2G（推荐配置） | ~$8-10/月 | 最高，比AWS便宜30%+ |
| 稳定性 | 99.9%+ uptime | 很好，生产环境可用 |
| 网络 | 全球节点，低延迟 | 优秀 |
| 易用性 | 新手友好，一键创建 | 简单 |

对于个人使用GBrain来说，阿里云的2C2G实例是性价比最高的选择，刚好满足需求，不会浪费钱。

## 下一步

现在你已经成功部署了GBrain，接下来可以：
1. 导入你的笔记、会议记录、联系人信息
2. 配置集成（Gmail/日历/Twitter等）
3. 让你的AI Agent（比如OpenClaw）接入GBrain，每次回答先搜索知识库

享受你的第二大脑吧！

> 👉 还没有阿里云账号？[点击这里注册](https://www.aliyun.com/activity/new?userCode=xxxxxx)，开始部署你的GBrain
