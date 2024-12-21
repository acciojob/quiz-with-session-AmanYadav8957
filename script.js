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

// Check session storage for previous answers  
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);  

function renderQuestions() {  
    const questionsElement = document.getElementById("questions");  
    questionsElement.innerHTML = ""; // Clear previous questions  

    questions.forEach((question, questionIndex) => {  
        const questionElement = document.createElement("div");  
        questionElement.classList.add("question");  

        const questionText = document.createElement("p");  
        questionText.textContent = question.question;  
        questionElement.appendChild(questionText);  

        question.choices.forEach(choice => {  
            const choiceElement = document.createElement("div");  
            const choiceInput = document.createElement("input");  
            choiceInput.setAttribute("type", "radio");  
            choiceInput.setAttribute("name", `question-${questionIndex}`);  
            choiceInput.setAttribute("value", choice);  

            // Check if the answer is already saved in session storage  
            if (userAnswers[questionIndex] === choice) {  
                choiceInput.checked = true;  
            }  

            choiceElement.appendChild(choiceInput);  
            choiceElement.appendChild(document.createTextNode(choice));  
            questionElement.appendChild(choiceElement);  

            // Event listener to save selected answers  
            choiceInput.addEventListener('change', () => {  
                userAnswers[questionIndex] = choice; // Save user selection  
                sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // Store in session storage  
            });  
        });  

        questionsElement.appendChild(questionElement);  
    });  
}  

document.getElementById("submit").addEventListener("click", () => {  
    let score = 0;  

    userAnswers.forEach((answer, index) => {  
        if (answer === questions[index].answer) {  
            score++;  
        }  
    });  

    document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;  

    // Store score in local storage  
    localStorage.setItem("score", score);  
});  

// Render questions on page load  
renderQuestions();