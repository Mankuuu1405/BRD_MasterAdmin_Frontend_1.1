import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../../layout/MainLayout";

export default function CollectionAgentView() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get agent ID from URL

    // For demo purposes, using static data.
    // In a real app, you would fetch the agent data using this ID.
    const agent = {
        id,
        name: "ABC Collections",
        type: "Collection",
        zone: "North",
        collectionType: "Hard",
        status: "Active",
        assignedTenants: "Tenant A, Tenant B",
        recoveryModel: "Standard",
        bankDetails: "XYZ Bank, A/C 123456",
    };


    return (
        <MainLayout>
            {/* HEADER */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Collection Agent Details</h2>
                <p className="text-sm text-gray-500">
                    View agent information, assigned tenants, and recovery model
                </p>
            </div>

            {/* DETAILS CARD */}
            <div className="bg-white rounded-2xl shadow-sm p-6 max-w-3xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-gray-700">
                    <div>
                        <span className="font-semibold">Name:</span> ABC Collections
                    </div>
                    <div>
                        <span className="font-semibold">Type:</span> Collection
                    </div>
                    <div>
                        <span className="font-semibold">Zone:</span> North
                    </div>
                    <div>
                        <span className="font-semibold">Collection Type:</span> Hard
                    </div>
                    <div>
                        <span className="font-semibold">Status:</span>{" "}
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            Active
                        </span>
                    </div>
                    <div>
                        <span className="font-semibold">Assigned Tenants:</span> Tenant A, Tenant B
                    </div>
                    <div>
                        <span className="font-semibold">Recovery Model:</span> Standard
                    </div>
                    <div>
                        <span className="font-semibold">Bank Details:</span> XYZ Bank, A/C 123456
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => navigate(`/collection-agent/edit/${id}`)}
                        className="px-5 py-2 rounded-xl text-sm bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => navigate(`/collection-agent/update//${id}`)}
                        className="px-5 py-2 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Update Agent
                    </button>
                    <button
                        onClick={() => navigate(`/collection-agent/fees//${id}`)}
                        className="px-5 py-2 rounded-xl text-sm bg-green-600 text-white hover:bg-green-700 transition"
                    >
                        Manage Fees
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}
