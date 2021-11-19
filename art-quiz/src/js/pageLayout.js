import CategoryPage from './categoryPage';
import ScorePage from './scorePage';
import QuizPage from './quizPage';

class PageLayout {

    static createImage = (src) => new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = src;
    });

    static async setMainPage() {
        const src = `./assets/img/background.jpg`;
        const bgImage = await this.createImage(src);
        document.querySelector('body').style.backgroundImage = `url(${bgImage.src})`;
        document.querySelector('.main').innerHTML = `
            <div class="button-container">
                <div class="main__button" id="artists">Artists</div>
                <div class="main__button" id="pictures">Pictures</div>
            </div>`;
    }

    static init(fromPage, toPage) {
        if (toPage === 'home') this.setMainPage();
        if (toPage === 'score') ScorePage.setScorePage();
        // if (fromPage === 'score' && typeof toPage === 'number') ScorePage.renderCards(toPage);
        if (toPage === 'artists' || toPage === 'pictures') CategoryPage.setArtistsPage(toPage);
        if (typeof toPage === 'number' && fromPage !== 'score') QuizPage.setQuizPage(fromPage, toPage);
    }

}

export default PageLayout;