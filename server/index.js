// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

// MEN

// E - Express

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Tweete = require('./models/tweet.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/full-mern-stack-video')

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})
	console.log(user);
	if (!user) {
		return res.json({ status: 'error', error: 'Invalid login' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.listen(1337, () => {
	console.log('Server started on 1337')
})

app.get('/api/tweets', async (req, res) => {
	const token = req.headers['x-access-token']
	// console.log("In Get");
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
        // console.log(user)
        const Tweetes=await Tweete.find({author:user.email})
		let list=[];
		Tweetes.reverse();
		for(let i=0;i<Math.min(12,Tweetes.length);i++){
			list.push(Tweetes[i]);
		}
        if(!Tweetes){
            res.json({status:'error'})
        }else{
            res.json({status:'ok',list:list})
        }
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/tweets', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
        console.log(user)
        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }
        // console.log('Body', req.body);
        let c=req.body.count;
		// console.log('Type',typeof(c));
		c=parseInt(c/12);
        const Tweet= await Tweete.create({
			text: req.body.tweet,
			author: user.email,
			page:c,
			// password: newPassword,
		})
        const t= await Tweete.find({author:user.email})
        if(!t){
            res.json({status:'error'})
        }else{
            console.log(t);
            res.json({status:'ok',list:t})
        }
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token post' })
	}
})


app.post('/api/delete', async (req, res) => {
	const token = req.headers['x-access-token']
	const kee=req.body.id;
	console.log(req)
	console.log('headers',req.body);
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email:email })
        console.log(user);
        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }
        console.log('Body', req.body);
        const t= await Tweete.find({_id:kee})
        if(!t){
            res.json({status:'error'})
        }else{
            console.log(t);
			const status = await Tweete.deleteOne({_id:kee})
			
			console.log(status)
            res.json({status:'ok'})
        }
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/update', async (req, res) => {
	const token = req.headers['x-access-token']
	const kee=req.body.id;
	console.log(req)
	console.log('headers',req.body);
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email:email })
        console.log(user);
        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }
        console.log('Body', req.body);
        const t= await Tweete.find({_id:kee})
        if(!t){
            res.json({status:'error'})
        }else{
            // console.log(t);
			// const status = await Tweete.deleteOne({_id:kee})
			const status= await Tweete.updateOne( { _id: kee },
				{
					$set: {
						text: req.body.tweet
					},
					$currentDate: { lastUpdated: true }
				})
			console.log(status)
            const t= await Tweete.find({author:user.email})
			if (!t) {
				res.json({ status: 'error' })
			} else {
				console.log(t);
				res.json({ status: 'ok', list: t })
			}
        }
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/api/pagination', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
        // console.log(user)
        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }
        console.log('Body', req.body);
        const t= await Tweete.find({author:user.email})
		let page=req.body.page;
		t.reverse();
		let temp=[]; 
		console.log("t length:",t.length);
		for(let i=page*12;i<Math.min(t.length,page*12+12);i++){
			temp.push(t[i]);
		}
        if(!t){
            res.json({status:'error'})
        }else{
            console.log("temp:",temp.length);
            if(page*12<t.length)res.json({status:'ok',list:temp,max:false})
			else res.json({status:'ok',list:temp,max:true})
        }
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token post' })
	}
})

app.get('/api/handleDelete', async (req, res) => {
	const token = req.headers['x-access-token']
	// console.log("In Get");
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
        // console.log(user)
        const Tweetes=await Tweete.find({author:user.email})
		let list=[];
		Tweetes.reverse();
        if(!Tweetes){
            res.json({status:'error'})
        }else{
            res.json({status:'ok',list:Tweetes})
        }
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})