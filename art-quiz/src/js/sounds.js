import Settings from './settings';
const soundEffects = document.querySelector('.soundEffects');

class Sounds {
    
    static playMusic() {
        audioMusic.play();
    }

    static stopMusic() {
        audioMusic.pause();
    }

    static correctSound() {
        soundEffects.setAttribute('src', "../assets/audio/correct.mp3");
        soundEffects.play();
    }

    static errorSound() {
        soundEffects.setAttribute('src', "../assets/audio/error.mp3");
        soundEffects.play();
    }

    static endOfQuiz() {
        soundEffects.setAttribute('src', "../assets/audio/success.mp3");
        soundEffects.play();
    }
}

export default Sounds;