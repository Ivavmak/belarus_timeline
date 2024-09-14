const questions = [
	{
		question: "Когда началась ВОВ?",
		answers: [
			"1927г", 
			"1939г", 
			"1943г", 
			"1941г"
		],
		correct: 3,
	},
	{
		question: "В каком году Беларусь приняли в ООН?",
		answers: [
			"1945г",
			"1968г",
			"1937г",
			"1989г",
		],
		correct: 0,
	},
	{
		question: "Главы каких 3х стран подписали документ о создании таможенного союза?",
		answers: [
			"Беларусь, Украина и России",
			"Украина, Россия, Польша",
			"Беларусь, Казахстана и России",
			"Китай, Беларусь, Америка",
		],
		correct: 2,
	},
	{
		question: "Что произошло 7 июня 1995г?",
		answers: [ 
			"Верховный Совет Республики Беларусь принял новую Конституцию Республики Беларусь", 
			"Утверждены новые Государственный герб и Государственный флаг Республики Беларусь",
			"Создан союз России и Беларуси", 
			"Ничего"
		],
		correct: 1,
	},
	{
		question: "Как зовут первую женщину суверенной Беларуси отправленную в космос?",
		answers: [
			"Галина Павловна", 
			"Анастасия Ленкова",
			"Марина Василевская"
		],
		correct: 2,
	}
];

const headContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let qIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
	headContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion(){
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', `${questions[qIndex]['question']} (${qIndex+1}/${questions.length})`);

	headContainer.innerHTML = title;

	for ([index, answerText] of questions[qIndex]['answers'].entries()) {
		const questionTemplate = 
			`<li>
					<label>
						<input value="%id%" type="radio" class="answer" name="answer" />
						<span>%answer%</span>
					</label>
			</li>`;

		let answerHTML = questionTemplate.replace('%answer%', answerText).replace("%id%", index);
		listContainer.innerHTML += answerHTML;
	}
}

function checkAnswer(){
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	if (!checkedRadio){
		submitBtn.blur();
		return
	}

	if (checkedRadio.value == questions[qIndex]['correct']){
		score++;
	}

	if (qIndex !== questions.length -1){
		qIndex++;
		clearPage();
		showQuestion();
	} else{
		clearPage();
		showResult();
	}
}

function showResult(){
	const resultTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>`
		.replace('%title%', 'Вы прошли викторину!🎉')
		.replace('%message%', `Правильных ответов ${score}/${questions.length}!🔥`)
	headContainer.innerHTML = resultTemplate;

	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => history.go();

}