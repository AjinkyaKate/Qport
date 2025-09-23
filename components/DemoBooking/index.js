import React, { useState } from "react";
import Button from "../Button";

// Generate available time slots for the next 14 weekdays
const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  const slotDuration = 30; // 30 minutes

  for (let day = 0; day < 14; day++) {
    const date = new Date(now);
    date.setDate(now.getDate() + day);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    const daySlots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const slotDate = new Date(date);
        slotDate.setHours(hour, minute, 0, 0);

        // Skip past times for today
        if (slotDate <= now) continue;

        daySlots.push(slotDate);
      }
    }

    if (daySlots.length > 0) {
      slots.push({
        date: date.toDateString(),
        slots: daySlots
      });
    }
  }

  return slots;
};

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

const InlineDemoBooking = ({ isVisible, initialData = {} }) => {
  const [step, setStep] = useState(initialData.name && initialData.email ? 2 : 1); // Skip to calendar if data provided
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    company: ""
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formStatus, setFormStatus] = useState({ state: "idle", message: "" });
  const [timeSlots] = useState(generateTimeSlots());
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus.state !== "idle") {
      setFormStatus({ state: "idle", message: "" });
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormStatus({ state: "error", message: "Please provide both your name and email." });
      return;
    }
    setStep(2);
    // Smooth scroll to calendar section
    setTimeout(() => {
      document.getElementById("demo-calendar")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBookingSubmit = async () => {
    if (!selectedSlot) {
      setFormStatus({ state: "error", message: "Please select a time slot." });
      return;
    }

    setFormStatus({ state: "loading", message: "Booking your demo..." });

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedTime: selectedSlot.toISOString(),
          source: "inline-booking"
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to book demo right now.");
      }

      setFormStatus({
        state: "success",
        message: payload?.message || "Demo booked successfully!",
      });
      setStep(3);

      // Scroll to confirmation
      setTimeout(() => {
        document.getElementById("demo-confirmation")?.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 100);
    } catch (error) {
      setFormStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  };

  const handleBackToForm = () => {
    setStep(1);
    setFormStatus({ state: "idle", message: "" });
    setTimeout(() => {
      document.getElementById("demo-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  const handleStartOver = () => {
    setStep(1);
    setFormData({ name: "", email: "", company: "" });
    setSelectedSlot(null);
    setFormStatus({ state: "idle", message: "" });
    setTimeout(() => {
      document.getElementById("demo-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full space-y-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            1
          </div>
          <span className="text-sm font-medium">Your Details</span>
        </div>
        <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
          <span className="text-sm font-medium">Pick Time</span>
        </div>
        <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            3
          </div>
          <span className="text-sm font-medium">Confirmation</span>
        </div>
      </div>

      {/* Step 1: Contact Form */}
      {step === 1 && (
        <div id="demo-form" className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">Get Started</h3>
            <p className="text-gray-600 mt-2">Let's book your personalized Qport demo</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
                placeholder="Enter your email address"
              />
            </div>
            {formStatus.state === "error" && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{formStatus.message}</p>
              </div>
            )}
            <Button type="primary" onClick={handleFormSubmit} classes="w-full">
              Continue to Calendar →
            </Button>
          </form>
        </div>
      )}

      {/* Step 2: Calendar Selection */}
      {step === 2 && (
        <div id="demo-calendar" className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">Choose Your Time</h3>
            <p className="text-gray-600 mt-2">
              Select a 30-minute slot that works best for you, {formData.name}
            </p>
          </div>

          {/* Day Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-xl">
              {timeSlots.map((day, dayIndex) => {
                const dayDate = new Date(day.date);
                const isToday = dayDate.toDateString() === new Date().toDateString();
                const isTomorrow = dayDate.toDateString() === new Date(Date.now() + 86400000).toDateString();

                let dayLabel = formatDate(day.date);
                if (isToday) dayLabel = `Today (${dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
                else if (isTomorrow) dayLabel = `Tomorrow (${dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
                else dayLabel = dayDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

                return (
                  <button
                    key={dayIndex}
                    onClick={() => setSelectedDayIndex(dayIndex)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      selectedDayIndex === dayIndex
                        ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                  >
                    {dayLabel}
                    <span className="block text-xs text-gray-500 mt-0.5">
                      {day.slots.length} slots
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots for Selected Day */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm min-h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {formatDate(timeSlots[selectedDayIndex]?.date)}
              </h4>
              <span className="text-sm text-gray-500">
                30-minute slots available
              </span>
            </div>

            {timeSlots[selectedDayIndex]?.slots.length > 0 ? (
              <div>
                {/* Group slots by time periods */}
                {(() => {
                  const currentDaySlots = timeSlots[selectedDayIndex].slots;
                  const morningSlots = currentDaySlots.filter(slot => slot.getHours() < 12);
                  const afternoonSlots = currentDaySlots.filter(slot => slot.getHours() >= 12 && slot.getHours() < 17);
                  const eveningSlots = currentDaySlots.filter(slot => slot.getHours() >= 17);

                  return (
                    <div className="space-y-6">
                      {morningSlots.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <span className="mr-2">🌅</span> Morning (9:00 AM - 12:00 PM)
                          </h5>
                          <div className="grid grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-6 gap-3">
                            {morningSlots.map((slot, slotIndex) => (
                              <button
                                key={slotIndex}
                                onClick={() => handleSlotSelect(slot)}
                                className={`px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                                  selectedSlot?.getTime() === slot.getTime()
                                    ? "bg-blue-600 text-white border-blue-600 transform scale-105 shadow-lg"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                                }`}
                              >
                                {formatTime(slot)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {afternoonSlots.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <span className="mr-2">☀️</span> Afternoon (12:00 PM - 5:00 PM)
                          </h5>
                          <div className="grid grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-6 gap-3">
                            {afternoonSlots.map((slot, slotIndex) => (
                              <button
                                key={slotIndex}
                                onClick={() => handleSlotSelect(slot)}
                                className={`px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                                  selectedSlot?.getTime() === slot.getTime()
                                    ? "bg-blue-600 text-white border-blue-600 transform scale-105 shadow-lg"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                                }`}
                              >
                                {formatTime(slot)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {eveningSlots.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                            <span className="mr-2">🌆</span> Evening (5:00 PM onwards)
                          </h5>
                          <div className="grid grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-6 gap-3">
                            {eveningSlots.map((slot, slotIndex) => (
                              <button
                                key={slotIndex}
                                onClick={() => handleSlotSelect(slot)}
                                className={`px-4 py-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                                  selectedSlot?.getTime() === slot.getTime()
                                    ? "bg-blue-600 text-white border-blue-600 transform scale-105 shadow-lg"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                                }`}
                              >
                                {formatTime(slot)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-4xl mb-4">📅</div>
                <p className="text-gray-500">No available slots for this day</p>
                <p className="text-sm text-gray-400 mt-1">Please select another day</p>
              </div>
            )}
          </div>

          {selectedSlot && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
                <div>
                  <p className="text-blue-800 font-medium">
                    📅 Selected: {formatDate(selectedSlot.toDateString())} at {formatTime(selectedSlot)}
                  </p>
                  <p className="text-blue-600 text-sm mt-1">30-minute Qport demo session</p>
                </div>
                <div className="flex space-x-3">
                  <Button onClick={handleBackToForm}>← Back</Button>
                  <Button
                    type="primary"
                    onClick={handleBookingSubmit}
                    disabled={formStatus.state === "loading"}
                  >
                    {formStatus.state === "loading" ? "Booking..." : "Confirm Demo →"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {formStatus.state === "error" && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{formStatus.message}</p>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div id="demo-confirmation" className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Demo Booked Successfully!</h3>
            <p className="text-gray-600 mb-6">We're excited to show you Qport in action</p>

            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Demo Details</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Date & Time:</strong> {formatDate(selectedSlot.toDateString())} at {formatTime(selectedSlot)}</p>
                <p><strong>Duration:</strong> 30 minutes</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                📧 You'll receive a confirmation email with calendar invite and meeting details shortly.
              </p>
            </div>

            {formStatus.message && (
              <p className="text-gray-600 text-sm mb-4">{formStatus.message}</p>
            )}

            <Button type="primary" onClick={handleStartOver}>
              Book Another Demo
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InlineDemoBooking;