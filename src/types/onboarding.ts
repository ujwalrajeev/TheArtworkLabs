export interface UserDetails {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  fullName: string;
  email: string;
  countryCode: number;
  phone: number;
  country: string;
  state: string;
  city: string;
  pincode: string;
  houseNumber: string;
  streetName: string;
  deliveryInstructions: string;
}

export interface UserInterestData {
  currentEvents: string;
  specialDates: string;
  otherData: string;
}

export interface OnboardingData {
  userDetails: UserDetails;
  selectedPlan: number;
  selectedInterests: string[];
  interestData: UserInterestData;
}
