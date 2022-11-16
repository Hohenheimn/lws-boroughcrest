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
