const express = require ("express");
const app = express();
const mysql = require("mysql"); //importar base de datos
const cors = require("cors"); // desbloquear para que consultas no tenga problemas con navegadores


app.use(cors()); // antes de ejecutar cualquier cosa
app.use(express.json()); // la informacion pasa a convertirse a json

// conexion con base de datos mysql
const db = mysql.createConnection({
    host:"162.241.62.202",
    user:"empre384_crud_prueba",
    password:"Z0bm5Q4q8id",
    database:"empre384_empleados_crud2"
});

// Funcion crear registro 

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    // hacer envio de la informacion a la base de datos 
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES (?,?,?,?,?)', [nombre,edad,pais,cargo,anios], //promesa de envio de valores a base de datos 
    (err,result)=>{ //personalizar respuesta 
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

// regreso de informacion de la base de datos para mostrar en el front
app.get("/empleados",(req,res)=>{
    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

// funcion actualizar registro

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?', [nombre,edad,pais,cargo,anios,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }); 
});

//funcion eliminar registro

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?', id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(3001,() => {
    console.log("corriendo en el puerto 3001")
})