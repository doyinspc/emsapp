
// var PouchDB = require('pouchdb');

// export const open_td = (table)=> new Promise((resolve, reject) => {
//     var db = new PouchDB(table)
//     if(db){
//         resolve(db)
//     }else{
//         reject('Cannot create table ' + table)
//     }  
// }) 

// export const selectOne = (table, param)=> new Promise((resolve, reject) => {
//     var db = new PouchDB(table)
//     db.get(param, function(err, doc){
//        if(err){reject('Failed to get')}
//        else{ resolve(doc)}
//     }) 
// })

// export const selectAll = (table, param)=> new Promise((resolve, reject) => {
//     var db = new PouchDB(table)
//     db.allDocs(function(err, doc){
//        if(err){reject('Failed to get')}
//        else{ resolve(doc.rows)}
//     }) 
// })

// export const DeleteRow = (table, id, rev)=> new Promise((resolve, reject) => {
//     var db = new PouchDB(table)
//     db.remove(id, rev, function(err, doc){
//        if(err){reject('Failed to get')}
//        else{ resolve(doc.rows)}
//     }) 
// })

// export const insert = (table, param)=> new Promise((resolve, reject) => {
//     var db = new PouchDB(table)
//     if(Array.isArray(params) && params.length > 0){
//         let newparm = [];
//         params.forEach(element => {
//              element._id = element.id;
//              newparm.push(element);
//         });
//         param._id = param.id;
//         db.bulkDocs(param, function(err, doc){
//         if(err){reject('fail to insert')}
//         else{resolve('Created')}
//         })
//     }else if(typeof params == 'object' && Array.isArray(Object.keys(params)) && Object.keys(params).length > 0){
//         param._id = param.id;
//         db.put(param, function(err, doc){
//         if(err){reject('fail to insert')}
//         else{resolve('Created')}
//         })
//     }else{
//         reject('Wrong data passed to save')
//     } 
// }) 

// export const update = (table, param)=> new Promise((resolve, reject) => {
//     var db = new PouchDB(table)
//     db.put(param, function(err, doc){
//        if(err){reject('fail to insert')}
//        else{resolve('Created')}
//     }) 
// }) 