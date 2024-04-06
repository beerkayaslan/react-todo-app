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


export default function Langs() {
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
                            App Langs
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </Header>

            <div className="space-y-2.5">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">App Langs</h3>
                <p className="text-sm text-muted-foreground">Language settings: Choose your preferred language for the app interface.</p>
            </div>

            <DataTable
                dataUrl="langs"
                updateUrl="langs"
                searchKeys={["name", "shortName"]}
                columns={[
                    {
                        title: "Name",
                        key: "name",
                    },
                    {
                        title: "Short Name",
                        key: "shortName",
                    }
                ]}
            />
            <Outlet />
        </>

    )
}