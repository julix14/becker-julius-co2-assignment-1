const questions = [
  {
    question: "AI automation can lead to job displacement?",
    answer: ["True", "False"],
    correctAnswer: "true",
    questionType: "trueFalse",
  },
  {
    question: "Which of the following is a benefit of AI?",
    answer: [
      "Enhanced efficiency and productivity",
      "Increased job opportunities",
      "Decreased need for human involvement",
      "Higher risk of security breaches",
    ],
    correctAnswer: "Enhanced efficiency and productivity",
    questionType: "multipleChoice",
  },
  {
    question: "What are some ethical concerns related to AI?",
    answer: [
      "Bias and fairness",
      "Automation of all tasks",
      "Job creation",
      "Decreased privacy concerns",
    ],
    correctAnswer: "Bias and fairness",
    questionType: "multipleChoice",
  },
  {
    question: "Which of the following is a risk associated with AI?",
    answer: [
      "Improved decision-making capabilities",
      "Enhanced cybersecurity measures",
      "Security vulnerabilities and attacks",
      "Reduction in job displacement",
    ],
    correctAnswer: "Security vulnerabilities and attacks",
    questionType: "multipleChoice",
  },
  {
    question: "What is the meaning behind 'AI'?",
    answer: [],
    correctAnswer: "Artificial Intelligence",
    questionType: "text",
  },
];

let score = 0;
let currentQuestion = 0;

function nextQuestion() {
  checkAnswer(currentQuestion);
  try {
    if (questions[currentQuestion].questionType === "multipleChoice") {
      answer = document.querySelector(
        'input[name="mc-answer"]:checked'
      ).checked = false;
    }
    if (questions[currentQuestion].questionType === "trueFalse") {
      answer = document.querySelector(
        'input[name="tf-answer"]:checked'
      ).checked = false;
    }
    if (questions[currentQuestion].questionType === "text") {
      answer = document.getElementById("ft-answer").value = "";
    }
    currentQuestion++;
  } catch (e) {
    alert("Please select an answer");
  }

  if (currentQuestion < questions.length) {
    displayQuestion(currentQuestion);
  } else {
    displayScore();
  }
}

function getContainerAndQuestion(questionNumber) {
  let questionContainer;
  let question;
  if (questions[questionNumber].questionType === "trueFalse") {
    questionContainer = document.getElementById("tf-question-container");
    question = document.getElementById("tf-question");
  } else if (questions[questionNumber].questionType === "multipleChoice") {
    questionContainer = document.getElementById("mc-question-container");
    question = document.getElementById("mc-question");
  } else if (questions[questionNumber].questionType === "text") {
    questionContainer = document.getElementById("ft-question-container");
    question = document.getElementById("ft-question");
  }

  return [questionContainer, question];
}

function hidePreviousQuestion(currentQuestion) {
  let previousQuestionContainer = getContainerAndQuestion(
    currentQuestion - 1
  )[0];
  previousQuestionContainer.style.display = "none";
}

function displayQuestion() {
  let questionContainer = getContainerAndQuestion(currentQuestion)[0];
  let question = getContainerAndQuestion(currentQuestion)[1];

  if (currentQuestion !== 0) {
    hidePreviousQuestion(currentQuestion);
  }

  questionContainer.style.display = "flex";
  question.innerHTML = questions[currentQuestion].question;

  let possibleAnswers;

  if (questions[currentQuestion].questionType === "multipleChoice") {
    possibleAnswers = document.getElementsByClassName("answer");
    for (let i = 0; i < possibleAnswers.length; i++) {
      possibleAnswers[i].innerHTML = questions[currentQuestion].answer[i];
    }
  }
}

function checkAnswer(questionNumber) {
  const currentQuestion = questions[questionNumber];
  let answer;

  switch (currentQuestion.questionType) {
    case "trueFalse":
      answer =
        document
          .querySelector('input[name="tf-answer"]:checked')
          ?.value.toLowerCase() || "";
      currentQuestion.correct =
        answer === currentQuestion.correctAnswer.toLowerCase();
      currentQuestion.userAnswer = answer;
      break;

    case "multipleChoice":
      answer =
        document.querySelector('input[name="mc-answer"]:checked')?.value || "";
      currentQuestion.correct =
        currentQuestion.answer[answer - 1] === currentQuestion.correctAnswer;
      currentQuestion.userAnswer = currentQuestion.answer[answer - 1];
      break;

    case "text":
      answer = document.getElementById("ft-answer").value.trim() || "";
      currentQuestion.correct =
        answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
      currentQuestion.userAnswer = answer;
      break;

    default:
      currentQuestion.correct = false;
      break;
  }

  if (currentQuestion.correct) {
    score++;
  }
}

function displayScore() {
  hidePreviousQuestion(questions.length);
  const scoreContainer = document.getElementById("result-container");
  scoreContainer.style.display = "flex";
  const scoreText = document.getElementById("result");
  const scoreToDisplay = score * 2 + "/10 Points";
  scoreText.innerHTML = "Result: " + scoreToDisplay;
  buildResultsTable();
}

function buildResultsTable() {
  for (let i = 1; i <= questions.length; i++) {
    const questionCell = document.getElementById("question" + i);
    const userAnswerCell = document.getElementById("user-answer" + i);
    const correctAnswerCell = document.getElementById("correct-answer" + i);
    const question = questions[i - 1].question;
    const userAnswer = questions[i - 1].userAnswer;
    const correctAnswer = questions[i - 1].correctAnswer;
    questionCell.innerHTML = question;
    userAnswerCell.innerHTML = userAnswer;
    correctAnswerCell.innerHTML = correctAnswer;

    if (userAnswer === questions[i - 1].correctAnswer) {
      userAnswerCell.style.color = "#3c896d";
    } else {
      userAnswerCell.style.color = "#bf2239";
    }
  }
}

function skipQuestion() {
  currentQuestion++;
  questions[currentQuestion].userAnswer = "Skipped";
  questions[currentQuestion].correct = false;
  displayQuestion(currentQuestion);
}

function checkRadioButton(answerNumber) {
  let radioButton = document.getElementById("answer" + answerNumber);
  radioButton.checked = true;
}

function restartQuiz() {
  window.location.reload();
}
