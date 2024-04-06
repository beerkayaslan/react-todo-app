import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";
import { AuthStatus } from "@/auth/AuthProvider";
import { lazy } from "react";
import Loadable from "@/components/Loadable";

const PublicLayout = Loadable(lazy(() => import('@/layouts/PublicLayout')));
const Login = Loadable(lazy(() => import('@/pages/public/Login')));
const Register = Loadable(lazy(() => import('@/pages/public/Register')));

const PrivateLayout = Loadable(lazy(() => import('@/layouts/PrivateLayout')));
const Todos = Loadable(lazy(() => import('@/pages/private/Todo/Index')));
const TodosDetail = Loadable(lazy(() => import('@/pages/private/Todo/Detail')));
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
                    <Route path="" Component={Todos}>
                        <Route path="todos/:id" Component={TodosDetail} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
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
