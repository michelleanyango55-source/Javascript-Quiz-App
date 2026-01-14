const questions = [
    {
        q: "Which company developed JavaScript?",
        options: ["Netscape", "Google", "Microsoft", "Apple"],
        answer: 0
    },
    {
        q: "Which sign is used for jQuery?",
        options: ["&", "!", "$", "%"],
        answer: 2
    },
    {
        q: "Which HTML tag is used for internal CSS?",
        options: ["<script>", "<style>", "<css>", "<link>"],
        answer: 1
    }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

const questionEl = document.getElementById("question-text");
const optionsEl = document.getElementById("answer-options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("time-left");
const scoreEl = document.getElementById("current-score");

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    resetState();
    let qData = questions[currentIndex];
    questionEl.innerText = `${currentIndex + 1}. ${qData.q}`;

    qData.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(btn, index);
        optionsEl.appendChild(btn);
    });
    startTimer();
}

function resetState() {
    nextBtn.classList.add("hidden");
    optionsEl.innerHTML = "";
    clearInterval(timerInterval);
    timeLeft = 15;
    timerEl.innerText = timeLeft;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoDisable(); // Time's up!
        }
    }, 1000);
}

function selectAnswer(btn, index) {
    clearInterval(timerInterval);
    const correctIdx = questions[currentIndex].answer;

    if (index === correctIdx) {
        btn.classList.add("correct");
        score++;
        scoreEl.innerText = score;
    } else {
        btn.classList.add("wrong");
        optionsEl.children[correctIdx].classList.add("correct");
    }

    Array.from(optionsEl.children).forEach(b => b.disabled = true);
    nextBtn.classList.remove("hidden");
}

function autoDisable() {
    const correctIdx = questions[currentIndex].answer;
    optionsEl.children[correctIdx].classList.add("correct");
    Array.from(optionsEl.children).forEach(b => b.disabled = true);
    nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
};

function showResults() {
    document.getElementById("quiz-content").classList.add("hidden");
    nextBtn.classList.add("hidden");
    const resultScreen = document.getElementById("result-screen");
    resultScreen.classList.remove("hidden");
    document.getElementById("final-stat").innerText = `Final Score: ${score} / ${questions.length}`;
}

startQuiz();
