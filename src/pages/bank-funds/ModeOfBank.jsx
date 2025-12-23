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

const ModeOfBank = () => {
    const navigate = useNavigate();

    const [modes, setModes] = useState([
        {
            id: 1,
            receipt_mode: "NEFT",
            payment_mode: "ECS",
            is_default: true,
            status: "Active",
        },
        {
            id: 2,
            receipt_mode: "UPI",
            payment_mode: "UPI",
            is_default: false,
            status: "Inactive",
        },
    ]);

    const [search, setSearch] = useState("");

    const filteredModes = modes.filter(
        (m) =>
            m.receipt_mode.toLowerCase().includes(search.toLowerCase()) ||
            m.payment_mode.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        if (!window.confirm("Delete this mode?")) return;
        setModes(modes.filter((m) => m.id !== id));
    };

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-xl font-semibold">Mode of Bank Transactions</h1>
                    <p className="text-sm text-gray-500">
                        Define receipt and payment modes
                    </p>
                </div>

                <button
                    onClick={() => navigate("/mode-of-bank/add")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700"
                >
                    <FiPlus /> Add Mode
                </button>
            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
                <FiSearch className="text-gray-400" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search receipt or payment mode..."
                    className="w-full outline-none text-sm"
                />
            </div>

            {/* LIST */}
            <div className="space-y-3">
                {/* TABLE HEADER */}
                <div className="hidden md:grid grid-cols-6 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
                    <div>Receipt Mode</div>
                    <div>Payment Mode</div>
                    <div>Default</div>
                    <div>Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* ROWS */}
                {filteredModes.map((mode) => (
                    <div
                        key={mode.id}
                        className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-6 gap-y-2 items-center text-sm"
                    >
                        <div className="font-medium text-gray-900">
                            {mode.receipt_mode}
                        </div>

                        <div className="text-gray-600">{mode.payment_mode}</div>

                        <div className="text-gray-600">
                            {mode.is_default ? "Yes" : "No"}
                        </div>

                        <span
                            className={`inline-flex items-center justify-center
    px-3 py-0.5 text-xs font-medium
    rounded-full whitespace-nowrap leading-none
    w-fit
    ${mode.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                                }`}
                        >
                            {mode.status}
                        </span>


                        <div className="flex justify-end gap-2 col-span-2 md:col-span-2">
                            <IconButton color="gray" onClick={() => navigate(`/mode-of-bank/view/${mode.id}`)}>
                                <FiEye />
                            </IconButton>
                            <IconButton color="blue" onClick={() => navigate(`/mode-of-bank/edit/${mode.id}`)}>
                                <FiEdit3 />
                            </IconButton>
                            <IconButton color="red" onClick={() => handleDelete(mode.id)}>
                                <FiTrash2 />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
        </MainLayout>
    );
};

export default ModeOfBank;

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
