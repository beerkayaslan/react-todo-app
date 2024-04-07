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
import { Status } from "./Detail";
import { apiUrl } from "@/api";
import { Download } from "lucide-react";

export default function Todos() {

    const downloadHandleImg = (data: string) => {
        if (data) {
            const url = `${apiUrl}awss3upload/${data}`;
            fetch(url)
                .then(response => {
                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = data;
                        a.click();
                    });
                });
        }
    }


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
                searchKeys={["imageUrl", "name", "status"]}
                columns={[
                    {
                        title: "Image",
                        key: "imageUrl",
                        columnRender: (data: string) => (
                            <div className="relative group w-12 h-12" onClick={() => downloadHandleImg(data)}>
                                <img
                                    src={data ? `https://todo-app-nestjs-backend.s3.eu-north-1.amazonaws.com/${data}` : "https://fakeimg.pl/100x100/ebebeb/909090?text=IMAGE&font=bebas"}
                                    alt="Todo Image"
                                    className="w-full h-full rounded-full object-cover"
                                />
                                {
                                    data && <div className="bg-blue-500 cursor-pointer absolute left-0 top-0 w-full h-full  rounded-full bg-opacity-40  items-center justify-center hidden group-hover:flex z-30">
                                        <Download className="w-4 h-4" color="white" />
                                    </div>
                                }
                            </div>
                        ),
                    },
                    {
                        title: "Name",
                        key: "name",
                    },
                    {
                        title: "Status",
                        key: "status",
                        columnRender: (data: string) => {
                            switch (data) {
                                case Status.OPEN:
                                    return (
                                        <Badge className="text-sm">
                                            OPEN
                                        </Badge>
                                    )
                                case Status.IN_PROGRESS:
                                    return (
                                        <Badge className="text-sm !bg-yellow-600">
                                            IN PROGRESS
                                        </Badge>
                                    )
                                case Status.DONE:
                                    return (
                                        <Badge className="text-sm !bg-green-600">
                                            DONE
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