// user.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  signUpDate?: Date;
  bloodType?: string;
  dateOfLastDonation?: Date;
  location?: string;
  phone?: number;
  contactInformation?: string;
  medicalHistory?: string | null;
  age?: number | null;
  weight?: number | null;
  gender?: string | null;
  donationPreferences?: string | null;
  availability?: string | null;
  consentForFutureContact?: boolean;
}
