/**
 * Used to display the pre-signup questionnaire with the GAD7/PHQ9 questions
 * along with some other relevant screening.
 */
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import OnboardingContainer from "../../components/onboarding/OnboardingContainer";
import Quiz from "../../components/onboarding/quiz/Quiz";
import { submitQuiz } from "../../lib/api";
import {
  QuestionResponse,
  QuizType,
} from "@healthgent/server/src/lib/api_types";
import { logEvent } from "../../lib/event_logging";
import { useAppContext } from "../../context/AppContext";
import WhatWeTreat from "../../components/onboarding/quiz/WhatWeTreat";

const quiz: QuizType = {
  questions: [
    {
      question_type: "MULTIPLE_CHOICE",
      key: "concerns",
      content:
        "What are your main concerns about your mental health right now?",
      choices: [
        { content: "Anxious", key: "anxiety" },
        { content: "Feeling depressed", key: "depression" },
        { content: "Can't sleep", key: "insomnia" },
        { content: "Can't focus", key: "focus" },
        { content: "Something else", key: "other" },
      ],
      allowMultiple: true,
    },
    {
      question_type: "INTERSTITIAL",
      key: "unused-1",
      content: "How would you describe your concerns?",
      custom: (a: Array<QuestionResponse>) => (
        <WhatWeTreat
          response={
            a.find((r) => r.question.key === "concerns") as QuestionResponse
          }
        />
      ),
    },
    {
      question_type: "MULTIPLE_CHOICE",
      key: "contribute_concerns",
      content:
        "Is there anything in your life that may be contributing to your concerns?",
      choices: [
        { content: "Life event, transition, or stressor", key: "life_event" },
        { content: "Family or relationship changes", key: "relationship" },
        { content: "School or career changes", key: "school_career" },
        { content: "Medical conditions", key: "medical_conditions" },
        { content: "Loss of a loved one", key: "loss" },
        { content: "None of the above", key: "none" },
      ],
      allowMultiple: true,
    },
    // {
    //   question_type: "FREEFORM",
    //   key: "patient_intent",
    //   content: "What brought you here today?",
    //   subtext:
    //     "All of your responses are confidential. We use this assessment to find you the best care possible.",
    //   inputType: "textarea",
    // },
    {
      question_type: "MULTIPLE_CHOICE",
      key: "pronouns",
      content: "What are your preferred pronouns?",
      subtext: "We support you, however you identify.",
      choices: [
        { content: "he/him/his", key: "he" },
        { content: "she/her/hers", key: "she" },
        { content: "they/them/theirs", key: "they" },
        { content: "Different identity", key: "different_identity" },
      ],
    },
    {
      question_type: "MULTIPLE_CHOICE",
      key: "sex",
      content: "What was your sex assigned at birth?",
      choices: [
        { content: "Male", key: "male" },
        { content: "Female", key: "female" },
      ],
    },
    // {
    //   question_type: "MULTIPLE_CHOICE",
    //   key: "previous_therapy",
    //   content: "Have you seen a therapist before?",
    //   choices: [
    //     { content: "Yes", key: "yes" },
    //     { content: "No", key: "no" },
    //   ],
    // },
    // {
    //   question_type: "MULTIPLE_CHOICE",
    //   key: "psych_view",
    //   content: "When it comes to seeing a psychiatrist, you are:",
    //   choices: [
    //     {
    //       content: "Informed",
    //       key: "informed",
    //       subtext: "You know more than the average person.",
    //     },
    //     {
    //       content: "Curious",
    //       key: "curious",
    //       subtext: "You know a bit, but want to learn more.",
    //     },
    //     {
    //       content: "Skeptical",
    //       key: "skeptical",
    //       subtext: "You're not convinced yet.",
    //     },
    //   ],
    // },
    // {
    //   question_type: "MULTIPLE_CHOICE",
    //   key: "previous_psych_med",
    //   content: "Have you taken psychiatric medication in the past?",
    //   choices: [
    //     { content: "Yes", key: "yes" },
    //     { content: "No", key: "no" },
    //   ],
    // },
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

    // SPLIT
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
    {
      question_type: "MULTIPLE_CHOICE",
      key: "suicide_attempt",
      content: "Have you ever attempted to commit suicide?",
      choices: [
        {
          content: "Yes, in the last five years",
          key: "recent_suicide_attempt",
        },
        {
          content: "Yes, more than five years ago",
          key: "previous_suicide_attempt",
        },
        { content: "No", key: "no" },
      ],
    },
    {
      question_type: "MULTIPLE_CHOICE",
      key: "previous_diagnosis",
      content:
        "Has a physician ever diagnosed you with any of the following conditions?",
      choices: [
        { content: "Major depressive disorder", key: "depression" },
        { content: "Generalized anxiety disorder", key: "anxiety" },
        { content: "Panic disorder", key: "panic" },
        { content: "Obsessive compulsive disorder (OCD)", key: "ocd" },
        { content: "Bipolar disorder", key: "bipolar" },
        { content: "ADHD/ADD", key: "adhd" },
        { content: "Schizophrenia", key: "schizophrenia" },
        {
          content: "Eating disorder (anorexia, bullimia, etc)",
          key: "eating_disorder",
        },
        { content: "None of the above", key: "none" },
      ],
      allowMultiple: true,
      noneDesc: "I have not been diagnosed",
    },
    {
      question_type: "FREEFORM",
      key: "occupation",
      content: "What is your current occupation?",
      subtext: "Work related stress can be a major factor in mental health.",
      inputType: "text",
    },
    // {
    //   question_type: "MULTIPLE_CHOICE",
    //   key: "hear_about_us",
    //   content: "How did you hear about us?",
    //   choices: [
    //     { content: "Google Search", key: "google" },
    //     { content: "Friend", key: "friend" },
    //     { content: "Facebook/Instagram", key: "facebook_ig" },
    //     { content: "Snapchat", key: "snapchat" },
    //     { content: "TikTok", key: "tiktok" },
    //     { content: "Blog/other website", key: "blog" },
    //     { content: "Other", key: "other" },
    //   ],
    //   allowMultiple: true,
    // },
    {
      question_type: "MULTIPLE_CHOICE",
      key: "how_ready",
      content: "How ready are you to pursue treatment?",
      choices: [
        { content: "Very Ready", key: "very_ready" },
        { content: "Somewhat Ready", key: "somewhat_ready" },
        { content: "Not Ready", key: "not_ready" },
        { content: "Not Sure", key: "not_sure" },
      ],
    },
  ],
};

