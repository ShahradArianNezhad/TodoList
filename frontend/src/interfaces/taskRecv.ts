export interface recievedTaskArr{
    Tasks:Array<recievedTask>
}



export interface recievedTask{
    task:string;
    createDate:string;
    todoDate:string;
    done:boolean
}

