import MainPage from './mainPage'
import CategoryPage from './categoryPage'

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
        switch(this.page) {
            case 'home':
                new MainPage;
                break;
            case 'artists':
                new CategoryPage('artists');
                break;
            case 'pictures':
                new CategoryPage('pictures');
                break;
        }
    }

}

export default PageLayout;