export interface Techn{
    id:string;
    title:string;
    description:string;
    liked?:number;
    comments:Comment[]
}

export interface Comment{
    name:string;
}