import { HappinessCommand } from "./commands/happiness.command";
import { CommandComponent } from "./commands/types";

export const CHAT_COMMANDS = ["happiness"] as const;

export const CHAT_COMANNDS_COMPONENTS: Record<
    (typeof CHAT_COMMANDS)[number],
    CommandComponent
> = {
    happiness: HappinessCommand,
};
