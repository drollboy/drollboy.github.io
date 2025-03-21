<template>
  <div class="container">
    <div class="user-header">
      <span>你的名字：{{ userName }}</span>
      <button @click="openEditNameModal" class="edit-name-button">
        <i class="fas fa-pencil-alt"></i>
      </button>
    </div>
    <!-- 新增：修改用户名的弹窗 -->
    <div v-if="isEditNameModalVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditNameModal">
          <i class="fas fa-times"></i>
        </span>
        <h2>修改用户名</h2>
        <input v-model="newUserName" placeholder="输入新的用户名" @keyup.enter="saveUserName">
        <button @click="saveUserName">保存</button>
      </div>
    </div>
    <div class="msgs-list">
      <div v-for="message in messages" :key="message.id"
        :class="{ 'msg-item': true, 'self-msg': message.senderId === userId }">
        <div class="msg-item-content">
          <div class="msg-info">
            <span v-if="message.senderId !== userId">{{ message.senderName }}</span>&nbsp;
            <span>{{ message.senderTime }}</span>
          </div>
          <p class="msg-text">{{ message.text }}</p>
        </div>
      </div>
    </div>
    <div class="msg-input">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息">
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import io from 'socket.io-client';
const socket = io('http://120.79.166.48:3000');

// 生成随机 ID
const generateRandomId = () => {
  return Math.random().toString(36).slice(2, 11); // 使用 slice 替代 substr
};
// 生成随机用户名
const generateRandomName = () => {
  return `用户${Math.floor(Math.random() * 1000)}`;
};

// 新增：初始化用户信息
const userId = ref(localStorage.getItem('userId') || generateRandomId());
const userName = ref(localStorage.getItem('userName') || generateRandomName());
const isEditNameModalVisible = ref(false);
const newUserName = ref('');

// 保存用户信息到 localStorage
const saveUserInfo = () => {
  localStorage.setItem('userId', userId.value);
  localStorage.setItem('userName', userName.value);
};

// 打开修改用户名弹窗
const openEditNameModal = () => {
  isEditNameModalVisible.value = true;
  newUserName.value = userName.value;
};

// 关闭修改用户名弹窗
const closeEditNameModal = () => {
  isEditNameModalVisible.value = false;
};

// 保存新的用户名
const saveUserName = () => {
  if (newUserName.value) {
    userName.value = newUserName.value;
    saveUserInfo();
    closeEditNameModal();
  }
};

// 接收到消息滚动到最底部
const scrollToBottom = () => {
  const msgsList = document.querySelector('.msgs-list');
  msgsList.scrollTop = msgsList.scrollHeight - msgsList.clientHeight;
};

onMounted(() => {
  saveUserInfo();
  socket.on('connect', () => {
    console.log('Connected to server');
    socket.on('allMessages', (messageList) => {
      messages.value = messageList;
      nextTick(() => {
        scrollToBottom(); 
      })
    });
  });
  socket.on('message', (message) => {
    messages.value.push(message);
    nextTick(() => {
      scrollToBottom();
    })
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});

const messages = ref([]);
const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    const message = {
      id: Date.now(),
      text: newMessage.value,
      senderId: userId.value,
      senderName: userName.value,
      senderTime: new Date().toLocaleTimeString(),
      senderDateTime: new Date().toLocaleString(),
    };
    socket.emit('message', message);
    newMessage.value = '';
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
}

.edit-name-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
}

.edit-name-button:hover {
  color: #007bff;
}

.msgs-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f3eaea;
  scroll-behavior: smooth;
}

.msg-item {
  /* 独占一行，宽度自适应 */
  display: flex;
  margin-bottom: 10px;
}
.msg-item-content {
  max-width: 80%;
}
/* 自己的消息靠右显示 */
.msg-item.self-msg {
  text-align: right;
  flex-direction: row-reverse;
}
.msg-item.self-msg .msg-text {
  text-align: left;
  background-color: #a4e4aa;
}
.msg-info {
  font-size: 14px;
  color: #888;
  margin-bottom: 4px;
}

.msg-text {
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 4px;
}

.msg-input {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
}

.msg-input input {
  height: 40px;
  text-indent: 10px;
  flex: 1;
  border: none;
  outline: none;
  border-radius: 6px;
}

.msg-input button {
  height: 40px;
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 6px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  border-radius: 6px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* 添加阴影效果 */
}

.modal-content h2 {
  margin-top: 0;
  color: #333;
  text-align: center;
  /* 标题居中 */
}

.modal-content input {
  width: 100%;
  height: 35px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-indent: 10px;
  box-sizing: border-box;
  /* 确保内边距和边框包含在宽度内 */
}

.modal-content button {
  width: 100%;
  height: 35px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #0056b3;
  /* 鼠标悬停时改变按钮背景颜色 */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>