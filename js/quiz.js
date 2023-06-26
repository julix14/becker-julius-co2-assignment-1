function nextQuestion() {
  checkAnswer(currentQuestion);
  if (questions[currentQuestion].questionType === "multipleChoice") {
    answer = document.querySelector(
      'input[name="mc-answer"]:checked'
    ).checked = false;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion(currentQuestion);
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
let currentQuestion = 0;

function displayQuestion(currentQuestion) {
  let questionContainer;
  let question;

  if (questions[currentQuestion].questionType === "trueFalse") {
    questionContainer = document.getElementById("tf-question-container");
    question = document.getElementById("tf-question");
  } else if (questions[currentQuestion].questionType === "multipleChoice") {
    questionContainer = document.getElementById("mc-question-container");
    question = document.getElementById("mc-question");
  } else if (questions[currentQuestion].questionType === "text") {
    questionContainer = document.getElementById("ft-question-container");
    question = document.getElementById("ft-question");
  }

  questionContainer.style.display = "block";
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
    answer = document.getElementById("ft-answer").value.tolowerCase();
  }

  if (answer === questions[currentQuestion].correctAnswer.toLowerCase()) {
    score++;
    console.log("Correct!");
  } else {
    console.log("Incorrect!");
  }
}
