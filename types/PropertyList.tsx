export type property = {
    id?: any;
    type: string;
    unit_code: string;
    class: string;
    address: string;
    developer: {
        name: string;
    };
    project: {
        name: string;
    };
    tower: {
        name: string;
    };
    floor: {
        name: string;
    };
    area: string;
    tower_id: number;
    floor_id: number;
    project_id: number;
    developer_id: number;
    acceptance_date: string;
    turnover_date: string;
    status: string;
    owner: any;
    tenants: {
        name: string;
    }[];
};

export type PropertyDefaultValue = {
    unit_code: string;
    address: string;
    area: string;
    class: string;
    type: string;
    acceptance_date: string;
    turnover_date: string;
    status: string;
    developer_id: string;
    project_id: string;
    tower_id: string;
    floor_id: string;
    project: string;
    tower: string;
    floor: string;
    developer: string;
};
