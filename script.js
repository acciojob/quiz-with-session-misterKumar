// Check if session storage is supported
if (typeof(Storage) !== "undefined") {
  // Retrieve user progress from session storage
  var userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];
} else {
  console.error("Sorry, your browser does not support session storage.");
}

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.addEventListener("change", function() {
        // Update userAnswers in session storage on option selection
        userAnswers[i] = this.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

// Submit button event handler
document.getElementById("submit").addEventListener("click", function() {
  // Calculate the user's score
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display the score
  alert(`Your score is ${score} out of 5.`);

  // Store the score in local storage
  localStorage.setItem("score", score);
});