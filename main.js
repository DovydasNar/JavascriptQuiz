import { questions } from "./questions.js";

let currentQuestionIndex = 0;
let score = 0;

import {
  questionList,
  choicesList,
  nextButton,
  progressIndicator,
  results,
  finalScore,
  quizContainer,
  restartButton,
} from "./domElements.js";

function loadQuestions() {
  const CurrentQuestion = questions[currentQuestionIndex];

  questionList.textContent = CurrentQuestion.question;
  choicesList.innerHTML = "";

  CurrentQuestion.answers.forEach((choice, index) => {
    const list = document.createElement("li");
    list.style.cursor = "pointer";
    list.style.color = "#BEF5FE";
    list.textContent = choice;
    list.classList.add("choice");
    list.dataset.index = index;
    list.addEventListener("click", selectAnswer);
    choicesList.appendChild(list);
  });

  updateProgress();
}

function selectAnswer(event) {
  const selectedAnswer = event.target;
  const selectedAnswerIndex = parseInt(selectedAnswer.dataset.index);
  const correctAnswerIndex = questions[currentQuestionIndex].correctAnswerIndex;

  if (selectedAnswerIndex === correctAnswerIndex) {
    selectedAnswer.style.backgroundColor = "green";
    score++;
  } else {
    selectedAnswer.style.backgroundColor = "red";
    choicesList.children[correctAnswerIndex].style.backgroundColor = "green";
  }

  Array.from(choicesList.children).forEach((child) =>
    child.removeEventListener("click", selectAnswer)
  );
  nextButton.disabled = false;
}

function updateProgress() {
  progressIndicator.textContent = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestions();
    nextButton.disabled = true;
  } else {
    showResults();
  }
}

function showResults() {
  quizContainer.classList.add("hidden");
  results.classList.remove("hidden");
  finalScore.textContent = `You answered ${score} of ${questions.length} correct!`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizContainer.classList.remove("hidden");
  results.classList.add("hidden");
  loadQuestions();
  nextButton.disabled = true;
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

loadQuestions();
