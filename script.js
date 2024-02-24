//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is the highest mountain in the world?",
      choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
      answer: "Everest",
    },
    {
      question: "What is the largest country by area?",
      choices: ["Russia", "China", "Canada", "United States"],
      answer: "Russia",
    },
    {
      question: "Which is the largest planet in our solar system?",
      choices: ["Earth", "Jupiter", "Mars"],
      answer: "Jupiter",
    },
    {
      question: "What is the capital of Canada?",
      choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
      answer: "Ottawa",
    },
  ];
  
  // Display the quiz questions and choices

  const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || Array(questions.length).fill(null);

    function renderQuestions() {
      const questionsElement = document.getElementById('questions');

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionElement = document.createElement("div");

        // Render question text
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);

        // Render choices
        for (let j = 0; j < question.choices.length; j++) {
          const choice = question.choices[j];

          const choiceElement = document.createElement("input");
          choiceElement.setAttribute("type", "radio");
          choiceElement.setAttribute("name", `question-${i}`);
          choiceElement.setAttribute("value", choice);

          // Check the radio button if it matches the user's answer
          if (userAnswers[i] === choice) {
            choiceElement.setAttribute("checked", true);
          }

          const choiceText = document.createTextNode(choice);

          questionElement.appendChild(choiceElement);
          questionElement.appendChild(choiceText);
        }

        questionsElement.appendChild(questionElement);

        // Save progress to session storage on option selection
        questionElement.addEventListener('change', (event) => {
          userAnswers[i] = event.target.value;
          sessionStorage.setItem('progress', JSON.stringify(userAnswers));
        });
      }
    }

    function submitQuiz() {

       
      // Calculate the score
      const score = questions.reduce((acc,questions,index) => {
        // Check if the user answered the question

        
        if (userAnswers[index] !== null) {
          // Check if the user's answer is correct


     
          if (userAnswers[index] === questions.answer) {
            return acc + 1;
          }
        }
        return acc;
      }, 0);
    
      // Display the score
      const scoreElement = document.getElementById('score');
      scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
    
      // Save the score to local storage
      localStorage.setItem('score', score);
    }

    // Render questions when the page loads
    renderQuestions();

    // Attach the submitQuiz function to the submit button click event
    document.getElementById('submit').addEventListener('click', submitQuiz);
 
  