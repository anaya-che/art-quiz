import PageLayout from './pageLayout';
import Settings from './settings'

class CategoryPage {

    constructor(page) {
        this.body = document.querySelector('body');
        this.mainElement = document.querySelector('.main');
        this.page = page;
        this.setArtistsPage();
        document.addEventListener('click', this.returnHome);
        document.addEventListener('click', this.startQuiz);
    }

    setArtistsPage() {
        this.body.style.backgroundImage = `unset`;
        this.mainElement.innerHTML = `
            <div class="categories-container">
                <div class="categories__buttons-container">
                    <div class="categories__button" id="home">Home</div>
                    <div class="categories__title">Categories</div>
                    <div class="categories__button" id="score">Score</div>
                </div>
                <div class="cards-container"></div>
            </div>`

        if (this.page === 'artists') {
            this.renderCards(1, 13);
            this.getCategoryBg(1, 112, 1);
        }

        if (this.page === 'pictures') {
            this.renderCards(13, 25);
            this.getCategoryBg(121, 232, 13);
        }
    }

    renderCards(num, max) {
        const cardContainerElement = document.querySelector('.cards-container');
        for(let i = num; i < max; i++) {
            cardContainerElement.innerHTML += `
                <div class="card" id="card${i}">
                    <div class="card-title">
                        <div class="card-number">${i.toString().padStart(2, "0")}</div>
                        <div class="card-score"></div>
                    </div>
                </div>`
        }
    }

    async getCategoryBg(imgNum, maxImgNum, id) {
        while(imgNum < maxImgNum) {
            let src = `./assets/quiz-img/${(imgNum)}.webp`;
            let cardImage = await PageLayout.createImage(src);
            this.setCategoryBg(cardImage.src, id);
            imgNum += 10;
            id += 1;
        }
    }

    setCategoryBg(src, id) {
        const cardElement = document.querySelector(`#card${(id)}`);
        cardElement.style.backgroundImage = `url(${src})`;
    }

    returnHome({ target }) {
        if (target.closest('#home'))
        Settings.changePage('home');
    }

    startQuiz({ target }) {
        if (target.closest('.card')) {
            let quizCategory = Number(target.id.split('card')[1]);
            Settings.changePage(quizCategory);
        }
    }

}

export default CategoryPage;