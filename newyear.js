/**
 * 优化版新年特效 JS
 * 修复了坐标定位偏移和字符堆叠问题
 */

// 1. 动态获取当前窗口中心点，确保在手机和电脑上都能居中爆炸
const getCenter = () => {
    return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
};

// 2. 创建背景闪光特效
function createFlash() {
    const flash = document.createElement('div');
    flash.className = 'flash';
    document.body.appendChild(flash);
    // 动画结束后移除元素，释放内存
    setTimeout(() => flash.remove(), 800);
}

// 3. 创建爆炸金币的核心函数
function createCoin(isBig = false, startX, startY) {
    const coin = document.createElement('div');
    coin.className = isBig ? 'big-coin' : 'coin';
    coin.textContent = '¥';
    
    // 如果没有传入点击坐标，则默认从屏幕中心发射
    const originX = startX || getCenter().x;
    const originY = startY || getCenter().y;
    
    // 计算随机爆炸角度和距离
    const angle = Math.random() * Math.PI * 2; // 360度随机方向
    const distance = isBig ? (250 + Math.random() * 250) : (150 + Math.random() * 300);
    
    // 设置初始位置
    coin.style.left = originX + 'px';
    coin.style.top = originY + 'px';
    
    // 通过 CSS 变量传递爆炸终点坐标
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    coin.style.setProperty('--tx', `${tx}px`);
    coin.style.setProperty('--ty', `${ty}px`);
    
    // 随机动画时长，增加生动感
    const duration = isBig ? (1.5 + Math.random()) : (1 + Math.random());
    coin.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(coin);
    
    // 动画播放完后准时清理
    setTimeout(() => coin.remove(), duration * 1000);
}

// 4. 页面加载完成后的自动特效
window.addEventListener('load', () => {
    // 触发闪光
    createFlash();
    
    // 连环爆炸效果：分批次发射金币
    // 第一波：5个大金币
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createCoin(true), i * 100);
    }
    
    // 第二波：20个小金币
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createCoin(false), 300 + (i * 50));
    }
    
    // 持续性零星金币（前5秒）
    let count = 0;
    const interval = setInterval(() => {
        createCoin(Math.random() > 0.8);
        count++;
        if (count > 30) clearInterval(interval);
    }, 200);
});

// 5. 交互效果：点击屏幕任何地方都会在该处爆出金币
document.addEventListener('mousedown', (e) => {
    // 如果点击的是按钮等交互元素，可以视情况跳过
    if (e.target.tagName === 'BUTTON') return;
    
    // 每次点击爆出 6-8 个金币
    const burstCount = 6 + Math.floor(Math.random() * 3);
    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            createCoin(Math.random() > 0.9, e.clientX, e.clientY);
        }, i * 30);
    }
});

// 针对触摸屏的兼容
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const burstCount = 5;
    for (let i = 0; i < burstCount; i++) {
        createCoin(false, touch.clientX, touch.clientY);
    }
}, { passive: true });
