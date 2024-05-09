/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import { Helmet } from "react-helmet";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function Calendar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/forbidden");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);
  return (
    <>
      <Helmet>
        <title>Kalender | CariDosen</title>
      </Helmet>
      <Sidebar>
        <span className="hidden">{user?.displayName}</span>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: "event 1", date: "2019-04-01" },
            { title: "event 2", date: "2024-03-02" },
          ]}
        />
      </Sidebar>
    </>
  );
}

export default Calendar;
