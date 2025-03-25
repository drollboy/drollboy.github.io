<template>
  <div class="hero-section">
    <!-- 背景特效 -->
    <div class="particles-background"></div>
    <!-- 内容包装 -->
    <div class="content-wrapper">
      <!-- 头像 -->
      <transition name="fade-slide" appear>
        <div class="avatar-wrapper">
          <img src="@/assets/avatar.jpg" alt="Avatar" class="avatar">
        </div>
      </transition>
      <!-- 主标题淡入滑动效果 -->
      <transition name="fade-slide" appear>
        <h1 class="main-title">
          <span class="gradient-text">浅影</span>
          <span class="name-divider">|</span>
          <span class="en-name">drollboy</span>
        </h1>
      </transition>
      <!-- 诗意文案淡入效果 -->
      <transition name="fade-in" appear>
        <div class="poetic-text">
          <p>于 <span class="highlight">赛博星河</span> 间徜徉的</p>
          <p class="typing-effect">
            <span v-for="(char, index) in displayedText" :key="index">{{ char }}</span>
          </p>
        </div>
      </transition>
      <!-- 动态标语淡入淡出切换效果 -->
      <div class="dynamic-slogan">
        <transition name="fade-switch" mode="out-in">
          <p class="slogan-item" :key="currentSlogan">{{ slogans[currentSlogan] }}</p>
        </transition>
      </div>
      <!-- 联系邮箱弹跳进入效果 -->
      <div class="contact-bubble">
        <transition name="bounce" appear>
          <a href="mailto:drollboy@qq.com" class="email-link"> 
            <i class="fa-solid fa-envelope"></i> drollboy@qq.com 
          </a>
        </transition>
      </div>
    </div>
    <!-- 添加网站链接 -->
    <div class="website-link">
      avatar's site: 
      <a href="https://doet.top" target="_blank">doet.top</a>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  // 引入字体图标库
  import "font-awesome/css/font-awesome.min.css"; 

  const slogans = [
    "代码化作诗行，绘就数字绮梦",
    "在比特浪潮中，奏响诗意乐章",
    "雕琢前端代码，镌刻浪漫韵律",
    "穿梭 0 与 1，寻觅数字浪漫"
  ];
  const currentSlogan = ref(0);
  const typingText = "代码幻梦编织者";
  const displayedText = ref('');
  let index = 0;

  onMounted(() => {
    // 每 4 秒切换一次标语
    setInterval(() => {
      currentSlogan.value = (currentSlogan.value + 1) % slogans.length;
    }, 4000);

    // 打字机效果
    const typingInterval = setInterval(() => {
      if (index < typingText.length) {
        displayedText.value += typingText[index];
        index++;
      } else {
        index = 0;
        displayedText.value = '';
      }
    }, 300); // 每个字符显示间隔 150 毫秒
  });
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* 调整背景渐变颜色，增加对比度 */
  background: linear-gradient(135deg, #a7ffeb, #40c4ff, #00b0ff);
}

.particles-background {
  position: absolute;
  inset: 0;
  /* 增加粒子背景密度 */
  background: radial-gradient(circle, rgba(0, 0, 0, 0.1) 5%, transparent 100%);
  /* 加快粒子背景动画速度 */
  animation: particles-move 5s linear infinite;
}

@keyframes particles-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}

.avatar-wrapper {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.1);
}

.main-title {
  font-size: 4rem;
  margin-bottom: 2rem;
  font-family: 'Playfair Display', serif; /* 修改字体 */
  text-align: center;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  color: #2c3e50; /* 修改颜色 */
}

.gradient-text {
  background: linear-gradient(135deg, #29b6f6, #4fc3f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* 让渐变文字有闪烁效果 */
  animation: gradient-shine 3s ease-in-out infinite alternate;
}

@keyframes gradient-shine {
  from {
    filter: brightness(0.5);
  }
  to {
    filter: brightness(1);
  }
}

.name-divider {
  margin: 0 1.5rem;
  color: #888;
}

.en-name {
  font-family: 'Playfair Display', serif; /* 修改字体 */
  font-size: 2rem;
  color: #2c3e50; /* 修改颜色 */
  letter-spacing: 0.1em;
}

.poetic-text {
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'ZCOOL QingKe HuangYou', cursive;
  color: #333;
}

.highlight {
  color: #ff5722;
  /* text-decoration: underline wavy; */
  /* 给高亮文字添加光晕效果 */
  text-shadow: 0 0 15px rgba(255, 87, 34, 0.5);
}

.typing-effect {
  font-size: 2rem;
  margin-top: 1rem;
  display: inline-block;
  border-right: 3px solid #333;
  animation: blink-caret 0.75s step-end infinite;
  overflow: hidden;
  min-height: 2.5rem;
}

@keyframes blink-caret {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: #333;
  }
}

.dynamic-slogan {
  font-size: 1.4rem;
  color: #333;
  text-align: center;
  margin: 2rem 0;
}

.contact-bubble {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.email-link {
  padding: 0.8rem 1.5rem; /* 减小内边距 */
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.08); /* 降低背景透明度 */
  backdrop-filter: blur(10px); /* 减小模糊程度 */
  transition: all 0.3s ease;
  color: #666; /* 调整文字颜色 */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem; /* 减小字体大小 */
}

.email-link:hover {
  background: rgba(0, 0, 0, 0.12);
  color: #666;
  transform: scale(1.02); /* 减小放大比例 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* 减小阴影强度 */
}

/* 动画部分 */
.fade-slide-enter-active {
  transition: all 1.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.fade-in-enter-active {
  transition: opacity 1s ease;
}
.fade-in-enter-from {
  opacity: 0;
}

.fade-switch-enter-active,
.fade-switch-leave-active {
  transition: all 1s ease;
}
.fade-switch-enter-from,
.fade-switch-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.bounce-enter-active {
  animation: bounce-in 0.9s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
.website-link {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.website-link a {
  color: #333;
  text-decoration: none;
}

.website-link a:hover {
  color: #ff5722;
}
</style>
