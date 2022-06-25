export interface Message {
    file: Partial<File>;
    message: string;
    receiver: string;
    sender: string;
    timestamp: string | number;
}