
//undone

// console.log('---------module 1-----------');
// console.log(module.id);
// console.log(module.exports);
// console.log(module.parent);
// console.log(module.filename);
// console.log(module.loaded);
// console.log(module.children);
// console.log(module.paths);
// console.log('-------------------------');

//var a=require('./tmp/a.js');

// console.log(require);
// console.log('-------------------');
console.log(module);



var Module=function(id,parent){
    this.id=id;
    this.exports={};
    this.parent=parent;
    this.filename=null;
    this.loaded=false;
    this.children=[];

}

module.exports=Module;
//var module=new Module(filename,parent);