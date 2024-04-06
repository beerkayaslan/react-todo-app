import { Outlet } from "react-router-dom";
import DataTable from "@/components/private/DataTable/Index";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import Header from "@/components/private/Header";


export default function Todos() {
    return (
        <>
            <Header>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            App Todos
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Header>

            <div className="space-y-2.5">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">App Todos</h3>
                <p className="text-sm text-muted-foreground"> 
                    Manage your todos here. You can create, update and delete todos.
                 </p>
            </div>

            <DataTable
                dataUrl="todos"
                updateUrl="todos"
                searchKeys={["name", "status"]}
                columns={[
                    {
                        title: "Name",
                        key: "name",
                    },
                    {
                        title: "Status",
                        key: "status",
                        columnRender: (data: any) => {
                            return (
                                <span className="text-sm text-muted-foreground">
                                   test
                                </span>
                            )
                        }
                    }
                ]}
            />
            <Outlet />
        </>

    )
}