/* =========================================================
   QUIZ//NEXUS
   INTERACTIVE QUIZ ENGINE
========================================================= */


/* =========================================================
   QUESTION DATABASE
========================================================= */

const questions = [

    {
        type: "single",
        category: "WEB",
        difficulty: "EASY",
        question:
            "Which HTML element is used to define the largest heading?",
        options: [
            "<h1>",
            "<head>",
            "<heading>",
            "<title>"
        ],
        answer: 0,
        hint: "Think about the heading hierarchy."
    },


    {
        type: "single",
        category: "JAVASCRIPT",
        difficulty: "EASY",
        question:
            "Which keyword creates a block-scoped variable in JavaScript?",
        options: [
            "var",
            "let",
            "define",
            "variable"
        ],
        answer: 1,
        hint: "It was introduced with ES6."
    },


    {
        type: "multi",
        category: "CSS",
        difficulty: "MEDIUM",
        question:
            "Which of these are valid CSS layout technologies?",
        options: [
            "Flexbox",
            "Grid",
            "Canvas",
            "Float"
        ],
        answer: [0, 1, 3],
        hint: "Select all valid layout approaches."
    },


    {
        type: "fill",
        category: "WEB",
        difficulty: "EASY",
        question:
            "Complete the statement: CSS stands for Cascading Style ____.",
        answer: "sheets",
        hint: "Type the missing word."
    },


    {
        type: "single",
        category: "JAVASCRIPT",
        difficulty: "MEDIUM",
        question:
            "Which method converts a JSON string into a JavaScript object?",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.object()"
        ],
        answer: 0,
        hint: "Think about parsing incoming data."
    },


    {
        type: "single",
        category: "WEB",
        difficulty: "MEDIUM",
        question:
            "Which HTTP method is commonly used to retrieve data from a server?",
        options: [
            "POST",
            "DELETE",
            "GET",
            "PATCH"
        ],
        answer: 2,
        hint: "It is the most common read operation."
    },


    {
        type: "multi",
        category: "JAVASCRIPT",
        difficulty: "HARD",
        question:
            "Which of the following can be used to handle asynchronous JavaScript operations?",
        options: [
            "Promises",
            "async / await",
            "setTimeout",
            "CSS Grid"
        ],
        answer: [0, 1, 2],
        hint: "Select all that relate to asynchronous execution."
    },


    {
        type: "single",
        category: "DOM",
        difficulty: "MEDIUM",
        question:
            "Which method selects an element using its CSS selector?",
        options: [
            "getElement()",
            "querySelector()",
            "selectCSS()",
            "findElement()"
        ],
        answer: 1,
        hint: "It accepts selectors like '#app' or '.card'."
    },


    {
        type: "fill",
        category: "JAVASCRIPT",
        difficulty: "EASY",
        question:
            "Complete the statement: JavaScript files normally use the ____ extension.",
        answer: "js",
        hint: "Three characters."
    },


    {
        type: "single",
        category: "WEB",
        difficulty: "MEDIUM",
        question:
            "Which CSS property is used to change the text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "foreground"
        ],
        answer: 2,
        hint: "The property has a very short name."
    }

];


/* =========================================================
   TIPS
========================================================= */

