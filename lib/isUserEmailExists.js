async function isUserEmailExists(email) {
  // Checking if user exists
  const resUserExists = await fetch("/api/isUserEmailExists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const { isUserEmailExists } = await resUserExists.json();

  return isUserEmailExists;
}

export default isUserEmailExists;
