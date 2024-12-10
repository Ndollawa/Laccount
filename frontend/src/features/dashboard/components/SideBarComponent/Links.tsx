import { IoChatbubblesOutline, IoWalletOutline} from 'react-icons/io5'
import {FaOpencart, FaPeopleArrows, FaPodcast, FaRegQuestionCircle, FaServicestack, FaUserFriends} from "react-icons/fa"
import {BiTransfer} from 'react-icons/bi'
import {GiTakeMyMoney} from 'react-icons/gi'
import {RxDashboard} from 'react-icons/rx'
import { RiHomeGearLine, RiContactsLine } from 'react-icons/ri'
import {TfiLayoutMediaCenter} from 'react-icons/tfi'
import { HiOutlineBanknotes } from "react-icons/hi2";
import { BsBank } from "react-icons/bs";
import {HiOutlineChatBubbleLeftRight , HiOutlineUsers} from 'react-icons/hi2'

export type sideBarLink ={
    id:number;
    icon?: string|JSX.Element;
    title?:string;
    path?:string;
    isActive?: undefined | boolean | null;
    isOpen?: undefined | boolean | null;
    children?:{
        id:number;
        icon?: string|JSX.Element;
        title?:string;
        path?:string;
        isActive?: undefined | boolean | null;
        isOpen?: undefined | boolean | null;
        children?:{
            id:number,
        path:string,
        title:string,
        icon?: string|JSX.Element,
        }[]
    }[]


 }[]
 export const UserLinks:sideBarLink=[
    {
        id:0,
    title:'Dashboard',
    icon:<RxDashboard fontSize={"2rem"}/>,
    path:"/dashboard"},
    {
        id:1,
        title:'Wallets',
        icon:<IoWalletOutline fontSize={"2rem"}/>,
        path:"/dashboard/wallets"
    },
    {
        id:2,
        title:'Transactions',
        icon:<GiTakeMyMoney fontSize={"2rem"}/>,
        path:"/dashboard/transactions"
    },
    {
        id:3,
        title:'Market',
        icon:<FaOpencart fontSize={"2rem"}/>,
        path:"/dashboard/market"
    },
    {
        id:4,
        title:'Messenger',
        icon:<HiOutlineChatBubbleLeftRight fontSize={"2rem"}/>,
        path:"/dashboard/messenger"
    },
    {
        id:5,
        title:'Contacts',
        icon:<RiContactsLine  fontSize={"2rem"}/>,
        path:"/dashboard/contacts"
    }
    ]

    export const AdminLinks:sideBarLink =[{
        id:6,
        title:'Users',
        icon:<HiOutlineUsers fontSize={"2rem"}/>,
        // path:
        isOpen:false,
        children:[
         { 
            id:6.0,
            title:'Users',
        // icon:
            path: '/dashboard/users'
        },
       ],
        
    },
    {
        id:7,
        title:'Blog',
        icon:<FaPodcast fontSize={"2rem"}/>,
        isOpen:false,
        children:[
         { 
            id:6.0,
            title:'Posts',
        // icon:
            path: '/dashboard/blog/posts'
        },
        {
            id:6.1,
            title:'Category',
            // icon:
            path: '/dashboard/blog/category'
        }],
       
    }
    ,{
        id:8,
        title:'Home Pages',
        icon:<RiHomeGearLine fontSize={"2rem"}/>,
        isActive:false,
        isOpen:false,
        children:[
            { 
               id:8.0,
               title:'Rooms',
            icon:<IoChatbubblesOutline fontSize={"2rem"}/>,
               path: '/dashboard/rooms'
           },
           {
               id:8.1,
               title:'Home Slider',
               icon:<TfiLayoutMediaCenter fontSize={"2rem"}/>,
               path: '/dashboard/sliders'
           } 
            ,{
                id:8.2,
                title:'Team',
                icon:<FaPeopleArrows fontSize={"2rem"}/>,
                path:'/dashboard/our-team',
                isActive:false,
                isOpen:false
            }
            ,{
                id:8.3,
                title:'Services',
                icon:<FaServicestack fontSize={"2rem"}/>,
                path:'/dashboard/services',
                isActive:false,
                isOpen:false
            }
            ,{
                id:8.4,
                title:'FAQ',
                icon:<FaRegQuestionCircle fontSize={"2rem"}/>,
                path:'/dashboard/faq',
                isActive:false,
                isOpen:false
            }],
    }
    ,{
        id:9,
        title:'Finance',
        icon:<HiOutlineBanknotes fontSize={"2rem"}/>,
        isActive:false,
        isOpen:false,
        children:[
            { 
               id:9.0,
               title:'Summary',
            icon:<BsBank fontSize={"2rem"}/>,
               path: '/dashboard/summary'
           },
           {
               id:9.1,
               title:'Subscription Plans',
               icon:<TfiLayoutMediaCenter fontSize={"2rem"}/>,
               path: '/dashboard/subscription-plans'
           } 
        ,{
        id:9.2,
        title:'Coupons',
        icon:<FaPeopleArrows fontSize={"2rem"}/>,
        path:'/dashboard/coupons',
        isActive:false,
        isOpen:false
    }],
    }
    
    ]