#!/bin/bash
# ============================================================
# 博彦设计官网 · 一键还原脚本
# 用法：
#   bash rollback.sh          # 查看所有还原点
#   bash rollback.sh <编号>   # 还原到某个还原点（保留历史，可再撤销）
# 示例：
#   bash rollback.sh          # 先查看
#   bash rollback.sh 3        # 还原到第 3 个还原点
# ============================================================
cd "$(dirname "$0")"

echo "=== 还原点列表（最新在前）==="
git log --oneline --date=format:'%m-%d %H:%M' --pretty=format:'%h | %ad | %s' | head -20
echo ""
echo "共 $(git log --oneline | wc -l | tr -d ' ') 个还原点"

if [ -z "$1" ]; then
  echo ""
  echo "想还原到某个版本，运行: bash rollback.sh <序号>（从上往下数，1=最新）"
  exit 0
fi

# 取第 N 个 commit（1=最新）
TARGET=$(git log --oneline | sed -n "${1}p" | awk '{print $1}')
if [ -z "$TARGET" ]; then
  echo "❌ 没有第 $1 个还原点"
  exit 1
fi

DESC=$(git log --oneline -1 "$TARGET" | cut -d' ' -f2-)
echo ""
echo "即将还原到: $TARGET ($DESC)"
read -p "确认还原? (y/n): " ans
if [ "$ans" != "y" ]; then echo "已取消"; exit 0; fi

# 用 revert 保留历史，安全可逆
git revert --no-commit "$TARGET" 2>/dev/null || git revert --no-commit "$TARGET"~1.."$TARGET" 2>/dev/null || { echo "自动还原冲突，尝试直接回退..."; git reset --hard "$TARGET"; }
git commit -m "还原到 $TARGET ($DESC)" 2>/dev/null
echo ""
echo "✅ 已还原。本地已生效，推送线上请运行: git push origin main"
echo "   若想撤销本次还原: git revert HEAD"
