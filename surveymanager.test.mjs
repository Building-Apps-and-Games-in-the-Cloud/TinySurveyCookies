import { SurveyManager } from './surveymanager.mjs';

let newSurveyValues = {
  topic: "robspizza",
  options: [
    { text: "margherita", count: 0 },
    { text: "pepperoni", count: 0 },
    { text: "chicken", count: 0 },
    { text: "ham and pineapple", count: 0 },
    { text: "mushroom", count: 0 }
  ]
};

function optionsTest() {
  let manager = new SurveyManager();
  let error = "";
  manager.storeSurvey(newSurveyValues);

  if (!manager.surveyExists("robspizza")) {
    error = error + "survey not stored\n";
  }
  else {
    let surveyOptions = manager.getOptions("robspizza");

    if (surveyOptions.topic != "robspizza") {
      error = error + "topic not stored\n";
    }

    if (surveyOptions.options.length != newSurveyValues.options.length) {
      error = error + "options array wrong length\n";
    }

    newSurveyValues.options.forEach(option => {
      let testOption = surveyOptions.options.find(item => item.text == option.text);
      if (testOption == undefined) {
        error = error + "option missing\n";
      }
    });
  }
  return error;
}

test('Store and retrieve options', () => {
  expect(optionsTest()).toBe("");
});

function countsTest() {
  let manager = new SurveyManager();
  let error = "";
  manager.storeSurvey(newSurveyValues);

  if (!manager.surveyExists("robspizza")) {
    error = error + "survey not stored\n";
  }
  else {
    let surveyOptions = manager.getCounts("robspizza");

    if (surveyOptions.topic != "robspizza") {
      error = error + "topic not stored\n";
    }

    if (surveyOptions.options.length != newSurveyValues.options.length) {
      error = error + "options array wrong length\n";
    }

    newSurveyValues.options.forEach(option => {
      let testOption = surveyOptions.options.find(item => item.text == option.text);
      if (testOption == undefined) {
        error = error + "option missing\n";
      }
      if (testOption.count != option.count) {
        error = error + "incorrect count\n";
      }
    });
  }
  return error;
}

test('Store and retrieve results', () => {
  expect(countsTest()).toBe("");
});

function incrementTest() {
  let manager = new SurveyManager();
  let error = "";
  manager.storeSurvey(newSurveyValues);
  manager.incrementCount({ topic:"robspizza", option:"pepperoni"});
  let surveyOptions = manager.getCounts("robspizza");

  newSurveyValues.options.forEach(option => {
    let testOption = surveyOptions.options.find(item => item.text == option.text);
    if (testOption == undefined) {
      error = error + "option missing\n";
    }
    else {
      if (testOption.text == "pepperoni") {
        if (testOption.count != 1) {
          error = error + "count increment failed";
        }
      }
      else {
        if (testOption.count != 0) {
          error = error + "incremented wrong count";
        }
      }
    }
  });
  return error;
}

test('Increment a count', () => {
  expect(incrementTest()).toBe("");
});

/**
 * Runs a test on a survey definition. Will throw an exception if it fails
 * 
 * @param {object} newValue test survey definition 
 */
function surveyTest(newValue) {
  let manager = new SurveyManager();
  manager.storeSurvey(newValue);
}

let missingTopic = {
  options: [
    { text: "margherita", count: 0 },
    { text: "pepperoni", count: 0 },
    { text: "chicken", count: 0 },
    { text: "ham and pineapple", count: 0 },
    { text: "mushroom", count: 0 }
  ]
};

test('Missing topic property', () => {
  expect(() => surveyTest(missingTopic)).toThrow("Missing topic property in storeSurvey\n");
});

let missingOptions = {
  topic: "robspizza"
};

test('Missing options', () => {
  expect(() => surveyTest(missingOptions)).toThrow("Missing options in storeSurvey\n");
});

let invalidOptions = {
  topic: "robspizza",
  options: "hello"
};

test('Invalid options', () => {
  expect(() => surveyTest(invalidOptions)).toThrow("Options not an array in storeSurvey\n");
});

let missingOptionText = {
  topic: "robspizza",
  options: [
    { count: 0 },
    { text: "pepperoni", count: 0 },
    { text: "chicken", count: 0 },
    { text: "ham and pineapple", count: 0 },
    { text: "mushroom", count: 0 }
  ]
};

test('Missing option text', () => {
  expect(() => surveyTest(missingOptionText)).toThrow("Missing text in option in storeSurvey\n");
});

let missingOptionCount = {
  topic: "robspizza",
  options: [
    { text: "margherita" },
    { text: "pepperoni", count: 0 },
    { text: "chicken", count: 0 },
    { text: "ham and pineapple", count: 0 },
    { text: "mushroom", count: 0 }
  ]
};

test('Missing option count', () => {
  expect(() => surveyTest(missingOptionCount)).toThrow("Missing count in option margherita in storeSurvey\n");
});

