# PRD - 骗了吗 (Are You Scammed?)

## 1. Project Overview

**Project Name:** 骗了吗 (Are You Scammed?)
**Type:** Chinese internet scam pattern database web application

**One-line定位:** 中文互联网最全的骗局案例库——粘贴骗子的原话，三秒判断你是不是正在被骗。

**Core Value:** 骗子的话术在变，但套路不变。80% 的骗局都是已知套路的变体。知道这个套路，就能识别这个骗局。

**变现模式:** 广告（后期）

---

## 2. User Personas & Scenarios

### Primary User (Core)
> 用户在微信/QQ/社交软件里跟一个人聊着，对方说了些话、推荐了个平台、提了个投资机会。用户心里隐约觉得不对劲，但不确定是不是骗子。
>
> 他复制对方说的话，粘贴到"骗了吗"搜索框 → 匹配到对应骗局 → 看到红旗预警对照表 → 确认自己正在被骗 → 分享给朋友/报案。

### Secondary Users
- **B:** 看到一个机会（投资、兼职），想确认靠不靠谱
- **C:** 纯粹学习防骗知识

---

## 3. Feature List

### MVP (V1)
- [ ] 首页：搜索框 + 分类入口 + 热门标签云 + 今日热骗
- [ ] 搜索结果页：关键词匹配 + 排序 + 无结果引导投稿
- [ ] 骗局详情页：红旗预警对照表 + 话术还原 + 真实案例 + 行动指南 + 分享
- [ ] 分类浏览页：10大分类
- [ ] 投稿功能：表单 + 审核状态

### V2
- [ ] AI 对话识别
- [ ] 骗局订阅
- [ ] 邮件/推送通知

---

## 4. Data Model

### Scam
```
- id: string
- title: string
- slug: string
- category: string
- categorySlug: string
- tags: string[]
- severity: 'high' | 'medium' | 'low'
- amountRange: string
- scripts: string[]
- redFlags: { script: string, explanation: string }[]
- cases: { summary: string, amount: string, contributor: string }[]
- actions: string[]
- sourceUrl?: string
- sourceName?: string
- publishedAt: string
- updatedAt: string
- viewCount: number
- hotScore: number
```

### Contribution
```
- id: string
- category: string
- scripts: string
- amount: string
- description?: string
- status: 'pending' | 'approved' | 'rejected'
- createdAt: string
- reviewedAt?: string
```

### 10 Categories
1. 冒充客服诈骗
2. 杀猪盘诈骗
3. 虚假购物诈骗
4. 求职兼职诈骗
5. 冒充公检法诈骗
6. 预付消费陷阱
7. 网络贷款诈骗
8. 养老健康诈骗
9. 婚恋彩礼诈骗
10. 生活服务陷阱

---

## 5. Technical Approach

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Search | Supabase full-text search |
| Deployment | Vercel |
| Icons | Lucide React |
| Content | MDX / Local JSON (MVP) |

---

## 6. Non-Functional Requirements

- 所有案例脱敏处理
- 明确"本平台仅供参考，不构成法律建议"
- 投稿需审核后公开
- 数据来源全部注明
