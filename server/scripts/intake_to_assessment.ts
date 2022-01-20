/**
 * One off script used to migrate intake responses (1 json blob per row)
 * to an assessment record (1 answer per row)
 */
import { initKnex } from "./init";
initKnex();

import { Patient } from "../src/models/patient";
import { IntakeResponse } from "../src/models/intake";
import { createAssessmentRecord } from "../src/logic/assessment";

const convertIntake = async (response: IntakeResponse) => {
  let answers = response.response.answers;
  if (response.response.followUp) {
    answers = answers.concat(response.response.followUp);
  }
  const a = await createAssessmentRecord(response.patient, answers, true);
  await a.$query().patch({ createdAt: response.createdAt });
};

const migrate = async () => {
  const responses = await IntakeResponse.query()
    .whereNotNull("patientId")
    .withGraphFetched({ patient: true });

  for (let i = 0; i < responses.length; i++) {
    console.log(`Migrating response ${i + 1} / ${responses.length}`);
    if (
      responses[i].response.answers.length === 0 ||
      responses[i].response.answers[0].answer.length === 0 ||
      typeof responses[i].response.answers[0].question.key !== "string"
    ) {
      console.log(
        `\tSkipping migration of response ${i + 1
        }, doesn't have an answer key or correct format`
      );
      continue;
    }
    await convertIntake(responses[i]);
  }
};

migrate()
  .then(() => {
    console.log("Migration complete");
  })
  .catch((e) => console.log(e))
  .finally(process.exit);
