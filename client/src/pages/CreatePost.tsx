import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormField, Loader } from "../components";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generateingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    console.log("formState", formState);
  };

  const handleChange = (e: any) => {};

  const handleSurpriseMe = () => {};

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
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
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
      </form>
    </section>
  );
};
