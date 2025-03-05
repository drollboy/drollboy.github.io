const canvas = document.getElementById('visualization');
const ctx = canvas.getContext('2d');
let array = [];
let sorting = false;
let currentAlgorithm = null;
let speed = 60;

// 初始化画布尺寸
canvas.width = 800;
canvas.height = 400;

function generateNewArray() {
  array = Array.from({length: 40}, () => Math.floor(Math.random() * 380) + 20);
  drawArray();
}

function drawArray(highlight = []) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const barWidth = canvas.width / array.length;
  
  array.forEach((value, i) => {
    ctx.fillStyle = highlight.includes(i) ? '#ff0000' : '#4CAF50';
    ctx.beginPath();
    ctx.roundRect(i * barWidth, canvas.height - value, barWidth - 1, value, [4,4,0,0]);
    ctx.fill();
  });
}

async function initSort(algorithm) {
  if (sorting) return;
  sorting = true;
  const startTime = performance.now();
  document.querySelectorAll('#controls button, #controls input').forEach(el => el.disabled = true);
  currentAlgorithm = algorithm;
  
  const algorithms = {
    bubble: bubbleSort,
    quick: quickSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
    shell: shellSort,
    heap: heapSort
  };
  
  await algorithms[algorithm](array);
  drawArray();
  document.querySelectorAll('#controls button, #controls input').forEach(el => el.disabled = false);
  const endTime = performance.now();
  const duration = (endTime - startTime) / 1000;
  document.getElementById('timeDisplay').textContent = `排序时间: ${duration.toFixed(2)}秒`;
  sorting = false;
}

// 冒泡排序实现
async function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        drawArray([j, j + 1]);
        await new Promise(resolve => setTimeout(resolve, speed));
      }
    }
  }
  drawArray();
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;
  const pivot = arr[Math.floor((left + right) / 2)];
  let i = left, j = right;
  
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      drawArray([i, j]);
      await new Promise(resolve => setTimeout(resolve, speed));
      i++;
      j--;
    }
  }
  await Promise.all([
    quickSort(arr, left, j),
    quickSort(arr, i, right)
  ]);
}

async function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    drawArray([i, minIndex]);
    await new Promise(resolve => setTimeout(resolve, speed));
  }
}

async function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      drawArray([j, j - 1]);
      await new Promise(resolve => setTimeout(resolve, speed));
      j--;
    }
  }
}

async function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(arr, start, mid);
  await mergeSort(arr, mid + 1, end);
  
  let i = start, j = mid + 1;
  const temp = [];
  while (i <= mid && j <= end) {
    if (arr[i] <= arr[j]) temp.push(arr[i++]);
    else temp.push(arr[j++]);
  }
  while (i <= mid) temp.push(arr[i++]);
  while (j <= end) temp.push(arr[j++]);
  
  for (let k = 0; k < temp.length; k++) {
    arr[start + k] = temp[k];
    drawArray([start + k]);
    await new Promise(resolve => setTimeout(resolve, speed));
  }
}

// 添加速度控制事件
const speedControl = document.createElement('input');
speedControl.type = 'range';
speedControl.min = 1;
speedControl.max = 100;
speedControl.value = speed;
speedControl.oninput = (e) => speed = 101 - e.target.value;
document.querySelector('#controls').appendChild(speedControl);

// 添加默认初始化
function setAlgorithm(algorithm) {
  document.querySelectorAll('#controls button').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`button[onclick*="${algorithm}"]`).classList.add('active');
  currentAlgorithm = algorithm;
  generateNewArray();
}

async function shellSort(arr) {
  let n = arr.length;
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
        drawArray([j, j - gap]);
        await new Promise(resolve => setTimeout(resolve, speed));
      }
      arr[j] = temp;
      drawArray([j]);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  }
}

async function heapSort(arr) {
  let n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    drawArray([0, i]);
    await new Promise(resolve => setTimeout(resolve, speed));
    await heapify(arr, i, 0);
  }
}

async function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) {
    largest = l;
  }

  if (r < n && arr[r] > arr[largest]) {
    largest = r;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    drawArray([i, largest]);
    await new Promise(resolve => setTimeout(resolve, speed));
    await heapify(arr, n, largest);
  }
}

window.onload = () => {
  generateNewArray();
  setAlgorithm('bubble');
};