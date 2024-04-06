import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useGetTodoById, usePatchTodo, usePostTodo } from "@/query-hooks/useTodos";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form';
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import useEnterKeyPress from "@/custom-hooks/useEnterKeyPress";
import { Loader2 } from "lucide-react";

export default function Detail() {
    const { id } = useParams();
    const { data } = id !== "new" ? useGetTodoById(id) : { data: "new" };

    return (
        <>
            {
                data && <DetailContent data={data} />
            }
        </>
    )
}

export interface DetailContentProps {
    _id?: string;
    name: string;
    status: Status;
}

export enum Status {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

function DetailContent({ data }: { data: DetailContentProps | "new" }) {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    let content: DetailContentProps;
    const patchTodo = usePatchTodo();
    const postTodo = usePostTodo();
    const { toast } = useToast();

    const { register, handleSubmit, formState: { errors } } = useForm<DetailContentProps>();

    const [loading, setLoading] = useState(false);

    if (data === "new") {
        content = {
            _id: "",
            name: "",
            status: Status.OPEN,
        }
    } else {
        content = data;
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        setTimeout(() => {
            navigate("/todos");
        }, 300);
    }

    const onSubmit: SubmitHandler<DetailContentProps> = (formData) => {
        setLoading(true);
        if (data === "new") {
            postTodo.mutate({ ...formData, status: Status.OPEN }, {
                onSuccess: () => {
                    handleOpenChange(false);
                    toast({
                        variant: "default",
                        className: "bg-green-500 text-white",
                        title: "Successfully updated the record",
                    });
                },
                onError: (error) => {
                    toast({
                        variant: "destructive",
                        title: error.message
                    });
                },
                onSettled: () => {
                    setLoading(false);
                }
            });
        }
        else {
            const mutateData = { _id: content._id, name: formData.name, status: formData.status };
            patchTodo.mutate(mutateData, {
                onSuccess: () => {
                    handleOpenChange(false);
                    toast({
                        variant: "default",
                        className: "bg-green-500 text-white",
                        title: "Successfully updated the record"
                    });
                },
                onError: (error) => {
                    toast({
                        variant: "destructive",
                        title: error.message
                    });
                },
                onSettled: () => {
                    setLoading(false);
                }
            });


        }
    }

    useEnterKeyPress('Enter', handleSubmit(onSubmit));

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Todo</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            defaultValue={content.name}
                            className={cn("col-span-3 my-1", errors.name && "!border-red-500")}
                            {...register("name", {
                                required: "Name is required",
                                maxLength: 200,
                            })}
                        />
                        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                    </div>
                </div>
                <SheetFooter>
                    <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}