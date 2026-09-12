import QUESTIONS from "/src/questions.js";

export default class GameLoop {
	questionIndex = 0;

	constructor(questionElement, answerElement, historyElement) {
		this.questionElement = questionElement;
		this.historyElement = historyElement;
		this.answerElement = answerElement;

		this.shuffledCards = this.shuffleCards();
		this.updateQuestionUI();
	}

	next() {
		this.updateHistoryUI();

		if (this.getQuestion(this.questionIndex) === "SA") {
			return;
		}

		this.questionIndex++;
	}

	updateHistoryUI() {
		const answer = this.answerElement.value;
		const question = this.getQuestion(this.questionIndex);
		const historyElement = this.createHistoryElement(question, answer);

		this.historyElement.appendChild(historyElement);

		this.answerElement.value = "";
		this.answerElement.focus();
	}

	updateQuestionUI() {
		this.questionElement.textContent = this.getQuestion(this.questionIndex);
	}

	getQuestion(index) {
		return QUESTIONS[this.shuffledCards[index]];
	}

	shuffleCards() {
		const cards = Object.keys(QUESTIONS);
		let currentIndex = cards.length;
		while (currentIndex != 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);

			currentIndex--;

			[cards[currentIndex], cards[randomIndex]] = [
				cards[randomIndex], cards[currentIndex]
			];
		}

		return cards;
	}
	createHistoryElement(question, answer) {
		const divElement = document.createElement("div");

		const answerElement = document.createElement("p");
		answerElement.textContent = answer;
		const questionElement = document.createElement("p");
		questionElement.textContent = question;

		divElement.appendChild(questionElement);
		divElement.appendChild(answerElement);

		return divElement
	}
}
