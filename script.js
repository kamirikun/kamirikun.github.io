const questions = [
  { text: "朝起きて、早い時間にブロスタを開くことがある？", icon: "🌅" },
  { text: "ショップや無料報酬をほぼ毎日確認している？", icon: "🎁" },
  { text: "「あと1勝だけ」と思って続けてしまうことがある？", icon: "🏆" },
  { text: "学校や外出中にも、試合のことを考えることがある？", icon: "💭" },
  { text: "新キャラやアップデート情報をすぐ確認する？", icon: "⚡" },
  { text: "連敗すると、勝つまでやめにくくなることがある？", icon: "🔥" },
  { text: "友達との会話でブロスタの話題がかなり多い？", icon: "💬" },
  { text: "使っていないキャラの性能や構成にも詳しい？", icon: "🧠" },
  { text: "予定より長くプレイしてしまうことがある？", icon: "⏰" },
  { text: "トロフィーやランクが下がると強く気になる？", icon: "📉" },
  { text: "ブロスタを数日できないと、かなり物足りなく感じる？", icon: "📵" },
  { text: "自分は周りよりブロスタをやり込んでいると思う？", icon: "👑" }
];

const results = [
  {
    max: 24,
    title: "ゆるっとエンジョイ勢",
    description: "ブロスタを生活の一部として無理なく楽しめているタイプ。気分転換として上手に付き合えていそうです。",
    style: "マイペース型",
    recommendation: "好きなモードを気楽に"
  },
  {
    max: 49,
    title: "しっかりブロスタ好き",
    description: "日常的に遊びながら、イベントや育成も楽しむタイプ。かなり好きですが、まだ切り替えもできていそうです。",
    style: "バランス型",
    recommendation: "目標時間を決める"
  },
  {
    max: 74,
    title: "かなりのガチ勢",
    description: "ブロスタへの熱量はかなり高め。知識やプレイ量は強みですが、連敗時や夜遅い時間は一度休むのがおすすめです。",
    style: "やり込み型",
    recommendation: "連敗したら小休憩"
  },
  {
    max: 100,
    title: "ブロスタが生活の中心!?",
    description: "ブロスタ愛は最上級。ジョーク診断では最高クラスです。ただし、睡眠や勉強を削っているならプレイ時間を見直しましょう。",
    style: "超集中型",
    recommendation: "先に予定を終わらせる"
  }
];

const screens = {
  start: document.querySelector("#startScreen"),
  quiz: document.querySelector("#quizScreen"),
  result: document.querySelector("#resultScreen")
};

const startButton = document.querySelector("#startButton");
const backButton = document.querySelector("#backButton");
const answerButtons = [...document.querySelectorAll(".answer-button")];
const questionCounter = document.querySelector("#questionCounter");
const questionText = document.querySelector("#questionText");
const questionIcon = document.querySelector("#questionIcon");
const progressBar = document.querySelector("#progressBar");
const resultTitle = document.querySelector("#resultTitle");
const resultPercent = document.querySelector("#resultPercent");
const resultDescription = document.querySelector("#resultDescription");
const resultBadge = document.querySelector("#resultBadge");
const playStyle = document.querySelector("#playStyle");
const recommendation = document.querySelector("#recommendation");
const scoreRing = document.querySelector(".score-ring");
const retryButton = document.querySelector("#retryButton");
const shareButton = document.querySelector("#shareButton");
const copyButton = document.querySelector("#copyButton");
const shareStatus = document.querySelector("#shareStatus");
const soundButton = document.querySelector("#soundButton");

let currentQuestion = 0;
let answers = [];
let finalPercent = 0;
let finalResult = null;
let soundEnabled = false;

document.querySelector("#year").textContent = new Date().getFullYear();

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startQuiz() {
  currentQuestion = 0;
  answers = [];
  showScreen("quiz");
  renderQuestion();
  playTone(480);
}

function renderQuestion() {
  const question = questions[currentQuestion];
  questionCounter.textContent = `QUESTION ${currentQuestion + 1} / ${questions.length}`;
  questionText.textContent = question.text;
  questionIcon.textContent = question.icon;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  backButton.disabled = currentQuestion === 0;
  setTimeout(() => questionText.focus(), 50);
}

function answerQuestion(score) {
  answers[currentQuestion] = score;
  playTone(610);

  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (currentQuestion === 0) return;
  currentQuestion -= 1;
  renderQuestion();
}

function showResult() {
  const total = answers.reduce((sum, value) => sum + value, 0);
  const maximum = questions.length * 3;
  finalPercent = Math.round((total / maximum) * 100);
  finalResult = results.find(result => finalPercent <= result.max) || results.at(-1);

  resultTitle.textContent = finalResult.title;
  resultDescription.textContent = finalResult.description;
  playStyle.textContent = finalResult.style;
  recommendation.textContent = finalResult.recommendation;
  resultBadge.textContent = finalPercent >= 75 ? "LEGEND RESULT" : "YOUR RESULT";
  scoreRing.style.setProperty("--score", `${finalPercent}%`);
  animateNumber(resultPercent, finalPercent);
  shareStatus.textContent = "";

  showScreen("result");
  playTone(760);
}

function animateNumber(element, target) {
  const start = performance.now();
  const duration = 750;

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(target * eased)}%`;
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function getShareText() {
  return `【ブロスタ依存度診断】\n私のブロスタ熱は${finalPercent}%！\n結果：${finalResult.title}\n\nあなたも診断してみよう！`;
}

async function shareResult() {
  const data = { title: "ブロスタ依存度診断", text: getShareText(), url: location.href };

  if (navigator.share) {
    try {
      await navigator.share(data);
      shareStatus.textContent = "共有メニューを開きました。";
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  await copyResult();
}

async function copyResult() {
  try {
    await navigator.clipboard.writeText(`${getShareText()}\n${location.href}`);
    shareStatus.textContent = "結果をコピーしました。";
  } catch {
    shareStatus.textContent = "コピーできませんでした。ブラウザの権限を確認してください。";
  }
}

function resetQuiz() {
  showScreen("start");
  currentQuestion = 0;
  answers = [];
  finalPercent = 0;
  finalResult = null;
}

function playTone(frequency) {
  if (!soundEnabled) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "square";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.035, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.08);
  oscillator.addEventListener("ended", () => context.close());
}

startButton.addEventListener("click", startQuiz);
backButton.addEventListener("click", goBack);
answerButtons.forEach(button => {
  button.addEventListener("click", () => answerQuestion(Number(button.dataset.score)));
});
retryButton.addEventListener("click", resetQuiz);
shareButton.addEventListener("click", shareResult);
copyButton.addEventListener("click", copyResult);
soundButton.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
  if (soundEnabled) playTone(520);
});
