const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

const apiKey = '76bdfb5a13e8252e55d5c1bc045a8d44'

app.use(express.static('views'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

//Get
app.get('/', function (req ,res) {
  res.render('index', {weather:null, error:null})
})

//Post
app.post('/', function (req,res){
    let city = req.body.city
    let country = req.body.country
    let url =``
    if (req.body['celcius']){
        url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`
    }else if (req.body['kelvin']){
         url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}` 
    }else{
         url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${apiKey}`
    }
request (url, function(err, response, body){
    if(err){
        res.render('index', {weather: null, error: "Oops"})
    }else{
        let weather = JSON.parse(body)
        let weatherText =  ``
        if (weather.main == undefined){
            res.render('index', {weather:null, error: "Undefined"})
        } else{
            if(req.body['celcius']){
                weatherText = `It's ${weather.main.temp} degrees Celcius in ${weather.name},${weather.sys.country}`
            }else if (req.body['kelvin']){
                weatherText = `It's ${weather.main.temp} Kelvin in ${weather.name},${weather.sys.country}`
            }else{
             weatherText = `It's ${weather.main.temp} degrees Farenheit in ${weather.name},${weather.sys.country}`
            }
            res.render('index', {weather: weatherText, error: null})
        }
    }
        })
    })
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})