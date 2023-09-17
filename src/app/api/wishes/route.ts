import { NextApiRequest, NextApiResponse } from "next";
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
    console.log(data.email);
    const response = await axios.post(
        process.env["BOLDSIGN_API_URL"]!,
        {
            roles: [
                {
                    roleIndex: 1,
                    signerName: data.name,
                    signerEmail: data.email,
                    existingFormFields: [
                        {
                            id: "DonationAmount",
                            value: Number(data.amount).toLocaleString(),
                        },
                        {
                            id: "EndorserEmail",
                            value: data.endorser,
                        },
                        {
                            id: "WishNo1",
                            value: data.wishes[1],
                        },
                        {
                            id: "WishNo2",
                            value: data.wishes[2],
                        },
                        {
                            id: "WishNo3",
                            value: data.wishes[3],
                        },
                    ],
                },
            ],
            // "roleRemovalIndices": [1,2] Removes the roles present in the template with their indices given in this property.
        },
        {
            params: {
                templateId: process.env["BOLDSIGN_TEMPLATE_ID"],
            },
            headers: {
                Accept: "application/json",
                "X-API-KEY": process.env["BOLDSIGN_API_KEY"],
                "Content-Type":
                    "application/json;odata=minimal;odata.streaming=true",
            },
        },
    );

    const contractResponse = await axios.post(
        "contract/create",
        response.data,
        {
            baseURL: process.env["API_URL"],
        },
    );

    // console.log(contractResponse);
    // res.send(contractResponse.data);
    return NextResponse.json(contractResponse.data);
    // add record in db about new contract with it id
};
