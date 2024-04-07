import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppNavigation, AppNavigationAuth } from "../../App";
import Loading from "../components/loading";
import { useAuth } from "./auth";


interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const Router = (props: NavigationProps) => {
    const { redirect, loading } = useAuth();

    const getStack = () => {
        if (redirect === 0) {
            return <AppNavigation />
        } else if (redirect === 1) {
            return <AppNavigationAuth />
        }
        if (loading) {
            return <Loading />
        }
        return <AppNavigation />
    }
    return (
        <NavigationContainer
            {...props}
        >
            {
                getStack()
            }
        </NavigationContainer>
    );
};