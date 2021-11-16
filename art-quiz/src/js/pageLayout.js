import MainPage from './mainPage'
import CategoryPage from './categoryPage'
import QuizPage from './quizPage'

class PageLayout {
    
    constructor(page) {
        this.page = page;
        this.body = document.querySelector('body');
        this.mainElement = document.querySelector('.main');
        this.init();
    }

    static createImage = (src) => new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = src;
    });

    init() {
        if (this.page === 'home') new MainPage;
        if (this.page === 'artists' || this.page === 'pictures') new CategoryPage(this.page);
        if (typeof this.page === 'number') new QuizPage(this.page);
    }

}

export default PageLayout;