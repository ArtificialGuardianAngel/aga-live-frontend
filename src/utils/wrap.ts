
type Result<T extends (...args: any) => any> = [ReturnType<T>, null] | [null, Error]

export const wrap = async <T extends (...args: any) => any>(
    a: T,
): Promise<Result<T>> => {
    try {
        const result = await a();
        return [result, null];
    } catch (error) {
        return [null, error as Error];
    }
};
