#!/bin/bash

# 设置颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_header() {
    echo
    echo "========================================"
    echo "    小说润色与编辑系统"
    echo "    正在启动开发服务器..."
    echo "========================================"
    echo
}

print_header

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    print_message $RED "[错误] 未检测到 Node.js，请先安装 Node.js"
    print_message $YELLOW "下载地址: https://nodejs.org/"
    exit 1
fi

# 检查 npm 是否可用
if ! command -v npm &> /dev/null; then
    print_message $RED "[错误] npm 不可用，请检查 Node.js 安装"
    exit 1
fi

# 检查是否存在 package.json
if [ ! -f "package.json" ]; then
    print_message $RED "[错误] 未找到 package.json 文件"
    print_message $YELLOW "请确保在项目根目录下运行此脚本"
    exit 1
fi

# 检查依赖是否已安装
if [ ! -d "node_modules" ]; then
    print_message $BLUE "[信息] 检测到首次运行，正在安装依赖..."
    echo
    npm install
    if [ $? -ne 0 ]; then
        print_message $RED "[错误] 依赖安装失败"
        exit 1
    fi
    echo
    print_message $GREEN "[成功] 依赖安装完成"
    echo
fi

# 启动开发服务器
print_message $BLUE "[信息] 正在启动 Next.js 开发服务器..."
echo

# 在后台启动浏览器打开任务
(
    sleep 5
    print_message $BLUE "[信息] 正在打开浏览器..."

    # 检测操作系统并使用相应的命令打开浏览器
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "http://localhost:3000"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v xdg-open &> /dev/null; then
            xdg-open "http://localhost:3000"
        elif command -v gnome-open &> /dev/null; then
            gnome-open "http://localhost:3000"
        else
            print_message $YELLOW "[提示] 请手动打开浏览器访问: http://localhost:3000"
        fi
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # Windows (Git Bash)
        start "http://localhost:3000"
    else
        print_message $YELLOW "[提示] 请手动打开浏览器访问: http://localhost:3000"
    fi
) &

echo
echo "========================================"
print_message $GREEN "    启动完成！"
echo "    访问地址: http://localhost:3000"
echo "    按 Ctrl+C 停止服务器"
echo "========================================"
echo

# 运行开发服务器（这会阻塞直到用户按 Ctrl+C）
npm run dev

print_message $BLUE "[信息] 开发服务器已停止"
