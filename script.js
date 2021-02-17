//INTERFACE VARIABLES
let yourVoteFor = document.querySelector('.d-1l-1 span')
let post = document.querySelector('.d-1l-2 span')
let candidateInfo = document.querySelector('.d-1l-4')
let warning = document.querySelector('.division-2')
let right = document.querySelector('.division-1-right')
let numbers = document.querySelector('.d-1l-3')


//ENVIRONMENT VARIABLES
let currentStep = 0
let number = ''
let branco = false
let vote = []

//ENVIRONMENT FUNCTIONS
function startStep() {
	let step = steps[currentStep]
	let numberHtml = 'Número: '
	number = ''
	branco = false

	for(let i = 0; i < step.numbers; i++) {

		if (i === 0){
			numberHtml += '<div class="number flasher"></div>'
		} else {
			numberHtml += '<div class="number"></div>'
		}
	
	}

	yourVoteFor.style.display = 'none'
	post.innerHTML = step.post
	candidateInfo.innerHTML = ''
	warning.style.display = 'none'
	right.innerHTML = ''
	numbers.innerHTML = numberHtml
}

function updateInterface() {
	let step = steps[currentStep]
	let pictureHtml = ''
	let candidate = step.candidates.filter((item) => {
		if(item.number === number) {
			return true
		} else {
			return false
		}
	})

	if (candidate.length > 0) {

		let pictureHtml = ''
		candidate = candidate[0]
		
		yourVoteFor.style.display = 'block'
		warning.style.display = 'block'
		if (currentStep === 1) {
			candidateInfo.innerHTML = `Nome: ${candidate.name} <br/>Partido: ${candidate.party} <br/>Vice-Prefeito: ${candidate.vice}`
		} else {
			candidateInfo.innerHTML = `Nome: ${candidate.name} <br/>Partido: ${candidate.party} <br/>`
		}
		
		
		for(let i in candidate.picture) {
			if(candidate.picture[i].small === true) {
				pictureHtml += `<div class="d-1r-img small"><img src="${candidate.picture[i].url}" alt="">${candidate.picture[i].subtitles}</div>`
			} else {
				pictureHtml += `<div class="d-1r-img"><img src="${candidate.picture[i].url}" alt="">${candidate.picture[i].subtitles}</div>`
			}
			
		}
		right.innerHTML = pictureHtml
		
	} else {

		yourVoteFor.style.display = 'block'
		warning.style.display = 'block'
		candidateInfo.innerHTML = 'NÚMERO ERRADO<div class="big--warning flasher">VOTO NULO</div>'

	}
}

//KEYBOARD FUNCTIONS
function clicked(n) {
	let elementNumber = document.querySelector('.number.flasher')

	if (elementNumber !== null) {

		elementNumber.innerHTML = n
		number = `${number}${n}`

	}

	elementNumber.classList.remove('flasher')	
	if(elementNumber.nextElementSibling !== null){
		elementNumber.nextElementSibling.classList.add('flasher')
	} else {
		updateInterface()
	}
}

function execBranco() {
	branco = true
	number = ''
	yourVoteFor.style.display = 'block'
	warning.style.display = 'block'
	numbers.innerHTML = ''
	candidateInfo.innerHTML = '<div class="big--warning flasher branco">VOTO EM BRANCO</div>'
	right.innerHTML = ''
}

function execCorrige() {
	startStep()
}

function execConfirma() {
	let step = steps[currentStep]
	let confirma = false
	if (branco === true){
		confirma = true

		vote.push({
			step: steps[currentStep].post,
			voted: 'branco'
		})
	
	} else if ( numbers.length === step.number) {
		confirma = true

		vote.push({
			step: steps[currentStep].post,
			voted: number
		})

	}

	if (confirma === true) {
		currentStep++
		if(steps[currentStep] !== undefined) {
			startStep()
		} else {
			document.querySelector('.screen'). innerHTML = '<div class="big--warning flasher end">FIM</div>'
		}
	}
}

startStep()