export default function VerificationAgencyForm() {
  return (
    <div className="p-6 max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Add / Edit Verification Agency</h2>

      <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Agency Name" />

        <select className="border p-2 rounded">
          <option>Verification Agent</option>
          <option>Valuation Agent</option>
          <option>Technical Agent</option>
          <option>Legal Agent</option>
          <option>Fraud Investigation Agent</option>
        </select>

        <input className="border p-2 rounded" placeholder="Contact Person" />
        <input className="border p-2 rounded" placeholder="Phone" />

        <button className="col-span-2 bg-green-600 text-white py-2 rounded">
          Save Agency
        </button>
      </div>
    </div>
  );
}
