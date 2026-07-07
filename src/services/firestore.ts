import { db } from "../config/firebase-config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { OnboardingData } from "../types/onboarding";

export const saveOnboardingData = async (
  uid: string,
  onboardingData: OnboardingData,
) => {
  await setDoc(
    doc(db, "users", uid),
    {
      ...onboardingData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
};
