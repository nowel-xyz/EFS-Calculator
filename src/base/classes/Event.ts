import { Events } from "discord.js";
import IEvent from "../interface/IEvent";
import CustomClient from "./CustomClient";
import IEventOptions from "../interface/IEventOptions";

export default class Event implements IEvent {
    client: CustomClient;
    name: Events;
    description: string;
    once: boolean;
    
    constructor(client: CustomClient, options: IEventOptions) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.once = options.once
    }

    Execute(...args: any): void {}
}