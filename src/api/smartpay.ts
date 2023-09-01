import { SmartPaySDK } from "@coinsmart/smartpay-sdk";
class SmartPayApi {
    smartpay: SmartPaySDK;
    constructor() {
        const apiKey = process.env["SMARTPAY_API_KEY"];
        const secretKey = process.env["SMARTPAY_SECRET_KEY"];
        if (!apiKey || !secretKey)
            throw new Error("Smart Pay credentials was not provided");
        this.smartpay = new SmartPaySDK(apiKey, secretKey);
    }

    async createInvoce(email: string, amount: number) {
        const invoice = await this.smartpay.createInvoice({
            productSymbol: "USD",
            amount: amount,
            email,
            sendEmail: true,
            customId: email,
        });

        return invoice.invoiceUrl;
    }
}
export default SmartPayApi;
