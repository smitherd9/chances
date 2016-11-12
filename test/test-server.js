var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var nock = require('nock');

var should = chai.should();
var app = server.app;


chai.use(chaiHttp);


describe('chances', function() {
    // var query = 'zipcode=10021&dba=UP%20THAI';
        
    
    nock('/9w7m-hzhe\.json/')
                .get('/')
                .reply(200, {
                  body: []
                 });
    it('should return status code 200 and HTML on GET', function(done) {
        chai.request(app)
            .get('/test/10021')
            .end(function(err, res) {
                if (err) {
                    return res.status(404).json({
                    message: 'Not Found'
                    });
                }
                console.log(res);
                res.should.have.status(200);
                res.should.be.json;
                
                done();
            });
    });
   
});

    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/test/10021')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('chancesRating');
                res.body.should.have.property('score');
                res.body.should.have.property('vioDesc');
                res.body.chancesRating.should.be.a('number');
                res.body.vioDesc.should.be.a('array');
                res.body.score.should.be.a('array');
                
                done();
            });
    });



describe('about', function() {
    it('should return status code 200 and HTML on GET', function(done) {
        chai.request(app)
            .get('/about.html')
            .end(function(err, res) {
                if (err) {
                    return res.status(404).json({
                    message: 'Not Found'
                    });
                }
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
   
});


