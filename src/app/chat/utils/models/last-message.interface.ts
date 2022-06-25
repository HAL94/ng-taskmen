export interface LastMessage {
    [uid: string]: {
        file: Partial<File>,
        message: string,
        timestamp: string | number
    }
}