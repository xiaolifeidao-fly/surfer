export function toJson(responseText: string): any | null {
    let message = extractJsonStr(responseText);
    message = message.replace(/\s/g, "");
    message = message.replace(/\n/g, "");
    return JSON.parse(message);
}

function extractJsonStr(message: string): string {
    const startArrayIndex = message.indexOf('[');
    const endArrayIndex = message.lastIndexOf(']');
    const startJsonIndex = message.indexOf('{');
    const endJsonIndex = message.lastIndexOf('}');
    if (startArrayIndex >= 0 && (startArrayIndex < startJsonIndex || startJsonIndex === -1)) {
        return message.slice(startArrayIndex, endArrayIndex + 1);
    }
    if (startJsonIndex >= 0 && (startJsonIndex < startArrayIndex || startArrayIndex === -1)) {
        return message.slice(startJsonIndex, endJsonIndex + 1);
    }
    return message;
}