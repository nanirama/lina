import { IntakeResponse } from "../../models/intake";

export const createIntakeResponse = async (override: any = {}) => {
  const intake = await IntakeResponse.query().insertGraphAndFetch({
    eligible: true,
    ...override,
  });
  await intake.$query().patch({
    response: {
      answers: [
        {
          question: {
            key: "phq-key",
            content: "phq question content",
          },
          answer: [{ value: 2 }],
        },
        {
          question: {
            key: "phq-key",
            content: "phq question content",
          },
          answer: [{ value: 10 }],
        },
        {
          question: {
            key: "gad-key",
            content: "gad question content",
          },
          answer: [{ value: 100 }],
        },
        {
          question: {
            key: "gad-key",
            content: "gad question content",
          },
          answer: [{ value: 30 }],
        },
      ],
    },
  });
};
