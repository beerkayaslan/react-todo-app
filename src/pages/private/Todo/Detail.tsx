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
import { Badge } from "@/components/ui/badge"

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
    file?: File | null | string;
    imageUrl?: string;
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

    const [fileBase64, setFileBase64] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    const [status, setStatus] = useState<Status>(Status.OPEN);



    if (data === "new") {
        content = {
            _id: "",
            name: "",
            status: Status.OPEN,
            file: null,
        }
    }
    else {
        content = data;
    }

    const [imageUrl, setImageUrl] = useState(content.imageUrl || "");


    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        setTimeout(() => {
            navigate("/todos");
        }, 300);
    }

    const onSubmit: SubmitHandler<DetailContentProps> = (formData) => {
        setLoading(true);
        if (data === "new") {
            postTodo.mutate({ ...formData, status: Status.OPEN, file, }, {
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
            const mutateData = { _id: content._id, name: formData.name, status: formData.status, file: file ? file : (imageUrl ? 'dont-touch' : null) };
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

    const removeHandleImage = () => {
        setFileBase64("");
        const input = document.getElementById("image") as HTMLInputElement;
        input.value = "";
        setFile(null);
        setImageUrl("");
    }


    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Todo</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="image" className="mb-2 block">
                            Image Upload
                        </Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={(e: any) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                console.log(file);
                                reader.readAsDataURL(file)
                                reader.onloadend = () => {
                                    setFileBase64(reader.result as string);
                                    setFile(file);
                                }
                            }}
                        />

                        <div className="flex items-center  gap-x-2">
                            {
                                !fileBase64 && (imageUrl && <img src={imageUrl} className="w-28 h-28 object-contain border my-2" alt="image" />)
                            }
                            {
                                fileBase64 && <img src={fileBase64} className="w-28 h-28 object-contain border my-2" alt="image" />
                            }
                            {
                                (fileBase64 || imageUrl) && <Button variant="destructive" onClick={removeHandleImage}>Remove Image</Button>
                            }
                        </div>
                    </div>
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
                    <div>
                        <Label htmlFor="status" className="block">
                            Status
                        </Label>
                        <div className="flex gap-x-2 mt-4 select-none">
                            <div className={cn('border p-2 rounded cursor-pointer', {
                                'ring ring-blue-600': status === Status.OPEN
                            })} aria-label={Status.OPEN}
                                onClick={() => {
                                    setStatus(Status.OPEN);
                                }}>
                                <Badge className="text-sm" >
                                    OPEN
                                </Badge>
                            </div>
                            <div className={cn('border p-2 rounded cursor-pointer', {
                                'ring ring-blue-600': status === Status.IN_PROGRESS
                            })} aria-label={Status.IN_PROGRESS}
                                onClick={() => {
                                    setStatus(Status.IN_PROGRESS);
                                }}>
                                <Badge className="text-sm bg-yellow-600 hover:bg-yellow-600">
                                    IN PROGRESS
                                </Badge>
                            </div>
                            <div className={cn('border p-2 rounded cursor-pointer', {
                                'ring ring-blue-600': status === Status.DONE
                            })} aria-label={Status.DONE}
                                onClick={() => {
                                    setStatus(Status.DONE);
                                }}>
                                <Badge className="text-sm bg-green-600 hover:bg-green-600">
                                    DONE
                                </Badge>
                            </div>
                        </div>
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


