import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Button({ name, path }) {
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await axios.get("http://localhost:3001" + path, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (data.status == 200) toast.success("Allowed");

      if (data.status != 200) toast.error("Role is not authorized");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-blue-600">
      {name}
    </button>
  );
}
