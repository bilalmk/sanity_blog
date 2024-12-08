import { defineField } from "sanity"
 
export const authors = {
    name:"authors",
    type:"document",
    title:"Authors",
    fields:[
        defineField({
            name:"author",
            type:"string",
            title:"Author",
            validation:(rule)=>{
                return rule.required()
            }
        })
    ]
}