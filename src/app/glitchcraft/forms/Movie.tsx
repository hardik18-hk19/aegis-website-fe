import { useState, useRef } from "react";
import GeneralDetails from "../components/GeneralDetails";
import useGlitchSubmit from "@/hooks/useGlitchcraftSubmit";
import { toast } from "react-hot-toast";

const Movie = () => {
  const { submitForm } = useGlitchSubmit();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Set this flag to true to close registration
  const isRegistrationClosed = true;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const response = await submitForm("MOVIE_QUIZ", formData);
    if (response.success) {
      formRef.current?.reset();
      toast.success(
        response.message +
          "\n You'll be redirected to join the official whatsapp group"
      );
      setTimeout(() => {
        window.open("https://chat.whatsapp.com/FJXPCfiYOA646NvCgClCYs");
      }, 2000);
    } else {
      toast.error("Error submitting form: " + "Potential duplicate entry");
    }
    setLoading(false);
  };

  return (
    <form
      ref={formRef}
      onSubmit={isRegistrationClosed ? undefined : handleSubmit}
      className="space-y-6 bg-black/80 p-8 rounded-xl border border-white/20 cyber-grid"
    >
      <h2 className="text-3xl font-bold text-center mb-8 neon-text">
        THE ULTIMATE MOVIE & SERIES QUIZ
      </h2>

      {/* Display registration closed message */}
      <div className="text-center mb-2 text-white">
        {isRegistrationClosed && (
          <p className="text-red-500 font-bold">
            Registration Closed: No more registrations are being accepted.
          </p>
        )}
      </div>

      {/* Disable form fields if registration is closed */}
      <GeneralDetails disabled={isRegistrationClosed} />
      <div className="space-y-4">
        <div>
          <label className="block text-white mb-2">Team Name</label>
          <input
            name="Team_Name"
            type="text"
            disabled={isRegistrationClosed}
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/30 focus:border-white focus:ring-1 focus:ring-white text-white"
            required
          />
        </div>
      </div>

      {/* Disable the submit button if registration is closed */}
      <button
        type="submit"
        disabled={isRegistrationClosed}
        className={`w-full neon-button py-3 ${
          isRegistrationClosed ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Register"}
      </button>
    </form>
  );
};

export default Movie;
