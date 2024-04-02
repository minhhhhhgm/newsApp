import React from "react"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useAuth } from "./auth";
import { AppNavigation, AppNavigationAuth } from "../../App";
import Loading from "../components/loading";


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