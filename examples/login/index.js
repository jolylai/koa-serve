const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);

  axios({
    method: "post",
    baseURL: "http://localhost:7070",
    url: "/api/login",
    data: formData,
    headers: {
      authorization: "cookie",
    },
  });
});
