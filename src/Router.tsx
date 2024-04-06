import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";
import { AuthStatus } from "@/auth/AuthProvider";
import { lazy } from "react";
import Loadable from "@/components/Loadable";

const PublicLayout = Loadable(lazy(() => import('@/layouts/PublicLayout')));
const Login = Loadable(lazy(() => import('@/pages/public/Login')));
const Register = Loadable(lazy(() => import('@/pages/public/Register')));

const PrivateLayout = Loadable(lazy(() => import('@/layouts/PrivateLayout')));
const Langs = Loadable(lazy(() => import('@/pages/private/Langs/Index')));
const LangsDetail = Loadable(lazy(() => import('@/pages/private/Langs/Detail')));
const Loader = Loadable(lazy(() => import('@/components/Loader')));


export default function Router() {
    let { login } = useAuth();

    if (login === AuthStatus.LOADING) {
        return <Loader />
    }

    if (login === AuthStatus.LOGGED_IN) {
        return (
            <Routes>
                <Route Component={PrivateLayout}>
                    <Route path="/todos" Component={Langs}>
                        <Route path=":id" Component={LangsDetail} />
                    </Route>
                    <Route path="*" element={<Navigate to="/todos" />} />
                </Route>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route Component={PublicLayout}>
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Route>
        </Routes>
    )

}
