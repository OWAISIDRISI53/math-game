let operators = ["+", "-", "*"]
const startBtn = document.getElementById("start-btn")

const controls = document.querySelector(".controls-container")
const container = document.querySelector(".container")
const result = document.querySelector("#result")
const submitBtn = document.querySelector(".submit-btn")
const errorMsg = document.querySelector(".error-msg")

let answerValue;
let operatorQestion

const questionContainer = document.querySelector(".question-container")

container.classList.add("hide")
const question = document.createElement("div");
question.className = "questions";
// qestionContainer.insertAdjacentElement("afterbegin", question);
questionContainer.append(question);

const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min

const questionGenerator = () => {
    let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)]
    let randomOperator = operators[Math.floor(Math.random() * operators.length)]
    if (randomOperator == "-" && num2 > num1) [num1, num2] = [num2, num1]
    // solve  qestion
    let solution = eval(`${num1}${randomOperator}${num2}`)
    let randomVal = randomValue(1, 5);

    if (randomVal == 1) {
        answerValue = num1;
        question.innerHTML = ` <input type="number" id="inputValue" placeholder="?"/>
    ${randomOperator} ${num2} = ${solution}`
    }
    else if (randomVal == 2) {
        answerValue = num2;
        question.innerHTML = ` ${num1} ${randomOperator} <input type="number" id="inputValue" placeholder="?"/>
      = ${solution}`
    }

    else if (randomVal == 3) {
        answerValue = randomOperator;
        operatorQuestion = true
        question.innerHTML = ` ${num1} <input type="text" id="inputValue" placeholder="?"/> ${num2} = ${solution}`
    }

    else {
        answerValue = solution
        question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputVal" placeholder="?"/>`
    }
}

// user Input check 
submitBtn.addEventListener("click", () => {
    errorMsg.classList.add("hide")
    let userInput = document.getElementById("inputValue").value;

    // if user Input is not empty 
    if (userInput) {
        // if user guessed correct answer
        if (userInput == answerValue) {
            stopGame(`Yippie !! <span>Correct<span/> Answer`)
        }
        else if (operatorQuestion && !operators.includes(userInput)) {
            errorMsg.classList.remove("hide")
            errorMsg.innerHTML = "please enter a valid operator"
        }
        // if user guessed wrong answer
        else {
            stopGame(`Opps!! <span> Wrong<span/> Answer`)
        }

    }
    // if user input is empty
    else {
        errorMsg.classList.remove("hide")
        errorMsg.innerHTML = "input Cannot be empty"
    }
    container.classList.add("hide")

})


// start game 
startBtn.addEventListener("click", () => {
    operatorQuestion = false
    answerValue = ""
    errorMsg.innerHTML = ""
    errorMsg.classList.add("hide")
    controls.classList.add("hide")
    container.classList.remove("hide")
    startBtn.classList.add("hide")
    questionGenerator()
})

const stopGame = (resultText) => {
    result.innerHTML = resultText
    startBtn.innerHTML = "Restart"
    controls.classList.remove("hide")
    startBtn.classList.remove("hide")

}