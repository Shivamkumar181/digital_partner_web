export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateAmount = (amount) => {
  return amount > 0 && !isNaN(amount);
};

export const validateProjectBudget = (budget) => {
  return budget > 0 && budget <= 1000000;
};

export const validateSkills = (skills) => {
  return skills && skills.length > 0;
};
