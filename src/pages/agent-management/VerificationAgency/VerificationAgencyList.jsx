import { useNavigate } from "react-router-dom";

export default function VerificationAgencyList() {
  const navigate = useNavigate();

  const agencies = [
    { id: 1, name: "KYC Verify Co", type: "Verification Agent" },
    { id: 2, name: "Property Valuers", type: "Valuation Agent" }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Verification Agencies</h2>
        <button
          onClick={() => navigate("/verification/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Agency
        </button>
      </div>

      <table className="w-full bg-white border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Agency Name</th>
            <th className="p-3">Type</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map(a => (
            <tr key={a.id} className="border-t">
              <td className="p-3">{a.name}</td>
              <td className="p-3 text-center">{a.type}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => navigate(`/verification/view/${a.id}`)}
                  className="text-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
