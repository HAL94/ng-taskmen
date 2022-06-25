import { Message } from "./message.interface";
import { Participants } from "./participants.interface";

export interface Chat {
    count?: number;
    id: string;
    createdAt: number | string;
    lastMessage: any;
    messages: Message[];
    participants: Participants;
}