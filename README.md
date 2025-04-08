# Work Space
A Dynamic Profile for everyone , Customize your profile


### Todo List

- [x] Add Sections , Items    
- [x] Draggable  
- [x] Easy swaping   
- [x] Export  
    - [x] JSON  
    - [ ] PDF
    - [ ] PNG
    - [ ] JPG

- [ ] Styling box



# Data Structure
const Data = {
    section : [
        {
            title 
            
            items : [
                title,
                years,
                header,
            ]
        }
    ]
}

# Atomic Structure

Type : Block

   [
     {
        "value": "Code, collaborate.",
        "type": [ BlockType ], 
        "props": {
            "style": {
                "color" : "bg-red-400",
                "background": "bg-rose-400"
                "text" : [ TextStyle ]
                "textAlign : [ TextAlign ]
            }
        },
        children : [ Block ]                                    - Sub Items in rows
        items : [ Block ]                                       - Sub Items in columns
    }
   ]


Type TextStyle    
    
    {
        PageHeader : "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl pb-2",
        Header : "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl",
        Text: "text-base md:text-lg text-gray-700",
    };

Type BlockType 
    text 
    number
    calendar
    calendar-range


Type TextAlign {
    {
         name : 'Left',
         value : 'left',
         icon : 
    },
       {
         name : 'Center',
         value : 'center',
         icon :
       },
       {
         name : 'Right',
         value : 'right',
         icon : 
       }
}



Rule
--- 
  - [x] First block in page always be Page Header
  - [x] Page header can't edit font style (Text props)

  - [x] Children.length more than 0 turn to group
  - [x] First block in group turn to group header 

