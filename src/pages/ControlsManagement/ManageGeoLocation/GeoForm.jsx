import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

/* ================= MOCK DATA ================= */
const MOCK_GEO_DATA = [
    { country: "India", state: "Gujarat", city: "Vadodara" },
    { country: "India", state: "Maharashtra", city: "Mumbai" },
    { country: "India", state: "Maharashtra", city: "Pune" },
    { country: "USA", state: "California", city: "Los Angeles" },
    { country: "USA", state: "Texas", city: "Dallas" }
];

export default function GeoForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    /* ================= FORM STATE ================= */
    const [formData, setFormData] = useState({
        country: "",
        state: "",
        city: "",
        area: ""
    });

    /* ================= OPTIONS ================= */
    const countries = [...new Set(MOCK_GEO_DATA.map(g => g.country))];

    const states = [...new Set(
        (formData.country
            ? MOCK_GEO_DATA.filter(g => g.country === formData.country)
            : MOCK_GEO_DATA
        ).map(g => g.state)
    )];

    const cities = [...new Set(
        (formData.state
            ? MOCK_GEO_DATA.filter(
                g =>
                    g.country === formData.country &&
                    g.state === formData.state
            )
            : MOCK_GEO_DATA
        ).map(g => g.city)
    )];


    /* ================= HANDLERS ================= */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (name === "country") {
                return { country: value, state: "", city: "", area: prev.area };
            }
            if (name === "state") {
                return { ...prev, state: value, city: "" };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Geo Saved:", formData);
        navigate("/controls/geo-location");
    };

    /* ================= UI ================= */
    return (
        <MainLayout>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                    <FiArrowLeft />
                </button>

                <div>
                    <h1 className="text-2xl font-bold">
                        {isEdit ? "Edit Geo Location" : "Add Geo Location"}
                    </h1>
                    <p className="text-sm text-gray-500">
                        Country → State → City → Area
                    </p>
                </div>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow max-w-3xl space-y-6"
            >
                {/* Country */}
                <SelectField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={countries}
                />

                {/* State (ALWAYS ENABLED) */}
                <SelectField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    options={states}
                    placeholder={
                        formData.country
                            ? "Select state"
                            : "Select country first"
                    }
                />

                {/* City (ALWAYS ENABLED) */}
                <SelectField
                    label="District / City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    options={cities}
                    placeholder={
                        formData.state
                            ? "Select city"
                            : "Select state first"
                    }
                />

                {/* Area */}
                <InputField
                    label="Area / Locality"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Enter area/locality"
                />

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 bg-gray-100 rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl"
                    >
                        <FiSave /> Save
                    </button>
                </div>
            </form>
        </MainLayout>
    );
}

/* ================= COMPONENTS ================= */
const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    placeholder = "Select option"
}) => (
    <div>
        <label className="block text-sm font-medium mb-1">
            {label} <span className="text-red-500">*</span>
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
        >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    </div>
);

const InputField = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium mb-1">
            {label} <span className="text-red-500">*</span>
        </label>
        <input
            {...props}
            required
            className="w-full border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
        />
    </div>
);
