const questions = [
    {
        question: 'Por que a educação no trânsito é importante?',
        answers: [
            { text: 'Porque ensina as pessoas a dirigirem de maneira segura.', correct: true },
            { text: 'É útil apenas para novos motoristas e não para os experientes.', correct: false },
            { text: 'A educação no trânsito é irelevante porque todos os motoristas são naturalmente peritos em dirigir.', correct: false },
            { text: 'Ensina os motoristas a ignorarem as regras de trânsito.', correct: false }
        ]
    },
    {
        question: 'Qual é a importância da sinalização correta no trânsito?',
        answers: [
            { text: 'Orienta e regula o fluxo de veículos e pedestres, aumentando a segurança.', correct: true },
            { text: 'Ajuda a decorar as ruas com cores vibrantes.', correct: false },
            { text: 'Confunde os motoristas para reduzir a velocidade.', correct: false },
            { text: 'A sinalização de trânsito é irelevante, pois os motoristas sabem agir no trânsito.”', correct: false }
        ]
    },
    {
        question: 'Qual é a diferença entre multa e infração de trânsito?',
        answers: [
            { text: 'Infração de trânsito é o valor em dinheiro que se paga por violar as regras de trânsito.', correct: false },
            { text: 'Infração de trânsito é o ato de desrespeitar as regras de trânsito, e a multa é a penalidade financeira aplicada como consequência.', correct: true },
            { text: 'Multa é o ato de desrespeitar as regras de trânsito, como exceder a velocidade.', correct: false },
            { text: 'A infração é desreispeitar as leis de trânsito, a multa  é uma notificação do governo. ', correct: false }
        ]
    },
    {
        question: 'Por que é importante usar o cinto de segurança?',
        answers: [
            { text: 'O uso do cinto é obrigatório para crianças mas para adultos não.', correct: false },
            { text: 'Protege os ocupantes em caso de acidente, reduzindo ferimentos graves ou fatais ao mantê-los no lugar.', correct: true },
            { text: 'O cinto de segurança só é necessário quando se está dirigindo em alta velocidade.', correct: false },
            { text: 'O cinto de segurança serve apenas para evitar multas de trânsito.', correct: false }
        ]
    },
    {
        question: 'Para que serve essa placa: ⚠ ?',
        answers: [
            { text: 'Indicar a presença de um radar de velocidade escondido.', correct: false },
            { text: 'Alertar os motoristas sobre possíveis perigos ou mudanças nas condições da via.', correct: true },
            { text: 'Indicar a localização de um posto de combustível.', correct: false },
            { text: 'Mostrar a velocidade mínima permitida na via.', correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        nextButton.innerText = `Pontuação Final: ${score} / ${questions.length}`;
        nextButton.classList.remove('hide');
        nextButton.removeEventListener('click', handleNextButton);
        nextButton.addEventListener('click', startGame);
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function handleNextButton() {
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add('hide');
}

nextButton.addEventListener('click', handleNextButton);

startGame();
