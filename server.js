const express = require('express');
const session = require('express-session');
var app = express();
var nunjucks = require("nunjucks");
var body = require('body-parser');
var cookie = require('cookie-parser');

app.use(express.static('public'));
nunjucks.configure('views', {
    express: app,
    autoescape: true                 
});


const server = app.listen(3030);

app.use(express.static('public'));
app.use(session({
    secret: '11111',
    resave: false,
    saveUninitialized: false,
}));
app.use(body.urlencoded({extended: false}));
app.use(cookie());


app.get('/', function(req, res) {
	req.session.liste = [];

	var e = {};
	e.lien = "/recommencer";
	e.description = "recommencer";
	req.session.liste.push(e);

	if (req.cookies.page) {
		res.render('index.html', {popup: 'vrai'});
	}
	else {
		res.render('index.html');
	}
}); 

app.get('/p1', function(req, res) {
	ajouterLien(res, "p1","l'escargot", req.session.liste);
});

app.get('/p1_bis', function(req, res) {
	res.render("p1.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p2', function(req, res) {
	res.render('p2.html');
});

app.get('/p2_bis', function(req, res) {
	res.render("p2.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p3', function(req, res) {
	ajouterLien(res, "p3","le chauffeur de bus", req.session.liste);
});

app.get('/p3_bis', function(req, res) {
	res.render("p3.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p4', function(req, res) {
	res.cookie('page', "p4", { maxAge: 900000, httpOnly: true })
	res.render("p4.html", {liste:req.session.liste});
});

app.get('/p4_bis', function(req, res) {
	res.render("p4.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p5', function(req, res) {
	ajouterLien(res, "p5","combien d'oeufs ?", req.session.liste);
});

app.get('/p5_bis', function(req, res) {
	res.render("p5.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p6', function(req, res) {
	ajouterLien(res, "p6","quelle couleur ?", req.session.liste);
});

app.get('/p6_bis', function(req, res) {
	res.render("p6.html", {btns: "faux", liste:req.session.liste});
});

app.post('/p6', function(req, res) {
	if (req.body.couleur == "fushia")
		res.render('p5.html');
	else
		res.render('p12.html');
});

// --------------------------------------------------------------------
app.get('/p7', function(req, res) {
	ajouterLien(res, "p7","où aller 1 ?", req.session.liste);
});

app.get('/p7_bis', function(req, res) {
	res.render("p7.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p8', function(req, res) {
	ajouterLien(res, "p8","où aller 2 ?", req.session.liste);
});

app.get('/p8_bis', function(req, res) {
	res.render("p8.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p9', function(req, res) {
	ajouterLien(res, "p9","où aller 3 ?", req.session.liste);
});

app.get('/p9_bis', function(req, res) {
	res.render("p9.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p10', function(req, res) {
	ajouterLien(res, "p10","quel animal ?", req.session.liste);
});

app.get('/p10_bis', function(req, res) {
	res.render("p10.html", {btns: "faux", liste:req.session.liste});
});

app.post('/p10', function(req, res) {
	if (req.body.animal == "castor")
		res.render('/p16');
	else
		res.render('p14.html');
});

// --------------------------------------------------------------------
app.get('/p12', function(req, res) {
	ajouterLien(res, "p12","l'oeuf ou la poule ?", req.session.liste);
});

app.get('/p12_bis', function(req, res) {
	res.render("p12.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p14', function(req, res) {
	res.render("p14.html", {iste:req.session.liste});});

app.get('/p14_bis', function(req, res) {
	res.render("p14.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p15', function(req, res) {
	res.cookie('page', 'p15', { maxAge: 900000, httpOnly: true })
	res.render('p15.html');
});

// --------------------------------------------------------------------
app.get('/p16', function(req, res) {
	ajouterLien(res, "p16", "tu veux manger quoi ?", req.session.liste);
});

app.get('/p16_bis', function(req, res) {
	res.render("p16.html", {btns: "faux", liste:req.session.liste});
});

app.post('/p16', function(req, res) {
	if (req.body.manger == "fruit")
		res.render('p19.html');
	else if (req.body.manger == "poire")
		res.render('p19.html');
	else
		res.render('p18.html');
});

// --------------------------------------------------------------------
app.get('/p17', function(req, res) {
	ajouterLien(res, "p17", "le mot de passe", req.session.liste);
});

app.get('/p17_bis', function(req, res) {
	res.render("p17.html", {btns: "faux", liste:req.session.liste});
});

app.post('/p17', function(req, res) {
	if (req.body.proposer == "chapeau")
		res.render('p15.html');
	else
		res.render('p17.html', {premierEssai: 'faux'});
});

// --------------------------------------------------------------------
app.get('/p18', function(req, res) {
	res.render('p18.html', {liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p19', function(req, res) {
	ajouterLien(res, "p19", "le barbier", req.session.liste);
});

app.get('/p19_bis', function(req, res) {
	res.render("p19.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p20', function(req, res) {
	ajouterLien(res, "p20", "deux filles", req.session.liste);
});

app.get('/p20_bis', function(req, res) {
	res.render("p20.html", {btns: "faux", liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p21', function(req, res) {
	res.render('p21.html', {liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p22', function(req, res) {
	res.render('p22.html', {liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p23', function(req, res) {
	res.render('p23.html', {liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p24', function(req, res) {
	res.render('p24.html', {liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p25', function(req, res) {
	res.render('p25.html', {liste:req.session.liste});
});

// --------------------------------------------------------------------
app.get('/p26', function(req, res) {
	res.render('p9.html', {liste:req.session.liste, demitour: "vrai"});
});

// --------------------------------------------------------------------
app.get('/p27', function(req, res) {
	res.render('p8.html', {liste:req.session.liste, demitour: "vrai"});
});

// --------------------------------------------------------------------
app.get("/reprendre", function(req, res) {
	if (req.cookies.page == 'p1')
		res.render('p1.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p3')
		res.render('p3.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p4')
		res.render('p4.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p5')
		res.render('p5.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p6')
		res.render('p6.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p7')
		res.render('p7.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p8')
		res.render('p8.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p9')
		res.render('p9.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p10')
		res.render('p10.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p11')
		res.render('p11.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p12')
		res.render('p12.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p13')
		res.render('p13.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p14')
		res.render('p14.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p15')
		res.render('p15.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p16')
		res.render('p16.html', {liste:req.session.liste});
	else if (req.cookies.page == 'p17')
		res.render('p17.html', {premierEssai: 'vrai', liste:req.session.liste});

});

app.get("/recommencer", function(req, res) {
	res.cookie('page', 'p1', { maxAge: 900000, httpOnly: true })

	req.session.liste = [];

	var e = {};
	e.lien = "/recommencer";
	e.description = "recommencer";
	req.session.liste.push(e);

	res.render('index.html');
});

// --------------------------------------------------------------------
// --------------------------------------------------------------------
var ajouterLien = function(res, lien, description, liste) {
	res.cookie('page', lien, { maxAge: 900000, httpOnly: true })

	if (lien == "p17")
		res.render('p17.html', {premierEssai: 'vrai', liste:liste});
	else 
		res.render(lien+'.html', {liste:liste});

	lien = lien + "_bis";
	var trouve = false;
	for (i in liste) {
		var e = liste[i];
		if (e.lien == lien) 
			trouve = true;
	}

	if (!trouve) {
		var p = {};
		p.lien = lien;
		p.description = description;
		liste.push(p);
	}
}