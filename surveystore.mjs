class Option {
  constructor(newValue) {
    this.text = newValue.text;
    this.count = newValue.count;
  }

  incrementCount() {
    this.count = this.count + 1;
  }

  getCount() {
    return this.count;
  }
}

class Survey {
  constructor(newValue) {
    this.topic = newValue.topic;
    this.options = [];
    newValue.options.forEach(optionValues => {
      let newOption = new Option(optionValues);
      this.options.push(newOption);
    });
  }

  incrementCount(text) {
    let option = this.options.find(
      item => item.text == text);
    if (option != undefined) {
      option.incrementCount();
    }
  }

  getCounts() {
    let options = [];
    this.options.forEach(option => {
      let countInfo = { text: option.text, count: option.getCount() };
      options.push(countInfo);
    });
    let result = { topic: this.topic, options: options };
    return result;
  }

  getOptions() {
    let options = [];
    this.options.forEach(option => {
      let optionInfo = { text: option.text };
      options.push(optionInfo);
    });
    let result = { topic: this.topic, options: options };
    return result;
  }
}

class Surveys {
  constructor() {
    this.surveys = [];
  }

  saveSurvey(survey) {
    this.surveys.push(survey);
  }

  getSurveyByTopic(topic) {
    return this.surveys.find(element => element.topic == topic);
  }
}

export { Option, Survey, Surveys };
