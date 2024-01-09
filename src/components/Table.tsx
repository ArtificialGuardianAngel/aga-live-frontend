import React, { ReactNode } from "react";
import cn from "classnames";

export interface Column<T> {
    key?: string;
    title?: string;
    width?: number | string;
    render?: (row: T) => ReactNode;
}

interface Props<T> {
    columns: Column<T>[];
    data: { [key: string]: any }[];
}

const Table = <T,>(props: Props<T>) => {
    const { columns, data } = props;

    return (
        <div className="overflow-x-auto w-full">
            <div className="m-[2px_0] flex rounded-[5px] bg-[rgba(34,48,77,0.40)]">
                {columns.map((column, index) => (
                    <div
                        key={index}
                        className={cn("p-[13px_20px] text-[13px]")}
                        style={{
                            flex: column.width
                                ? typeof column.width === "number"
                                    ? `0 0 ${column.width + 40}px`
                                    : `0 0 ${column.width}`
                                : "1",
                        }}
                    >
                        {column.title}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-[2px] w-full">
                {data.map((item, itemIndex) => {
                    return (
                        <div
                            key={itemIndex}
                            className="flex rounded-[5px] bg-[#22304D] w-full items-center"
                        >
                            {columns.map((column, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    style={{
                                        flex: column.width
                                            ? typeof column.width === "number"
                                                ? `0 0 ${column.width + 40}px`
                                                : `0 0 ${column.width}`
                                            : "1",
                                    }}
                                >
                                    {column.render
                                        ? column.render(item as T)
                                        : (column.key ? (
                                              <div className="cell">
                                                  {
                                                      item[
                                                          column.key
                                                      ] as ReactNode
                                                  }
                                              </div>
                                          ) : null) || null}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Table;
