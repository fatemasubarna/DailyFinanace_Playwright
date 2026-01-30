import fs from 'fs';
import { UserModel } from '../userModel/person.model';
import{ ItemModel } from '../userModel/item.model'; 

export function generateRandomNumber( min : number , max : number ){
    const randomNumber = Math.random()* (max-min) + min;
    return Math.floor(randomNumber);

}


export function saveJSONData( jsonObject : object ,  fileLocation : string  ){

    let jsonArray = fs.readFileSync( fileLocation , "utf-8" );
    let userDataArray = JSON.parse(jsonArray);

    userDataArray.push(jsonObject);

    fs.writeFileSync( fileLocation , JSON.stringify(userDataArray,null,2)   )

}

export function getLatestUser( fileLocation : string ) : UserModel {

     let jsonArray = fs.readFileSync( fileLocation , "utf-8" );
       let userDataArray = JSON.parse(jsonArray);

       return userDataArray[ userDataArray.length -1 ];


}

