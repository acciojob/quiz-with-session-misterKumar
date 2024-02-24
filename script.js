document.addEventListener("DOMContentLoaded", function () {
    // Questions data
    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "What is the highest mountain in the world?",
            choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
            answer: "Everest"
        },
        {
            question: "What is the largest country by area?",
            choices: ["Russia", "China", "Canada", "United States"],
            answer: "Russia"
        },
        {
            question: "Which is the largest planet in our solar system?",
            choices: ["Earth", "Jupiter", "Mars"],
            answer: "Jupiter"
        },
        {
            question: "What is the capital of Canada?",
            choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
            answer: "Ottawa"
        },
    ];

    // Reference to HTML elements
    const questionsContainer = document.getElementById('questions');
    const submitButton = document.getElementById('submit');
    const scoreContainer = document.getElementById('score');

    // Load saved progress from session storage
    const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};

    // Display the quiz questions and choices
    renderQuestions();

    // Add event listener to the submit button
    submitButton.addEventListener('click', function () {
        // Calculate and display the score
        const score = calculateScore();
        displayScore(score);

        // Save score in local storage
        localStorage.setItem('score', score);
    });

    // Function to display quiz questions
    // Function to display quiz questions
function renderQuestions() {
    questions.forEach(function (question, index) {
        const questionElement = document.createElement("div");
        const questionText = document.createTextNode(question.question);
        questionElement.appendChild(questionText);

        question.choices.forEach(function (choice) {
            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${index}`);
            choiceElement.setAttribute("value", choice);

            // Check if the choice matches the saved progress
            if (savedProgress[index] === choice) {
                choiceElement.checked = true; // Set the checked property directly
            }

            const choiceText = document.createTextNode(choice);

            questionElement.appendChild(choiceElement);
            questionElement.appendChild(choiceText);
        });

        questionsContainer.appendChild(questionElement);
    });

    // Log savedProgress for debugging
    console.log("savedProgress:", savedProgress);
    
    // Trigger a change event to ensure Cypress detects the change
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', () => {
            input.checked = !input.checked; // Toggle the checked state
        });
    });

    // Trigger a change event on the last radio input to force a change
    const lastRadioInput = radioInputs[radioInputs.length - 1];
    lastRadioInput.checked = !lastRadioInput.checked;
    lastRadioInput.dispatchEvent(new Event('change'));
}


    // Function to calculate the quiz score
    function calculateScore() {
        let score = 0;

        questions.forEach(function (question, index) {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);

            if (selectedOption && selectedOption.value === question.answer) {
                score++;
            }

            // Save user's progress in session storage
            savedProgress[index] = selectedOption ? selectedOption.value : null;
            sessionStorage.setItem('progress', JSON.stringify(savedProgress));
        });

        return score;
    }

    // Function to display the quiz score
    function displayScore(score) {
        scoreContainer.innerHTML = `Your Score is ${score} out of 5.`;
    }
});