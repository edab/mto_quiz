let sampleQuestions = [];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

async function loadQuestions() {
    try {
        const response = await fetch('./data/500_question_bank.json');
        sampleQuestions = await response.json();
    } catch (error) {
        console.error('Error loading questions:', error);
        alert('Failed to load questions. Please refresh the page.');
    }
}

function startQuiz() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('loadingScreen').style.display = 'block';
    
    // Load questions first, then start quiz
    loadQuestions().then(() => {
        // Select 10 random questions
        currentQuestions = shuffleArray(sampleQuestions).slice(0, 10);
        currentQuestionIndex = 0;
        score = 0;
        answered = false;
        
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('questionScreen').style.display = 'block';
        
        displayQuestion();
    });
}

function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / currentQuestions.length) * 100;
    
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('questionNumber').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('reference').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `
            <div class="option-letter">${String.fromCharCode(65 + index)}</div>
            <div>${option}</div>
        `;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    answered = false;
}

function selectAnswer(selectedIndex) {
    if (answered) return;
    
    answered = true;
    const question = currentQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Show correct answer
    options[question.correct].classList.add('correct');
    
    // Show selected answer if wrong
    if (selectedIndex !== question.correct) {
        options[selectedIndex].classList.add('incorrect');
    }
    
    // Update score
    if (selectedIndex === question.correct) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }
    
    // Show reference
    document.getElementById('reference').textContent = `📖 Study Reference: ${question.reference}`;
    document.getElementById('reference').style.display = 'block';
    
    // Show next button
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('nextBtn').textContent = currentQuestionIndex === currentQuestions.length - 1 ? 'View Results' : 'Next Question';
}

function showFeedback(isCorrect) {
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.textContent = '✅ Correct! Well done!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = '❌ Incorrect. Review the correct answer above.';
        feedback.className = 'feedback incorrect';
    }
    feedback.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('questionScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
    
    const percentage = Math.round((score / currentQuestions.length) * 100);
    const passed = percentage >= 80;
    
    document.getElementById('scoreText').textContent = `${score}/${currentQuestions.length}`;
    document.getElementById('scoreCircle').className = `score-circle ${passed ? 'pass' : 'fail'}`;
    
    if (passed) {
        document.getElementById('resultsTitle').textContent = '🎉 Congratulations!';
        document.getElementById('scoreDescription').innerHTML = `
            <strong>You passed with ${percentage}%!</strong><br>
            You're ready for the real G1 knowledge test!<br>
            <small>Remember: You need 16 out of 20 (80%) on the actual test.</small>
        `;
    } else if (percentage >= 70) {
        document.getElementById('resultsTitle').textContent = '📚 Almost There!';
        document.getElementById('scoreDescription').innerHTML = `
            <strong>You scored ${percentage}%</strong><br>
            You're close! A bit more study and you'll be ready.<br>
            <small>Focus on the areas where you had difficulty.</small>
        `;
    } else {
        document.getElementById('resultsTitle').textContent = '📖 Keep Studying!';
        document.getElementById('scoreDescription').innerHTML = `
            <strong>You scored ${percentage}%</strong><br>
            More study is needed. Review the MTO handbook thoroughly.<br>
            <small>Don't worry - practice makes perfect!</small>
        `;
    }
}

function restartQuiz() {
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}
