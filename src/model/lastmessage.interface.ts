import {Profile} from './profile.interface';

export interface LastMessage {
    user: Profile;
    date: Date;
    lastMessage: string; 
}