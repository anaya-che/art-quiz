import CategoryPage from './categoryPage'
import QuizPage from './quizPage'

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

    static init(page) {
        if (page === 'home') this.setMainPage();
        if (page === 'artists' || page === 'pictures') CategoryPage.setArtistsPage(page);
        if (typeof page === 'number') QuizPage.setQuizPage(page);
    }

}

export default PageLayout;