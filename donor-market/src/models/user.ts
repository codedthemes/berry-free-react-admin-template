// user.ts
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  signUpDate?: Date | null;
  bloodType?: string | null;
  dateOfLastDonation?: Date | null;
  location?: string | null;
  contactInformation?: string | null;
  medicalHistory?: string | null;
  age?: number | null;
  weight?: number | null;
  gender?: string | null;
  donationPreferences?: string | null;
  availability?: string | null;
  consentForFutureContact?: boolean | null;
}
