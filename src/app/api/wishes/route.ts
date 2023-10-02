import axios from "axios";
import { NextResponse } from "next/server";

type Body = {
    amount: string;
    email: string;
    name: string;
    endorser: string;
    wishes: {
        1: string;
        2: string;
        3: string;
    };
};

export const POST = async (req: Request) => {
    const data: Body = await req.json();

    const contractResponse = await axios.post("contract/create", data, {
        baseURL: "https://api.aga.live",
    });

    // console.log(contractResponse);
    // res.send(contractResponse.data);
    return NextResponse.json(contractResponse.data);
    // add record in db about new contract with it id
};
