/**
 * The primary context used in our frontend, which is done during onboarding.
 * Once a user signs up we can rely more on server state.
 */
import {
  DiscountCode,
  QuestionResponse,
  UserReferrerType,
} from "@healthgent/server/src/lib/api_types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

// This should be switched to useReducer or recoil.js at this point

interface OnboardingContext {
  // The time slot the user selected for their initial appointment
  selectedTimeSlot: string;
  setSelectedTimeSlot: Dispatch<SetStateAction<string>>;
  // User's email
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  // User's phone number
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  // The state the user lives in. Used to determine eligibility
  residenceState: string;
  setResidenceState: Dispatch<SetStateAction<string>>;
  // The intake id returned by the server once the user fills out the quiz
  intakeId: string;
  setIntakeId: Dispatch<SetStateAction<string>>;
  // User's first name
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  // User's last name
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  // User's zip code
  zipCode: string;
  setZipCode: Dispatch<SetStateAction<string>>;
  // The current question index within the quiz
  currentQuestionIdx: number;
  setCurrentQuestionIdx: Dispatch<SetStateAction<number>>;
  // User's date of birth
  birthdate: Date;
  setBirthdate: Dispatch<SetStateAction<Date>>;
  // A notification to be displayed to the user during onboarding, if any
  notification?: string;
  setNotification: Dispatch<SetStateAction<string>>;
  // An error to be displayed to the user during onboarding, if any
  error?: string;
  setError: Dispatch<SetStateAction<string>>;
  // User's responses to the quiz
  answers: Array<QuestionResponse>;
  setAnswers: Dispatch<SetStateAction<Array<QuestionResponse>>>;
}

interface BookingContext {
  // Server timeslot ID
  slotId: string;
  // appointment timestamp
  slotDate: Date;
}

interface ContextType {
  onboarding: OnboardingContext;
  booking: BookingContext;
  setBookingContext: Dispatch<SetStateAction<BookingContext>>;
  discountCode?: DiscountCode;
  setDiscountCode: Dispatch<SetStateAction<DiscountCode | undefined>>;
  initialParams?: UserReferrerType;
  setInitialParams: Dispatch<SetStateAction<UserReferrerType | undefined>>;
}

// @ts-ignore
const AppContext = createContext<ContextType>({});

export const AppContextProvider: React.FC<{}> = ({ children }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [email, setEmail] = useState("");
  const [residenceState, setResidenceState] = useState("");
  const [discountCode, setDiscountCode] = useState<DiscountCode | undefined>();
  const [intakeId, setIntakeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Array<QuestionResponse>>([]);
  const [birthdate, setBirthdate] = useState<Date>(new Date());
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [initialParams, setInitialParams] = useState<UserReferrerType>();

  const [bookingContext, setBookingContext] = useState<BookingContext>({
    slotId: "",
    slotDate: new Date(),
  });

  const state = {
    onboarding: {
      selectedTimeSlot,
      setSelectedTimeSlot,
      email,
      setEmail,
      residenceState,
      setResidenceState,
      intakeId,
      setIntakeId,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      phone,
      setPhone,
      zipCode,
      setZipCode,
      currentQuestionIdx,
      setCurrentQuestionIdx,
      answers,
      setAnswers,
      birthdate,
      setBirthdate,
      notification,
      setNotification,
      error,
      setError,
    },
    booking: bookingContext,
    setBookingContext: setBookingContext,
    discountCode,
    setDiscountCode,
    initialParams,
    setInitialParams,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  return useContext<ContextType>(AppContext);
}
