$(document).ready(function () {
    // Глобальные переменные
    let score = 0;
    let level = 1;
    let isGameStarted = false;

    // Создание и отображение яблок
    function createApple() {
    const apple = $('<div>').addClass('apple');
    apple.css({
        left: Math.random() * (window.innerWidth - 100) + 'px',
        top: Math.random() * (window.innerHeight - 100) + 'px'
    });
    $('#game-container').append(apple);
    apple.on('click', onAppleClick);
    }

    // Обработчик события клика на яблоко
    function onAppleClick() {
    if (!isGameStarted) return;

    $(this).remove();
    score++;
    updateScore();

    if (level === 1 && score === 5) {
        showNextLevelButton();
    } else if (level === 2 && score === 10) {
        showWinMessage();
    } else if (score === 15) {
        showWinButton();
    }
    }

    // Обновление счета очков
    function updateScore() {
    const scoreElement = $('#score');
    scoreElement.text('Score: ' + score);
    }

    // Обновление уровня
    function updateLevel() {
    const levelElement = $('#level');
    levelElement.text('Level: ' + level);
    }

    // Управление персонажем
    function movePlayer(event) {
    if (!isGameStarted) return;

    const player = $('#player');

    switch (event.key) {
        case 'ArrowUp':
        player.css('top', parseInt(player.css('top')) - 10 + 'px');
        break;
        case 'ArrowDown':
        player.css('top', parseInt(player.css('top')) + 10 + 'px');
        break;
        case 'ArrowLeft':
        player.css('left', parseInt(player.css('left')) - 10 + 'px');
        break;
        case 'ArrowRight':
        player.css('left', parseInt(player.css('left')) + 10 + 'px');
        break;
    }

    checkCollision(player);
    }

    // Проверка столкновения с яблоком
    function checkCollision(player) {
    const apples = $('.apple');
    for (let i = 0; i < apples.length; i++) {
        const apple = $(apples[i]);
        if (isColliding(player, apple)) {
        apple.remove();
        score++;
        updateScore();

        if (level === 1 && score === 5) {
            showNextLevelButton();
        } else if (level === 2 && score === 10) {
            showWinMessage();
        } else if (score === 15) {
            showWinButton();
        }
        }
    }
    }

    // Проверка столкновения двух элементов
    function isColliding(element1, element2) {
    const rect1 = element1[0].getBoundingClientRect();
    const rect2 = element2[0].getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
    }

    // Показать кнопку следующего уровня
    function showNextLevelButton() {
    const nextLevelButton = $('#next-level-button');
    nextLevelButton.show();
    }

    // Показать надпись "Вы выиграли" и гифку салюта
    function showWinMessage() {
    const winMessage = $('#win-message');
    const saluteGif = $('#salute-gif');
    winMessage.show();
    saluteGif.show();
    }

    // Показать кнопку победы
    function showWinButton() {
    const winButton = $('#win-button');
    winButton.show();
    }

    // Обработчик нажатия на кнопку старта
    function startGame() {
    const startButton = $('#start-button');
    startButton.hide();

    isGameStarted = true;

      // Создаем яблоки
    let appleCount = level === 1 ? 5 : 10;
    for (let i = 0; i < appleCount; i++) {
        createApple();
    }

      // Вешаем обработчик события на клавиатуру
    $(document).on('keydown', movePlayer);
    }

    // Обработчик нажатия на кнопку следующего уровня
    function nextLevel() {
    level++;
    score = 0;
    updateScore();
    updateLevel();

    const nextLevelButton = $('#next-level-button');
    nextLevelButton.hide();

      // Удаляем все яблоки
    $('.apple').remove();

      // Создаем новые яблоки
    let appleCount = level === 1 ? 5 : 10;
    for (let i = 0; i < appleCount; i++) {
        createApple();
    }
    }

    // Обработчик нажатия на кнопку победы
    function winGame() {
    const winButton = $('#win-button');
    winButton.hide();
    isGameStarted = false;
    }

    // Начало игры
    const startButton = $('#start-button');
    startButton.on('click', startGame);

    // Следующий уровень
    const nextLevelButton = $('#next-level-button');
    nextLevelButton.on('click', nextLevel);

    // Победа в игре
    const winButton = $('#win-button');
    winButton.on('click', winGame);
});
