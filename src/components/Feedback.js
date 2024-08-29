import React, { useState } from 'react';

const FeedbackPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    yourgithub: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for SheetDB
    const data = {
      data: [
        {
          fullName: formData.fullName,
          email: formData.email,
          yourgithub: formData.yourgithub,
          additionalInfo: formData.additionalInfo,
        },
      ],
    };

    try {
      // Replace with your actual SheetDB API endpoint
      const response = await fetch('https://sheetdb.io/api/v1/77etbfu8176ru', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const submittedData = await response.json();
      console.log('Feedback submitted successfully:', submittedData);
      onClose(); // Close the popup after successful submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white p-8 rounded-2xl max-w-lg w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">help us improve</h2>
          <button onClick={onClose} className="text-gray-500">&times;</button>
        </div>
        <p className="mb-4 text-sm text-gray-600">
        "Is there anything else you'd like to share about your experience? Your feedback is valuable to us."
        </p>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="p-3 text-sm bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl focus:ring-neutral-300 focus:shadow-md transition-all" 
              placeholder='steve jobs' 
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 text-sm bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl focus:ring-neutral-300 focus:shadow-md transition-all" 
              placeholder='steve@gmail.com'
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="yourgithub" className="block text-sm font-medium text-gray-700">
              link of your github profiles<span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="yourgithub"
              name="yourgithub"
              value={formData.yourgithub}
              onChange={handleChange}
              required
              className="p-3 text-sm bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl focus:ring-neutral-300 focus:shadow-md transition-all" 
              placeholder='github.com/steve'
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
              your feedback (experience, expectations, suggestions, etc.)
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="3"
              className="p-3 text-sm bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl focus:ring-neutral-300 focus:shadow-md transition-all" 
              placeholder='I would like to see more of...'
            ></textarea>
          </div>
          <button 
            type="submit"
            className="whitespace-nowrap flex flex-row items-center justify-center gap-2 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-b from-neutral-600 to-neutral-900 text-white shadow-md hover:brightness-105 hover:shadow-lg transition-all duration-200 ease-in-out h-11 rounded-xl px-8 w-full"
          >
            submit feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPopup;