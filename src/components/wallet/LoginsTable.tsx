import dayjs from "dayjs";
import Image from "next/image";
import Table from "../Table";

const MOCK_DATA = [
    {
        date: new Date(),
        ip: "987.987.23.56",
        device: "Device details content",
    },
    {
        date: new Date(),
        ip: "987.987.23.56",
        device: "Device details content",
    },
    {
        date: new Date(),
        ip: "987.987.23.56",
        device: "Device details content",
    },
    {
        date: new Date(),
        ip: "987.987.23.56",
        device: "Device details content",
    },
    {
        date: new Date(),
        ip: "987.987.23.56",
        device: "Device details content",
    },
    {
        date: new Date(),
        ip: "987.987.23.56",
        device: "Device details content",
    },
];

const LoginsTable = () => {
    const columns = [
        {
            title: "Date",
            render: (row: any) => (
                <div className="cell">
                    {dayjs(row.date).format("DD.MM.YYYY")}
                </div>
            ),
        },
        {
            key: "ip",
            title: "IP address",
        },
        {
            key: "device",
            title: "Device details",
        },
        {
            title: "This device",
            width: 90,
            render: () => <div className="cell">Yes</div>,
        },
        {
            width: 15,
            render: () => (
                <div className="cell">
                    <Image
                        src="/images/wallet/icons/delete.svg"
                        alt="Delete"
                        width={15}
                        height={15}
                        className="cursor-pointer"
                    />
                </div>
            ),
        },
    ];

    return <Table columns={columns} data={MOCK_DATA} />;
};

export default LoginsTable;