const tips = [

    "Trust your first instinct, but read the question carefully.",

    "Eliminate obviously incorrect options before choosing.",

    "For multi-select questions, every selected option matters.",

    "Don't spend too long on one question.",

    "Look for keywords that define exactly what is being asked.",

    "A short question can still contain an important detail."

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const questionNumber =
    document.getElementById("questionNumber");

const progressText =
    document.getElementById("progressText");

const progressFill =
    document.getElementById("progressFill");

const questionText =
    document.getElementById("questionText");

const questionType =
    document.getElementById("questionType");

const questionHint =
    document.getElementById("questionHint");

const difficulty =
    document.getElementById("difficulty");

const category =
    document.getElementById("category");

const answers =
    document.getElementById("answers");

const fillArea =
    document.getElementById("fillArea");

const fillInput =
    document.getElementById("fillInput");

const nextButton =
    document.getElementById("nextButton");

const nextText =
    document.getElementById("nextText");

const timer =
    document.getElementById("timer");

const timerFill =
    document.getElementById("timerFill");

const timerStatus =
    document.getElementById("timerStatus");

const streakDisplay =
    document.getElementById("streak");

const bestStreakDisplay =
    document.getElementById("bestStreak");

const accuracyDisplay =
    document.getElementById("accuracy");

const answeredDisplay =
    document.getElementById("answered");

const scoreDisplay =
    document.getElementById("score");

const tipDisplay =
    document.getElementById("tip");

const quizScreen =
    document.getElementById("quizScreen");

const hero =
    document.querySelector(".hero");

const resultScreen =
    document.getElementById("resultScreen");

const finalScore =
    document.getElementById("finalScore");

const finalAccuracy =
    document.getElementById("finalAccuracy");

const correctCount =
    document.getElementById("correctCount");

const wrongCount =
    document.getElementById("wrongCount");

const finalBestStreak =
    document.getElementById("finalBestStreak");

const finalQuestions =
    document.getElementById("finalQuestions");

const resultMessage =
    document.getElementById("resultMessage");

const reviewList =
    document.getElementById("reviewList");

const restartButton =
    document.getElementById("restartButton");


/* =========================================================
   STATE
========================================================= */

let currentQuestion = 0;

let selectedAnswers = [];

let score = 0;

let answered = 0;

let correct = 0;

let wrong = 0;

let streak = 0;

let bestStreak = 0;

let timeLeft = 20;

let timerInterval = null;

let questionResults = [];


/* =========================================================
   INITIALIZE
========================================================= */

document.getElementById(
    "totalQuestions"
).textContent = questions.length;


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    clearInterval(timerInterval);


    const question =
        questions[currentQuestion];


    selectedAnswers = [];


    /* ---------------------------------------------
       Number
    --------------------------------------------- */

    questionNumber.textContent =
        String(currentQuestion + 1)
            .padStart(2, "0");


    progressText.textContent =
        `${currentQuestion + 1} / ${questions.length}`;


    const progress =
        ((currentQuestion + 1) /
            questions.length) * 100;


    progressFill.style.width =
        `${progress}%`;


    /* ---------------------------------------------
       Question data
    --------------------------------------------- */

    questionText.textContent =
        question.question;


    difficulty.textContent =
        question.difficulty;


    category.textContent =
        question.category;


    questionHint.textContent =
        question.hint;


    /* ---------------------------------------------
       Type
    --------------------------------------------- */

    if (question.type === "single") {

        questionType.textContent =
            "SINGLE SELECT";

    }


    if (question.type === "multi") {

        questionType.textContent =
            "MULTI SELECT";

    }


    if (question.type === "fill") {

        questionType.textContent =
            "FILL IN THE BLANK";

    }


    /* ---------------------------------------------
       Reset answer areas
    --------------------------------------------- */

    answers.innerHTML = "";

    fillInput.value = "";

    fillArea.classList.remove("visible");


    /* ---------------------------------------------
       Render options
    --------------------------------------------- */

    if (
        question.type === "single" ||
        question.type === "multi"
    ) {

        renderOptions(question);

    }


    if (question.type === "fill") {

        fillArea.classList.add("visible");

        setTimeout(() => {

            fillInput.focus();

        }, 150);

    }


    /* ---------------------------------------------
       Button
    --------------------------------------------- */

    nextText.textContent =
        currentQuestion === questions.length - 1
            ? "FINISH SESSION"
            : "CONFIRM ANSWER";


    /* ---------------------------------------------
       Tip
    --------------------------------------------- */

    tipDisplay.textContent =
        tips[
            currentQuestion % tips.length
        ];


    /* ---------------------------------------------
       Animation
    --------------------------------------------- */

    const panel =
        document.querySelector(".question-panel");


    panel.classList.remove("transition");

    void panel.offsetWidth;

    panel.classList.add("transition");


    /* ---------------------------------------------
       Timer
    --------------------------------------------- */

    startTimer();


    updateStats();

}


/* =========================================================
   RENDER OPTIONS
========================================================= */

