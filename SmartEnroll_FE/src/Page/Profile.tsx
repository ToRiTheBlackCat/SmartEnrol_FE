import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      {/* Header */}
      <div className="flex items-center border-b pb-6">
        <img
          src="https://via.placeholder.com/80"
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">Alexa Rawles</h2>
          <p className="text-gray-500">alexarawles@gmail.com</p>
        </div>
        <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg">Edit</button>
      </div>

      {/* Profile Fields */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {[
          "Full Name",
          "Nick Name",
          "Gender",
          "Country",
          "Language",
          "Time Zone",
        ].map((label, index) => (
          <div key={index}>
            <label className="text-gray-600 text-sm block mb-2">{label}</label>
            <input
              type="text"
              placeholder="Your First Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}
      </div>

      {/* Email Addresses */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">My email Address</h3>
        <div className="flex items-center bg-gray-100 p-4 rounded-lg mt-4">
          <span className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full">@</span>
          <div className="ml-4">
            <p className="text-gray-800">alexarawles@gmail.com</p>
            <p className="text-gray-500 text-sm">1 month ago</p>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">+ Add Email Address</button>
      </div>
    </div>
  );
};

export default ProfilePage;
