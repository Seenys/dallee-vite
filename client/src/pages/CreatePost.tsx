import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormField, Loader } from "../components";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generateingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!formState.prompt) return;
    try {
      setGeneratingImage(true);
      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: formState.prompt }),
      });

      const data = await response.json();

      setFormState({
        ...formState,
        photo: `data:image/jpeg;base64,${data.photo}`,
      });
    } catch (e) {
      console.log(e);
      alert(e);
    } finally {
      setGeneratingImage(false);
    }
  };
  const handleSubmit = () => {
    console.log("formState", formState);
  };

  const handleChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(formState.prompt);
    setFormState({ ...formState, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="text-[32px] font-extrabold text-[#222328]">
          Create a Post
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative posts with the help of AI.
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Name"
            name="name"
            value={formState.name}
            type="text"
            placeholder="Enter your name"
            handleChange={handleChange}
          />
          <FormField
            labelName="Pronpt"
            name="pronpt"
            value={formState.prompt}
            type="text"
            placeholder="A man standing in front of a stargate to another dimension"
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center intems-center">
            {formState.photo ? (
              <img
                src={formState.photo}
                alt={formState.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generateingImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5"
          >
            {generateingImage ? "Generating Image..." : "Generate Image"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image, you can share it with the world by
            clicking the button below.
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5"
            >
              {loading ? "Sharing..." : "Share with the world"}
            </button>
          </p>
        </div>
      </form>
    </section>
  );
};
