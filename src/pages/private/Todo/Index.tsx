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
import { Badge } from "@/components/ui/badge"


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
                searchKeys={["imageUrl","name", "status"]}
                columns={[
                    {
                        title: "Image",
                        key: "imageUrl",
                        columnRender: (data: any) => (
                            data ? 
                            <img
                                src={data || "https://via.placeholder.com/150"}
                                alt="Todo Image"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            : null
                        ),
                    },
                    {
                        title: "Name",
                        key: "name",
                    },
                    {
                        title: "Status",
                        key: "status",
                        columnRender: (data: any) => {
                            switch (data) {
                                case "OPEN":
                                    return (
                                        <Badge className="text-sm">
                                            {data}
                                        </Badge>
                                    )
                                case "IN_PROGRESS":
                                    return (
                                        <Badge className="text-sm bg-yellow-600">
                                            {data}
                                        </Badge>
                                    )
                                case "DONE":
                                    return (
                                        <Badge className="text-sm bg-green-600">
                                            {data}
                                        </Badge>
                                    )
                                default:
                                    return (
                                        <Badge className="text-sm text-muted-foreground">
                                            {data}
                                        </Badge>
                                    )
                            }
                        }
                    }
                ]}
            />
            <Outlet />
        </>

    )
}