interface Props { }

const getNewQuiz = (answers: Array<QuestionResponse>) => {
  const concerns = answers.find((r) => r.question.key === "concerns");
  if (!concerns || concerns.answer.length < 2) {
    return quiz;
  }

  const mainConcern = {
    question_type: "MULTIPLE_CHOICE",
    key: "main_concern",
    content: "Which concern is your primary concern?",
    choices: [
      ...concerns.answer.map((a) => ({
        content: a.content,
        key: `${a.key}_main`,
        value: a.value,
      })),
      { content: "Not sure", key: "none" },
    ],
  };

  const newQuiz = {
    questions: [quiz.questions[0], mainConcern, ...quiz.questions.slice(1)],
  };
  return newQuiz as QuizType;
};

const QuestionnairePage: React.FC<Props> = () => {
  const { onboarding } = useAppContext();
  const { currentQuestionIdx, setCurrentQuestionIdx, answers, setAnswers } =
    onboarding;

  const router = useRouter();

  useEffect(() => {
    logEvent("start-questionnaire");
  }, []);

  useEffect(() => {
    router.push(
      `/onboarding/questionnaire?question=${currentQuestionIdx + 1}`,
      undefined,
      {
        shallow: true,
      }
    );
  }, [currentQuestionIdx]);

  useEffect(() => {
    if (onboarding.intakeId) {
      logEvent("complete-assessment");
      router.push(`/onboarding/complete/name?intakeId=${onboarding.intakeId}`);
    }
  }, [onboarding.intakeId]);

  useEffect(() => {
    const question = router.query?.question as string;
    if (question) {
      const idx = parseInt(question);
      setCurrentQuestionIdx(Math.min(idx - 1, answers.length));
    }
  }, [router.query]);

  const onComplete = async (quiz: Array<QuestionResponse>) => {
    const intakeId = await submitQuiz(quiz);
    onboarding.setIntakeId(intakeId);
  };

  const onBack = () => {
    if (currentQuestionIdx === 0) {
      router.back();
      return;
    }
    setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1));
  };

  const updateAnswers = (answer: QuestionResponse) => {
    setAnswers((currentAnswers) => {
      const filtered = currentAnswers.filter(
        (a) => a.question.key !== answer.question.key
      );
      return [...filtered, answer];
    });
  };

  const customQuiz = getNewQuiz(answers);

  const onNext = (answer: QuestionResponse) => {
    updateAnswers(answer);
    if (currentQuestionIdx === customQuiz.questions.length - 1) {
      onComplete(answers);
    } else {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };
  const pct = 25 + 60 * (currentQuestionIdx / customQuiz.questions.length);
  return (
    <OnboardingContainer
      stage="questionnaire"
      percent={pct}
      title="Lina - Questionnaire"
    >
      <Quiz
        quiz={customQuiz}
        answers={answers}
        onBack={onBack}
        onNext={onNext}
        currentQuestionIdx={currentQuestionIdx}
      />
    </OnboardingContainer>
  );
};

export default QuestionnairePage;
