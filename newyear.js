const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

// 创建闪光效果
function createFlash() {
    const flash = document.createElement('div');
    flash.className = 'flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 800);
}

// 创建爆炸金币
function createExplodingCoin(delay, isBig = false) {
    setTimeout(() => {
        const coin = document.createElement('div');
        coin.className = isBig ? 'big-coin' : 'coin';
        coin.textContent = '¥';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = isBig ? 300 + Math.random() * 400 : 200 + Math.random() * 500;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        coin.style.left = centerX + 'px';
        coin.style.top = centerY + 'px';
        coin.style.setProperty('--tx', tx + 'px');
        coin.style.setProperty('--ty', ty + 'px');
        coin.style.animationDuration = (1.5 + Math.random() * 1) + 's';
        
        document.body.appendChild(coin);
        setTimeout(() => coin.remove(), 3000);
    }, delay);
}

// 创建粒子效果
function createParticles(count, delay) {
    setTimeout(() => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = 100 + Math.random() * 300;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');
                particle.style.animationDuration = (0.8 + Math.random() * 0.5) + 's';
                
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 1500);
            }, i * 10);
        }
    }, delay);
}

// 页面加载时的爆炸效果
window.addEventListener('load', () => {
    // 第一波闪光
    createFlash();
    
    // 第一波大爆炸 - 10个大金币
    for (let i = 0; i < 10; i++) {
        createExplodingCoin(i * 50, true);
    }
    
    // 第一波粒子
    createParticles(50, 0);
    
    // 第二波爆炸 - 30个普通金币
    for (let i = 0; i < 30; i++) {
        createExplodingCoin(200 + i * 30, false);
    }
    
    // 第二波闪光和粒子
    setTimeout(() => {
        createFlash();
        createParticles(40, 0);
    }, 400);
    
    // 第三波爆炸 - 40个金币
    for (let i = 0; i < 40; i++) {
        createExplodingCoin(800 + i * 25, false);
    }
    
    // 第三波粒子
    createParticles(60, 1000);
    
    // 持续的金币效果
    let count = 0;
    const interval = setInterval(() => {
        createExplodingCoin(0, Math.random() > 0.7);
        count++;
        if (count > 50) clearInterval(interval);
    }, 150);
});

// 点击屏幕继续爆金币
document.addEventListener('click', (e) => {
    // 避免按钮点击时触发
    if (e.target.tagName === 'BUTTON') return;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            coin.className = Math.random() > 0.8 ? 'big-coin' : 'coin';
            coin.textContent = '¥';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 300;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            coin.style.left = e.clientX + 'px';
            coin.style.top = e.clientY + 'px';
            coin.style.setProperty('--tx', tx + 'px');
            coin.style.setProperty('--ty', ty + 'px');
            coin.style.animationDuration = (1.2 + Math.random() * 0.8) + 's';
            
            document.body.appendChild(coin);
            setTimeout(() => coin.remove(), 2500);
        }, i * 40);
    }
    createParticles(30, 0);
});

