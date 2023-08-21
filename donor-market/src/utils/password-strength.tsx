/**
 * Password validator for login pages
 */
import value from '../assets/scss/_themes-vars.module.scss';

// has number
const hasNumber = (number: string) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number: string) =>
  new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number: string) =>
  new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count: number) => {
  if (count < 2) return { label: 'Poor', color: '#f44336' };
  if (count < 3) return { label: 'Weak', color: '#ffc107' };
  if (count < 4) return { label: 'Normal', color: '#ffab91' };
  if (count < 5) return { label: 'Good', color: '#00e676' };
  if (count < 6) return { label: 'Strong', color: '#00c853' };
  return { label: 'Poor', color: '#f44336' };
};

// password strength indicator
export const strengthIndicator = (number: string) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};
