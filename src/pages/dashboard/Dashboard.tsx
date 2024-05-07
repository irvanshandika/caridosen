/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/Sidebar";
import { Helmet } from "react-helmet";
import { Group, Text } from "@mantine/core";
import { PieChart } from "@mantine/charts";
import { data } from "./data/DataRating";

const Dashboard: React.FC = () => {
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
        <title>Dashboard | CariDosen</title>
      </Helmet>
      <Sidebar>
        <h1>Selamat Datang {user?.displayName}</h1>
        <Group gap={50}>
          <div>
            <Text fz="xs" mb="sm" ta="center">
              Hasil Rating Dosen
            </Text>
            <PieChart data={data} withTooltip tooltipDataSource="segment" mx="auto" />
          </div>
        </Group>
      </Sidebar>
    </>
  );
};

export default Dashboard;
