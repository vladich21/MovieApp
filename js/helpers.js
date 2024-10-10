 function showError(message) {
  const moviesEl = document.querySelector(".movies");
  moviesEl.innerHTML = `<p>${message}</p>`;
}

 function getClassByRate(vote) {
  if (vote === null || vote === undefined || vote === "null") {
    return "red";
  }
  return vote >= 7 ? "green" : vote > 5 ? "orange" : "red";
}

 function getFormattedRating(vote) {
  return vote === null || vote === undefined || vote === "null" ? "Н/Д" : vote;
}

export {showError, getClassByRate, getFormattedRating}