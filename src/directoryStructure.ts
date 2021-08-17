export const buildDirectoryStructure = (arr: File[]) => {
    let obj = {};
    arr.forEach(function(file: any) {
        // console.log(file)
        let {path}: {path: string} = file;
        path.split('/').reduce(function(r:any, e:any) {
          return r[e] || (r[e] = {})
        }, obj)
      })
    console.log(obj)
};
