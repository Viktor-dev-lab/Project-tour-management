import { Request, Response, NextFunction } from "express";
import uploadCloudinary from "../helpers/uploadCloundinary";

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await uploadCloudinary(req["file"].buffer);
        req.body[req["file"].fieldname] = result;
    } catch(error){
        console.log(error);
    }
    next();
};

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
    for (const key in req["files"]){
        req.body[key] = [];

        const array = req["files"][key];
        for (const item of array){
            try{
                const result = await uploadCloudinary(item.buffer);
                req.body[key].push(result);
            } catch(error){
                console.log(error);
            }
        }
    }
    next();
};
