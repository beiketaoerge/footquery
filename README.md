# FootQuery 项目主页

论文 **FootQuery: Future-Touchdown-Guided Retrieval from Depth History for Perceptive Humanoid Locomotion**（[arXiv:2609.21447](https://arxiv.org/abs/2609.21447)）的独立项目网站仓库。

纯静态、零依赖（无构建工具、无外部库/CDN），所有资源引用均为相对路径，在 `用户名.github.io/仓库名/` 子路径、自定义域名、本地直接打开三种场景下都能正常显示。

## 目录结构（对齐社区惯例）

参照机器人/ML 论文项目页的事实标准 [Nerfies 模板](https://github.com/nerfies/nerfies.github.io)（4.4k star）的组织方式：

```
footquery-website/
├── index.html          # 单页主页（标题/摘要/视频/方法/结果/引用）
├── style.css           # 全部样式
├── script.js           # BibTeX 复制按钮 + 导航高亮
├── citation.bib        # 引用条目（与 index.html 内保持同步）
├── static/
│   ├── images/         # teaser、pipeline、结果图
│   └── videos/         # 仅放几秒循环短片（长视频不放这里，见下节）
└── .gitignore
```

## 视频怎么放（重点）

调研了主流机器人项目页（Nerfies 模板系：HumanPlus / OmniH2O / 各人形 locomotion 工作等）的通行做法：

| 类型 | 放哪里 | 页面里怎么用 |
|---|---|---|
| **长视频 / overview** | **YouTube + B 站**（双发） | iframe 嵌入，`#video` 区左右并排（代码已备好，见下） |
| 高清原片下载 | 本仓库 **GitHub Releases**（单文件 ≤2GB，不计入仓库体积） | 普通下载链接 |
| 几秒循环短片（teaser、结果对比墙） | `static/videos/`（每段几 MB） | `<video autoplay muted loop playsinline>` |

**为什么长视频不放进仓库**：GitHub Pages 限制为站点 ≤1GB、单文件 ≤100MB、不支持 Git LFS；而且仓库塞大文件会让每次 clone 变慢。这是所有成熟项目页都用第三方平台嵌视频的原因。B 站嵌入是国内项目页的标配（github.io 与 YouTube 在大陆访问都不稳定）。

### 操作步骤

1. **上传**：同一长视频传 YouTube 和 B 站（B 站：投稿 → 获得 BV 号，或在视频页"分享 → 嵌入代码"直接拿到 iframe）。
2. **替换占位块**：`index.html` 搜索 `YOUTUBE` 和 `BILIBILI` 注释，各有一段可直接粘贴的 iframe 代码（外层包 `.video-frame` 即自动 16:9 自适应）。
3. **（可选）高清下载**：仓库页 → Releases → Draft a new release → 上传 mp4 → Publish；然后搜索 `RELEASES-DOWNLOAD` 取消注释并填入真实地址，形如
   `https://github.com/<用户名>/footquery/releases/download/v1.0/footquery.mp4`。
4. **（可选）结果短片墙**：搜索 `CLIP-GRID`，有现成的 2 列短视频墙模板可复制。

短片压缩（系统自带 ffmpeg 命令示例）：

```bash
ffmpeg -i clip.mov -c:v libx264 -crf 26 -preset slow -vf "scale=-2:720" -an -movflags +faststart clip.mp4
```

## 本地预览

直接用浏览器双击打开 `index.html` 即可，无需任何服务器。

## 发布到 GitHub Pages

### 方式一：网页上传（当前机器没有 git，用这个最快）

1. 在 GitHub 上新建一个 **Public** 仓库，建议命名为 `footquery`；
2. 仓库页 *Add file → Upload files*，把本目录下**所有文件**拖进去（含 `static/` 文件夹），提交；
3. *Settings → Pages*：Source 选 **Deploy from a branch**，分支 `main`、目录 `/(root)`，保存；
4. 约 1–2 分钟后访问 `https://<你的用户名>.github.io/footquery/`。

### 方式二：命令行推送

这台 Mac 目前没装 Apple Command Line Tools（git/python 都不可用），先执行：

```bash
xcode-select --install        # 弹窗安装，约几分钟
git config --global user.name  "你的名字"
git config --global user.email "你的邮箱"
```

然后：

```bash
cd footquery-website
git init -b main
git add .
git commit -m "Init FootQuery project page"
git remote add origin git@github.com:<用户名>/footquery.git   # 或 https://github.com/<用户名>/footquery.git
git push -u origin main
```

最后同样到 *Settings → Pages* 开启（同方式一第 3 步）。

## 如何更新内容

index.html 中所有需要动手的位置都有中文注释标记，全局搜索即可定位：

| 标记 | 位置 | 说明 |
|---|---|---|
| `PLACEHOLDER-TEASER` | 首图 | 图片（`static/images/teaser.jpg`）或几秒循环短片（`static/videos/teaser.mp4`） |
| `YOUTUBE` / `BILIBILI` | 视频区 | 已嵌入正式视频（YouTube `KMm06U3nMEE` / B站 `BV1DYae68Etm`）；换视频改对应 iframe 里的 ID 即可 |
| `RELEASES-DOWNLOAD` | 视频区 | 高清原片下载链接（托管在 GitHub Releases） |
| `PLACEHOLDER-PIPELINE` | 方法区 | 方法总览图 |
| `PLACEHOLDER-RESULTS` | 结果区 | 结果图/对比图画廊，占位块可复制多份 |
| `CLIP-GRID` | 结果区 | 结果对比短视频墙模板 |
| `CODE-LINK` | 按钮 | 代码开源后把 "Code · coming soon" 换成真实链接 |
| `BIBTEX` | 引用区 | 论文录用后更新 venue（同步改 `citation.bib`） |
| `canonical` / `og:image` | `<head>` | 网站发布后填入正式地址和分享卡片图 |

## 自定义域名（可选）

1. 仓库根目录新建 `CNAME` 文件，内容写你的域名（如 `footquery.example.com`）；
2. 在 DNS 服务商加一条 CNAME 记录指向 `<用户名>.github.io`；
3. Pages 设置里开启 *Enforce HTTPS*。

## 常见问题

- **本机 git 不可用 / 报 xcode-select 提示**：尚未安装 Command Line Tools，先 `xcode-select --install`。
- **`git push` 一直失败**：这台机器的 zsh 配置里有一个包装 `git push` 的函数（配合电脑管家类软件做推送管控），必要时用 `command git push …` 绕过或临时退出该软件。
- **图片/视频不显示**：确认引用是相对路径（`static/images/xxx.jpg`，开头不要有 `/`），且大小写与文件名一致。
- **视频放仓库被拒收**：单文件超过 100MB 无法 push/pages，走 Releases；几百 MB 的"中视频"也建议走 YouTube/B 站。

## 引用

```bibtex
@article{dong2026footquery,
  author  = {Dong, Tao and Yu, Jia and Fan, Yuxuan and Zhao, Linna and
             Gong, Jiaqi and Yang, Andong and Gao, Chao and Zhou, Guyue},
  title   = {{FootQuery}: Future-Touchdown-Guided Retrieval from Depth
             History for Perceptive Humanoid Locomotion},
  journal = {arXiv preprint arXiv:2609.21447},
  year    = {2026}
}
```
