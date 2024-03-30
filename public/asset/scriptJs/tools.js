export const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const frenchDate = `${day}/${month}/${year}`;
  return frenchDate;
};

export const round = (data) => {
  return Math.round(data / 1000);
};
export const convertir = (data) => {
  if (data >= 1000000) {
    const number = data / 1000000;
    return number.toFixed(2) + "  MB";
  } else {
    return Math.round(data / 1000) + "  kB";
  }
};

export function strToDom(str) {
  return document.createRange().createContextualFragment(str).firstChild;
}
