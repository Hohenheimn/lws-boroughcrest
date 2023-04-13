import { BarLoader } from "react-spinners";

export const TableLoader = () => {
    return (
        <div className="top-0 left-0 absolute w-full h-full flex justify-center items-center">
            <aside className="text-center flex justify-center py-5">
                <BarLoader
                    color={"#8f384d"}
                    height="10px"
                    width="200px"
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </aside>
        </div>
    );
};
