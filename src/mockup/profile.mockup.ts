import {Profile} from '../model/profile.interface';

const profileList: Profile[] = [
    {
        firstName: 'Minho',
        lastName: 'Shin',
        email: 'shinminho@gmail.com',
        avatar:'assets/imgs/avatar.png',
        status: 'I feel good',
        phonenumber: '010-4383-9975'
    },
    {
        firstName: 'Sungha',
        lastName: 'Yoon',
        email: 'yoon@gmail.com',
        avatar:'assets/imgs/avatar.png',
        status: 'I am busy',
        phonenumber: '010-4383-9975' 
    },
    {
        firstName: 'Seowoo',
        lastName: 'Park',
        email: 'swpark@gmail.com',
        avatar:'assets/imgs/avatar.png',
        status: 'I am happy',
        phonenumber: '010-4383-9975' 
    },
];

export const PROFILE_LIST = profileList;
