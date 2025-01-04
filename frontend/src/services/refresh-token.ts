export const refreshToken = async () => {
  const apiUrl = import.meta.env.API_URL
  console.log(apiUrl)
  const res = await fetch(`http://localhost:3000/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: localStorage.getItem("token")!
    })
  })

  if (res.ok) {
    const data = await res.json()
    localStorage.setItem("token", data.token)
    localStorage.setItem("user", data.user)
  } else {
    localStorage.clear()
  }
}