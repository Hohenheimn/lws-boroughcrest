export const GeneralReports = {
    document_type: [
        {
            id: 1,
            name: "Billing",
            parent: "Document Type",
            grandParent: "",
        },
        {
            id: 2,
            name: "Collection",
            parent: "Document Type",
            grandParent: "",
        },
        {
            id: 3,
            name: "Adjustment",
            parent: "Document Type",
            grandParent: "",
        },
    ],
};

export const CustomerReports = {
    type: [
        {
            id: 1,
            name: "Unit",
            parent: "type",
            grandParent: "Property",
        },
        {
            id: 2,
            name: "Parking",
            parent: "type",
            grandParent: "Property",
        },
        {
            id: 3,
            name: "Commercial",
            parent: "type",
            grandParent: "Property",
        },
    ],
    propertyClass: [
        {
            id: 1,
            name: "Common",
            parent: "Class",
            grandParent: "Property",
        },
        {
            id: 2,
            name: "Saleable",
            parent: "Class",
            grandParent: "Property",
        },
        {
            id: 3,
            name: "Leaseable",
            parent: "Class",
            grandParent: "Property",
        },
    ],

    customerClass: [
        {
            id: 1,
            name: "Owner",
            parent: "Class",
            grandParent: "Customer",
        },
        {
            id: 2,
            name: "Tenant",
            parent: "Class",
            grandParent: "Customer",
        },
    ],

    reportClass: [
        {
            id: 1,
            name: "Cash",
            parent: "Mode of Payment",
            grandParent: "Report",
        },
        {
            id: 2,
            name: "Deposit",
            parent: "Mode of Payment",
            grandParent: "Report",
        },
    ],

    receipt_type: [
        {
            id: 1,
            name: "Official",
            parent: "Receipt Type",
            grandParent: "Report",
        },
        {
            id: 2,
            name: "Acknowledgement",
            parent: "Receipt Type",
            grandParent: "Report",
        },
        {
            id: 3,
            name: "Provisional",
            parent: "Receipt Type",
            grandParent: "Report",
        },
    ],

    memo_type: [
        {
            id: 1,
            name: "Credit Memo",
            parent: "Memo Type",
            grandParent: "Report",
        },
        {
            id: 2,
            name: "Debit Memo",
            parent: "Memo Type",
            grandParent: "Report",
        },
    ],
};
