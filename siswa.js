const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// GET: /pegawai --> end point untuk mengakses data pegawai
app.get("/", (req,res) => {
    let sql = "select * from siswa"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else{
            let response = {
                count: result.length,
                siswa: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })    
})

// POST: /pegawai --> end point untuk pencarian data pegawai
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from siswa where id_siswa like '%"+find+"%'  or nis like '%"+find+"%' or nama_siswa like '%"+find+"%' or kelas like '%"+find+"%' or jurusan like '%"+find+"%'or poin like '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                siswa: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

// POST: /pegawai/save --> end point untuk insert data pegawai
app.post("/save", (req,res) => {
    let data = {
        id_siswa: req.body.id_siswa,
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        jurusan : req.body.jurusan,
        poin: req.body.poin
    }
    let message = ""

    let sql = "insert into siswa set ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row inserted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// POST: /pegawai/update --> end point untuk update data pegawai
app.post("/update", (req,res) => {
    let data = [{
        id_siswa: req.body.id_siswa,
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        jurusan : req.body.jurusan,
        poin: req.body.poin
    }, req.body.id_siswa]
    let message = ""

    let sql = "update siswa set ? where id_siswa = ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row updated"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// DELETE: /pegawai/:id_pegawai --> end point untuk hapus data pegawai
app.delete("/:id_siswa", (req,res) => {
    let data = {
        id_siswa : req.params.id_siswa
    }
    let message = ""
    let sql = "delete from siswa where ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row deleted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

module.exports = app