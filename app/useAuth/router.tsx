import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppNavigation, AppNavigationAuth } from "../../App";
import Loading from "../components/loading";
import { useAuth } from "./auth";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const Router = (props: NavigationProps) => {
    const { redirect, loading } = useAuth();
    console.log(redirect);
  const isLogin = useSelector((state: RootState) => state.newsReducer.isLogin)

    
    const getStack = () => {
        // if (redirect === 0) {
        //     return <AppNavigation />
        // } else if (redirect === 1) {
        //     return <AppNavigationAuth />
        // }
        isLogin ? <AppNavigationAuth /> : <AppNavigation />
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