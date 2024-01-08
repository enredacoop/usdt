import { useState } from "react";
import "./styles.scss";
import { useApiService } from "../../hooks/useApiService";

const Form = () => {
  const [file, setFile] = useState<File | null>(null);
  const apiService = useApiService();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    if (!(document.getElementById("email") as HTMLInputElement).value) {
      alert("Please enter your email address.");
      return;
    }
    if (!(document.getElementById("title") as HTMLInputElement).value) {
      alert("Please enter the title of the document.");
      return;
    }
    if (!(document.getElementById("terms") as HTMLInputElement).checked) {
      alert("Please accept the Terms and Conditions.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "email",
      (document.getElementById("email") as HTMLInputElement).value
    );
    formData.append(
      "title",
      (document.getElementById("title") as HTMLInputElement).value
    );
    formData.append(
      "terms",
      (document.getElementById("terms") as HTMLInputElement).checked.toString()
    );

    apiService
      .uploadFile(formData)
      .then((res) => {
        alert("File uploaded successfully.");
        console.log(res);
      })
      .catch((err) => {
        alert("File upload failed.");
        console.log(err);
      });
  };

  return (
    <div className="form">
      <div className="form__heading">
        <h3>Send your document</h3>
      </div>
      <div className="form__body">
        <label htmlFor="file" className="form__fileupload">
          <img
            src="src/assets/img/upload-button.svg"
            alt="Upload File Button"
            width={48}
            height={48}
          />
          {file && <span>{file.name}</span>}
          {!file && <span>Upload PDF document</span>}
          <input
            type="file"
            name="file"
            id="file"
            hidden
            onChange={handleFileChange}
          />
        </label>
        <div className="form__email">
          <label hidden htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email address"
          />
        </div>
        <div className="form__title">
          <label hidden htmlFor="title">
            Title
          </label>
          <input
            type="title"
            name="title"
            id="title"
            placeholder="Title of the document"
          />
        </div>
        <div className="form__terms">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms">
            I accept the Terms and Conditions by submitting the file.
          </label>
        </div>
      </div>
      <div className="form__submitbutton">
        <button type="submit" onClick={handleFormSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Form;
