function nextQuestion() {
  checkAnswer(currentQuestion);
  if (questions[currentQuestion].questionType === "multipleChoice") {
    answer = document.querySelector(
      'input[name="mc-answer"]:checked'
    ).checked = false;
  }
  currentQuestion++;
  console.log(questions.length);
  if (currentQuestion < questions.length) {
    displayQuestion(currentQuestion);
  } else {
    displayScore();
  }
}

const questions = [
  {
    question: "AI automation can lead to job displacement.",
    answer: ["True", "False"],
    correctAnswer: "True",
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
let currentQuestion = 4;

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

function displayQuestion(currentQuestion) {
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

function checkAnswer(currentQuestion) {
  let answer;
  if (questions[currentQuestion].questionType === "trueFalse") {
    answer = document
      .querySelector('input[name="tf-answer"]:checked')
      .value.toLowerCase();
  } else if (questions[currentQuestion].questionType === "multipleChoice") {
    answer = document.querySelector('input[name="mc-answer"]:checked').value;
  } else if (questions[currentQuestion].questionType === "text") {
    answer = document.getElementById("ft-answer").value.toLowerCase();
  }
  questions[currentQuestion].userAnswer = answer;
  if (answer === questions[currentQuestion].correctAnswer.toLowerCase()) {
    score++;
    console.log("Correct!");
  } else {
    console.log("Incorrect!");
  }
}

function displayScore() {
  hidePreviousQuestion(questions.length);
  let scoreContainer = document.getElementById("result-container");
  scoreContainer.style.display = "flex";
  let scoreText = document.getElementById("result");
  const scoreToDisplay = score * 2 + "/10 Points";
  scoreText.innerHTML = "Result: " + scoreToDisplay;
  buildResultsTable();
}

function buildResultsTable() {
  let table = document.getElementById("results-table");
  for (let i = 1; i <= questions.length; i++) {
    const questionCell = document.getElementById("question" + i);
    const userAnswerCell = document.getElementById("your-answer" + i);
    const correctAnswerCell = document.getElementById("correct-answer" + i);

    const question = questions[i].question;
    const userAnswer = questions[i].userAnswer;
    const correctAnswer = questions[i].correctAnswer;

    if (!userAnswer) {
      userAnswer = "Skipped";
    }

    questionCell.innerHTML = question;
    userAnswerCell.innerHTML = userAnswer;
    correctAnswerCell.innerHTML = correctAnswer;

    if (userAnswer === correctAnswer.toLowerCase()) {
      userAnswerCell.style.color = "#3c896d";
    } else {
      userAnswerCell.style.color = "#bf2239";
    }
  }
}

function checkRadioButton(answerNumber) {
  let radioButton = document.getElementById("answer" + answerNumber);
  radioButton.checked = true;
}
