// pages/dashboard.tsx
import { GetServerSideProps } from "next";
import axios from "axios";
import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  try {
    const response = await axios.get("http://localhost:5000/api/protected", {
      headers: {
        Cookie: req.headers.cookie || "", 
      },
      withCredentials: true,
    });

    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
