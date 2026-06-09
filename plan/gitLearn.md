# Git 版本管理完全指南

> 仓库实战环境：`Chai-Maxwell/MyNote` | 当前分支：`master` | 远程：`origin` → `https://github.com/Chai-Maxwell/MyNote.git`

---

## 目录

1. [Git 核心概念：`.git` 目录揭秘](#1-git-核心概念git-目录揭秘)
2. [本地版本管理全流程](#2-本地版本管理全流程)
3. [远程协作：与 GitHub 交互](#3-远程协作与-github-交互)
4. [多分支管理实战演练](#4-多分支管理实战演练)
5. [回溯与修复：时间旅行手册](#5-回溯与修复时间旅行手册)
6. [Neovim Git 插件高效工作流](#6-neovim-git-插件高效工作流)
7. [最佳实践与常见问题](#7-最佳实践与常见问题)

---

## 1. Git 核心概念：`.git` 目录揭秘

### 1.1 Git 的四种对象

Git 本质上是一个**内容寻址文件系统**。`git init` 后生成的 `.git/` 目录存储了一切。核心由四种对象组成：

```
.git/
├── HEAD          # 指向当前分支引用
├── config        # 仓库级别配置
├── objects/      # Git 对象数据库（blob、tree、commit、tag）
├── refs/         # 引用（分支、标签、远程分支）
│   ├── heads/    # 本地分支
│   ├── tags/     # 标签
│   └── remotes/  # 远程分支缓存
├── index         # 暂存区（staging area）
├── logs/         # reflog，所有引用变更历史
└── hooks/        # 客户端钩子脚本
```

| 对象类型 | 作用 | 内容示例 |
|---------|------|---------|
| **blob** | 存储文件内容（不含文件名） | 文件内容的压缩二进制 |
| **tree** | 存储目录结构，指向 blob 和子 tree | 文件名 + blob hash 的映射 |
| **commit** | 一次快照的元数据 | tree、parent、author、message |
| **tag** | 为 commit 打标签（可带注释） | 指向 commit + 注释信息 |

### 1.2 三种状态、三个区域

```
工作目录 (Working Directory)         暂存区 (Staging Area / Index)        本地仓库 (.git/objects)
     │                                       │                                    │
     │──────── git add ──────────────────►   │                                    │
     │                                       │──── git commit ────────────────►   │
     │                                       │                                    │
     │◄─────── git restore / checkout ────── │                                    │
     │◄────────────────────────── git reset --hard ───────────────────────────────│
```

- **工作目录**：你在编辑器中看到的实际文件
- **暂存区（Index）**：`git add` 后的预备提交区域
- **仓库**：`git commit` 后永久存储的快照

### 1.3 commit 的链式结构

每个 commit 都包含一个指向父 commit 的指针，形成**有向无环图（DAG）**：

```
A ← B ← C ← D    (master, 线性历史)
     ↖ E ← F      (feature 分支)
```

`HEAD` 总是指向当前所在位置（通常是分支名），分支名再指向最新 commit。

---

## 2. 本地版本管理全流程

### 2.1 初始化仓库

```bash
# 方式一：从零开始
git init my-project
cd my-project

# 方式二：克隆已有仓库（当前仓库的克隆方式）
git clone https://github.com/Chai-Maxwell/MyNote.git
```

### 2.2 基本操作速查

```bash
# ──── 查看状态 ────
git status                      # 工作区概览
git status -s                   # 简短格式
git diff                        # 工作区 vs 暂存区
git diff --staged               # 暂存区 vs 最新提交
git diff HEAD                   # 工作区 vs 最新提交

# ──── 暂存与提交 ────
git add <file>                  # 暂存单个文件
git add -A                      # 暂存所有变更
git add -p                      # 交互式分块暂存（推荐！）
git commit -m "message"         # 提交
git commit -am "message"        # 跳过 add，直接提交已跟踪文件的变更

# ──── 撤销与回退 ────
git restore <file>              # 丢弃工作区改动（回到暂存区状态）
git restore --staged <file>     # 取消暂存（回到工作区）
git reset --soft HEAD~1         # 撤销 commit，改动回到暂存区
git reset --mixed HEAD~1        # 撤销 commit，改动回到工作区（默认）
git reset --hard HEAD~1         # 彻底丢弃最近一次 commit 的所有改动！
git revert HEAD                 # 安全回退：创建一个新 commit 来撤销
```

### 2.3 查看历史

```bash
# ──── 日志查看 ────
git log                         # 完整日志
git log --oneline               # 一行一条（简洁）
git log --oneline --graph       # 带分支图的简洁日志
git log --oneline --graph --all # 显示所有分支
git log -p                      # 显示每次提交的具体 diff
git log --stat                  # 显示每次提交的文件变更统计
git log --author="chaiyiqi"     # 按作者过滤
git log --since="2026-05-01"    # 按时间过滤
git log -S"关键字"              # 搜索引入/删除某内容的 commit（pickaxe）

# ──── 查看具体提交 ────
git show HEAD                   # 查看最新 commit 的详细信息
git show HEAD~1                 # 查看倒数第二个 commit
git show <commit-hash>          # 查看特定 commit
git show <commit-hash> -- <file> # 查看某 commit 中某文件的改动

# ──── 查看谁改了哪一行 ────
git blame <file>                # 逐行显示作者和 commit
git blame -L 10,30 <file>       # 只看第 10-30 行
```

### 2.4 实战：本地基本工作流

```bash
# 当前仓库状态（实际运行结果）
$ git status
位于分支 master
您的分支领先 'origin/master' 共 1 个提交。
尚未暂存以备提交的变更：
    修改：.DS_Store
    修改：Physics/ClasssicalElectrodynamics/chapters/chap_05.md
未跟踪的文件:
    plan/
    skime.md
    ...

# 典型工作流：
$ git add Physics/ClasssicalElectrodynamics/chapters/chap_05.md  # 暂存要提交的文件
$ git commit -m "更新电动力学第五章笔记"                          # 提交
$ git log --oneline -3                                            # 确认
26325ab 26.5.28
f086621 NoteRepoInit
```

---

## 3. 远程协作：与 GitHub 交互

### 3.1 远程仓库管理

```bash
# ──── 查看远程 ────
git remote -v                           # 列出所有远程仓库
git remote show origin                  # 查看 origin 的详细信息

# ──── 添加/修改远程 ────
git remote add upstream <url>           # 添加上游仓库（fork 场景）
git remote set-url origin <new-url>     # 修改远程地址
git remote rename origin old-origin     # 重命名远程

# ──── 删除远程分支的本地缓存 ────
git remote prune origin                 # 清理本地已不存在的远程分支引用
```

### 3.2 推送与拉取

```bash
# ──── 推送 ────
git push origin master                  # 推送 master 到 origin
git push -u origin master               # 首次推送并建立追踪关系
git push --all origin                   # 推送所有分支
git push origin --delete old-branch     # 删除远程分支

# ──── 拉取 ────
git fetch origin                        # 下载远程更新但不合并
git pull origin master                  # fetch + merge（=git fetch + git merge）
git pull --rebase origin master         # fetch + rebase（推荐，保持历史线性）
```

### 3.3 `git fetch` vs `git pull` 的区别

```
git fetch origin:
  远程 master  →  origin/master（本地远程跟踪分支）
  你的工作区不受影响。
  ✅ 安全，先看看别人做了什么。

git pull origin master:
  远程 master  →  origin/master  →  合并到当前分支
  ⚠️ 可能产生冲突，最好先 fetch 再决定 merge 或 rebase。
```

### 3.4 用 `gh` 管理 GitHub

当前 GitHub 状态：

```bash
$ gh auth status
github.com
  ✓ Logged in to github.com account Chai-Maxwell (keyring)
  - Git operations protocol: ssh
  - Token scopes: 'admin:public_key', 'delete_repo', 'gist', 'read:org', 'repo'

$ gh repo view Chai-Maxwell/MyNote
name:   Chai-Maxwell/MyNote
description:    MyNote
```

常用 `gh` 命令：

```bash
gh repo view <repo>             # 查看仓库信息
gh repo create <name>           # 创建新仓库
gh issue list                   # 列出 Issues
gh issue create                 # 创建 Issue
gh pr list                      # 列出 Pull Requests
gh pr create                    # 创建 Pull Request
gh pr checkout <number>         # 在本地检出某个 PR
gh pr review                    # 审查 PR
gh pr merge                     # 合并 PR
gh release create <tag>         # 创建 Release
gh gist create <file>           # 创建 Gist
```

---

## 4. 多分支管理实战演练

> 场景：在 MyNote 项目中同时维护 **课程笔记更新**、**论文阅读笔记** 和 **博客草稿** 三条工作线。

### 4.1 分支策略概览

```
master (稳定主线)
├── physics/em-chapter6    (电磁学第6章)
├── paper/quantum-review   (量子论文综述)
└── blog/skime             (滑雪日记)
```

### 4.2 Step-by-Step 实战

#### Step 1：从 master 创建特性分支

```bash
# 确保 master 是干净的
$ git checkout master
$ git status                    # 确认无未提交改动

# 创建并切换到新分支
$ git checkout -b physics/em-chapter6
切换到一个新分支 'physics/em-chapter6'

# 或者分两步：
$ git branch paper/quantum-review   # 创建分支
$ git checkout paper/quantum-review # 切换过去
```

#### Step 2：在各分支上独立工作

```bash
# 在 physics/em-chapter6 分支上工作
$ git checkout physics/em-chapter6
$ echo "# 第六章 电磁辐射" >> Physics/ClasssicalElectrodynamics/chapters/chap_06.md
$ git add Physics/ClasssicalElectrodynamics/chapters/chap_06.md
$ git commit -m "初始化电磁辐射章节"

# 切换到论文分支工作
$ git checkout paper/quantum-review
$ mkdir -p ReadPaper/Quantum
$ echo "# 量子计算综述笔记" > ReadPaper/Quantum/review.md
$ git add ReadPaper/Quantum/
$ git commit -m "添加量子计算论文综述框架"
```

#### Step 3：查看和管理分支

```bash
# ──── 列出所有分支 ────
$ git branch                     # 本地分支列表，* 标注当前分支
  master
* physics/em-chapter6
  paper/quantum-review

$ git branch -a                  # 包含远程分支
$ git branch -v                  # 显示各分支最新 commit
$ git branch -vv                 # 显示各分支与远程的追踪关系
$ git branch --merged master     # 哪些分支已合并到 master
$ git branch --no-merged master  # 哪些分支尚未合并到 master

# ──── 查看分支图 ────
$ git log --oneline --graph --all
* 3a4b5c6 (HEAD -> physics/em-chapter6) 初始化电磁辐射章节
* 7d8e9f0 (paper/quantum-review) 添加量子计算论文综述框架
* 26325ab (master) 26.5.28
* f086621 NoteRepoInit
```

#### Step 4：合并分支

```bash
# ──── 场景 A：特性完成，合并回 master ────
$ git checkout master
$ git merge physics/em-chapter6         # Fast-forward 合并
$ git branch -d physics/em-chapter6     # 删除已合并的分支

# ──── 场景 B：master 有更新，先 rebase 再合并（保持线性历史）───
$ git checkout paper/quantum-review
$ git rebase master                      # 将当前分支的改动"搬家"到 master 最新提交之后
# 如有冲突，解决后：
$ git add <resolved-files>
$ git rebase --continue

$ git checkout master
$ git merge paper/quantum-review         # 现在一定是 Fast-forward
$ git branch -d paper/quantum-review

# ──── 场景 C：保留分支历史的合并───
$ git checkout master
$ git merge --no-ff paper/quantum-review # 即使能 fast-forward 也创建一个 merge commit
```

#### Step 5：处理合并冲突

```bash
$ git merge physics/em-chapter6
自动合并 Physics/ClasssicalElectrodynamics/chapters/chap_05.md
冲突（内容）：合并冲突于 Physics/ClasssicalElectrodynamics/chapters/chap_05.md
自动合并失败，修正冲突然后提交修正的结果。

# 冲突文件中会显示：
<<<<<<< HEAD
（master 分支的内容）
=======
（physics/em-chapter6 分支的内容）
>>>>>>> physics/em-chapter6

# 解决冲突后：
$ git add Physics/ClasssicalElectrodynamics/chapters/chap_05.md
$ git commit -m "合并 physics/em-chapter6，解决 chap_05 冲突"

# 放弃合并：
$ git merge --abort
```

#### Step 6：Cherry-pick（摘樱桃）—— 只合并某一个 commit

```bash
# 纸分支的某次提交恰好也是博客分支需要的
$ git checkout blog/skime
$ git cherry-pick <某次commit的hash>    # 只把这一次提交"复制"过来
```

#### Step 7：Stash（暂存）—— 切换分支时保存未提交的工作

```bash
# 正在 physics 分支写了一半，需要紧急切换到 master 修 bug
$ git stash                      # 暂存当前工作区和暂存区的改动
$ git stash save "电磁学第6章半成品"  # 带描述信息暂存

$ git checkout master            # 切到 master 修 bug
$ git commit -m "紧急修复"

$ git checkout physics/em-chapter6
$ git stash pop                  # 恢复之前暂存的工作
$ git stash list                 # 查看 stash 列表
$ git stash drop stash@{0}       # 删除某个 stash
$ git stash clear                # 清空所有 stash
```

---

## 5. 回溯与修复：时间旅行手册

### 5.1 回到过去查看

```bash
# ──── 临时查看历史状态（不影响当前分支）───
$ git checkout <commit-hash>         # HEAD 分离状态（detached HEAD）
$ git switch -                       # 返回之前的分支

# ──── 查看某个文件在历史中的样子 ────
$ git show HEAD~3:path/to/file.md    # 查看 3 次提交前的文件内容
$ git show <hash>:path/to/file.md    # 查看特定 commit 的文件内容
```

### 5.2 真正回退

```bash
# ──── reset 三兄弟 ────
# --soft：只移动 HEAD，改动留在暂存区（可以重新 commit）
$ git reset --soft HEAD~3            # HEAD 后退 3 步，3 次提交的改动都在暂存区

# --mixed：移动 HEAD，改动回到工作区（默认）
$ git reset HEAD~1                   # 撤销最近一次 commit

# --hard：移动 HEAD，彻底丢弃改动 ⚠️ 危险！
$ git reset --hard HEAD~1            # 最近一次 commit 及其改动全部消失

# ──── revert：安全版"撤销"（推荐用于已推送的 commit）───
$ git revert HEAD                    # 创建一个新 commit，内容是 HEAD 的逆操作
$ git revert <hash>                  # 撤销特定 commit
```

### 5.3 reflog：后悔药

```bash
$ git reflog
26325ab HEAD@{0}: commit: 26.5.28
f086621 HEAD@{1}: commit (initial): NoteRepoInit

# 如果你 git reset --hard 之后后悔了：
$ git reset --hard HEAD@{1}          # 回到 reflog 中记录的那个状态！
```

`reflog` 记录了 **HEAD 和分支指针的所有移动**，默认保留 90 天。即使 commit 在 `git log` 中不可见了，`reflog` 依然能找到它。

### 5.4 交互式 rebase：重写历史

```bash
# 合并最近 3 次 commit 为一个
$ git rebase -i HEAD~3

# 编辑器打开后：
pick abc1234 第一次提交
squash def5678 第二次提交    # 把 s 改成 squash，合并到上一个
squash ghi9012 第三次提交

# 保存后，编辑合并后的 commit message，完成。

# 也可以用于：
# - reword：只修改 commit message
# - edit：暂停 rebase，让你修改那次 commit 的内容
# - drop：删除那次 commit
# - reorder：调整 commit 顺序（直接交换行顺序）

# ⚠️ 不要在已推送到远程的 commit 上做 rebase！除非你确定只有你一个人用这个分支。
```

### 5.5 找回丢失的 commit

```bash
# 方法1：reflog（最可靠）
$ git reflog                        # 找到丢失 commit 的 hash
$ git checkout <hash> -b recovered  # 用该 hash 创建新分支恢复

# 方法2：git fsck（如果 reflog 也过期了）
$ git fsck --lost-found             # 找到悬空对象
$ git show <dangling-hash>          # 查看内容确认后再恢复
```

---

## 6. Neovim Git 插件高效工作流

### 6.1 插件生态概览

| 插件 | 功能 | 安装（lazy.nvim） |
|------|------|------------------|
| **vim-fugitive** | Git 的 Neovim 封装，最强大的 Git 插件 | `'tpope/vim-fugitive'` |
| **gitsigns.nvim** | 行号旁显示增删改标记，行级 stage/reset | `'lewis6991/gitsigns.nvim'` |
| **diffview.nvim** | 可视化 diff 和文件历史浏览 | `'sindrets/diffview.nvim'` |
| **neogit** | Magit 风格的 Git UI | `'NeogitOrg/neogit'` |
| **octo.nvim** | GitHub Issues/PRs 在 Neovim 中管理 | `'pwntester/octo.nvim'` |

### 6.2 vim-fugitive：Git 的终极 Neovim 封装

```vim
" ──── 核心命令 ────
:Git                     " 打开 fugitive 摘要窗口（类似 git status）
:Git status              " 状态窗口
:Git commit              " 打开 commit 编辑窗口
:Git push                " 推送
:Git pull                " 拉取
:Git fetch               " 下载远程更新
:Git blame               " 当前文件的 blame
:Git diff                " 当前文件 diff
:Git log                 " 日志
:Git log --oneline       " 简洁日志

" ──── fugitive 状态窗口快捷键（:Git 后）───
s           " 暂存/取消暂存光标下的文件
-           " 暂存/取消暂存光标下的文件（同上）
cc          " 开始写 commit message
ca          " 追加到上一次 commit（amend）
cf          " 创建 fixup commit
cvc         " 查看光标下文件的 diff
X           " 丢弃光标下文件的改动
=           " 切换文件的内联 diff
gq          " 关闭状态窗口
<C-n>/<C-p> " 在文件中上下移动

" ──── blame 窗口快捷键 ────
<CR>        " 跳转到该行对应的 commit
o           " 在新分割窗口中打开 commit
A           " 调整 blame 范围到该 commit 之前
```

**fugitive 最强大的工作流**：在 Neovim 中直接完成 暂存 → 查看 diff → 写 commit → 推送 全流程，无需离开编辑器。

### 6.3 gitsigns.nvim：行级 Git 标注

```lua
-- lazy.nvim 配置
{
  'lewis6991/gitsigns.nvim',
  opts = {
    signs = {
      add = { text = '│' },
      change = { text = '│' },
      delete = { text = '_' },
      topdelete = { text = '‾' },
      changedelete = { text = '~' },
    },
    on_attach = function(bufnr)
      local gs = package.loaded.gitsigns
      local function map(mode, l, r, opts)
        opts = opts or {}
        opts.buffer = bufnr
        vim.keymap.set(mode, l, r, opts)
      end
      -- 行级操作
      map('n', ']c', gs.next_hunk, { desc = '下一个改动块' })
      map('n', '[c', gs.prev_hunk, { desc = '上一个改动块' })
      map('n', '<leader>hs', gs.stage_hunk, { desc = '暂存当前块' })
      map('n', '<leader>hr', gs.reset_hunk, { desc = '撤销当前块' })
      map('v', '<leader>hs', function() gs.stage_hunk { vim.fn.line('.'), vim.fn.line('v') } end, { desc = '暂存选中行' })
      map('n', '<leader>hS', gs.stage_buffer, { desc = '暂存整个缓冲区' })
      map('n', '<leader>hu', gs.undo_stage_hunk, { desc = '取消暂存当前块' })
      map('n', '<leader>hR', gs.reset_buffer, { desc = '重置整个缓冲区' })
      map('n', '<leader>hp', gs.preview_hunk, { desc = '预览改动块' })
      map('n', '<leader>hb', function() gs.blame_line { full = true } end, { desc = '行blame' })
      map('n', '<leader>hd', gs.diffthis, { desc = '当前文件 diff' })
      map('n', '<leader>hD', function() gs.diffthis('~') end, { desc = '当前文件 diff（含暂存区）' })
      map('n', '<leader>tb', gs.toggle_current_line_blame, { desc = '切换行尾 blame' })
    end,
  },
}
```

**gitsigns 核心价值**：不用 `git add <file>` 加全文件，而是**按块（hunk）或按行**精确暂存。结合 `git add -p` 的概念，但在编辑器中直观操作。

### 6.4 diffview.nvim：可视化文件变更

```lua
{
  'sindrets/diffview.nvim',
  dependencies = 'nvim-lua/plenary.nvim',
  cmd = { 'DiffviewOpen', 'DiffviewClose', 'DiffviewFileHistory' },
  keys = {
    { '<leader>do', '<cmd>DiffviewOpen<CR>', desc = '打开当前分支 diff' },
    { '<leader>dh', '<cmd>DiffviewFileHistory<CR>', desc = '文件历史' },
    { '<leader>dhf', '<cmd>DiffviewFileHistory %<CR>', desc = '当前文件历史' },
  },
}
```

使用场景：

```vim
:DiffviewOpen                           " 查看当前未提交的改动
:DiffviewOpen HEAD~3                    " 查看最近3次提交的累积改动
:DiffviewOpen master...feature          " 查看两个分支的差异
:DiffviewFileHistory                    " 仓库所有文件提交历史
:DiffviewFileHistory %                  " 当前文件的提交历史
:DiffviewFileHistory --range=HEAD~10..  " 最近10次提交的文件变更
```

### 6.5 neogit：Magit 风格状态窗口

```lua
{
  'NeogitOrg/neogit',
  dependencies = {
    'nvim-lua/plenary.nvim',
    'sindrets/diffview.nvim',
  },
  cmd = 'Neogit',
  keys = {
    { '<leader>gg', '<cmd>Neogit<CR>', desc = 'Neogit 状态窗口' },
  },
}
```

Neogit 提供一个**交互式状态窗口**，类似 Emacs 的 Magit。你可以在窗口中用单键完成几乎所有 Git 操作：

```
Neogit 窗口中常用快捷键：
Tab / Shift-Tab     切换折叠区
1 / 2 / 3 / 4       切换显示区域（Untracked / Unstaged / Staged / Stashes）
s                   暂存文件/块
S                   暂存所有
u                   取消暂存
c                   打开 commit 编辑
P                   推送
p                   拉取
F                   拉取所有远程
b                   分支操作菜单
l                   日志
L                   打开 log 悬浮窗
z                   打开 stash 菜单
r                   刷新
?                   帮助
```

### 6.6 完整 Neovim Git 工作流示例

```
1. 打开 Neovim，编辑文件 chap_05.md

2. 在左侧 gutter（gitsigns）看到绿色 │ 标记的改动行

3. 按 ]c 跳到第一个改动块，按 <leader>hs 暂存这一块
   按 ]c 跳到下一个块，按 <leader>hr 放弃这个改动

4. 按 <leader>gg 打开 neogit 状态窗口
   确认 Staged 区域有刚才暂存的内容

5. 在 neogit 中按 c，打开 commit 编辑窗口
   输入：更新电动力学第五章——推迟势推导

6. 在 neogit 中按 P，推送到远程

   或者，忽略 neogit，直接用 fugitive：
   :Git push origin master
```

---

## 7. 最佳实践与常见问题

### 7.1 Commit Message 规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**type 类型**：
| type | 含义 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响逻辑） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试 |
| `chore` | 构建/工具/依赖 |

示例：
```
feat(physics): 添加电磁辐射推迟势推导

添加了 Jefimenko 方程的完整推导过程，
包含时变电荷密度和电流密度的推迟势形式。

Ref: Jackson §6.4
```

### 7.2 `.gitignore` 配置

当前仓库应添加的 `.gitignore`：

```gitignore
# macOS
.DS_Store
.AppleDouble
.LSOverride

# 编辑器
*.swp
*.swo
*~
.vscode/
.idea/

# 临时文件
*.tmp
*.bak
```

### 7.3 Merge vs Rebase 的选择

| 场景 | 推荐 | 原因 |
|------|------|------|
| 公共分支（master/main） | `merge --no-ff` | 保留完整历史，可追溯 |
| 个人特性分支整理 | `rebase` 后 `merge` | 保持线性历史，清爽 |
| 已推送的分支 | 不要 rebase！ | 会改变 commit hash，协作者会崩溃 |
| Pull 远程代码 | `pull --rebase` | 避免无意义的 merge commit |

### 7.4 常见问题排查

```bash
# Q: 我不小心把大文件/密钥 commit 了，怎么彻底删除？
$ git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/secret.key' \
  --prune-empty --tag-name-filter cat -- --all
# （推荐用 git-filter-repo 工具更安全）

# Q: 我的分支乱掉了，想回到远程 master 的最新状态？
$ git fetch origin
$ git reset --hard origin/master

# Q: 如何把一个分支的改动暂存后应用到另一个分支？
$ git stash
$ git checkout other-branch
$ git stash pop

# Q: 如何把已经 add 的文件撤出暂存区？
$ git restore --staged <file>
# 或
$ git reset HEAD <file>
```

### 7.5 日常命令速记卡

```
git status              # 我在哪？改了什么？
git log --oneline -10   # 最近干了什么？
git diff                # 具体改了什么？
git add -p              # 精确选择要提交的内容
git commit -m "..."     # 保存进度
git push origin master  # 同步到 GitHub
git pull --rebase       # 获取最新代码
```

---

## 附录：本仓库真实状态

```bash
# 当前分支结构
$ git branch -a
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master

# 提交历史
$ git log --oneline --all
26325ab 26.5.28
f086621 NoteRepoInit

# 远程仓库
origin  https://github.com/Chai-Maxwell/MyNote.git (fetch)
origin  https://github.com/Chai-Maxwell/MyNote.git (push)

# 待处理改动
M  .DS_Store
M  Physics/ClasssicalElectrodynamics/chapters/chap_05.md
?? plan/
?? skime.md
?? ReadPaper/
```

> 这份指南本身就在 `plan/gitLearn.md` —— 用 `git add plan/gitLearn.md && git commit -m "docs: 添加 Git 版本管理完全指南"` 来保存它 😄
