import { IContract } from "@/types/contract";
import client from "./client";

const contractApi = {
    get: (id: string) => client.get<IContract>(`contract/${id}`),
};
export default contractApi;
