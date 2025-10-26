import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineCalendar } from "react-icons/hi";
import "../App.css";

const PaymentCard = ({
  room,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  loading,
  onClose,
  handlePayment,
}) => {

  // Custom input with clickable calendar icon
  const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
    <div className="relative w-full">
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        placeholder={placeholder}  // now it will show
        readOnly
        className="w-full border border-gray-400 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-black focus:ring-0 text-gray-800 transition-all duration-200"
      />
      <HiOutlineCalendar
        className="absolute right-3 top-3 w-6 h-6 text-gray-500 cursor-pointer transition-transform duration-200 transform hover:scale-120"
        onClick={onClick} // makes icon clickable
      />
    </div>
  ));

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative flex flex-col items-center gap-6">

        {/* Header */}
        <div className="text-center w-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Book {room.type}</h2>
          <p className="text-gray-700 font-semibold">Price: ₹{room.price}</p>
        </div>

        {/* Check-in */}
        <div className="w-full">
          <label className="block mb-2 font-medium text-gray-700">Check-in Date & Time</label>
          <DatePicker
            selected={checkIn}
            onChange={setCheckIn}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            timeCaption="Time"
            dateFormat="dd/MM/yyyy h:mm aa"
            customInput={<CustomInput />}
            placeholderText="Check-in" // <-- THIS is important
          />
        </div>

        {/* Check-out */}
        <div className="w-full">
          <label className="block mb-2 font-medium text-gray-700">Check-out Date & Time</label>
          <DatePicker
            selected={checkOut}
            onChange={setCheckOut}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            timeCaption="Time"
            dateFormat="dd/MM/yyyy h:mm aa"
            customInput={<CustomInput />}
            placeholderText="Check-out" // <-- THIS is important
          />
        </div>

        {/* Buttons */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay & Book Now"}
        </button>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium shadow transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
