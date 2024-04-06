import axios from 'axios';
import { IDataTableApi, IDeleteDataTable } from '@/types/dataTable';
import { DetailContentProps as TodoDetailContentProps } from '@/pages/private/Todo/Detail';

export const instance = axios.create({
    baseURL: 'http://localhost:3000/v1/',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const login = async ({ email, password }: { email: string; password: string; }) => {
    try {
        const response = await instance.post(`auth/login`, { email, password });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export const register = async ({ email, password }: { email: string; password: string; }) => {
    try {
        const response = await instance.post(`auth/register`, { email, password });
        return response.data;
    } catch (error: any) {
        throw new Error(String(error.response.data.message));
    }
}

export const refresh = async ({ token }: { token: string }) => {
    try {
        const response = await instance.post(`auth/refresh`, { token });
        return response.data;
    } catch (error: any) {
        throw new Error(String(error.response.data.message));
    }
}


export const me = async () => {
    try {
        const response = await instance.get(`auth/me`);
        return response.data;
    } catch (error: any) {
        throw new Error(String(error.response.data.message));
    }
}

export const getDataTable = async (data: IDataTableApi) => {
    try {
        const params = new URLSearchParams(Object.entries(data.query).reduce((acc: { [key: string]: string }, [key, value]) => {
            acc[key] = String(value);
            return acc;
        }, {})).toString();
        const response = await instance.get(`${data.dataUrl}?${params}`);

        return response.data;
    } catch (error: any) {
        throw new Error(String(error.response.data.message));
    }
}

export const deleteDataTable = async (data: IDeleteDataTable) => {
    try {
        const response = await instance.delete(data.deleteUrl);
        return response.data;
    } catch (error: any) {
        throw new Error(String(error.response.data.message));
    }
}


export const getTodoById = async (id: string | undefined) => {
    try {
        const response = await instance.get(`todos/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(String(error.response.data.message));
    }
}

export const patchTodo = async (data: TodoDetailContentProps) => {
    try {
        const response = await instance.patch(
            `todos/${data._id}`,
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(String(error.response.data.message));
    }
}

export const postTodo = async (data: TodoDetailContentProps) => {
    try {
        const response = await instance.post(
            'todos',
            data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        return response.data;
    } catch (error: any) {
        throw new Error(String(error.response.data.message));
    }
}
