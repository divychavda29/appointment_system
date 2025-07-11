import React, { useEffect, useState } from "react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("Please log in to view appointments");
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/appointments?user_id=${user_id}`);
      const data = await res.json();
      if (res.ok) {
        setAppointments(data.appointments);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchAppointments(); // refresh list
      } else {
        alert(data.error || "Failed to cancel appointment.");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-70 border-b">My Appointments</p>
      <div>
        {appointments.length > 0 ? (
          appointments.map((item) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b items-center"
              key={item.id}
            >
              <div>
                <img
                  src="/default-doctor.jpg"
                  alt="Doctor"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.doctor}</p>
                <p className="text-sm text-gray-500">
                  Booked for: <b>{item.date}</b>
                </p>
                <p className="text-sm mt-1">Message: {item.message}</p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                <button
                  className="text-sm text-stone-400 text-center sm:min-w-48 py-2 border rounded border-dashed border-gray-300 cursor-not-allowed"
                  title="Payment functionality coming soon"
                  disabled
                >
                  Pay Online
                </button>
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white"
                  onClick={() => handleCancel(item.id)}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 mt-6">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
