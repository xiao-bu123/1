// 夜间模式切换
let toggle = document.getElementById("modeToggle");
if (toggle) {
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", toggle.checked);
  });
}

// 图片放大效果（只对内容区生效）
document.querySelectorAll(".content-section img").forEach(img => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "img-overlay";

    let bigImg = document.createElement("img");
    bigImg.src = img.src;
    bigImg.className = "img-big";

    let closeBtn = document.createElement("div");
    closeBtn.innerHTML = "&times;";
    closeBtn.className = "img-close";

    overlay.appendChild(bigImg);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // 点击遮罩层或关闭按钮退出
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target === closeBtn) overlay.remove();
    });
  });
});
