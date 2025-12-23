import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
    FiPlus,
    FiEdit3,
    FiTrash2,
    FiSearch,
    FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TaxationManagement = () => {
    const navigate = useNavigate();

    const [taxes, setTaxes] = useState([
        {
            id: 1,
            type: "GST",
            category: "Processing Fee",
            rate: 18,
            valid_from: "2024-01-01",
            valid_to: "2025-12-31",
            status: "Active",
        },
        {
            id: 2,
            type: "TDS",
            category: "Interest",
            rate: 10,
            valid_from: "2024-04-01",
            valid_to: "2025-03-31",
            status: "Inactive",
        },
    ]);

    const [search, setSearch] = useState("");

    const filteredTaxes = taxes.filter(
        (t) =>
            t.type.toLowerCase().includes(search.toLowerCase()) ||
            t.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        if (!window.confirm("Delete this tax entry?")) return;
        setTaxes(taxes.filter((t) => t.id !== id));
    };

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-semibold">Taxation Management</h1>
                    <p className="text-sm text-gray-500">
                        Manage tax types, categories and rates
                    </p>
                </div>

                <button
                    onClick={() => navigate("/taxation-management/add")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700"
                >
                    <FiPlus /> Add Tax
                </button>
            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
                <FiSearch className="text-gray-400" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tax type or category..."
                    className="w-full outline-none text-sm"
                />
            </div>

            {/* LIST */}
            <div className="space-y-3">
                {/* TABLE HEADER */}
                <div className="hidden md:grid grid-cols-7 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
                    <div>Tax Type</div>
                    <div>Category</div>
                    <div>Rate (%)</div>
                    <div>Valid From</div>
                    <div>Valid To</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                </div>

                {/* ROWS */}
                {filteredTaxes.map((tax) => (
                    <div
                        key={tax.id}
                        className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-7 gap-y-2 items-center text-sm"
                    >
                        <div className="font-medium text-gray-900">{tax.type}</div>
                        <div className="text-gray-600">{tax.category}</div>
                        <div className="text-gray-600">{tax.rate}%</div>
                        <div className="text-gray-600">{tax.valid_from}</div>
                        <div className="text-gray-600">{tax.valid_to}</div>

                        <span
                            className={`inline-flex items-center justify-center
    px-3 py-0.5 text-xs font-medium
    rounded-full whitespace-nowrap leading-none
    w-fit
    ${tax.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                                }`}
                        >
                            {tax.status}
                        </span>


                        <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
                            <IconButton
                                color="gray"
                                onClick={() =>
                                    navigate(`/taxation-management/view/${tax.id}`)
                                }
                            >
                                <FiEye />
                            </IconButton>
                            <IconButton
                                color="blue"
                                onClick={() =>
                                    navigate(`/taxation-management/edit/${tax.id}`)
                                }
                            >
                                <FiEdit3 />
                            </IconButton>
                            <IconButton
                                color="red"
                                onClick={() => handleDelete(tax.id)}
                            >
                                <FiTrash2 />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default TaxationManagement;

/* ------------ HELPERS ------------ */
const IconButton = ({ children, onClick, color }) => {
    const colors = {
        gray: "bg-gray-100 hover:bg-gray-200 text-gray-600",
        blue: "bg-blue-100 hover:bg-blue-200 text-blue-600",
        red: "bg-red-100 hover:bg-red-200 text-red-600",
    };

    return (
        <button onClick={onClick} className={`p-2 rounded-full ${colors[color]}`}>
            {children}
        </button>
    );
};
