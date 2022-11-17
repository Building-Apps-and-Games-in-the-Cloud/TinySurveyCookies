import { Survey, Surveys } from './surveystore.mjs'

class SurveyManager {

    /**
     * Make a new helper store
     */
    constructor() {
        this.surveys = new Surveys();
    }

    /**
     * Stores a survey
     * @param {Object} newValue topic string and option list  
     */
    storeSurvey(newValue) {
        let errors = "";
        if (!("topic" in newValue)) {
            errors = errors + "Missing topic property in storeSurvey\n";
        }
        if (!("options" in newValue)) {
            errors = errors + "Missing options in storeSurvey\n";
        }
        else {
            if (newValue.options instanceof Array) {
                newValue.options.forEach(option => {
                    if (!("text" in option)) {
                        errors = errors + `Missing text in option in storeSurvey\n`;
                    }
                    if (!("count" in option)) {
                        errors = errors + `Missing count in option ${option.text} in storeSurvey\n`;
                    }
                    else {
                        if (isNaN(option.count)) {
                            errors = errors + `Count not a number in option ${option.text} in storeSurvey\n`;
                        }
                    }
                });
            }
            else {
                errors = errors + "Options not an array in storeSurvey\n";
            }
        }

        if (errors != "") {
            throw errors;
        }

        let survey = new Survey(newValue);
        this.surveys.saveSurvey(survey);
    }

    /**
     * Increment the count for an option in a topic
     * @param {Object} incDetails topic and option names
     */
    incrementCount(incDetails) {
        let errors = "";
        if (!("topic" in incDetails)) {
            errors = errors + "Missing topic property in incrementCount\n";
        }
        if (!("option" in incDetails)) {
            errors = errors + "Missing option in incrementCount\n";
        }
        let topic = incDetails.topic;
        let option = incDetails.option;

        let survey = this.surveys.getSurveyByTopic(topic);

        if (survey == undefined) {
            errors = errors + `Survey for ${topic} not found in incrementCount`;
        }
        else {
            if (!survey.incrementCount(option)) {
                errors = errors + `Option ${option} in survey ${topic} not found in incrementCount`;
            }
        }
        return errors;
    }

    /**
     * Checks if a survey exists
     * @param {string} topic topic of the survey
     * @returns true if the survey exists in the storage
     */
    surveyExists(topic) {
        return this.surveys.getSurveyByTopic(topic) != undefined;
    }

    /**
     * 
     * @param {string} topic of the survey
     * @returns topic and a list of option names and counts
     */
    getCounts(topic) {
        let errors = "";
        let survey = this.surveys.getSurveyByTopic(topic);
        if (survey == undefined) {
            errors = errors + `Survey with topic ${topic} not found in getCounts`;
        }
        else {
            return survey.getCounts();
        }
    }

    /**
     * 
     * @param {topic of the survey} topic 
     * @returns topic and a list of option names
     */
    getOptions(topic) {
        let errors = "";
        let survey = this.surveys.getSurveyByTopic(topic);
        if (survey == undefined) {
            errors = errors + `Survey with topic ${topic} not found in getCounts`;
        }
        else {
            return survey.getOptions();
        }
    }
}

export { SurveyManager };