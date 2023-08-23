type userInfo ={
    name:string;
    email:string;
    phoneNo:string;
    address:string;
}

type RequestsData = {
    id:string;
    fileName:string;
    userInfo:userInfo;
    approve:boolean;
    type:string
}