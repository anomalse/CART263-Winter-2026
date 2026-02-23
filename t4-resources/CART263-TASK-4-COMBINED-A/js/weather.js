class Weather {

    constructor(hotState, coldState, rainyState, currentTemperature) {

        //States of weather
        this.hotState = hotState;
        this.coldState = coldState;
        this.rainyState = rainyState;

        //Always begin with hot weather 
        this.currentState = this.hotState;

        //Temperature begins at 20 degrees
        this.currentTemperature = currentTemperature !== undefined ? currentTemperature : 20;

        //Ranges for each temperature 
        this.temperatureRanges = {
            [this.hotState]: { min: 30, max: 40 },
            [this.rainyState]: { min: 12, max: 24 },
            [this.coldState]: { min: -5, max: 10 },
        };

        //Divs for weather and temperature display 
        this.weatherDiv = document.createElement("div");
        this.temperatureDiv = document.createElement("div");
    }

    //Ensuring the weather and temperature divs are mounted to the DOM, and styling them
    ensureMounted() {
        const sky = document.querySelector(".sky");

        //safety 
        if (!sky) {
            return false;
        }

        //Mount the weather div, if not already mounted, and styling 
        if (!this.weatherDiv.parentNode) {
            this.weatherDiv.style.position = "absolute";
            this.weatherDiv.style.right = "24px";
            this.weatherDiv.style.top = "24px";
            this.weatherDiv.style.zIndex = "3";
            //Append to sky div
            sky.appendChild(this.weatherDiv);
        }

        //Mount the temperature div, if not already mounted, and styling
        if (!this.temperatureDiv.parentNode) {
            this.temperatureDiv.style.position = "absolute";
            this.temperatureDiv.style.right = "20px";
            this.temperatureDiv.style.top = "120px";
            this.temperatureDiv.style.padding = "8px 12px";
            this.temperatureDiv.style.borderRadius = "12px";
            this.temperatureDiv.style.background = "rgba(255, 255, 255, 0.75)";
            this.temperatureDiv.style.fontFamily = "sans-serif";
            this.temperatureDiv.style.fontWeight = "700";
            this.temperatureDiv.style.zIndex = "3";
            //Append to sky div
            sky.appendChild(this.temperatureDiv);
        }

        return true;
    }

    //Getting the temperature range for a given weather state
    getTemperatureRangeForState(state) {
        return this.temperatureRanges[state];
    }

    //Getting a random temperature within the range for a given weather state
    getRandomTemperatureForState(state) {
        const range = this.getTemperatureRangeForState(state);
        return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    }

    //Setting the weather state and temperature
    setState(state) {
        this.currentState = state;
    }

    //Setting the temperature
    setTemperature(temperature) {
        this.currentTemperature = temperature;
    }

    //Rendering the weather 
    renderWeather() {

        //safety 
        if (!this.ensureMounted()) {
            return;
        }

        //Clear the weather div before rendering the new weather state
        this.weatherDiv.innerHTML = "";

        //Render the appropriate weather icon based on current weather state
        if (this.currentState === this.hotState) {
            this.renderSunny();
        } else if (this.currentState === this.coldState) {
            this.renderCold();
        } else if (this.currentState === this.rainyState) {
            this.renderRainy();
        }

        //Update the temperature display with the current weather state and temperature
        this.temperatureDiv.textContent =
            this.currentState + " • " + this.currentTemperature + "°C";
    }

    //Sunny weather icon
    renderSunny() {
        const sunIcon = document.createElement("div");
        sunIcon.textContent = "☀️";
        sunIcon.style.fontSize = "64px";
        this.weatherDiv.appendChild(sunIcon);
    }

    //Snowy weather icon
    renderCold() {
        const coldIcon = document.createElement("div");
        coldIcon.textContent = "❄️";
        coldIcon.style.fontSize = "58px";
        this.weatherDiv.appendChild(coldIcon);
    }

    //Rainy weather icon
    renderRainy() {
        const rainIcon = document.createElement("div");
        rainIcon.textContent = "🌧️";
        rainIcon.style.fontSize = "58px";
        this.weatherDiv.appendChild(rainIcon);
    }
}