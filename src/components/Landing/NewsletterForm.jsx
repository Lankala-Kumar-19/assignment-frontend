import React, { useState } from "react";
import { subscribeNewsletter } from "../../api/newsletters";
import { toast } from "react-toastify";
import rect from "../../assests/Rectangle.svg"; // make sure folder is correct

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await subscribeNewsletter({ email });
      toast.success("Subscribed!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe");
    }
  };

  return (
    <section
      className="relative bg-cover bg-center min-h-[350px] flex flex-col items-center justify-end py-10"
      style={{ backgroundImage: `url(${rect})` }}
    >
      <div className="max-w-2xl w-full px-4 text-center text-white mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Subscribe to our Newsletter
        </h2>
        <p className="text-base md:text-lg">
          Get the latest updates and news directly in your inbox.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 rounded-l-md w-full outline-none"
        />
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-r-md font-semibold">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterForm;
