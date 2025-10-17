window.addEventListener('load', () => {
    const messages = [
        "Chúc mẹ luôn khỏe mạnh và hạnh phúc 🌸",
        "Cảm ơn mẹ vì những hi sinh thầm lặng và tình yêu bao la không điều kiện 💖",
        "Chúc mẹ luôn giữ nụ cười hiền và ánh mắt dịu dàng, như ngọn đèn sưởi ấm gia đình 💕",
        "Con yêu mẹ rất nhiều — mong mỗi ngày của mẹ đều tràn ngập niềm vui và bình an 🌷",
        "Mong sao mẹ luôn bình an, hạnh phúc và khoẻ mạnh 🌼",
        "20/10 là ngày đặc biệt, nhưng với con, mỗi ngày đều là ngày của mẹ 💫"
    ];

    const msgEl = document.getElementById('message');
    let i = 0;
    msgEl.style.opacity = 1;
    setInterval(() => {
        msgEl.style.opacity = 0;
        setTimeout(() => {
            i = (i + 1) % messages.length;
            msgEl.textContent = messages[i];
            msgEl.style.opacity = 1;
        }, 800);
    }, 4800);

    const activePositions = [];

    // 💖 Danh sách câu chú thích tương ứng với pino1 → pino12
    const captions = [
        "Kỷ niệm đẹp nhất là khi được ở bên mẹ 💕",
        "Tình yêu của mẹ là ánh sáng dẫn lối con đi 🌷",
        "Cảm ơn mẹ vì đã luôn tin tưởng và yêu thương con 💫",
        "Không nơi nào an toàn bằng vòng tay mẹ 🌸",
        "Mẹ là món quà tuyệt vời nhất mà con có được 🎁",
        "Con tự hào vì được là con của mẹ 💖",
        "Mẹ là người bạn, là bờ vai, là niềm tin 💐",
        "Những bữa cơm mẹ nấu là hạnh phúc giản dị nhất 🍲",
        "Mỗi nụ cười của mẹ là nguồn năng lượng của con 🌞",
        "Thời gian có thể thay đổi tất cả, trừ tình yêu con dành cho mẹ 💝",
        "Không ai có thể thay thế mẹ trong trái tim con 🌼",
        "Con yêu mẹ — đơn giản vì mẹ là tất cả 💗"
    ];

    // 🌺 Popup hiển thị ảnh và chú thích
    const popup = document.createElement('div');
    popup.id = "popup";
    popup.style.cssText = `
        display:none; position:fixed; inset:0;
        background:rgba(0,0,0,0.7); z-index:999;
        justify-content:center; align-items:center;
    `;
    popup.innerHTML = `
        <div style="position:relative; text-align:center;">
            <img id="popupImg" src="" style="max-width:80vw; max-height:70vh; border-radius:20px; box-shadow:0 0 25px rgba(255,255,255,0.7); display:block; margin:0 auto;">
            <p id="popupCaption" style="color:#fff; font-size:1.2em; margin-top:15px; font-family:'Segoe UI', sans-serif;"></p>
            <button id="closePopup" style="position:absolute; top:-10px; right:-10px; background:#fff; border:none; border-radius:50%; padding:8px 12px; cursor:pointer;">✖</button>
        </div>
    `;
    document.body.appendChild(popup);

    const popupImg = document.getElementById('popupImg');
    const popupCaption = document.getElementById('popupCaption');
    const closePopup = document.getElementById('closePopup');
    closePopup.addEventListener('click', () => popup.style.display = 'none');

    // 🌸 Tạo hình rơi + thêm click để mở ảnh và chú thích
    function createFallingImage() {
        let left;
        const safe = 8;
        const minDistance = 10;
        let tries = 0;
        do {
            left = safe + Math.random() * (100 - 2 * safe);
            tries++;
        } while (activePositions.some(x => Math.abs(x - left) < minDistance) && tries < 20);

        const el = document.createElement('img');
        el.className = 'falling-img';
        const index = Math.floor(Math.random() * 12) + 1;
        el.src = `style/img/Anh (${index}).png`;
        el.style.left = left + 'vw';

        // 💫 Khi click vào icon, mở ảnh + lời chúc tương ứng
        el.addEventListener('click', () => {
            popupImg.src = `style/img/pino${index}.jpg`;
            popupCaption.textContent = captions[index - 1];
            popup.style.display = 'flex';
        });

        let min = 80, max = 120;
        if (window.innerWidth <= 480) { min = 40; max = 70; }
        else if (window.innerWidth <= 768) { min = 60; max = 90; }
        el.style.width = (min + Math.random() * (max - min)) + 'px';
        el.style.animationDuration = (8 + Math.random() * 4) + 's';
        el.style.transform = `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(el);
        activePositions.push(left);

        setTimeout(() => {
            el.remove();
            const idx = activePositions.indexOf(left);
            if (idx !== -1) activePositions.splice(idx, 1);
        }, 14000);
    }

    setInterval(createFallingImage, 400);

    const bgm = document.getElementById('bgm');
const toggle = document.getElementById('soundToggle');
let playing = false;
let firstClick = false;

// Khi bấm nút loa
toggle.addEventListener('click', async () => {
    try {
        if (!playing) {
            bgm.currentTime = 68;
            await bgm.play();
            toggle.textContent = "🔈";
            playing = true;
        } else {
            bgm.pause();
            toggle.textContent = "🔇";
            playing = false;
        }
    } catch (err) {
        console.log("Không thể phát", err);
    }
});

// 🎵 Khi người dùng click lần đầu tiên vào màn hình
document.addEventListener('click', async () => {
    if (!firstClick) {
        firstClick = true;
        try {
            bgm.currentTime = 68;
            await bgm.play();
            toggle.textContent = "🔈";
            playing = true;
            console.log("Nhạc bắt đầu phát tự động!");
        } catch (err) {
            console.log("Không thể tự động phát nhạc:", err);
        }
    }
});

});