import AppContext from "./AppContext";
import { useState } from "react";

type AppProvider = {
    children: React.ReactNode;
};

export default function AppProvider({ children }: AppProvider) {
    const [toggleNewForm, setToggleNewForm] = useState(false);
    return (
        <AppContext.Provider value={{ toggleNewForm, setToggleNewForm }}>
            {children}
        </AppContext.Provider>
    );
}
