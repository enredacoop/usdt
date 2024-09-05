import { useState } from "react";
import "./styles.scss";
import uploadImg from "../../assets/img/upload-button.svg";
import { useApiService } from "../../hooks/useApiService";
import Loader from "../Loader";
import Check from "../Check";
import Lock from "../Lock";

const VERIFICATION_CODE_LENGTH = 8;
const INITIAL_STEP = 1;

const controller = new AbortController();

const Form = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState(new FormData());
  const [UUID, setUUID] = useState("");
  const [step, setStep] = useState(INITIAL_STEP);

  const apiService = useApiService();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const terms = (document.getElementById("terms") as HTMLInputElement)
      .checked;

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    if (!name) {
      alert("Please enter the name of the document.");
      return;
    }
    if (!terms) {
      alert("Please accept the Terms and Conditions.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("name", name);

    setFormData(formData);

    try {
      const { uuid } = await apiService.sendVerification({ email });
      console.log("Send verification");
      console.log(uuid);
      setUUID(uuid);
      setStep(2);
    } catch (error) {
      alert("Error sending verification.");
    }
  };

  const handleVerification = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const token = (document.getElementById("verification") as HTMLInputElement)
      .value;

    if (!token) {
      alert("Please enter the verification code.");
      return;
    }

    formData.append("token", token);

    const email = formData.get("email") as string;

    try {
      await apiService.verifyCode({ uuid: UUID, token, email });
      setStep(3);
      await handleDocumentUpload();
    } catch (error) {
      alert("Error uploading file.");
    }
  };

  const handleDocumentUpload = async () => {
    formData.append("uuid", UUID);
    try {
      await apiService.postDocument(formData, controller.signal);
      setStep(4);
    } catch (error) {
      alert("Error uploading file.");
    }
  };

  const handleCancelation = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    controller.abort();
    handleReset();
  };

  const handleReset = () => {
    setFile(null);
    setFormData(new FormData());
    setStep(1);
  };

  return (
    <div className="form">
      <div className="form__heading">
        <h3>Send your document</h3>
      </div>
      {step === 1 && (
        <>
          <div className="form__body">
            <label htmlFor="file" className="form__fileupload">
              <img
                src={uploadImg}
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
            <div className="form__name">
              <label hidden htmlFor="name">
                Title
              </label>
              <input
                type="name"
                name="name"
                id="name"
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
            <button
              className="fill"
              type="submit"
              onClick={(e) => handleFormSubmit(e)}
            >
              Send
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="form__body">
            <div className="form__verification">
              <Lock />
              <h4>Confirm your email address</h4>
              <label hidden htmlFor="verification">
                Verification Code
              </label>
              <input
                type="text"
                name="verification"
                id="verification"
                placeholder="Verification Code"
                maxLength={VERIFICATION_CODE_LENGTH}
              />
              <p>
                We have sent a verification code to{" "}
                <b>{formData.get("email") as string}</b> to ensure it's you.
              </p>
            </div>
          </div>
          <div className="form__submitbutton">
            <button
              className="fill"
              type="submit"
              onClick={(e) => handleVerification(e)}
            >
              Verify
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className="form__body">
            <div className="form__loading">
              <Loader />
              <h4>Sending document</h4>
              <p>Do not close this window until the submission is complete.</p>
            </div>
          </div>
          <div className="form__submitbutton">
            <button
              className="outline"
              type="submit"
              onClick={(e) => handleCancelation(e)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
      {step === 4 && (
        <>
          <div className="form__body">
            <div className="form__success">
              <Check />
              <h4>Your document has been successfully submitted</h4>
              <p>
                You will receive a link to your email address{" "}
                <b>{formData.get("email") as string}</b> with the results. Your
                results will be stored in the Knowledge for Sustainability
                portal.
              </p>
            </div>
          </div>
          <div className="form__submitbutton">
            <button className="outline" type="submit" onClick={handleReset}>
              Send another document
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
