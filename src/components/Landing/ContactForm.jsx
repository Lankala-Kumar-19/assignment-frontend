import React, { useState } from "react";
import { submitContactForm } from "../../api/contactForms";
import { toast } from "react-toastify";
import contactBg from "../../assests/contact-bg.svg";

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobileNumber: "", // match backend
    city: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitContactForm(form); // form now matches backend DTO
      toast.success("Submitted successfully!");
      setForm({ fullName: "", email: "", mobileNumber: "", city: "" });
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Submission failed");
    }
  };

  return (
    <section
      className="relative py-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">

          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">Let’s Build Something Great</h2>
            <p className="text-lg mb-6 max-w-md">
              Get expert consultation for your next project.  
              We help businesses turn ideas into reality with
              design, technology, and strategy.
            </p>
            <ul className="space-y-2 text-base">
              <li>✔ Free project consultation</li>
              <li>✔ Expert team support</li>
              <li>✔ Fast response</li>
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="flex justify-end">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Get a Free Consultation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {["fullName", "email", "mobileNumber", "city"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={
                      field === "fullName"
                        ? "Full Name"
                        : field === "email"
                        ? "Enter Email Address"
                        : field === "mobileNumber"
                        ? "Mobile Number"
                        : "Area, City"
                    }
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded border border-gray-300
                               focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                ))}

                <button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium transition"
                  type="submit"
                >
                  Get Quick Quote
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
