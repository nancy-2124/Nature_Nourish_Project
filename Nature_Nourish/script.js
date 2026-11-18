/* =========================
   QUIZ DATA
========================= */

const levels = {
    1: [
        {
            question: "Which food has lowest environmental impact?",
            options: ["Beef", "Vegetables", "Snacks"],
            answer: 1
        },
        {
            question: "Which reduces waste?",
            options: ["Overbuy food", "Store food", "Throw leftovers"],
            answer: 1
        },
        {
            question: "Best for planet?",
            options: ["Local foods", "Packaged food", "Frozen junk"],
            answer: 0
        }
    ],

    2: [
        {
            question: "Most sustainable diet?",
            options: ["Plant-based", "Fast food", "Meat-heavy"],
            answer: 0
        },
        {
            question: "Best farming?",
            options: ["Organic", "Chemical-heavy", "Monocropping"],
            answer: 0
        },
        {
            question: "Reduces carbon footprint?",
            options: ["Walking", "Car", "Burning waste"],
            answer: 0
        }
    ],

    3: [
        {
            question: "Uses MOST water?",
            options: ["Chicken", "Almonds", "Beef"],
            answer: 2
        },
        {
            question: "Sustainable fishing?",
            options: ["Trawling", "Spearfishing", "Dynamite"],
            answer: 1
        },
        {
            question: "Renewable energy?",
            options: ["Coal", "Wind", "Diesel"],
            answer: 1
        }
    ]
};


/* =========================
   QUIZ VARIABLES
========================= */

let currentLevel = 1;
let quizData = [];
let currentQuestion = 0;
let score = 0;


/* =========================
   DOM ELEMENTS
========================= */

const levelSelectBox = document.getElementById("levelSelectBox");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");

const questionEl = document.getElementById("question");
const levelTitle = document.getElementById("levelTitle");
const optionsEl = document.getElementById("options");

const nextBtn = document.getElementById("nextBtn");

const scoreEl = document.getElementById("score");
const badgeMsg = document.getElementById("badgeMsg");

const level2Btn = document.getElementById("level2Btn");
const level3Btn = document.getElementById("level3Btn");


/* =========================
   LOAD UNLOCKED LEVELS
========================= */

window.addEventListener("load", () => {

    const unlockedLevel =
        Number(localStorage.getItem("unlockedLevel")) || 1;

    if (unlockedLevel >= 2) {
        unlockLevel(2);
    }

    if (unlockedLevel >= 3) {
        unlockLevel(3);
    }
});


/* =========================
   UNLOCK LEVEL
========================= */

function unlockLevel(level) {

    if (level === 2) {

        level2Btn.disabled = false;

        level2Btn.classList.remove("locked");
        level2Btn.classList.add("unlocked");

        level2Btn.textContent = "Level 2";
    }

    if (level === 3) {

        level3Btn.disabled = false;

        level3Btn.classList.remove("locked");
        level3Btn.classList.add("unlocked");

        level3Btn.textContent = "Level 3";
    }
}


/* =========================
   START QUIZ
========================= */

function startLevel(level) {

    currentLevel = level;
    quizData = levels[level];

    currentQuestion = 0;
    score = 0;

    levelSelectBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    resultBox.classList.add("hidden");

    levelTitle.textContent = `Level ${level} Quiz`;

    loadQuestion();
}


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

    const question = quizData[currentQuestion];

    questionEl.textContent = question.question;

    optionsEl.innerHTML = "";

    nextBtn.classList.add("hidden");

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("optionBtn");

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        optionsEl.appendChild(button);
    });
}


/* =========================
   CHECK ANSWER
========================= */

function checkAnswer(selected, selectedButton) {

    const correctAnswer =
        quizData[currentQuestion].answer;

    const optionButtons =
        optionsEl.querySelectorAll("button");

    // Prevent selecting another option
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    if (selected === correctAnswer) {

        score++;

        selectedButton.textContent += " ✅";

    } else {

        selectedButton.textContent += " ❌";

        optionButtons[correctAnswer].textContent += " ✅";
    }

    nextBtn.classList.remove("hidden");
}


/* =========================
   NEXT QUESTION
========================= */

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        loadQuestion();

    } else {

        showResult();
    }
});


/* =========================
   SHOW RESULT
========================= */

function showResult() {

    quizBox.classList.add("hidden");

    resultBox.classList.remove("hidden");

    scoreEl.textContent =
        `${score} / ${quizData.length}`;


    // Badge
    if (score === quizData.length) {

        badgeMsg.textContent =
            "🏅 GOLD! Perfect!";

    } else if (score >= 2) {

        badgeMsg.textContent =
            "🥈 SILVER! Good job!";

    } else {

        badgeMsg.textContent =
            "🥉 BRONZE! Keep trying!";
    }


    // Unlock next level
    if (score >= 2) {

        const nextLevel = currentLevel + 1;

        if (nextLevel <= 3) {

            unlockLevel(nextLevel);

            localStorage.setItem(
                "unlockedLevel",
                nextLevel
            );
        }
    }
}


/* =========================
   GO BACK TO LEVELS
========================= */

function goBack() {

    resultBox.classList.add("hidden");

    levelSelectBox.classList.remove("hidden");
}


/* =========================
   RECIPE TOGGLE
========================= */

function toggleRecipe(element) {

    const details =
        element.nextElementSibling;

    if (details.style.display === "block") {

        details.style.display = "none";

    } else {

        details.style.display = "block";
    }
}


/* =========================
   FOOD IMPACT CALCULATOR
========================= */

function calculateImpact() {

    const food =
        document.getElementById("foodSelect").value;

    const result =
        document.getElementById("impactResult");


    if (!food) {

        result.textContent =
            "Please select a food item.";

        return;
    }


    if (food === "low") {

        result.textContent =
            "Low environmental impact 🌱";

    } else if (food === "medium") {

        result.textContent =
            "Medium environmental impact ⚖️";

    } else {

        result.textContent =
            "High environmental impact ❗";
    }
}