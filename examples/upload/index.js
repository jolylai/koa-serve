(() => {
  const fileUpload = document.getElementById("file-upload");

  const uploadFile = (file) => {
    const formData = new FormData();

    formData.append("file", file);

    return axios({
      method: "post",
      baseURL: "http://localhost:7070",
      url: "/api/upload/image",
      data: formData,
    });
  };

  const fileHandler = (event) => {
    event.preventDefault();

    const { files } = event.target;

    if (files[0]) {
      uploadFile(files[0]);
    }
  };

  fileUpload.addEventListener("change", fileHandler);
})();
