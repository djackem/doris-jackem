# Doris Jackem Personal Site
https://djackem.github.io/doris-jackem/

This is a json-driven site.
All items have thier own page and will populate menus and galleries automatically. This enables github to be used on multiple computers and content can be created/read/updated/deleted easily by anyone with no skill required.

# Config Page / JSON Builder
src/app/comp/config

This page is a very user friendly page to edit the json values and see the images you are working with to make adding and editing easy for someone who sees code (json) and shuts down haha. As of this writing you will have to copy the values and paste into your local repos and push to github to update the site.

## JSON Config
**( assets/config.json )**
This is the main config file for the entire site.
#### Structure
The main object has 1 property so far, that being the array of items. More may be added soon.
The structure of the config items has some required properties for each item and some optional properties :
```
{
    items:[
        {
            "name": "Required Properties",
            "desc": "The item description",
            "img": "image_name.jpg",
            "category": "Category A"
        },
        {
            "name": "Optional Properties",
            "dimensions": "",
            "links": [
                "The Displayed Text" : "www.TheActualLink.com",
                "Another Link" : "www.AnotherLink.com"
            ],
            "note": "A note",
            "extra": "Some extra info"
        }
    ]
}
``````
##### Required Properties
You will need something here for the item to be picked up by the app. If you have a missing value here, the app will substitute "Missing" here unless its an image.
- **name** The name of the item
- **desc** A description of the item
- **category** The category to classify the item
- **img** A link to the image file. These have to be placed in the **assets/img/** folder. You only need the name and extension of the file. *example: file.png*

##### Optional Properties
- **dimensions** How big the item is
- **links** External links array. For each entry, the first string is the button text and the second is the actual url.
- **note** A note about the item
- **extra** An extra note

## Dev Notes
##### Web Build
>npm run web
/docs




