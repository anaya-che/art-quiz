import MainPage from './mainPage';
import Animation from './animation';

class CategoryPage {

    static setArtistsPage(toPage) {
        document.querySelector('body').style.backgroundImage = `unset`;
        document.querySelector('.main').innerHTML = `
            <div class="categories-container">
                <div class="categories__buttons-container">
                    <div class="categories__button" id="home">Home</div>
                    <div class="categories__title">Categories</div>
                    <div class="plug"></div>
                </div>
                <div class="cards-container"></div>
            </div>`

        if (toPage === 'artists') {
            this.renderCards(0, 12);
            this.getCategoryBg(0, 112, 0);
        }

        if (toPage === 'pictures') {
            this.renderCards(12, 24);
            this.getCategoryBg(120, 232, 12);
        }

        Animation.pageShowAnimation();
    }

    static renderCards(num, max) {
        const cardContainerElement = document.querySelector('.cards-container');
        for(let i = num; i < max; i++) {
            let score = this.setCartsResults(i);
            let out = '';
            if (score !== undefined) {
                out = `
                    <div class="card" id="card${i}">
                        <div class="card-title">
                            <div class="card-number">${(i + 1).toString().padStart(2, "0")}</div>
                            <div class="card-score">${score} / 10</div>
                        </div>
                        <div class="score_button" id="score${i}">Score</div>
                    </div>`;
            }
            else out = `
                <div class="card gray-image" id="card${i}">
                    <div class="card-title">
                        <div class="card-number">${(i + 1).toString().padStart(2, "0")}</div>
                        <div class="card-score"></div>
                    </div>
                </div>`;

            cardContainerElement.innerHTML += out;
        }

    }

    static async getCategoryBg(imgNum, maxImgNum, id) {
        while(imgNum < maxImgNum) {
            let src = `./assets/quiz-img/${(imgNum)}.webp`;
            let cardImage = await MainPage.createImage(src);
            if (document.querySelector(`#card${(id)}`)) {
                this.setCategoryBg(cardImage.src, id);
            }
            imgNum += 10;
            id += 1;
        }
    }

    static setCategoryBg(src, id) {
            const cardElement = document.querySelector(`#card${(id)}`);
            cardElement.style.backgroundImage = `url(${src})`;
    }

    static getLocalStorage() {
        if(localStorage.getItem('answers')) {
            const cardsStatsJson = localStorage.getItem('answers')
            const cardsStats = JSON.parse(cardsStatsJson);
            return cardsStats;
        }
    }

    static setCartsResults(id) {
        const cardsStats = this.getLocalStorage();
        if (cardsStats) {
            let correctAnswers = 0;
            let obj = cardsStats[id];
            if (obj) {
                for (let key in obj) {
                    if (obj[key]) correctAnswers += 1;
                }
                return correctAnswers;
            }
            else return undefined;
        }
    }

}

export default CategoryPage;