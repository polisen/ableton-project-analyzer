/**
 * Recursively traverses object structure, recursing for each layer, returning a simplified version of the layer.
 * The recursive case is if there are no more children;
 * @param obj - the processed output of txml.parse()
 */

 export const recursiveFormatter = function recursiveProjectInfoFormatter(tagName: string, arr: any){
    if (arr.length === 0) return
    let obj: any = {}
    for(let child of arr) {
        let {children, tagName, attributes} = child;
        if (!children || !tagName || !attributes) {
            return child;
        }
        if (Object.keys(attributes).length > 0 ) {
            obj.attributes = attributes
        }
        obj = {...obj, [attributes.Id ? `${tagName}_${attributes.Id}`: tagName]: {
            ...recursiveFormatter(tagName, children)
        }}
    }
    return obj;
}
