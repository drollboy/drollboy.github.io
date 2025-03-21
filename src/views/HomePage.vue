<template>
  <div id="home">
    <div class="container">
      <h1>😊开发中...</h1>
      <p>该页面开发者正在全力开发中，即将精彩上线！</p>
      <div class="progress-bar">
        <div class="progress"></div>
      </div>
      <router-link to="/chat" class="discussion-link">去讨论</router-link>
      <div class="copylight">@drollboy ✉️ <a class="copylight" href="mailto:drollboy@qq.com">drollboy@qq.com</a></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
#home {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  text-align: center;
}

h1 {
  color: #333;
  font-size: 3em;
  margin-bottom: 0.5em;
}

p {
  color: #666;
  font-size: 1.2em;
  margin-bottom: 2em;
}

.progress-bar {
  width: 300px;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin: 0 auto;
  overflow: hidden;
}

.progress {
  height: 100%;
  width: 70%;
  /* 可根据实际进度调整 */
  background-color: hsl(236, 28%, 32%);
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
}

.copylight {
  margin-top: 6em;
  font-size: 0.8em;
  color: #888;
}

.discussion-link {
  top: 2em;
  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
  text-decoration: none;
}

.discussion-link:hover {
  cursor: pointer;
}

.discussion-link::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 4px solid hsl(236, 32%, 26%);
  transform-origin: center;
  transform: scale(1);
}

.discussion-link:hover::before {
  transition: all 0.75s ease-in-out;
  transform-origin: center;
  transform: scale(1.75);
  opacity: 0;
}

</style>