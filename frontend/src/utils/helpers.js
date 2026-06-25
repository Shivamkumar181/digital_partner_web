export const getAvatarUrl = (name, avatar) => {
  if (avatar && avatar !== "" && !avatar.includes("placeholder")) return avatar;
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .filter(Boolean)
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";
  return `https://ui-avatars.com/api/?background=6366f1&color=fff&bold=true&size=200&name=${encodeURIComponent(initials)}&rounded=true`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const truncateText = (text, length = 100) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

export const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return "-";
  return "****" + accountNumber.slice(-4);
};
