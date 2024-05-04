/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import { Helmet } from "react-helmet";

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
        <div className="flex justify-center items-center">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FJakarta&bgcolor=%23ffffff&showTitle=0&hl=id&src=c2hhbmRpa2FtdWhhbW1hZGlydmFuQHN0dWRlbnRzLmFtaWtvbS5hYy5pZA&src=Y19jbGFzc3Jvb203MTAzNjE4OEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20wYzgzNDNiZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb203YWM3NzEyOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb201NWU0ZjFkNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb200OWFiMzhmZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20yMWQ4MWI3M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21jZjhjNTNhMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb205ZTAzNDUxOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uY2hyaXN0aWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21iZWEzNjg5MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb202ZDdmN2U5M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaGluZHVpc20jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uaW5kb25lc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4uanVkYWlzbSNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=Y19jbGFzc3Jvb21kNzc1NjlkMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21jMjcyMjU3NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaXNsYW1pYyNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=Y19jbGFzc3Jvb20wNDZmODM3OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4ub3J0aG9kb3hfY2hyaXN0aWFuaXR5I2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=aHQzamxmYWFjNWxmZDYyNjN1bGZoNHRxbDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=Y19jbGFzc3Jvb21hNGNjYzI4MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb202ZjFhZjc1MkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb200MThiMmIzOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21lOTcxODc0YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23202124&color=%23c26401&color=%230047a8&color=%23007b83&color=%23007b83&color=%230047a8&color=%230047a8&color=%230047a8&color=%234285F4&color=%230047a8&color=%23202124&color=%237CB342&color=%230B8043&color=%23F6BF26&color=%230047a8&color=%23c26401&color=%23F4511E&color=%23137333&color=%23B39DDB&color=%23B39DDB&color=%230047a8&color=%230047a8&color=%230047a8&color=%230047a8"
            style={{ border: "solid 1px #777" }}
            className="rounded-lg"
            width="8100"
            height="600"
            frameBorder="0"
            scrolling="no"></iframe>
        </div>
      </Sidebar>
    </>
  );
}

export default Calendar;