function renderOptions(question) {

    const letters = [
        "A",
        "B",
        "C",
        "D"
    ];


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.className =
                "answer";


            button.dataset.index =
                index;


            button.innerHTML = `

                <span class="answer-key">

                    ${letters[index]}

                </span>


                <span class="answer-text">

                    ${option}

                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(index);

                }
            );


            answers.appendChild(button);

        }
    );

}


/* =========================================================
   SELECT ANSWER
========================================================= */

function selectAnswer(index) {

    const question =
        questions[currentQuestion];


    if (question.type === "single") {

        selectedAnswers = [index];


        document
            .querySelectorAll(".answer")
            .forEach(button => {

                button.classList.remove(
                    "selected"
                );

            });


        const selected =
            document.querySelector(
                `.answer[data-index="${index}"]`
            );


        selected.classList.add("selected");

    }


    if (question.type === "multi") {

        if (
            selectedAnswers.includes(index)
        ) {

            selectedAnswers =
                selectedAnswers.filter(
                    item => item !== index
                );

        } else {

            selectedAnswers.push(index);

        }


        document
            .querySelectorAll(".answer")
            .forEach(button => {

                const buttonIndex =
                    Number(button.dataset.index);


                button.classList.toggle(
                    "selected",
                    selectedAnswers.includes(
                        buttonIndex
                    )
                );

            });

    }

}


/* =========================================================
   GET USER ANSWER
========================================================= */

function getUserAnswer() {

    const question =
        questions[currentQuestion];


    if (
        question.type === "single" ||
        question.type === "multi"
    ) {

        return selectedAnswers;

    }


    if (question.type === "fill") {

        return fillInput.value.trim();

    }

}


/* =========================================================
   CHECK ANSWER
========================================================= */

function checkAnswer(
    question,
    userAnswer
) {

    if (question.type === "single") {

        return (
            userAnswer.length === 1 &&
            userAnswer[0] === question.answer
        );

    }


    if (question.type === "multi") {

        const correctAnswer =
            [...question.answer].sort();

        const selected =
            [...userAnswer].sort();


        return (
            JSON.stringify(correctAnswer) ===
            JSON.stringify(selected)
        );

    }


    if (question.type === "fill") {

        return (
            userAnswer
                .toLowerCase()
                .trim() ===
            question.answer
                .toLowerCase()
                .trim()
        );

    }


    return false;

}


/* =========================================================
   CONFIRM ANSWER
========================================================= */

function confirmAnswer() {

    const question =
        questions[currentQuestion];


    const userAnswer =
        getUserAnswer();


    /* ---------------------------------------------
       Empty answer protection
    --------------------------------------------- */

    if (
        question.type === "fill" &&
        !userAnswer
    ) {

        showTemporaryMessage(
            "Enter an answer first."
        );

        return;

    }


    if (
        (
            question.type === "single" ||
            question.type === "multi"
        ) &&
        userAnswer.length === 0
    ) {

        showTemporaryMessage(
            "Select at least one option."
        );

        return;

    }


    clearInterval(timerInterval);


    const isCorrect =
        checkAnswer(
            question,
            userAnswer
        );


    /* ---------------------------------------------
       Record result
    --------------------------------------------- */

    answered++;


    if (isCorrect) {

        correct++;

        streak++;

        bestStreak =
            Math.max(
                bestStreak,
                streak
            );


        /*
            Score rewards both correctness
            and remaining time.
        */

        const timeBonus =
            Math.max(
                0,
                Math.floor(timeLeft / 2)
            );


        score +=
            100 + timeBonus;

    } else {

        wrong++;

        streak = 0;

    }


    questionResults.push({

        question:
            question.question,

        correct:
            isCorrect,

        userAnswer:
            userAnswer,

        correctAnswer:
            question.answer,

        type:
            question.type,

        options:
            question.options || []

    });


    /* ---------------------------------------------
       Show answer feedback
    --------------------------------------------- */

    showAnswerFeedback(
        question,
        isCorrect
    );


    updateStats();


    /*
        Small delay lets the user see feedback.
    */

    setTimeout(() => {

        moveToNextQuestion();

    }, 700);

}


/* =========================================================
   ANSWER FEEDBACK
========================================================= */

function showAnswerFeedback(
    question,
    isCorrect
) {

    if (
        question.type === "single" ||
        question.type === "multi"
    ) {

        document
            .querySelectorAll(".answer")
            .forEach(button => {

                button.classList.add(
                    "disabled"
                );


                const index =
                    Number(button.dataset.index);


                let isCorrectOption = false;


                if (
                    question.type === "single"
                ) {

                    isCorrectOption =
                        index === question.answer;

                } else {

                    isCorrectOption =
                        question.answer.includes(
                            index
                        );

                }


                if (isCorrectOption) {

                    button.classList.add(
                        "correct"
                    );

                }


                if (
                    selectedAnswers.includes(index) &&
                    !isCorrectOption
                ) {

                    button.classList.add(
                        "wrong"
                    );

                }

            });

    }


    if (isCorrect) {

        questionHint.textContent =
            "✓ Correct — nice work.";

    } else {

        questionHint.textContent =
            "✕ Not quite — keep going.";

    }

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function moveToNextQuestion() {

    currentQuestion++;


    if (
        currentQuestion >=
        questions.length
    ) {

        finishQuiz();

        return;

    }


    loadQuestion();

}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    timeLeft = 20;


    updateTimer();


    timerInterval =
        setInterval(() => {

            timeLeft--;

            updateTimer();


            if (timeLeft <= 0) {

                clearInterval(timerInterval);

                handleTimeUp();

            }

        }, 1000);

}


/* =========================================================
   UPDATE TIMER
========================================================= */

function updateTimer() {

    const seconds =
        String(timeLeft)
            .padStart(2, "0");


    timer.textContent =
        `00:${seconds}`;


    const width =
        (timeLeft / 20) * 100;


    timerFill.style.width =
        `${width}%`;


    timer.classList.remove(
        "expiring"
    );


    if (timeLeft <= 8) {

        timer.classList.add(
            "expiring"
        );

        timerFill.style.background =
            "var(--wrong)";

        timerStatus.textContent =
            "HURRY";

    } else if (timeLeft <= 13) {

        timerFill.style.background =
            "var(--warning)";

        timerStatus.textContent =
            "RUNNING";

    } else {

        timerFill.style.background =
            "var(--accent)";

        timerStatus.textContent =
            "ACTIVE";

    }

}


/* =========================================================
   TIME UP
========================================================= */

function handleTimeUp() {

    const question =
        questions[currentQuestion];


    answered++;

    wrong++;

    streak = 0;


    questionResults.push({

        question:
            question.question,

        correct: false,

        userAnswer:
            question.type === "fill"
                ? ""
                : [],

        correctAnswer:
            question.answer,

        type:
            question.type,

        options:
            question.options || []

    });


    updateStats();


    showTemporaryMessage(
        "Time's up."
    );


    setTimeout(() => {

        moveToNextQuestion();

    }, 700);

}


/* =========================================================
   UPDATE STATS
========================================================= */

function updateStats() {

    const accuracy =
        answered === 0
            ? 0
            : Math.round(
                (correct / answered) * 100
            );


    streakDisplay.textContent =
        streak;


    bestStreakDisplay.textContent =
        bestStreak;


    accuracyDisplay.textContent =
        `${accuracy}%`;


    answeredDisplay.textContent =
        answered;


    scoreDisplay.textContent =
        score;

}


/* =========================================================
   TEMPORARY MESSAGE
========================================================= */

function showTemporaryMessage(message) {

    const old =
        questionHint.textContent;


    questionHint.textContent =
        message;


    questionHint.style.color =
        "var(--warning)";


    setTimeout(() => {

        questionHint.textContent =
            old;

        questionHint.style.color =
            "";

    }, 1000);

}


/* =========================================================
   FINISH QUIZ
========================================================= */

function finishQuiz() {

    clearInterval(timerInterval);


    quizScreen.classList.add(
        "hidden"
    );


    hero.classList.add(
        "hidden"
    );


    resultScreen.classList.add(
        "active"
    );


    const accuracy =
        Math.round(
            (correct / questions.length) * 100
        );


    /* ---------------------------------------------
       Final values
    --------------------------------------------- */

    finalScore.textContent =
        score;


    finalAccuracy.textContent =
        `${accuracy}%`;


    correctCount.textContent =
        correct;


    wrongCount.textContent =
        wrong;


    finalBestStreak.textContent =
        bestStreak;


    finalQuestions.textContent =
        questions.length;


    /*
        Dynamic score ring.
    */

    const ring =
        document.querySelector(
            ".score-ring"
        );


    ring.style.background =
        `conic-gradient(
            var(--accent)
            ${accuracy * 3.6}deg,
            rgba(255,255,255,.06)
            ${accuracy * 3.6}deg
        )`;


    /* ---------------------------------------------
       Result message
    --------------------------------------------- */

    if (accuracy >= 90) {

        resultMessage.textContent =
            "Exceptional session. Your accuracy stayed sharp.";

    } else if (accuracy >= 70) {

        resultMessage.textContent =
            "Strong session. A little more practice can push it further.";

    } else if (accuracy >= 50) {

        resultMessage.textContent =
            "Solid attempt. Review the missed questions and try again.";

    } else {

        resultMessage.textContent =
            "Every attempt is data. Review, retry and improve.";

    }


    renderReview();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   RENDER REVIEW
========================================================= */

function renderReview() {

    reviewList.innerHTML = "";


    questionResults.forEach(
        (item, index) => {

            const element =
                document.createElement("div");


            element.className =
                "review-item";


            let userAnswerText =
                formatAnswer(
                    item
                );


            let correctAnswerText =
                formatCorrectAnswer(
                    item
                );


            element.innerHTML = `

                <div class="review-item-top">

                    <div class="review-question">

                        ${index + 1}.
                        ${escapeHTML(
                            item.question
                        )}

                    </div>


                    <span
                        class="
                            review-status
                            ${item.correct
                                ? "correct"
                                : "wrong"
                            }
                        "
                    >

                        ${item.correct
                            ? "CORRECT"
                            : "INCORRECT"
                        }

                    </span>

                </div>


                <div class="review-answer">

                    <span>YOUR ANSWER:</span>

                    ${escapeHTML(
                        userAnswerText
                    )}

                </div>


                ${
                    item.correct
                        ? ""
                        : `
                            <div class="review-answer">

                                <span>
                                    CORRECT:
                                </span>

                                ${escapeHTML(
                                    correctAnswerText
                                )}

                            </div>
                        `
                }

            `;


            reviewList.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   FORMAT ANSWER
========================================================= */

function formatAnswer(item) {

    if (item.type === "fill") {

        return item.userAnswer ||
            "No answer";

    }


    if (
        !item.userAnswer ||
        item.userAnswer.length === 0
    ) {

        return "No answer";

    }


    return item.userAnswer
        .map(index => item.options[index])
        .join(", ");

}


/* =========================================================
   FORMAT CORRECT ANSWER
========================================================= */

function formatCorrectAnswer(item) {

    if (item.type === "fill") {

        return item.correctAnswer;

    }


    if (item.type === "single") {

        return item.options[
            item.correctAnswer
        ];

    }


    return item.correctAnswer
        .map(index => item.options[index])
        .join(", ");

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* =========================================================
   RESTART
========================================================= */

function restartQuiz() {

    currentQuestion = 0;

    selectedAnswers = [];

    score = 0;

    answered = 0;

    correct = 0;

    wrong = 0;

    streak = 0;

    bestStreak = 0;

    timeLeft = 20;

    questionResults = [];


    resultScreen.classList.remove(
        "active"
    );


    quizScreen.classList.remove(
        "hidden"
    );


    hero.classList.remove(
        "hidden"
    );


    updateStats();

    loadQuestion();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Number keys 1-4
            select options.
        */

        if (
            ["1", "2", "3", "4"]
                .includes(event.key)
        ) {

            const index =
                Number(event.key) - 1;


            const question =
                questions[currentQuestion];


            if (
                question.type === "single" ||
                question.type === "multi"
            ) {

                if (
                    question.options[index]
                    !== undefined
                ) {

                    selectAnswer(index);

                }

            }

        }


        /*
            Enter confirms answer.
        */

        if (
            event.key === "Enter" &&
            document.activeElement !== fillInput
        ) {

            confirmAnswer();

        }

    }
);


/* =========================================================
   BUTTON EVENTS
========================================================= */

nextButton.addEventListener(
    "click",
    confirmAnswer
);


restartButton.addEventListener(
    "click",
    restartQuiz
);


/* =========================================================
   ENTER FROM FILL INPUT
========================================================= */

fillInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            event.preventDefault();

            confirmAnswer();

        }

    }
);


/* =========================================================
   START
========================================================= */

loadQuestion();