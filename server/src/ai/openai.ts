import {OpenAI} from 'openai'
require('dotenv').config();


const openai = new OpenAI({
            apiKey : process.env.OPENAI_API_KEY,
            baseURL  : process.env.OPENAI_BASE_URL,
})


export class ChatMessage {
    role : string;
    content : string;

    constructor(role : string, content : string){
        this.role = role
        this.content = content
    }
}


export async function chat(model : string, messages : ChatMessage[]) {
    const response = await openai.chat.completions.create({
        model : model,
        messages : JSON.parse(JSON.stringify(messages)),
        stream : false
    })
    return response.choices[0].message.content;
}


