const screens = document.querySelectorAll('.screen');
const escolher_inseto_btns = document.querySelectorAll('.escolher-inseto-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const mensagem = document.getElementById('mensagem')
let seconds = 0
let score = 0
let selecionado_inseto = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

escolher_inseto_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selecionado_inseto = { src, alt }
        screens[1].classList.add('up')
        setTimeout(criarInseto, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `time: ${m}:${s}`
    seconds++
}

function criarInseto() {
    const inseto = document.createElement('div')
    inseto.classList.add('inseto')
    const { x, y } = getRandomLocation()
    inseto.style.top = `${y}px`
    inseto.style.left = `${x}px`
    inseto.innerHTML = `<img src="${selecionado_inseto.src}" alt="${selecionado_inseto.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    inseto.addEventListener('click', captInseto)

    game_container.appendChild(inseto)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function captInseto() {
    increaseScore()
    this.classList.add('capturado')
    setTimeout(() => this.remove(), 2000)
    addInsetos()
}

function addInsetos() {
    setTimeout(criarInseto, 1000)
    setTimeout(criarInseto, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        mensagem.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}