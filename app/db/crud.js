import  * as SQLite from 'expo-sqlite'

//jest.mock('expo-sqlite');
export const open_td = async ()=>{
    
    let r = await SQLite.openDatabaseAsync('./database.db');
        console.log('Failed to create db', r)
        return r
    // try {

        

    // } finally {
    //     throw new Error('Error ')
    //     console.log('Failed to create db')
    //     return null;
        
    // }
}
export const create_td = async(db, tablename, table)=>{
    try {
        await db.execAsync(`PRAGMA journal_mode = WAL; ${table} `);
        console.log(`${tablename} created`)
        return true;  
    } finally {
        return false;
    }
}
export const update = async(db, table, params, wheres)=>{
    var keys = []
    var keysWhere = []
    var values = []
    Object.keys(params).forEach(element => {
        values.push(params[element])
        keys.push(`${element} = ? `)
    });
    var param = keys.join(" , ")
    Object.keys(wheres).forEach(element => {
        values.push(wheres[element])
        keysWhere.push(`${element} = ? `)
    });
    var wher = keysWhere.join(" , ")
    
    try {
        await db.runAsync(`UPDATE ${table} SET ${param} WHERE ${wher} `, values);
        return true;
    } finally {
      return false;
    }
}
export const deleteRow = async(db, table, wheres)=>{
    var keysWhere = []
    var values = []
    Object.keys(wheres).forEach(element => {
        values.push(wheres[element])
        keysWhere.push(`${element} = ? `)
    });
    var wher = keysWhere.join(" , ")
    try {
        await db.runAsync(`DELETE ${table} WHERE ${wher} `, values);
        return true;
    } finally {
      return false;
    }
}
export const insert = async(db, table, params) =>{
    var keys = []
    var values = []
    Object.keys(params).forEach(element => {
        values.push(params[element])
        keys.push(element)
    });
    var key = keys.join(" , ")
    var val = values.join(" , ")
    const statement = await db.prepareAsync(`INSERT INTO ${table} (${key}) VALUES (${val})`);
    try {
    let result = await statement.executeAsync(params);
    return result.lastInsertRowId;
    } finally {
    await statement.finalizeAsync();
    }
}
export const selectAll = async(db, table, params)=>{
    var keys = []
    var values = {}
    Object.keys(params).forEach(element => {
        values[`$${element}`] = params[element]
        keys.push(` ${element} = $${element}`)
    });
    var key = keys.join(" AND ")
    let t = `SELECT * FROM ${table} WHERE ${key}`;
    console.log(t,values)
    const data = await db && db.prepareAsync(t);
    console.log(data)
    try {
        const result = await data && data.executeAsync({...values});
        return allRows = await result && result.getAllAsync(); 
    } finally {
        await data && data.finalizeAsync();
    }
}
export const selectOne = async(db, table, params)=>{
    var keys = []
    var values = {}
    Object.keys(params).forEach(element => {
        values[`$${element}`] = params[element]
        keys.push(` ${element} = $${element}`)
    });
    var key = keys.join(" AND ")
    const data = await db.prepareAsync(`SELECT * FROM ${table} WHERE ${key}`);
try {
    const result = await data.executeAsync(params);
    return firstRow = await result.getFirstAsync();
} finally {
    await data.finalizeAsync();
}
}
  
  