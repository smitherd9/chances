var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;


chai.use(chaiHttp);


describe('chances', function() {
    it('should return status code 200 and HTML on GET', function(done) {
        chai.request(app)
            .get('/')
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


    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/test')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('critical_flag');
                res.body[0].should.have.property('dba');
                res.body[0].critical_flag.should.be.a('string');
                res.body[0].dba.should.be.a('string');
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


