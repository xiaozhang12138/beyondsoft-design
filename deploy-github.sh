#!/bin/bash
# ============================================================
# 博彦设计官网 · GitHub Pages 一键发布脚本（v2 复核版）
#
# 前置操作（重要）：
#   1. 浏览器登录 GitHub: https://github.com/login
#   2. 创建公开仓库: New repository → Public
#      → 仓库名填 beyondsoft-design
#      → 不要勾选 Add a README（保持空仓库）
#   3. 改下面 GITHUB_USER 为你的用户名
#   4. 若终端连不上 github.com（浏览器能开但脚本 push 超时）:
#      git config --global http.https://github.com.proxy http://127.0.0.1:7890
#      git config --global https.https://github.com.proxy http://127.0.0.1:7890
#      （7890 换成你的代理端口，Clash/V2Ray 面板可查）
#   5. 执行: bash deploy-github.sh
# ============================================================

set -e
cd "$(dirname "$0")"

# ========== 改成你自己的 GitHub 用户名 ==========
GITHUB_USER="你的用户名"
REPO_NAME="beyondsoft-design"
# ==================================================

if [ "$GITHUB_USER" = "你的用户名" ]; then
  echo "错误：请先把脚本里的 GITHUB_USER 改成你的 GitHub 用户名" >&2
  exit 1
fi
REPO_URL="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
SITE_URL="https://${GITHUB_USER}.github.io/${REPO_NAME}/"

echo "=== 1/6 检查 git 仓库 ==="
if [ ! -d .git ]; then
  git init -b main
  git config user.name "beyondsoft-design"
  git config user.email "design@beyondsoft.com"
fi

echo "=== 2/6 添加 .nojekyll（确保 Pages 原样输出）==="
touch .nojekyll

echo "=== 3/6 提交代码 ==="
git add -A
if git diff --cached --quiet; then
  echo "无新变更，跳过提交"
else
  git commit -m "博彦设计官网：品牌包装改造 + 80案例 + AIGC页面 + 搜索标签 + 表单持久化"
fi

echo "=== 4/6 关联远程仓库 ==="
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

echo "=== 5/6 检查网络可达性 ==="
if git ls-remote "$REPO_URL" >/dev/null 2>&1; then
  echo "网络 OK"
else
  echo ""
  echo "⚠️ 无法访问 ${REPO_URL}"
  echo ""
  echo "原因通常是终端没有走代理（浏览器能开 GitHub 但终端不能）。"
  echo "请先执行以下两条命令再重新运行本脚本："
  echo ""
  echo "  git config --global http.https://github.com.proxy http://127.0.0.1:7890"
  echo "  git config --global https.https://github.com.proxy http://127.0.0.1:7890"
  echo ""
  echo "（7890 换成你的代理端口）"
  echo "若没有代理，可用网页上传兜底：仓库页 → Add file → Upload files → 拖入全部文件"
  exit 1
fi

echo "=== 6/6 推送代码 ==="
if git ls-remote --heads origin main 2>/dev/null | grep -q main; then
  echo "远端已有 main，先合并再推送"
  git pull origin main --rebase --allow-unrelated-histories || true
fi
git push -u origin main

echo ""
echo "=========================================="
echo "✅ 代码已推送！最后一步（网页操作）："
echo "=========================================="
echo ""
echo "1. 打开: https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages"
echo "2. Source 选择: Deploy from a branch → main / (root) → Save"
echo ""
echo "3. 网站地址（首次部署等 1-10 分钟，建议无痕窗口验证）:"
echo "   ${SITE_URL}"
echo "=========================================="
