import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function RecommendedDonors() {
  const { requestId } = useParams();

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await api.get(
        `/api/request/${requestId}/recommended-donors`
      );

      setDonors(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading AI recommendations...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Recommended Donors
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {donors.map((donor, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 border"
          >
            <h2 className="text-xl font-bold">
              {donor.fullName}
            </h2>

            <p className="mt-2">
              Blood Group:
              <span className="font-semibold">
                {" "}
                {donor.bloodGroup}
              </span>
            </p>

            <p>
              District:
              <span className="font-semibold">
                {" "}
                {donor.district}
              </span>
            </p>

            <p>
              Available:
              <span
                className={
                  donor.available
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {" "}
                {donor.available ? "Yes" : "No"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedDonors;
