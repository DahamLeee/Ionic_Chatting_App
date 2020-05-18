import { LastMessage } from './../model/lastmessage.interface';
import { PROFILE_LIST } from './profile.mockup';

const lastMsgList: LastMessage[] = [];

PROFILE_LIST.forEach( profile => {
    lastMsgList.push(
        {
            user: profile,
            date: new Date(),
            lastMessage: profile.firstName + ", how are you?"
        }
    )
});

export const LASTMSG_LIST = lastMsgList;
