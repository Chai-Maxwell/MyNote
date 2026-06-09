# Git 多分支开发：从第一天到上线，一个开发者的真实日志

> 本文模拟两个并行项目的完整 Git 工作流：
> - **项目 A**：个人笔记仓库（`MyNote`，Markdown 为主）
> - **项目 B**：个人博客网站（`blog-site`，代码项目，Python/HTML）
>
> 以日记形式呈现每天的操作和思考，穿插**新手必学知识点**。

---

## 目录

1. [第 0 天：项目初始化](#第-0-天项目初始化)
2. [第 1 天：第一次提交，第一次分支](#第-1-天第一次提交第一次分支)
3. [第 3 天：并行工作，切换上下文](#第-3-天并行工作切换上下文)
4. [第 5 天：合并分支，遇到冲突](#第-5-天合并分支遇到冲突)
5. [第 7 天：变基 vs 合并，保持历史整洁](#第-7-天变基-vs-合并保持历史整洁)
6. [第 10 天：代码写错了，时间旅行](#第-10-天代码写错了时间旅行)
7. [第 14 天：与 GitHub 协作](#第-14-天与-github-协作)
8. [第 20 天：Release 与 Tag](#第-20-天release-与-tag)
9. [第 30 天：回顾与总结——一个 Git 新手的成长之路](#第-30-天回顾与总结一个-git-新手的成长之路)

---

## 第 0 天：项目初始化

### 场景

今天是项目的第一天。我有两个项目要开始：
- **MyNote**：个人笔记仓库，用来记录学习内容
- **blog-site**：一个静态博客网站，用 Python 生成 HTML

### 我在终端中做了什么

#### 项目 A：笔记仓库

```bash
# 第一步：本地初始化
$ mkdir ~/stuff/MyNote
$ cd ~/stuff/MyNote
$ git init
已初始化空的 Git 仓库于 /Users/chaiyiqi/stuff/MyNote/.git/

# 第二步：写点东西
$ echo "# MyNote - 我的知识库" > README.md
$ mkdir Physics Math CS

# 第三步：查看状态
$ git status
位于分支 master
未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）
    README.md
    Physics/
    Math/
    CS/

# 第四步：暂存 + 提交
$ git add README.md
$ git commit -m "初始化笔记仓库，创建目录结构"
[master（根提交） a1b2c3d] 初始化笔记仓库，创建目录结构
 1 file changed, 1 insertion(+)
 create mode 100644 README.md

# 第五步：在 GitHub 创建远程仓库并关联
$ gh repo create MyNote --public --source=. --remote=origin --push
✓ Created repository Chai-Maxwell/MyNote on GitHub
✓ Added remote origin
✓ Pushed master to origin
```

#### 项目 B：博客网站

```bash
# 第一步：用脚手架初始化
$ cd ~/projects
$ mkdir blog-site && cd blog-site
$ git init
$ echo "# My Blog" > README.md
$ echo "print('Hello, blog!')" > main.py
$ echo "__pycache__/\n*.pyc\n.env" > .gitignore

# 第二步：第一次提交
$ git add -A                          # -A 暂存全部（包括 .gitignore）
$ git commit -m "init: 博客项目脚手架"
[master（根提交） b2c3d4e] init: 博客项目脚手架
 3 files changed, 5 insertions(+)

# 第三步：推送
$ gh repo create blog-site --public --source=. --remote=origin --push
```

---

> ### 🎓 新手必学 #1：`git init` 做了什么？
>
> `git init` 在当前目录下创建了一个 `.git/` 隐藏目录。**Git 的所有历史记录、分支、配置都存在这个目录里**。
>
> 你可以看看它里面有什么：
> ```bash
> $ ls .git/
> HEAD  config  description  hooks/  info/  objects/  refs/
> ```
> 现在不用担心每个文件什么意思——到第 30 天你会全部认识。暂时只需要知道：**.git 就是你的项目的"数据库"，没有它就没有版本历史。**
>
> **关键命令速查：**
> | 命令 | 做了什么 |
> |------|---------|
> | `git init` | 在当前目录创建 .git，项目开始被 Git 管理 |
> | `git status` | 查看：哪些文件改了、哪些暂存了、哪些没跟踪 |
> | `git add <file>` | 把文件的当前版本拍个照，放进"暂存区" |
> | `git commit -m "..."` | 把暂存区的内容永久保存成一个"版本" |
> | `git add -A` | 暂存所有改过和新文件（小心别把垃圾文件也加进去了） |

---

## 第 1 天：第一次提交，第一次分支

### 场景

今天开始写笔记和代码了。笔记这边我要开始写电磁学第一章，博客那边要开始搭页面框架。**但我不想直接在 master 上改——我要先开分支。**

### 我在终端中做了什么

#### 项目 A：在分支上写笔记

```bash
$ cd ~/stuff/MyNote

# 创建并切换到新分支
$ git checkout -b physics/chapter1
切换到一个新分支 'physics/chapter1'

# 验证我在哪个分支
$ git branch
  master
* physics/chapter1       # ← 星号表示当前分支

# 写笔记
$ echo "# 第一章 静电学" > Physics/chapter1.md
$ echo "## 库仑定律" >> Physics/chapter1.md
$ echo "库仑定律描述了..." >> Physics/chapter1.md

# 查看改了什么
$ git diff                           # 工作区 vs 暂存区（暂存区空的，所以显示所有改动）

# 分块暂存（推荐！）
$ git add -p                         # 交互式：每个改动块问你要不要暂存
# 对初学者，暂存整个文件也行：
$ git add Physics/chapter1.md

# 提交
$ git commit -m "feat(physics): 添加第一章静电学——库仑定律"
[physics/chapter1 d3e4f5g] feat(physics): 添加第一章静电学——库仑定律
 1 file changed, 3 insertions(+)
 create mode 100644 Physics/chapter1.md
```

#### 项目 B：在分支上搭框架

```bash
$ cd ~/projects/blog-site

# 创建功能分支
$ git checkout -b feature/site-layout

# 写代码
$ mkdir templates
$ echo "<html><body>{{ content }}</body></html>" > templates/base.html
$ echo "def render(page): ..." > renderer.py

# 查看文件级别的变化
$ git status -s                       # 短格式
?? templates/base.html
?? renderer.py

$ git add templates/base.html renderer.py
$ git commit -m "feat(layout): 添加模板渲染框架"
[feature/site-layout f6g7h8i] feat(layout): 添加模板渲染框架
 2 files changed, 10 insertions(+)
```

---

> ### 🎓 新手必学 #2：为什么要开分支？
>
> 假设你直接在 `master` 上写了一半，突然需要修一个紧急 bug。这时候：
> - 没分支：只能把半成品 commit 了（污染历史），或者 stash（容易丢），或者硬着头皮修完再改 bug
> - 有分支：直接 `git checkout master`，干净利落地切回去，分支上的半成品完好无损
>
> **分支就是一个"平行宇宙"**——你可以在里面随便折腾，不影响主线。
>
> | 命令 | 做了什么 |
> |------|---------|
> | `git branch` | 列出本地所有分支 |
> | `git checkout -b <name>` | 创建新分支 **并** 切换过去（两步合一步） |
> | `git checkout <name>` | 切换到已有分支 |
> | `git diff` | 看工作区和暂存区的差异 |
> | `git diff --staged` | 看暂存区和最新 commit 的差异 |
> | `git add -p` | 逐块确认要不要暂存（精确控制！） |

---

## 第 3 天：并行工作，切换上下文

### 场景

周末了。写了两天代码，现在情况是这样的：

- **MyNote 笔记仓库**：`physics/chapter1` 分支写了一半；昨天又在 `master` 上直接改了个错别字。
- **blog-site 博客项目**：`feature/site-layout` 还在开发中，突然有个想法要写个关于页。

这天的核心问题是：**怎么在多个分支间跳来跳去而互不干扰？**

### 我在终端中做了什么

#### 项目 A：在分支间跳转

```bash
$ cd ~/stuff/MyNote

# 先看看各分支什么状态
$ git log --oneline --graph --all
* d3e4f5g (physics/chapter1) feat(physics): 添加第一章静电学——库仑定律
* a1b2c3d (HEAD -> master) 初始化笔记仓库，创建目录结构

# 咦？我昨天在 master 上改错了？来看看改了啥
$ git log --oneline master -3
c4d5e6f 修改 README 中的拼写错误
a1b2c3d 初始化笔记仓库，创建目录结构

# 切回 physics/chapter1 继续写
$ git checkout physics/chapter1
$ echo "## 电场强度" >> Physics/chapter1.md
$ echo "电场是矢量场..." >> Physics/chapter1.md
$ git add Physics/chapter1.md && git commit -m "feat(physics): 添加电场强度小节"

# 突然想起 master 上那个错别字修得不够好，想看看具体改了啥
$ git diff master..physics/chapter1    # 两个分支的差异（暂且不深究）
```

#### 项目 B：stash 的使用

```bash
$ cd ~/projects/blog-site

# 正在 feature/site-layout 分支上改 renderer.py
$ echo "def parse_markdown(): ..." >> renderer.py
# ...写了一半...

# 突然！老板（就是我自己）说要新写一个关于页面
# 但 renderer.py 改了一半不想提交（半成品）

$ git status
尚未暂存以备提交的变更：
    修改：renderer.py

# stash：把当前改动"存起来"，让工作区变干净
$ git stash save "renderer.py 半成品——markdown 解析"
保存工作目录和索引状态 On feature/site-layout: renderer.py 半成品——markdown 解析

$ git status             # 干净了！
位于分支 feature/site-layout
无文件要提交，干净的工作区

# 创建新分支写关于页面
$ git checkout -b feature/about-page

# 写关于页面...
$ echo "<h1>About Me</h1>" > templates/about.html
$ git add templates/about.html
$ git commit -m "feat(about): 添加关于页面"

# 关于页面写完了，回到 layout 分支继续之前的半成品
$ git checkout feature/site-layout

# 恢复之前 stash 的内容
$ git stash pop
位于分支 feature/site-layout
尚未暂存以备提交的变更：
    修改：renderer.py
丢弃了 refs/stash@{0} (...)
# 之前写了一半的 renderer.py 又回来了！
```

---

> ### 🎓 新手必学 #3：`git stash`——"先存起来，回头再取"
>
> `stash` 就像一个临时抽屉。你写了一半代码，突然要切到别的分支，又不想 commit 半成品——直接 `git stash`，工作区就干净了。回来之后 `git stash pop`，半成品原样恢复。
>
> | 命令 | 做了什么 |
> |------|---------|
> | `git stash` | 暂存所有未提交的改动（工作区 + 暂存区） |
> | `git stash save "说明"` | 带描述的 stash，方便后来辨认 |
> | `git stash pop` | 恢复最近一次 stash，并删除该 stash 记录 |
> | `git stash list` | 查看所有 stash |
> | `git stash drop stash@{0}` | 删除某个 stash |
>
> **什么时候用 stash vs commit？**
> - 半成品、还在调试中 → stash
> - 逻辑完整、可以描述的小改动 → commit

---

## 第 5 天：合并分支，遇到冲突

### 场景

- **笔记仓库**：`physics/chapter1` 写完了，决定合并回 `master`。
- **博客项目**：`feature/site-layout` 也写完了，但合并时跟 `master` 的某个改动冲突了。

### 我在终端中做了什么

#### 项目 A：顺利合并（Fast-forward）

```bash
$ cd ~/stuff/MyNote

# 确认 physics/chapter1 完成了
$ git log --oneline physics/chapter1 -5
c7d8e9f feat(physics): 添加电场强度小节
d3e4f5g feat(physics): 添加第一章静电学——库仑定律
a1b2c3d 初始化笔记仓库，创建目录结构

# 切回 master
$ git checkout master

# 合并！
$ git merge physics/chapter1
更新 c4d5e6f..c7d8e9f
Fast-forward                                        # ← 注意这个词
 Physics/chapter1.md | 10 ++++++++++
 1 file changed, 10 insertions(+)
 create mode 100644 Physics/chapter1.md

# 为什么是 "Fast-forward"？
# 因为 master 在分出 physics/chapter1 之后没有新 commit，
# Git 只需要把 master 指针"快进"到 physics/chapter1 的位置就行。
# 就像一列火车，从 A 站直接开到了 D 站。

# 看看现在的历史
$ git log --oneline --graph
* c7d8e9f (HEAD -> master, physics/chapter1) feat(physics): 添加电场强度小节
* d3e4f5g feat(physics): 添加第一章静电学——库仑定律
* c4d5e6f 修改 README 中的拼写错误
* a1b2c3d 初始化笔记仓库，创建目录结构

# 分支用完了，删掉
$ git branch -d physics/chapter1
已删除分支 physics/chapter1（曾为 c7d8e9f）
```

#### 项目 B：遇到冲突！

```bash
$ cd ~/projects/blog-site

# 先看看所有分支
$ git branch -v
  feature/about-page   g9h0i1j feat(about): 添加关于页面
* feature/site-layout  f6g7h8i feat(layout): 添加模板渲染框架
  master               b2c3d4e init: 博客项目脚手架

# 切到 master，看看有没有新东西
$ git checkout master
$ git log --oneline -3
b2c3d4e init: 博客项目脚手架

# master 上没新东西，但 another-dev 分支在 master 之后
# （模拟别人也在这仓库上工作，改了 main.py）
$ git checkout -b simulate/other-work
$ echo "# 主入口" >> main.py
$ echo "if __name__ == '__main__': main() " >> main.py
$ git add main.py && git commit -m "feat: 添加程序入口"

$ git checkout master
$ git merge simulate/other-work          # 别人先合了
$ git branch -d simulate/other-work

# 现在 master 和 feature/site-layout 都改了 main.py
# 我们试试合并 feature/site-layout
$ git merge feature/site-layout
自动合并 main.py
冲突（内容）：合并冲突于 main.py                    # ← 冲突！
自动合并失败，修正冲突然后提交修正的结果。

# 看看哪里冲突了
$ git status
您有尚未合并的路径。
  （解决冲突并运行 "git commit"）
  （使用 "git merge --abort" 终止合并）

未合并的路径：
  双方修改：   main.py

# 打开 main.py 看看
$ cat main.py
print('Hello, blog!')
<<<<<<< HEAD
# 主入口
if __name__ == '__main__': main()
=======
import renderer
renderer.init()
>>>>>>> feature/site-layout

# 我和分支上的代码都改了这个文件，Git 不知道用哪个
# 手动解决：保留两段代码，放在合理的位置

# 编辑后 main.py 变成：
$ cat main.py
print('Hello, blog!')
import renderer
renderer.init()
if __name__ == '__main__':
    main()

# 标记为已解决
$ git add main.py

# 完成合并
$ git commit -m "merge: 合并 site-layout 分支，解决 main.py 冲突"
[master h0i1j2k] merge: 合并 site-layout 分支，解决 main.py 冲突

# 如果刚才处理不好想放弃合并，可以：
# $ git merge --abort         # 回到合并前状态
```

---

> ### 🎓 新手必学 #4：合并冲突不是 bug，是 Git 在保护你
>
> 当你和另一个分支**都修改了同一个文件的同一行**时，Git 不知道该保留哪个版本，所以它停下来让你决策。
>
> **冲突解决三步法：**
> 1. `git status` 找到冲突文件
> 2. 打开文件，搜索 `<<<<<<<`、`=======`、`>>>>>>>`，手动编辑保留想要的内容
> 3. `git add <file>` + `git commit` 完成合并
>
> **放弃治疗：** `git merge --abort` 一切回到合并前。
>
> **两种合并策略：**
> | 合并方式 | 结果 | 历史图 |
> |---------|------|--------|
> | Fast-forward | 不创建新 commit，直接把指针挪过去 | 一条直线 |
> | Three-way merge | 创建一个 merge commit | 有分叉，能看到"曾经有个分支" |

---

## 第 7 天：变基 vs 合并，保持历史整洁

### 场景

`feature/about-page` 分支开发了好几天了。期间 `master` 也往前走了几步。如果直接 merge，历史图里会多一个分叉。

有些开发者喜欢**线性历史**（一条直线别拐弯），这时候用 `rebase`。

### 我在终端中做了什么

```bash
$ cd ~/projects/blog-site

# 先看看当前状态
$ git log --oneline --graph --all
* h0i1j2k (master) merge: 合并 site-layout 分支，解决 main.py 冲突
| \
|  * f6g7h8i feat(layout): 添加模板渲染框架
*  | k3l4m5n feat: 添加程序入口
| /
* b2c3d4e init: 博客项目脚手架

| 这里有个分叉。同时：
* g9h0i1j (feature/about-page) feat(about): 添加关于页面
* b2c3d4e init: 博客项目脚手架
| ← feature/about-page 还在很早的 master 上分出来的

# ─── 方案 A：普通 merge ───
$ git checkout master
$ git merge feature/about-page
# 历史中会多一个 merge commit，图上有分叉再合回来

# ─── 方案 B：先 rebase 再 merge（保持线性）───
# 撤销上面的 merge（假如已经做了）
$ git reset --hard HEAD~1          # 假设只回退 merge 这一步

# 先 rebase
$ git checkout feature/about-page
$ git rebase master
首先，回退分支以便在上面重放...
应用：feat(about): 添加关于页面

# 现在 feature/about-page 的 commit 被"搬到"了 master 最新位置之后
$ git log --oneline --graph --all
* n5o6p7q (feature/about-page) feat(about): 添加关于页面     # ← 原来的 commit 有了新 hash！
* h0i1j2k (master) merge: 合并 site-layout 分支，解决 main.py 冲突
* k3l4m5n feat: 添加程序入口
* f6g7h8i feat(layout): 添加模板渲染框架
* b2c3d4e init: 博客项目脚手架
# 一条直线！

# 现在合并一定是 Fast-forward
$ git checkout master
$ git merge feature/about-page
$ git branch -d feature/about-page
```

---

> ### 🎓 新手必学 #5：`rebase` 是什么？什么时候用？
>
> **rebase = "把我的改动搬家到目标分支的最新状态之后"**
>
> ```
> 合并前：
>   A - B - C (master)
>        \
>         D - E (feature)
>
> git rebase master（在 feature 分支上执行）：
>   A - B - C (master)
>            \
>             D' - E' (feature)   ← D 和 E 被"搬到"C 之后了
>
> git merge feature（切回 master 执行）：
>   A - B - C - D' - E' (master)  ← 一条直线！
> ```
>
> **黄金法则：⚠️ 永远不要 rebase 已经推送到远程的公共分支！**
>
> rebase 会改写 commit hash（D 变成 D'），如果你已经 push 过，别人也基于你的旧 commit 在工作，那他们就惨了。
>
> | 场景 | 用 merge | 用 rebase |
> |------|---------|-----------|
> | 合并到公共分支（master/main） | ✅ | ❌ |
> | 整理自己的未推送的特性分支 | ✅ | ✅（更整洁） |
> | 拉取远程更新 | `git pull` | `git pull --rebase`（推荐） |

---

## 第 10 天：代码写错了，时间旅行

### 场景

项目中出了几个问题：

1. **笔记仓库**：昨天写的电磁学第 3 章有个公式打错了，但已经 commit 了 3 次，不想一个一个改。
2. **博客项目**：`renderer.py` 上周末的一次改动引入了 bug，需要回到改之前的版本看看。
3. **博客项目**：刚才脑子一热，`git reset --hard HEAD~3` 把最近 3 次 commit 全丢了，慌了。

### 我在终端中做了什么

#### 问题 1：修改过去的 commit（交互式 rebase）

```bash
$ cd ~/stuff/MyNote

# 最近 3 次 commit
$ git log --oneline -3
q1r2s3t 更新——修改电动力学 chapter3 之边界条件
t4u5v6w feat(physics): 添加电动力学第3章——边界条件
w7x8y9z 补充——库仑定律习题答案

# 发现第二次 commit (t4u5v6w) 里有个公式错了
# 但它已经被后面的 commit 盖过去了
# 用交互式 rebase 回去改

$ git rebase -i HEAD~3
# 编辑器打开，显示：
pick w7x8y9z 补充——库仑定律习题答案
pick t4u5v6w feat(physics): 添加电动力学第3章——边界条件
pick q1r2s3t 更新——修改电动力学 chapter3 之边界条件

# 把第二行的 pick 改成 edit：
pick w7x8y9z 补充——库仑定律习题答案
edit t4u5v6w feat(physics): 添加电动力学第3章——边界条件
pick q1r2s3t 更新——修改电动力学 chapter3 之边界条件

# 保存退出。Git 会停在第二次 commit 后：
$ git status
停止在 t4u5v6w... feat(physics): 添加电动力学第3章——边界条件
您现在可以修补提交，使用
  git commit --amend

# 修改文件，改公式
$ nvim Physics/chapter3.md
$ git add Physics/chapter3.md
$ git commit --amend                         # 修改这个 commit

# 继续 rebase
$ git rebase --continue
# Git 自动应用剩余的 commit，完成！
```

#### 问题 2：查看文件在某个历史版本中的样子

```bash
$ cd ~/projects/blog-site

# 想看看上周五的 renderer.py 长什么样
# 先找到上周五的 commit
$ git log --oneline --since="2026-05-28" --until="2026-05-30" -- renderer.py
a1b2c3d feat(layout): 添加模板渲染框架

# 查看那个版本的文件内容
$ git show a1b2c3d:renderer.py
def render(page):
    with open(f'templates/{page}.html') as f:
        return f.read()
# ↑ 原来之前的代码是这样的！

# 只想对比当前版本和那个版本的差异
$ git diff a1b2c3d -- renderer.py

# 如果想把那个版本的文件直接恢复出来（覆盖当前版本）
$ git checkout a1b2c3d -- renderer.py        # 注意：会覆盖当前工作区的文件！
```

#### 问题 3：不小心 reset --hard 了，怎么救？

```bash
$ cd ~/projects/blog-site

# 刚才手滑了
$ git reset --hard HEAD~3
HEAD 现在位于 b2c3d4e init: 博客项目脚手架

# 天塌了！最近的 commit 全没了！
$ git log
b2c3d4e init: 博客项目脚手架
# 后面的全没了...

# 别慌！reflog 记得一切
$ git reflog
b2c3d4e HEAD@{0}: reset: moving to HEAD~3
h0i1j2k HEAD@{1}: merge feature/site-layout: Merge made by the 'ort' strategy.
k3l4m5n HEAD@{2}: commit: feat: 添加程序入口
f6g7h8i HEAD@{3}: commit: feat(layout): 添加模板渲染框架
n5o6p7q HEAD@{4}: ...
...

# reflog 记录了 HEAD 指针的每一次移动！
# 回到 reset 之前的状态：
$ git reset --hard HEAD@{1}
HEAD 现在位于 h0i1j2k merge: 合并 site-layout 分支，解决 main.py 冲突

# 活了活了！
$ git log --oneline -3
h0i1j2k merge: 合并 site-layout 分支，解决 main.py 冲突
k3l4m5n feat: 添加程序入口
f6g7h8i feat(layout): 添加模板渲染框架
```

---

> ### 🎓 新手必学 #6：Git 的"后悔药"体系
>
> Git 提供了多层级的"撤回"机制。从轻到重：
>
> | 你要做的事 | 命令 | 能撤回什么 |
> |-----------|------|-----------|
> | 撤销工作区改动（回到暂存区/commit 状态） | `git restore <file>` | 还没 add 的改动 |
> | 取消暂存（从暂存区退回工作区） | `git restore --staged <file>` | 刚 add 还没 commit 的 |
> | 修改最近一次 commit | `git commit --amend` | 漏了文件/写错 message |
> | 撤销 commit（改动退回工作区） | `git reset --mixed HEAD~1` | 最近一次 commit |
> | 撤销 commit（改动退回暂存区） | `git reset --soft HEAD~1` | 最近一次 commit |
> | 彻底丢弃 commit 和改动 | `git reset --hard HEAD~1` | 最近一次 commit（危险⚠️） |
> | 安全"撤销"（新 commit 反向操作） | `git revert <hash>` | 任意 commit，适合已 push 的 |
> | 终极后悔药 | `git reflog` + `git reset --hard HEAD@{N}` | 几乎所有操作都能找回 |
>
> **reflog 是救命稻草**——它记录你每一次 HEAD 移动，默认保留 90 天。只要你没手动清理 `.git/`，几乎没有什么操作是不可逆的。

---

## 第 14 天：与 GitHub 协作

### 场景

博客项目渐入佳境。今天我：
1. 推送所有本地分支到 GitHub
2. 模拟"别人"（其实就是另一台电脑）也在改代码
3. 用 `git pull` 拉取别人的改动，发现又冲突了
4. 用 `gh` CLI 管理 Issues 和 Pull Requests

### 我在终端中做了什么

#### 推送和同步

```bash
$ cd ~/projects/blog-site

# 本地现在有什么分支？
$ git branch
  master
* feature/markdown-parser
  feature/comment-system

# 推送所有分支到 GitHub
$ git push origin --all
枚举对象中: 45, 完成.
对象计数中: 100% (45/45), 完成.
...
 * [新分支]        feature/markdown-parser -> feature/markdown-parser
 * [新分支]        feature/comment-system -> feature/comment-system

# 现在，模拟"另一台电脑上的我"往 master 推了一个 commit
# （实际操作中，这是别人推的，或者你在 GitHub 网页上直接改的）
$ git push origin master
# 假设 GitHub 上 master 被别人推了一个新 commit（已比本地多了）
```

#### 拉取并处理冲突

```bash
# 我要拉取最新的 master
$ git checkout master

# 先看看远程有什么新东西（下载但不合并）
$ git fetch origin
来自 github.com:Chai-Maxwell/blog-site
   h0i1j2k..z9y8x7w  master     -> origin/master

# 看看别人改了啥
$ git log origin/master ^master    # 远程有而本地没有的 commit
$ git diff master..origin/master   # 两个版本的差异

# 拉取并合并
$ git pull origin master
# 等同于 git fetch origin master && git merge origin/master

# 推荐用 rebase 方式拉取（避免多余 merge commit）
$ git pull --rebase origin master
```

#### 用 `gh` 管理项目

```bash
# 创建 Issue
$ gh issue create --title "评论系统需要支持 Markdown" --body "目前的评论系统只支持纯文本，需要增加 Markdown 渲染。"

# 查看 Issues
$ gh issue list
#1  评论系统需要支持 Markdown    feature-request   about 1 minute ago

# 创建 Pull Request
$ git checkout feature/comment-system
$ git push -u origin feature/comment-system
$ gh pr create --title "feat: 添加 Markdown 评论渲染" --body "Close #1\n\n- 添加 markdown 渲染支持\n- 添加 XSS 过滤"

# 查看 PR
$ gh pr list

# 审查并合并 PR（假设我是 reviewer）
$ gh pr review 1 --approve
$ gh pr merge 1 --squash         # 把 PR 的所有 commit 合并成一个再合入 master
```

---

> ### 🎓 新手必学 #7：本地 vs 远程的完整图景
>
> ```
> 你的电脑                                       GitHub
> ┌──────────────────────┐          ┌─────────────────────────┐
> │  工作区  暂存区  本地仓库 │  push →  │  远程仓库 (origin)      │
> │                      │  ← fetch │                         │
> │  master              │          │  origin/master (跟踪分支) │
> │  feature/xxx         │          │  origin/feature/xxx      │
> └──────────────────────┘          └─────────────────────────┘
> ```
>
> | 命令 | 方向 | 做了什么 |
> |------|------|---------|
> | `git fetch origin` | 远程 → 本地跟踪分支 | 下载更新但不合并 |
> | `git merge origin/master` | 跟踪分支 → 本地分支 | 把下载的更新合并进来 |
> | `git pull origin master` | 两步合一步 | fetch + merge |
> | `git pull --rebase` | 两步合一步 | fetch + rebase（推荐） |
> | `git push origin master` | 本地 → 远程 | 把本地 commit 推上去 |
>
> **什么时候用 `--force`？**
> `git push --force` 会覆盖远程历史——**永远不要在公共分支上用**！只在你自己独占的分支上，比如 rebase 后需要强制推送。

---

## 第 20 天：Release 与 Tag

### 场景

博客项目的 MVP（最小可行产品）终于做完了！我要：
1. 给这个里程碑打个标签
2. 在 GitHub 上发布 Release
3. 同时开始规划 v2.0 的新功能

### 我在终端中做了什么

```bash
$ cd ~/projects/blog-site

# 确认 master 上是最新且稳定的代码
$ git checkout master
$ git log --oneline -5

# 打标签
$ git tag v1.0.0 -m "v1.0.0: 博客 MVP 发布——支持文章展示和评论"
$ git tag -l                         # 查看所有标签
v1.0.0

# 推送标签到 GitHub
$ git push origin v1.0.0
# 或一次性推送所有标签
$ git push origin --tags

# 用 gh 创建 Release
$ gh release create v1.0.0 \
  --title "v1.0.0 博客 MVP" \
  --notes "首个可用版本，包含：
- Markdown 文章渲染
- 评论系统
- 关于页面
- RSS 订阅"
```

```bash
# 现在开始规划 v2.0
# 从 master 分一个大的 feature 分支
$ git checkout -b dev/v2.0

# v1.0 上线后如果发现紧急 bug，需要从 master 分 hotfix 分支
$ git checkout master
$ git checkout -b hotfix/rss-encoding-fix

# 修 bug...
$ git add rss.py
$ git commit -m "fix(rss): 修复 RSS 输出中文乱码"

# 修完马上合回 master
$ git checkout master
$ git merge hotfix/rss-encoding-fix
$ git tag v1.0.1 -m "hotfix: 修复 RSS 中文乱码"
$ git branch -d hotfix/rss-encoding-fix
$ git push origin master --tags
```

---

> ### 🎓 新手必学 #8：Tag——给 commit 贴标签
>
> 分支是指向 commit 的**移动指针**，标签是指向 commit 的**固定标记**。
>
> ```
> commit:  a1b2 -- b2c3 -- d4e5 -- f6g7 -- h8i9
>                          ↑               ↑
>                       v1.0.0           master（持续往前走）
> ```
>
> | 命令 | 做了什么 |
> |------|---------|
> | `git tag v1.0.0` | 在当前 HEAD 打一个轻量标签 |
> | `git tag -a v1.0.0 -m "..."` | 打一个带注释的标签（推荐） |
> | `git tag -l` | 列出所有标签 |
> | `git push origin v1.0.0` | 推送单个标签 |
> | `git push origin --tags` | 推送所有标签 |
> | `git checkout v1.0.0` | 切换到标签对应的代码状态 |
>
> **常见分支策略（简化版 Git Flow）：**
> ```
> master ─────────●──────────●──────────●────  （稳定版本，只合并不直接改）
>                 ↑          ↑          ↑
> feature/xxx ──┘ │          │          │       （新功能开发）
>                 │          │          │
> hotfix/yyy ─────┘──────────┘──────────┘       （紧急修复，从 master 分出，修完合并回 master）
>                 │
> dev/v2.0 ───────┘                             （大版本开发，长期分支）
> ```

---

## 第 30 天：回顾与总结——一个 Git 新手的成长之路

### 30 天来我学到了什么

到今天，我已经在 MyNote 和 blog-site 两个项目上用了整整一个月 Git。回头看：

#### 我不再害怕的事情

| 之前 | 现在 |
|------|------|
| "commit 了就不能改了" | `git commit --amend`、交互式 rebase 随便改 |
| "合并冲突好可怕" | 三步解决：找文件 → 编辑 → add + commit |
| "reset --hard 完了天塌了" | reflog 是我的保险，90 天内都能找回 |
| "推送到 GitHub 就覆水难收" | `git revert` 安全撤销，不用 force push |
| "多分支会不会很乱" | 分支是平行宇宙，各干各的互不干扰 |

#### 我现在每天用 Git 的真实节奏

```bash
# 早上一来
$ cd ~/projects/blog-site
$ git status                        # 看看昨天有没有忘了提交的
$ git fetch origin                  # 看看 GitHub 上有没有新东西

# 开始工作
$ git checkout -b feature/new-xxx   # 新功能开新分支
$ ... coding ...
$ git add -p                        # 逐块确认
$ git commit -m "feat(xxx): ..."    # 有意义的 message

# 中途被打断
$ git stash save "半成品 xxx"       # 存起来
$ git checkout master               # 看看主干
$ git checkout feature/new-xxx      # 回到分支
$ git stash pop                     # 继续

# 功能完成
$ git rebase master                 # 整理（如果 master 有更新）
$ git checkout master
$ git merge feature/new-xxx         # 合并
$ git push origin master            # 同步到 GitHub
$ git branch -d feature/new-xxx     # 清理

# 收工前
$ git status                        # 确认状态
$ git log --oneline -5              # 回顾今天做了什么
```

#### 我的命令速记卡

```
git status                        # 万能起手式——先看看什么状态
git log --oneline --graph --all   # 地图——看清所有分支的来龙去脉
git diff                          # 显微镜——看具体改了什么
git add -p                        # 精准暂存——不把垃圾带进历史
git commit -m "..."               # 存档——写好 message
git stash / stash pop             # 抽屉——暂存半成品
git reflog                        # 后悔药——终极保险
```

---

### 🗺️ Git 命令全景地图

```
        远程仓库 (GitHub)
              ↑
       git push / git pull
              │
    ┌─────────┴─────────┐
    │    本地仓库 (.git)  │
    │  commit / branch   │
    │  tag / reflog      │
    └─────────┬─────────┘
       git commit ↑ git reset
              │
    ┌─────────┴─────────┐
    │      暂存区       │
    │   (Index/Stage)   │
    └─────────┬─────────┘
       git add ↑ git restore --staged
              │
    ┌─────────┴─────────┐
    │     工作目录      │
    │  (你的实际文件)    │
    └───────────────────┘
```

> 从下往上是**保存**（`add` → `commit` → `push`），从上往下是**撤销**（`restore` → `reset` → `revert`）。

---

### 📖 给 Git 新手的最后建议

1. **不要怕犯错**。Git 几乎一切操作都可逆（reflog 兜底）。唯一真正危险的是 `push --force` 到公共分支。
2. **勤 commit，写好 message**。宁可多 commit 几次，每个 commit 小而清晰，比憋一个大 commit 好得多。
3. **分支是免费的**。一个功能、一个 bug、一个想法，都开分支。分支用完就删。
4. **先 fetch 再决定**。拿到远程更新时，先 `git fetch` 看一看，再决定 merge 还是 rebase。
5. **`git status` 是你的仪表盘**。不知道什么状态？先打 `git status`。
6. **`git log --oneline --graph --all` 是你的地图**。搞不清分支关系？先看地图。
7. **`git reflog` 是你的时光机**。丢了东西？去翻 reflog。

---

> 本文档就是一篇 Git 生产日记。你可以回到开头，打开终端，跟着每一步敲一遍——**用你的手去记住命令**。犯错也没关系，reflog 会保护你的。
>
> 配合 `plan/gitLearn.md`（Git 技术手册）一起阅读，效果更佳。
