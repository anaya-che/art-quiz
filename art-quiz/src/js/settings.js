
import Sounds from './sounds';

class Settings {

    constructor() {
        this.volume = 1;
        this.muted = 'false';
        this.tempSettings = {
            volume: this.volume,
            muted: this.muted
        };
        this.musicSwitch;
        this.volumeSwitch;
        this.volumeBar;
        this.volumeBarPercentage;
        this.volumeButton;
        this.soundEffects = document.querySelector('.soundEffects');
        document.addEventListener('click', this.volumeSettings.bind(this));
        window.addEventListener('load', this.getLocalStorage())
    }

    setSettingsPage() {
        document.querySelector('body').style.backgroundImage = `unset`;
        document.querySelector('.main').innerHTML = `<div class="settings-main-title">Settings</div>
        <div class="settings-container">
            <div class="settings-volume-container">
                <div class="settings-title">Change Volume</div>
                <div class="volume-container">
                    <div class="volume"></div>
                    <div class="volume-bar">
                        <div class="volume-bar-percentage"></div>
                    </div>
                </div>
                <div class="settings-title">Volume Off / On</div>
                <input type="checkbox" id="volume-switch">
                <label for="volume-switch" class="switch">
                    <span class="volume-switch-handle switch-handle"></span>
                    <span class="volume-switch-label switch-label" data-on="On" data-off="Off"></span>
                </label>
                <div class="settings-title">Music Off / On</div>
                <input type="checkbox" id="music-switch">
                <label for="music-switch" class="switch">
                    <span class="music-switch-handle switch-handle"></span>
                    <span class="music-switch-label switch-label" data-on="On" data-off="Off"></span>
                </label>
            </div>
            <div class="settings-timer-container">
                <div class="settings-title">Change Time</div>
                <div class="time-container">
                </div>
                <div class="settings-title">Time Off / On</div>
            </div>
            <div class="categories__button" id="home">Home</div>
            <div class="categories__button" id="save">Save</div>
        </div>`

        this.musicSwitch = document.querySelector('#music-switch');
        this.volumeSwitch = document.querySelector('#volume-switch');
        this.volumeBar = document.querySelector('.volume-bar');
        this.volumeBarPercentage = document.querySelector('.volume-bar-percentage');
        this.volumeButton = document.querySelector('.volume');

        this.showValuesOnPage();
    }

    
    volumeSettings(event) {
        if (event.target.closest('#music-switch')) {
            if (this.musicSwitch.checked) {
                this.music = 'true';
                Sounds.playMusic();
            }
            if (!this.musicSwitch.checked) {
                this.music = 'false';
                Sounds.stopMusic();
            }
        }
            
        if (event.target.closest('#volume-switch')) {
            this.muteVolumeOnPage();
        }

        if (event.target.closest('.volume-bar')) {
            this.updateVolumeOnPage(event);
        }

        if (event.target.closest('#save')) {
            this.saveSettings();
        }
    }

    setLocalStorage() {
        localStorage.setItem('volume', this.volume);
        localStorage.setItem('muted', this.muted);
    }

    getLocalStorage() {
        if (localStorage.getItem('volume')) {
            this.volume = localStorage.getItem('volume');
        }
        if (localStorage.getItem('muted')) {
            this.muted = localStorage.getItem('muted');
        }
        this.applySettings();
    }

    muteVolumeOnPage() {
        if (this.tempSettings.muted === 'false') {
            this.tempSettings.muted = 'true';
            this.muteVolume();
        }
        else {
            this.tempSettings.muted = 'false';
            this.unmuteVolume();
        }
    }

    muteVolume() {
        this.volumeButton.classList.add('muted');
        this.volumeBar.classList.add('volume-muted');
        this.volumeSwitch.checked = false;
    }

    unmuteVolume() {
        this.volumeButton.classList.remove('muted');
        this.volumeBar.classList.remove('volume-muted');
        this.volumeSwitch.checked = true;
    }

    updateVolumeOnPage(event) {
        this.tempSettings.muted = true;
        const sliderWidth = window.getComputedStyle(this.volumeBar).width;
        let newVolume = Math.abs(event.offsetX / parseInt(sliderWidth));
        if (newVolume < 0.02) newVolume = 0;
        this.volumeBarPercentage.style.width = `${newVolume * 100}%`;
        if (newVolume === 0) this.tempSettings.muted = false;
        this.muteVolumeOnPage();
        this.tempSettings.volume = newVolume;
    }

    saveSettings() {
        this.muted = this.tempSettings.muted;
        this.volume = this.tempSettings.volume;
        this.setLocalStorage();
        this.applySettings();
    }

    showValuesOnPage() {
        this.tempSettings.muted = this.muted;
        this.tempSettings.volume = this.volume;
        this.volumeBarPercentage.style.width = `${this.volume * 100}%`;
        if (this.muted == 'true') this.muteVolume();
        if (this.muted == 'false') this.unmuteVolume();
    }

    applySettings() {
        if (this.muted === 'true') this.soundEffects.muted = true;
        else this.soundEffects.muted = false;
        this.soundEffects.volume = this.volume;
    }

}

export default Settings;