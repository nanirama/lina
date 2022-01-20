/**
 * List of questions from the PHQ-9 and GAD-7 questionnaires used in our onboarding quiz.
 */
export const PHQ_QUESTIONS = [
  {
    question_type: "MULTIPLE_CHOICE",
    key: "phq-1",
    content: "Little interest in doing the things you used to enjoy",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "phq-2",
    content: "Feeling down, depressed or hopeless",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "phq-3",
    content: "Had trouble falling or staying asleep, or sleeping too much",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "phq-4",
    content: "Feeling tired or having little energy",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "phq-5",
    content: "Poor appetite or overeating",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "phq-6",
    content:
      "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "phq-7",
    content:
      "Trouble concentrating on things, such as reading the newspaper or watching television?",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "phq-8",
    content:
      "Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual?",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "phq-9",
    content:
      "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
];

export const GAD_QUESTIONS = [
  {
    question_type: "MULTIPLE_CHOICE",
    key: "gad-1",
    content: "Feeling nervous, anxious, or on edge",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "gad-2",
    content: "Not being able to stop or control worrying",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "gad-3",
    content: "Worrying too much about different things",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "gad-4",
    content: "Trouble relaxing",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "gad-5",
    content: "Being so restless that it's hard to sit still",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "gad-6",
    content: "Becoming easily annoyed or irritable",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
  {
    question_type: "MULTIPLE_CHOICE",
    key: "gad-7",
    content: "Feeling afraid as if something awful might happen",
    pretext:
      "Over the last two weeks, how often have you been bothered by the following problem?",
    choices: [
      { content: "Not at all", value: 0, key: "not_at_all" },
      { content: "Several days", value: 1, key: "several_days" },
      { content: "More than half the days", value: 2, key: "more_than_half" },
      { content: "Nearly every day", value: 3, key: "nearly_every_day" },
    ],
  },
];
